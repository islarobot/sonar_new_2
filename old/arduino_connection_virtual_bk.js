///https://www.npmjs.com/package/virtual-serialport

var ipc=require('node-ipc');
 
ipc.config.id   = 'hello';
ipc.config.retry= 1500;

ipc.connectTo('world');



var arduino_functions = require('./arduino_functions.js');

//// MODO DEVELOPMENT !!!!11

process.env.NODE_ENV = 'development';

var SerialPort = require('serialport');

if (process.env.NODE_ENV == 'development') {
  SerialPort = require('virtual-serialport');
}
 
var sp = new SerialPort('/dev/ttyUSB0', { baudRate: 57600 }); // still works if NODE_ENV is set to development!
 
sp.on('open', function (err) {
 
 // DE ARDUINO A PC ---------
 
  sp.on("data", function(data) {
  	
    console.log("lo que recibo desde Ardu: " + data);
    
    ipc.of.world.emit('message',data);
 
 

 
  if (process.env.NODE_ENV == 'development') {
  	
  	/// CUANDO RECIBO EN ARDU DESDE PC
  	
    sp.on("dataToDevice", function(data) {
    	
    	console.log('lo que recibo en Ardu: '+data);

    	//data es el input del pc al arduino
    	
    	//aqui va la funcion que simula lo que haria el arduino. en base al input, devuelve un valor (funcion del grado)
    	
    	var data_sent = arduino_functions.generate_amplitude_function(data);
    	
    	console.log('lo que envio desde Ardu: '+data_sent)
    	
      sp.writeToComputer(data_sent);
    });
  }
 
 
//envio data del pc al arduino:
		
//aqui escucho un evento que viene del servidor http y escribo al arduino. como lo hago? ni puta idea. 
 
//  sp.write(0); // "From Arduino: BLOOP BLOOP!"


    //sp.write('test');


});

ipc.of.world.on('message',function(data){

sp.write(data);

});				
                



