#!/usr/bin/env bash
set -euo pipefail

# 基於腳本位置定位項目根目錄
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_DIR"

# 優先使用 5000，若被系統/其他程序占用則自動降級。
pick_port() {
    for port in 5000 5001 5173 8000; do
        if ! lsof -iTCP:"$port" -sTCP:LISTEN >/dev/null 2>&1; then
            echo "$port"
            return 0
        fi
    done
    return 1
}

PORT="$(pick_port)" || {
    echo "Error: no available port found (tried 5000/5001/5173/8000)"
    exit 1
}
export PORT

if [[ "$PORT" != "5000" ]]; then
    echo "Port 5000 is busy, fallback to $PORT"
fi

# 使用 Python http.server 提供靜態文件服務
exec python3 -m http.server "$PORT" --bind 0.0.0.0
