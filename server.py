import SimpleHTTPServer
import SocketServer

"""
# Start server
python3 -m http.server


"""
PORT = 8081

Handler = SimpleHTTPServer.SimpleHTTPRequestHandler

httpd = SocketServer.TCPServer(("", PORT), Handler)

print("SimpleHTTPServer serving at http://localhost:%s" % PORT)
httpd.serve_forever()
