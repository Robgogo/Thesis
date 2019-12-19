#include<SoftwareSerial.h>
//#include <MyRealTimeClock.h>
//
//MyRealTimeClock myRTC(6, 7, 8);
SoftwareSerial xbee(9,10);
int sensorInterrupt=0;
int flowratePin=2;
float calibrationFactor=4.5;
int pulseCount;
float flowRate;
unsigned long oldTime;
int echoPin=11;
int  trigPin=13;
float pingTime;
float targetDistance;
float speedOfSound=343;//in meter per second
float originalDist=2;
float level;
String data="";
unsigned long timer;


void setup() {
  // put your setup code here, to run once:

  Serial.begin(9600);
  xbee.begin(9600);
  delay(100);
  pinMode(echoPin,INPUT);
  pinMode(trigPin,OUTPUT);
  pinMode(flowratePin,INPUT);
  digitalWrite(flowratePin,HIGH);
  pulseCount=0;
  flowRate=0.0;
  oldTime=0;
  timer=0;
//  myRTC.setDS1302Time(00, 12, 16, 12 , 9, 06, 2019);
  delay(100);
  attachInterrupt(sensorInterrupt,pulseCounter,FALLING);


}

void loop() {
  
  measureLevel();
  measureFlowRate();
//  myRTC.updateTime();
//  String timeOfReading=String(myRTC.year, DEC)+'-'+String(myRTC.month, DEC)+'-'+String(myRTC.dayofmonth, DEC)+"T"+String(myRTC.hours, DEC)+":"+String(myRTC.minutes, DEC)+":"+String(myRTC.seconds, DEC);
  

  data+="\"Sensor 1\":{\"flowRate\":"+(String)flowRate+",\"level\":"+(String)level+",";

//  Serial.println(data);
  int x= data.length();
  xbee.print("<");
  for(int i=0;i<x;i++){
    xbee.print(data[i]);    
  }
  xbee.println(">");
  data="";
  delay(10000);

}

void measureLevel(){
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
}

void measureFlowRate(){
  if((millis()-oldTime)>1000){
    detachInterrupt(sensorInterrupt);
    flowRate=((1000.0/(millis()-oldTime))*pulseCount)/calibrationFactor;
    oldTime=millis();
    pulseCount=0;
    attachInterrupt(digitalPinToInterrupt(flowratePin),pulseCounter,FALLING);
  }
}

void pulseCounter(){
  pulseCount++;
}
