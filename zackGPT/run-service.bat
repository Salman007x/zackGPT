@echo off
:: ============================================================
::  ZackGPT - Single Service Runner
::  Invoked by start-dev.bat inside its own terminal window.
::  Args: %1=Service name  %2=Port  %3=Working directory
:: ============================================================
setlocal

set "NAME=%~1"
set "PORT=%~2"
set "DIR=%~3"

echo ==============================================
echo   ZackGPT Service : %NAME%
echo   Port            : %PORT%
echo   Directory       : %DIR%
echo ==============================================
echo.

cd /d "%DIR%"
call npm run dev
set "EXITCODE=%errorlevel%"

echo.
if "%EXITCODE%"=="0" (
    echo [STOPPED]  %NAME% exited cleanly.
) else (
    echo [ERROR]    %NAME% exited with code %EXITCODE%. Check the log above for details.
)
echo.
echo Press any key to close this window...
pause >nul

endlocal
