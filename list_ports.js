var SerialPort = require('serialport');
// callback approach
SerialPort.list(function (err, ports) {
  ports.forEach(function(port) {
  	
  	
  	
 if (port.comName.slice(8,11)=='ACM' ){	
  	
    console.log(port.comName);
    console.log(port.pnpId);
    console.log(port.manufacturer);
 }
  });
});