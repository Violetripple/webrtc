'use strict';

// The constraints argument allows you to specify what media to get.
// In this example, video only, since audio is disabled by default.
const constraints = {
  video: true
};

const video = document.querySelector('video');

// Using a media element via the srcObject attribute
// If getUserMedia() is successful, the video stream from the webcam is set as the source of the video element.
const handleSuccess = stream => {
  video.srcObject = stream;
  console.log(stream);
  
};

const handleError = error => {
  console.error(`getUserMedia error: ${error}`);
};

// Following the getUserMedia() call, the browser requests permission from the user to access their camera.
// (if this is the first time camera access has been requested for the current origin).
// a MediaStream is returned, which can be used by a media element via the srcObject attribute.
navigator.mediaDevices
  .getUserMedia(constraints)
  .then(handleSuccess)
  .catch(handleError);
