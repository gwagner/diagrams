import {makeProject} from '@motion-canvas/core';
//import rtmp_video_streaming from './scenes/rtmp-video-streaming?scene';
import handshake from './scenes/handshake?scene';
import start from './scenes/start?scene';

export default makeProject({
  scenes: [
    //rtmp_video_streaming, 
    handshake, 
    start
  ],
});
