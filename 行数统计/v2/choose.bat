:: fchooser.bat
:: launches a folder chooser and outputs choice to the console
:: http://stackoverflow.com/a/15885133/1683264

@echo off
REM chcp 65001
setlocal

set "psCommand="(new-object -COM 'Shell.Application')^
.BrowseForFolder(0,'请选择统计文件夹',0x0040,12).self.path""

for /f "usebackq delims=" %%I in (`powershell %psCommand%`) do set "folder=%%I"

setlocal enabledelayedexpansion
echo !folder!
endlocal