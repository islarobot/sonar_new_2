

// module2.js
var m1 = require('./test2.js');

// register event listener
m1.on("someEvent", function(data) {

    console.log("hola");
    // process data when someEvent occurs
});
