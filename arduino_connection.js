//// MODO DEVELOPMENT !!!!11

process.env.NODE_ENV = 'production';
//process.env.NODE_ENV = 'development';


///https://www.npmjs.com/package/virtual-serialport

////REQUIRES
//https://www.tigoe.com/pcomp/code/arduinowiring/1161/

var args = process.argv.slice(2);

var port_string = '/dev/ttyACM'+args[0];

var ipc=require('node-ipc');
var arduino_functions = require('./arduino_functions.js'); 
 
//// CONFIGURACION IPC

 
ipc.config.id   = 'hello';
ipc.config.retry= 1500;
ipc.config.silent = true;

//// ME CONECTO A SERVER.JS

ipc.connectTo('world');



//var serialPort = new SerialPort(port_string, {    baudRate: 9600});

//// INICIALIZO CONEXION A ARDU A FALSE.

var arduino_connect = false;


var SerialPort = require('serialport');

/// SI MODO DEVELOPMENT

if (process.env.NODE_ENV == 'development') {
  SerialPort = require('virtual-serialport');
}
 
var sp = new SerialPort(port_string, { baudRate: 115200 }); // still works if NODE_ENV is set to development!
 

////  CUANDO SE ABRE LA CONEXION CON ARDUINO
 
sp.on('open', function (err) {
 
   arduino_connect = true; 
   console.log('Arduino connected');
 
 
 
 /// CUANDO RECIBO DATOS DE ARDU
 
sp.on("data", function(data) {
	
	//console.log('ardu: '+data)
	
	var data_string = data.toString();
	var data_json = arduino_functions.funcion_conversion_ardu_node(data_string);
	
	if (data_json != 'NA') {
			ipc.of.world.emit('message',data_json);
			//console.log(data_out_2);
	}
  	 //console.log("---> 6 ---->  " + data_string);
    //console.log("---> 6 ---->  " + data_json);
    //ipc.of.world.emit('message',data_out_2);
               
});

});




///////  ------- 3 -----------  RECIBO INFO DE SERVER.JS Y LA REENVIO A ARDUINO TAL CUAL. AQUI NECESITO FUNCION DE CONVERSION.

ipc.of.world.on('connect',function(){console.log('ipc client connected');});
ipc.of.world.on('message',function(data){


var data_out = arduino_functions.funcion_conversion_node_ardu(data);

//console.log(data_out);


///////// Tengo que confirmar que hay conexion con arduino.

if(arduino_connect){
	
	
	//console.log('node: '+data_out);
	sp.write(data_out+'\n');
	
	}


});


///////  ------- 4 / 5-----------  RECIBO INFO DE ARDU_CONNECTION.JS EN EL ARDUINO Y LA DEVUELVO A ARDU_CONECTION.JS. AQUI NECESITO FUNCION DE CONVERSION. --- ESTE CODIGO SE SUSTITUYE POR EL DE ARDU



  if (process.env.NODE_ENV == 'development') {
  	
  	/// CUANDO RECIBO EN ARDU DESDE PC
  	
    sp.on("dataToDevice", function(data) {
    	
    	//console.log('-----> 4 -----> '+data);

    	//data es el input del pc al arduino
    	
    	//aqui va la funcion que simula lo que haria el arduino. en base al input, devuelve un valor (funcion del grado)
    	
    	var data_sent = arduino_functions.generate_amplitude_function(data);
    	
    	//console.log('----> 5 ----> '+data_sent);
    	
      sp.writeToComputer(data_sent);
    });
  }











