@echo off
cd /d "%~dp0"
echo Starting the academic website on http://localhost:8000
echo Keep this window open while viewing the site. Press Ctrl+C to stop.
where py >nul 2>nul
if %errorlevel%==0 (
  py -m http.server 8000
) else (
  python -m http.server 8000
)
pause
