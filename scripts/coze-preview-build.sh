#!/usr/bin/env bash
set -euo pipefail

# 靜態網站不需要構建步驟，只需驗證文件存在
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_DIR"

# 驗證關鍵文件存在
if [[ ! -f index.html ]]; then
    echo "Error: index.html not found"
    exit 1
fi

echo "Static site build check passed"
