const pc = new RTCPeerConnection(servers, {
  optional: [{RtpDataChannels: true}]
});

pc.ondatachannel = function (event) {
  receiveChannel.onmessage = function (event) {
    document.querySelector('div#receive').innerHTML = event.data;
  };
}

sendChannel = pc.createDataChannel('sendDataChannel', {reliable: false});

document.querySelector('button#send').onclick = function () {
  const data = document.querySelector('textarea#send').value;
  sendChannel.send(data);
}