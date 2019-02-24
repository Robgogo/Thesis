#include"RTClib.h"
#include <Wire.h>

#include<SoftwareSerial.h>



RTC_DS1307 rtc;
int echoPin=11;
int  trigPin=13;
float pingTime;
float targetDistance;
float originalDist=2;
float level;
float speedOfSound=343;//in meter per second
String data=  "";
int sensorInterrupt=0;
int flowRatePin=2;
float calibrationFactor=4.5;
int pulseCount;
float flowRate;
unsigned int flowMilliLitres;
unsigned long totalMilliLitres;
unsigned long oldTime;

int OnOffLed=6;
int statusGreen=8;
int statusRed=7;
int brightness=100;
char daysOfTheWeek[7][12] = {"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"};

SoftwareSerial mySerial(9,10);

void setup() {
  mySerial.begin(9600);
  Serial.begin(9600);
  pinMode(echoPin,INPUT);
  pinMode(trigPin,OUTPUT);
  pinMode(flowRatePin, INPUT);
  digitalWrite(flowRatePin, HIGH);
  pinMode(OnOffLed,OUTPUT);
  pinMode(statusGreen,OUTPUT);
  pinMode(statusRed,OUTPUT);

  pulseCount        = 0;
  flowRate          = 0.0;
  flowMilliLitres   = 0;
  totalMilliLitres  = 0;
  oldTime           = 0;
  delay(100);

  if (! rtc.begin()) {
    Serial.println("Couldn't find RTC");
    while (1);
  }

  if (! rtc.isrunning()) {
    Serial.println("RTC is NOT running!");
    // following line sets the RTC to the date & time this sketch was compiled
    rtc.adjust(DateTime(F(__DATE__), F(__TIME__)));
    // This line sets the RTC with an explicit date & time, for example to set
    // January 21, 2014 at 3am you would call:
    // rtc.adjust(DateTime(2014, 1, 21, 3, 0, 0));
  }
  attachInterrupt(sensorInterrupt,pulseCounter,FALLING);
  mySerial.println("AT");

}

void loop() {


  digitalWrite(OnOffLed,HIGH);
  digitalWrite(trigPin,LOW);
  delayMicroseconds(2000);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(15);
  digitalWrite(trigPin,LOW);

  pingTime=pulseIn(echoPin,HIGH);
  pingTime=pingTime/1000000.;

  targetDistance=speedOfSound * pingTime;
  targetDistance=targetDistance/2.;

  level=originalDist - targetDistance;

//  Serial.print("The distance is: ");
//  Serial.println(level);

  
//  delay(1000);
  
  if((millis()-oldTime)>1000){
    detachInterrupt(sensorInterrupt);
    flowRate= ((1000.0 / (millis() - oldTime)) * pulseCount) / calibrationFactor;
    oldTime = millis();
    flowMilliLitres = (flowRate / 60) * 1000;
    totalMilliLitres += flowMilliLitres;
    unsigned int frac;
//    Serial.print("Flow rate: ");
//    Serial.print(int(flowRate));  // Print the integer part of the variable
//    Serial.print(".");             // Print the decimal point
    frac = (flowRate - int(flowRate)) * 10;
//    Serial.print(frac, DEC) ;      // Print the fractional part of the variable
//    Serial.print("L/min");
//    Serial.print("  Current Liquid Flowing: ");             // Output separator
//    Serial.print(flowMilliLitres);
//    Serial.print("mL/Sec");
//    Serial.print("  Output Liquid Quantity: ");             // Output separator
//    Serial.print(totalMilliLitres);
//    Serial.println("mL"); 
    pulseCount = 0;
    attachInterrupt(sensorInterrupt, pulseCounter, FALLING);
  }

  
  DateTime now=rtc.now();
//  Serial.print(now.year(), DEC);
//  Serial.print('/');
//  Serial.print(now.month(), DEC);
//  Serial.print('/');
//  Serial.print(now.day(), DEC);
//  Serial.print(" (");
//  Serial.print(daysOfTheWeek[now.dayOfTheWeek()]);
//  Serial.print(") ");
//  Serial.print(now.hour(), DEC);
//  Serial.print(':');
//  Serial.print(now.minute(), DEC);
//  Serial.print(':');
//  Serial.print(now.second(), DEC);
//  Serial.println();
  String timeOfRecord=String(now.year(), DEC)+'/'+String(now.month(), DEC)+'/'+String(now.day(), DEC)+" "+String(now.hour(), DEC)+":"+String(now.minute(), DEC)+":"+String(now.second(), DEC);
  
  String gnodeData="\"sensor2\":{\"flowrate\":"+(String)flowRate+",\"level\":"+(String)level+",\"time\":"+timeOfRecord+"}";
  if(Serial.available()>0){
    Serial.println("Reading data...");
    String nodeData=Serial.readString();
    delay(800);
    //Serial.println(nodeData);
    data=data+gnodeData+","+nodeData;
    digitalWrite(statusGreen,HIGH);
    SendMessage(data);
    digitalWrite(statusGreen,LOW);
  }

  if(mySerial.available()){
    Serial.write(mySerial.read());
  }

  delay(500);

}

void SendMessage(String data){
  mySerial.println("AT+HTTPINIT");
  mySerial.println((char)13);
  delay(500);
  mySerial.println("AT+HTTPPARA=\"CID\",1");
  delay(500);
  mySerial.println("AT+HTTPPARA=\"URL\",\"http://localhost:8080/api/add\"");
  delay(500);
  mySerial.println("AT+HTTPPARA=\"CONTENT\",\"multipart/form-data; boundary=----WebKitFormBoundaryvZ0ZHShNAcBABWFy\"");
  delay(500);
  mySerial.println("AT+HTTPDATA=192,10000");

  mySerial.println("------WebKitFormBoundaryvZ0ZHShNAcBABWFy");
  mySerial.println("Content-Disposition: form-data; name=\"fileToUpload\"; filename=\"data.json\"");
  mySerial.println("Content-Type: application/json");
  //String data="{\"name\":\"Kiyaa\",\"location\":\"adama\",\"level\":"+(String)targetDistance+",\"flowRate\":"+(String)flowRate+"}";
  mySerial.println(data);
  mySerial.println("------WebKitFormBoundaryvZ0ZHShNAcBABWFy");
  mySerial.println("AT+HTTPACTION=1");
  delay(500);
}

void RecieveMessage(){
  mySerial.println("AT+CNMI=2,2,0,0,0");
  delay(1000);
}

void pulseCounter()
{
  // Increment the pulse counter
  pulseCount++;
}
