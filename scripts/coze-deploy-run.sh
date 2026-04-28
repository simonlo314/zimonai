#!/usr/bin/env bash
set -euo pipefail

# 基於腳本位置定位項目根目錄
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_DIR"

# 顯式聲明關鍵環境變量
export PORT=5000

# 清理 5000 端口殘留進程（絕不碰 9000）
fuser -k 5000/tcp 2>/dev/null || true
sleep 1

# 使用 Python http.server 提供靜態文件服務
exec python3 -m http.server 5000 --bind 0.0.0.0
