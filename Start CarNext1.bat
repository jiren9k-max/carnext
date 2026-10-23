@echo off
title CarNext1 (premium)
cd /d "%~dp0"

if not exist node_modules (
  echo Installing packages, first run only...
  call npm install || goto :error
)

echo Building CarNext...
call npm run build || goto :error

echo.
echo CarNext1 is running at http://localhost:3006
echo Close this window to stop the site.
echo.
start "" cmd /c "timeout /t 4 >nul && start http://localhost:3006"
call npx next start -p 3006
goto :eof

:error
echo.
echo Something went wrong - see the messages above.
pause
