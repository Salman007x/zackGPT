@echo off
setlocal enabledelayedexpansion

:: ============================================================
::  ZackGPT - Development Environment Stopper
::  Kills the node process bound to each service port (freeing
::  the port) and closes the matching terminal window.
:: ============================================================

echo.
echo ==============================================
echo   Stopping ZackGPT development environment
echo ==============================================
echo.

call :killPort "Gateway"       8000
call :killPort "Auth Service"  8001
call :killPort "Chat Service"  8002
call :killPort "Agent Service" 8003
call :killPort "Frontend"      5173

echo.
echo Closing any remaining ZackGPT terminal windows...
call :killWindow "ZackGPT - Gateway"
call :killWindow "ZackGPT - Auth Service"
call :killWindow "ZackGPT - Chat Service"
call :killWindow "ZackGPT - Agent Service"
call :killWindow "ZackGPT - Frontend"

echo.
echo All ZackGPT services stopped and ports released.
echo (Redis Docker container was left running - stop it manually if needed.)
echo.

endlocal
exit /b 0

:killPort
set "NAME=%~1"
set "PORT=%~2"
set "FOUND=0"

for /f "tokens=5" %%P in ('netstat -ano ^| findstr ":%PORT% " ^| findstr "LISTENING"') do (
    taskkill /F /T /PID %%P >nul 2>&1
    if not errorlevel 1 (
        set "FOUND=1"
        echo   Stopped: %NAME% ^(port %PORT%, PID %%P^)
    )
)

if "!FOUND!"=="0" (
    echo   Not running: %NAME% ^(port %PORT%^)
)
exit /b 0

:killWindow
set "TITLE=%~1"
taskkill /FI "WINDOWTITLE eq %TITLE%" /T /F >nul 2>&1
exit /b 0
