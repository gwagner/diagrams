# Diagrams

This is a repo full of different diagrams to visualize technology concepts.

* [DevOps IaC Adoption Process](/packages/devops-iac-process)

## Usage

1. Create your new package using `npm init @motion-canvas@latest`
1. Change directories to your new package and run `npm install`
1. Build out whatever animation you would like
1. Inside of your package dir, run `npm start` and navigate to `http://localhost:9000` in your favorite web browser

## Rendering

1. Use all default rendering settings
1. Navigate to the root and run `./render-video.sh packages/<your_package_name>`
1. This will use ffmpeg to render a `packages/<your_package_name>/output/palette.png` and a `packages/<your_package_name/video.gif` file.
1. Finally, it will use MPV to display the rendered gif!
