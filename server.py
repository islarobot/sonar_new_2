#https://docs.python.org/2/library/simplehttpserver.html

import SimpleHTTPServer
import SocketServer

PORT = 8000

Handler = SimpleHTTPServer.SimpleHTTPRequestHandler

httpd = SocketServer.TCPServer(("", PORT), Handler)

print "python http server serving at port", PORT
httpd.serve_forever()