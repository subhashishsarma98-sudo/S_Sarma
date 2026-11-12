#!/usr/bin/env sh
cd "$(dirname "$0")"
echo "Starting the academic website on http://localhost:8000"
echo "Press Ctrl+C to stop the local server."
python3 -m http.server 8000
