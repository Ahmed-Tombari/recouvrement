@echo off
rem -- Check if argument is INSTALL or REMOVE

if not ""%1"" == ""INSTALL"" goto remove

"D:\sofware\alfresco-5.2\libreoffice\scripts\winserv.exe" install alfrescoLibreOffice -displayname "alfrescoLibreOffice" -start auto "D:\sofware\alfresco-5.2\libreoffice\App\libreoffice\program\soffice.exe" --nofirststartwizard --nologo --headless --accept=socket,host=127.0.0.1,port=8100;urp;

if ""%2"" == ""STOP"" goto end
net start alfrescoLibreOffice >NUL
goto end

:remove
rem -- STOP SERVICES BEFORE REMOVING

net stop alfrescoLibreOffice >NUL
"D:\sofware\alfresco-5.2\libreoffice\scripts\winserv.exe" uninstall alfrescoLibreOffice

:end
exit
