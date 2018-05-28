const constraints = { video: true };

function successCallback(stream) {
  const video = document.querySelector('video');
  video.src = window.URL.createObjectURL(stream);
}

function errorCallback(error) {
  console.log(`navigator.getUserMedia error: ${error}`);
}

navigator.getUserMedia(constraints, successCallback, errorCallback);

// ---------------------------------------------------------------------------------

// Success callback when requesting audio input stream
function gotStream(stream) {
  const audioContext = new webkitAudioContext();

  // Create an AudioNode from the stream
  const mediaStreamSource = audioContext.createMediaStreamSource(stream);

  // Connect it to the destination or any other node for processing!
  mediaStreamSource.connect(audioContext.destination);
}

navigator.getUserMedia({ audio: true }, gotStream);

// ---------------------------------------------------------------------------------

// gUM screencapture
const constraints = {
  video: {
    mandatory: {
      chromeMediaSource: 'screen'
    }
  }
};

navigator.getUserMedia(constraints, gotStream);