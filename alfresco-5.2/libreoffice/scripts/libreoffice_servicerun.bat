@echo off
rem START or STOP MySQL
rem --------------------------------------------------------
rem Check if argument is STOP or START

if not ""%1"" == ""START"" goto stop

net start alfrescoLibreOffice
goto end

:stop
net stop alfrescoLibreOffice

:end
exit
