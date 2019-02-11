// module1.js
// module that has events

var events = require('events');


// create EventEmitter object
var obj = new events.EventEmitter();

// export the EventEmitter object so others can use it
module.exports = obj;

// other code in the module that does something to trigger events
// this is just one example using a timer
setInterval(function() {
    obj.emit("someEvent", 'hola');
}, 10 * 1000);

