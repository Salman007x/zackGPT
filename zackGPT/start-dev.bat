@echo off
setlocal

:: ============================================================
::  ZackGPT - Development Environment Launcher
::  Starts all backend microservices and the frontend, each in
::  its own titled terminal window.
:: ============================================================

set "ROOT=%~dp0"
set "BACKEND=%ROOT%backend"
set "FRONTEND=%ROOT%frontend"
set "RUNNER=%ROOT%run-service.bat"

echo.
echo ==============================================
echo   Starting ZackGPT development environment
echo ==============================================
echo.

echo [1/5] Starting Gateway        (port 8000)...
start "ZackGPT - Gateway"        cmd /k ""%RUNNER%" "Gateway"        "8000" "%BACKEND%\gateway""

echo [2/5] Starting Auth Service   (port 8001)...
start "ZackGPT - Auth Service"   cmd /k ""%RUNNER%" "Auth Service"   "8001" "%BACKEND%\sevices\auth""

echo [3/5] Starting Chat Service   (port 8002)...
start "ZackGPT - Chat Service"   cmd /k ""%RUNNER%" "Chat Service"   "8002" "%BACKEND%\sevices\chat""

echo [4/5] Starting Agent Service  (port 8003)...
start "ZackGPT - Agent Service"  cmd /k ""%RUNNER%" "Agent Service"  "8003" "%BACKEND%\sevices\agent""

echo [5/5] Starting Frontend       (Vite)...
start "ZackGPT - Frontend"       cmd /k ""%RUNNER%" "Frontend"       "Vite" "%FRONTEND%""

echo.
echo All services have been launched in separate windows.
echo Close each window individually to stop that service.
echo.

endlocal
