#include <SoftwareSerial.h>

SoftwareSerial xbee(8,7);
SoftwareSerial mySerial(9, 10);

//Variables
bool started= false;//True: Message is strated
bool ended  = false;//True: Message is finished 
char incomingByte ; //Variable to store the incoming byte
char msg[200];    //Message - array from 0 to 2 (3 values - PWM - e.g. 240)
byte index;     //Index of array
String testReading="";
String dummyData="\"Sensor 2\":{\"flowRate\":23,\"level\":1.56,\"timeOfReading\":\"2019-06-07T14:14:56\"}";
void setup() {
  // put your setup code here, to run once:
  mySerial.begin(115200);
  xbee.begin(9600);
  Serial.begin(9600); //Baud rate must be the same as is on xBeinte module
  Serial.println("Recieving");
  
  delay(100);

//  mySerial.println("AT");
  

}

void loop() {

  Serial.println("Waiting");
  xbee.listen();
  // put your main code here, to run repeatedly:
  while (xbee.available()>0){
//    Serial.println("xbee available");
    //Read the incoming byte
    incomingByte = xbee.read();
    //Start the message when the '<' symbol is received
    Serial.print(incomingByte);
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
 
 if(started && ended)
 {
   String value(msg);
   Serial.println("Recieved");
    //Only for debugging
   index = 0;
   msg[index] = '\0';
   started = false;
   ended = false;
   testReading="{"+value+",\"timeOfReading\":\"2019-06-07T14:14:56\"},"+dummyData+"}";
   Serial.print(testReading);
   Serial.println();
   mySerial.listen();
   connectGPRS();
   connectHTTP();
   
 }
 if(mySerial.available()>0){
  Serial.write(mySerial.read());
 }
delay(15000);

}

void ShowSerialData() {
  while(mySerial.available()!=0)
    Serial.write(mySerial.read());
}

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
  ShowSerialData();

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
