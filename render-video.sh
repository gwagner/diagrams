#!/bin/bash

ALLOWED_BASE="$(dirname $(realpath "${BASH_SOURCE[0]}"))"

# 1. Get the first argument
input="$1"

if [[ -z "$input" ]]; then
  echo "No argument provided."
  exit 1
fi

# 2. Validate that the argument only contains specific characters
if [[ "$input" =~ [^a-zA-Z0-9._/\-] ]]; then
  echo "Error: Argument contains invalid characters."
  exit 1
fi

# 3. Resolve the path to an absolute path
real_input="$(realpath "$input" 2>/dev/null)"

# 4. Check if realpath succeeded (if input doesn't exist, realpath may fail)
if [[ -z "$real_input" ]]; then
  echo "Error: Could not resolve the path. It might not exist."
  exit 1
fi

# 5. Check if the resolved path is inside the allowed base directory
#    `real_input` must start with `ALLOWED_BASE` (e.g. "/home/projects")
if [[ "$real_input" != "$ALLOWED_BASE"* ]]; then
  echo "Error: Path '$real_input' is outside the allowed directory ($ALLOWED_BASE)."
  exit 1
fi

if ! ls $real_input/output/project/*.png 1> /dev/null 2>&1; then
    echo "No PNG files exist in $real_input/output/project/*.png.  You must render in Motion Canvas first"
    exit 1
fi

ffmpeg -y -i $real_input/output/project/%6d.png -vf palettegen $real_input/output/palette.png
ffmpeg -y -i $real_input/output/project/%6d.png -i $real_input/output/palette.png -lavfi paletteuse -loop 0 $real_input/video.gif

## Cleanup previous render
rm -f $real_input/output/project/*.png

## Play the vid
mpv $real_input/video.gif
