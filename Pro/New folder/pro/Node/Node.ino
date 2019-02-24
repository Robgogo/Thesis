//#include <DS1307.h>
#include"RTClib.h"
#include <Wire.h>

RTC_DS1307 rtc;
int echoPin=11;
int  trigPin=13;
float pingTime;
float targetDistance;
float speedOfSound=343;//in meter per second
float originalDist=2;
float level;
int sensorInterrupt=0;
int flowRatePin=2;
float calibrationFactor=4.5;
int pulseCount;
float flowRate;
unsigned int flowMilliLitres;
unsigned long totalMilliLitres;
unsigned long oldTime;
char daysOfTheWeek[7][12] = {"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"};


void setup() {
  Serial.begin(9600);
  pinMode(echoPin,INPUT);
  pinMode(trigPin,OUTPUT);
  pinMode(flowRatePin, INPUT);
  digitalWrite(flowRatePin, HIGH);

  pulseCount        = 0;
  flowRate          = 0.0;
  flowMilliLitres   = 0;
  totalMilliLitres  = 0;
  oldTime           = 0;
  delay(100);

  if (! rtc.begin()) {
    //Serial.println("Couldn't find RTC");
    while (1);
  }

  if (! rtc.isrunning()) {
//    Serial.println("RTC is NOT running!");
    // following line sets the RTC to the date & time this sketch was compiled
    rtc.adjust(DateTime(F(__DATE__), F(__TIME__)));
    // This line sets the RTC with an explicit date & time, for example to set
    // January 21, 2014 at 3am you would call:
    // rtc.adjust(DateTime(2014, 1, 21, 3, 0, 0));
  }

//  DS1307.begin();
//  DS1307.setDate(19,1,24,0,10,53,0);
  
  attachInterrupt(sensorInterrupt,pulseCounter,FALLING);
}

void loop() {

  DateTime now=rtc.now();

  String timeOfRecord=String(now.year(), DEC)+'/'+String(now.month(), DEC)+'/'+String(now.day(), DEC)+" "+String(now.hour(), DEC)+":"+String(now.minute(), DEC)+":"+String(now.second(), DEC);

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
//  Serial.println(targetDistance);

  

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

  String data="\"sensor1\":{\"flowrate\":"+(String)flowRate+",\"level\":"+(String)level+",\"time\":"+timeOfRecord+"}";
  Serial.println(data);
  
  delay(3800);

}

void pulseCounter()
{
  // Increment the pulse counter
  pulseCount++;
}
