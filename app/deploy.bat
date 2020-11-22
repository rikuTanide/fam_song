call npm run prettier
call .\node_modules\.bin\tsc
call .\node_modules\.bin\webpack
call firebase deploy --only hosting,functions
