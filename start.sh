#!/bin/bash

#python server.py

#node server.js

gnome-terminal -- python server.py

delay 2

gnome-terminal -- node server.js

delay 2

gnome-terminal -- node arduino_connection.js 0

