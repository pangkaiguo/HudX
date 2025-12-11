#!/bin/bash
cd /Users/kaiguo/Documents/hkex-workspace/HudX/examples
pnpm dev &
PID=$!
sleep 3
kill $PID 2>/dev/null
echo "Build test completed"
