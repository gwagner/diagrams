ffmpeg -i output/project/000%3d.png -vf palettegen palette.png
ffmpeg -i output/project/000%3d.png -i palette.png -lavfi paletteuse -loop 0 video.gif
