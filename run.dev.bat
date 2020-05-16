setlocal
FOR /F "tokens=*" %%i in ('type %~dp0.env') do SET %%i
docker build --tag rnb-site.dev -f dev.dockerfile %~dp0
docker run --env-file %~dp0.env -it -p %PORT%:%PORT% rnb-site.dev
endlocal