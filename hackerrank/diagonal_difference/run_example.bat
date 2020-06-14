@echo off
REM Run the challenge with the environment variable OUTPU_PATH and
REM the example name as argument
SET example=%1
REM Date & time format - YYYYMMDD-hhmmss
REM https://stackoverflow.com/questions/1192476/format-date-and-time-in-a-windows-batch-script
SET datetime=%date:~-4%%date:~3,2%%date:~0,2%-%time:~0,2%%time:~3,2%%time:~6,2%
set datetime=%datetime: =0%
REM This variable is needed to know where to save the output
SET OUTPUT_PATH=output\%datetime%_output%example%.txt
node script.js < input\input%example%.txt
echo Test %example% Complete!