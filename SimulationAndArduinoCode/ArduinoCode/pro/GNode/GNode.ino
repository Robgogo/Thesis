#include <SoftwareSerial.h>
#include <MyRealTimeClock.h>

MyRealTimeClock myRTC(4,5,6);

SoftwareSerial xbee(8,7);
SoftwareSerial mySerial(9, 10);

//Variables
bool started= false;//True: Message is strated
bool ended  = false;//True: Message is finished 
char incomingByte ; //Variable to store the incoming byte
char msg[200];    //Message - array from 0 to 2 (3 values - PWM - e.g. 240)
byte index;     //Index of array
String testReading="";
String dummyData="\"Sensor 2\":{\"flowRate\":23,\"level\":1.56,";
void setup() {
  // put your setup code here, to run once:
  mySerial.begin(115200);
  xbee.begin(9600);
  Serial.begin(9600); //Baud rate must be the same as is on xBee module
  Serial.println("Recieving");
//  myRTC.setDS1302Time(19, 16, 02, 00 , 3, 07, 2019);
  delay(100);

}

void loop() {

  Serial.println("Waiting");
  myRTC.updateTime();
  String timeOfReading=String(myRTC.year, DEC)+'-'+String(myRTC.month, DEC)+'-'+String(myRTC.dayofmonth, DEC)+"T"+String(myRTC.hours, DEC)+":"+String(myRTC.minutes, DEC)+":"+String(myRTC.seconds, DEC);
  xbee.listen();//Start listening on the xbee
  while (xbee.available()>0){
    //Read the incoming byte
    incomingByte = xbee.read();
    //Start the message when the '<' symbol is received
    if(incomingByte == '<')
    {
     started = true;
     index = 0;
     msg[index] = '\0'; // Throw away any incomplete packet
   }
   //End the message when the '>' symbol is received
   else if(incomingByte == '>')
   {
     ended = true;
     break; // Done reading - exit from while loop!
   }
   //Read the message!
   else
   {
     if(index < 201) // Make sure there is room
     {
       msg[index] = incomingByte; // Add char to array
       index++;
       msg[index] = '\0'; // Add NULL to end
     }
   }
 }
 //if the whole message is recieved convert to string and send to server with the GSM
 if(started && ended)
 {
   String value(msg);
   Serial.println("Recieved");//Only for debugging
   index = 0;
   msg[index] = '\0';
   started = false;
   ended = false;
   testReading="{"+value+"\"timeOfReading\":\""+timeOfReading+"\"},"+dummyData+"\"timeOfReading\":\""+timeOfReading+"\"}}";
   Serial.print(testReading);//only for debuging
   Serial.println();
   mySerial.listen();//start listening to the gsm
   //call on the methods to connect to internet and post the data
   connectGPRS();
   connectHTTP();
   
 }
 if(mySerial.available()>0){
  Serial.write(mySerial.read());
 }
 //wait every 5 seconds to listen to transmission
 delay(5000);

}

//method to display the response of the software serial
void ShowSerialData() {
  while(mySerial.available()!=0)
    Serial.write(mySerial.read());
}
//method to connect to GPRS
void connectGPRS()
{ 
  mySerial.println("AT+CGATT=1");
  delay(100);
  ShowSerialData();
  mySerial.println("AT+SAPBR=3,1,\"Contype\",\"GPRS\"");
  delay(100);
  ShowSerialData();

  mySerial.println("AT+SAPBR=3,1,\"APN\",\"etc.com\"");//APN
  delay(100);
  ShowSerialData();

  mySerial.println("AT+SAPBR=1,1");
  delay(100);
  ShowSerialData();

  mySerial.println("AT+SAPBR=2,1");
  delay(100);
  ShowSerialData();
}
//method to send the data to the server
void connectHTTP()
{
  mySerial.println("AT+HTTPTERM");
  delay(100);
  ShowSerialData();
  mySerial.println("AT+HTTPINIT");
  delay(100);
  ShowSerialData();

  mySerial.println("AT+HTTPPARA=\"CID\",1");
  delay(100);
  ShowSerialData();


  mySerial.println("AT+HTTPPARA=\"URL\",\"http://vast-eyrie-51209.herokuapp.com/api/postdata\"");//Public server address
  delay(100);
  ShowSerialData();myRTC.updateTime();
  String timeOfReading=String(myRTC.year, DEC)+'-'+String(myRTC.month, DEC)+'-'+String(myRTC.dayofmonth, DEC)+"T"+String(myRTC.hours, DEC)+":"+String(myRTC.minutes, DEC)+":"+String(myRTC.seconds, DEC);

  mySerial.println("AT+HTTPPARA=\"CONTENT\",\"application/json\"");
  delay(100);
  ShowSerialData();


  mySerial.println("AT+HTTPDATA=" + String(testReading.length()) + ",10000");
  delay(100);
  ShowSerialData();

  mySerial.println(testReading);
  delay(100);
  ShowSerialData();

  mySerial.println("AT+HTTPACTION=1");
  delay(100);
  ShowSerialData();

  mySerial.println("AT+HTTPREAD");
  delay(100);
  ShowSerialData();

  mySerial.println("AT+HTTPTERM");
  delay(100);
  ShowSerialData();
}
