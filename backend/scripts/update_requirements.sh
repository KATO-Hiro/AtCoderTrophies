uv export --format requirements-txt --no-hashes \
  | awk -F';' '{print $1}' \
  | sed 's/[[:space:]]*$//' \
  | grep -E '^[A-Za-z0-9_.-]+==[^=]+' \
  > requirements.txt
