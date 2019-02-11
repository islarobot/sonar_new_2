/// pa.js


var ipc=require('node-ipc');

var global_socket;
 
ipc.config.id   = 'world';
ipc.config.retry= 1500;


////INICIALIZACION SERVIDOR
ipc.serve();


ipc.server.start();


///ON START (NO SIRVE PARA NADA)

ipc.server.on('start',function(){console.log('start');});

/// CUANDO SE CONECTA 1 SOCKET --> GUARDAMOS EL SOCKET A NIVEL GLOBAL

ipc.server.on('connect',function(s){
	


global_socket = s;

});


////PARA EMITIR (EL SOCKET TIENE QUE ESTAR INICIALIZADO)


///ipc.server.emit(global_socket,'message','111');



/// PARA RECIBIR

ipc.server.on('message',function(data){
	
console.log(data+'pepito')



});