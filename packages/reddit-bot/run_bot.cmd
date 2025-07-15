@echo off
echo Reddit Image Posting Bot - Setup and Run
echo ======================================

:: Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Python is not installed or not in PATH
    echo Please install Python 3.11.9 from: https://www.python.org/ftp/python/3.11.9/python-3.11.9-amd64.exe
    echo Installation guide: https://youtu.be/ExJHGEn6gt0?si=cNNWfjw38_Qe2Y2z
    pause
    exit /b 1
)

:: Check if pip is installed
pip --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: pip is not installed
    echo Please ensure Python was installed correctly
    pause
    exit /b 1
)

:: Check if requirements.txt exists
if not exist requirements.txt (
    echo Error: requirements.txt file not found
    echo Please ensure you are running this script from the correct directory
    pause
    exit /b 1
)

:: Install dependencies
echo Installing required dependencies...
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo Error: Failed to install dependencies
    pause
    exit /b 1
)

:: Check if main.py exists
if not exist main.py (
    echo Error: main.py file not found
    echo Please ensure you are running this script from the correct directory
    pause
    exit /b 1
)

:: Check if Account.txt exists
if not exist Account.txt (
    echo Warning: Account.txt file not found
    echo Please create Account.txt with your Reddit and Gemini credentials
    echo For help, see: https://youtu.be/OVnnVnLZPEo?si=TYcYPuugUrCDZrAg
)

:: Check if Subreddits.txt exists
if not exist Subreddits.txt (
    echo Warning: Subreddits.txt file not found
    echo Please create Subreddits.txt with your subreddit list
)

:: Check if Prompt.txt exists
if not exist Prompt.txt (
    echo Warning: Prompt.txt file not found
    echo Please create Prompt.txt with your response template
)

:: Check if Posts folder exists
if not exist Posts (
    echo Warning: Posts folder not found
    echo Please create a Posts folder and add your images
)

:: Run the application
echo Starting Reddit Image Posting Bot...
echo Press Ctrl+C to stop the application
echo ======================================
python main.py

:: If the application exits, wait for user input
pause 