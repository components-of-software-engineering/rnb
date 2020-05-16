setlocal
FOR /F "tokens=*" %%i in ('type %~dp0.env') do SET %%i
docker build --tag rnb-site.prod -f Dockerfile  %~dp0
docker run --env-file %~dp0.env -it -p %PORT%:%PORT% rnb-site.prod
endlocal