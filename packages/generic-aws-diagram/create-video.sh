rm -f ./devops-flow.mp4

ffmpeg -framerate 60 -i output/project/%06d.png -c:a copy -shortest -c:v libx264 -pix_fmt yuv420p ./devops-flow.mp4