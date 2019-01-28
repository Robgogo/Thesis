#include<SoftwareSerial.h>

int echoPin=11;
int  trigPin=13;
float pingTime;
float targetDistance;
float speedOfSound=343;//in meter per second

SoftwareSerial mySerial(9,10);

void setup() {
  mySerial.begin(9600);
  Serial.begin(9600);
  pinMode(echoPin,INPUT);
  pinMode(trigPin,OUTPUT);
  
  delay(100);
   mySerial.println("AT");
  delay(1000);

}

void loop() {

  digitalWrite(trigPin,LOW);
  delayMicroseconds(2000);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(15);
  digitalWrite(trigPin,LOW);

  pingTime=pulseIn(echoPin,HIGH);
  pingTime=pingTime/1000000.;

  targetDistance=speedOfSound * pingTime;
  targetDistance=targetDistance/2.;

  Serial.print("The distance is: ");
  Serial.println(targetDistance);

  delay(1000);
  
  
  
  if(Serial.available()>0){
    switch(Serial.read()){
      case 's':
        SendMessage();
        break;
      case 'r':
        RecieveMessage();
        break;
    }
  }

    if(mySerial.available()){
      Serial.write(mySerial.read());
    }
  
  // put your main code here, to run repeatedly:

}

void SendMessage(){
  mySerial.println("AT+CMGF=1");
  delay(1000);
  mySerial.println("AT+CMGS=\"+251911572482\"\r");
  delay(1000);
  mySerial.println("SMS SENT");
  delay(100);
  mySerial.println((char)26);
  delay(1000);
}

void RecieveMessage(){
  mySerial.println("AT+CNMI=2,2,0,0,0");
  delay(1000);
}
