//test

process.env.NODE_ENV = 'development';

var SerialPort = require('serialport');
if (process.env.NODE_ENV == 'development') {
  SerialPort = require('virtual-serialport');
}
 
var sp = new SerialPort('/dev/ttyUSB0', { baudRate: 57600 }); // still works if NODE_ENV is set to development!
 
sp.on('open', function (err) {
 
  sp.on("data", function(data) {
    console.log("From Arduino: " + data);
  });
 
 
// Cuando envio info al arduino
 
  if (process.env.NODE_ENV == 'development') {
    sp.on("dataToDevice", function(data) {
    	
    	//data es el input del pc al arduino
    	
      sp.writeToComputer(data + " " + data + "!");
    });
  }
 
 
//envio data del pc al arduino:

//aqui va la funcion que pulula entre -180 y 180 grados
 
  sp.write("BLOOP"); // "From Arduino: BLOOP BLOOP!"



});