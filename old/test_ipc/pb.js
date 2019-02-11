//pb.js


var ipc=require('node-ipc');
 
ipc.config.id   = 'hello';
ipc.config.retry= 1500;


////CONEXION CLIENTE

 
ipc.connectTo('world');


///////RECEPCION CLIENTE

ipc.of.world.on('message',


function(data){console.log('mmm'+data)

}
);


///EMISION CLIENTE

ipc.of.world.emit('message','hello motherfucker');