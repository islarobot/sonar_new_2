////  PROBLEMA SOCKET.IO  ////////////




It seems that this question may have never been answered (although it may be too late for the OP, I'll answer it for anyone who comes across it in the future and needs to solve the problem).

Instead of doing npm install socket.io you have to do npm install socket.io --save so the socket.io module gets installed in your web development folder (run this command at the base location/where your index.html or index.php is). This installs socket.io to the area in which the command is run, not globally, and, in addition, it automatically corrects/updates your package.json file so node.js knows that it is there.

Then change your source path from '/socket.io/socket.io.js' to 'http://' + location.hostname + ':3000/socket.io/socket.io.js'.