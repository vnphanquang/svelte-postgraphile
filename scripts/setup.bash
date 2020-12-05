#!/bin/bash

# copy hooks into .git/hooks
mkdir -p .git/hooks
cp -a scripts/.githooks/. .git/hooks/

# give executable permission
chmod +x .git/hooks/
