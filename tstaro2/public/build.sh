#!/bin/sh

JAVA_TOOL_OPTIONS=-Dfile.encoding=UTF8
export JAVA_TOOL_OPTIONS

cd ./dev
sencha app build  ../javascripts

cd ..
