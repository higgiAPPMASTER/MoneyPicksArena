@echo off
echo ============================================
echo    MONEY PICKS ARENA — GitHub Deploy
echo ============================================
echo.

cd /d "%~dp0"

:: First-time setup: initialize git and connect to GitHub
:: (Skip if already initialized)
if not exist ".git" (
    echo Initializing git repo...
    git init
    git remote add origin https://github.com/higgiAPPMASTER/MoneyPicksArena.git
)

echo Adding all files...
git add -A

echo Committing...
git commit -m "Update Money Picks Arena"

echo Pushing to GitHub...
git push origin main --force

echo.
echo ============================================
echo  Done! Vercel will auto-deploy in ~1 min.
echo  Check: https://vercel.com/dashboard
echo ============================================
pause
