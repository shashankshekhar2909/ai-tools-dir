#!/bin/sh
set -eu

COMPOSE_FILE="${COMPOSE_FILE:-docker-compose.prod.yml}"
RUNTIME_DIR="${RUNTIME_DIR:-.runtime}"
SLOT_FILE="$RUNTIME_DIR/active-slot"

mkdir -p "$RUNTIME_DIR"

current_slot="blue"
if [ -f "$SLOT_FILE" ]; then
  candidate="$(tr -d '[:space:]' < "$SLOT_FILE" || true)"
  if [ "$candidate" = "green" ]; then
    current_slot="green"
  fi
fi

if [ "$current_slot" = "blue" ]; then
  next_slot="green"
  next_service="app-green"
  compose_args="--profile green"
else
  next_slot="blue"
  next_service="app-blue"
  compose_args=""
fi

echo "Current slot: $current_slot"
echo "Deploying: $next_slot"

if [ "$next_slot" = "green" ]; then
  docker compose -f "$COMPOSE_FILE" $compose_args up -d --build --no-deps "$next_service"
else
  docker compose -f "$COMPOSE_FILE" up -d --build --no-deps "$next_service"
fi

echo "Waiting for $next_service to pass health checks..."
for _ in $(seq 1 60); do
  if docker compose -f "$COMPOSE_FILE" $compose_args exec -T "$next_service" node -e "fetch('http://127.0.0.1:3000/api/health').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"; then
    printf '%s\n' "$next_slot" > "$SLOT_FILE"
    echo "Cutover complete. Active slot is now $next_slot"
    exit 0
  fi
  sleep 2
done

echo "Deployment timed out waiting for $next_service health."
exit 1
