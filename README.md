# WebRTC

## Table of Contents

- [Introduction](#introduction)
  - [Signaling](#signaling)
  - [STUN and TURN](#stun-and-turn)
  - [Security](#security)

----
</br>

## Introduction

[WebRTC](#https://webrtc.org/) is a free, open project that provides **browsers** and **mobile applications** with **Real-Time Communications (RTC**) capabilities via simple APIs, The WebRTC components have been optimized to best serve this purpose.

Mission: To enable rich, high-quality RTC applications to be developed for the **browser**, **mobile platforms**, and **IoT devices**, and allow them all to communicate via a common set of protocols.

**Commonly used WebRTC JavaScript APIs**:

- [`getUserMedia()`](#https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) : capture audio and video.
- [`MediaRecorder`](#https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder) : record audio and video.
- [`RTCPeerConnection`](#https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection) : stream audio and video between users.
- [`RTCDataChannel`](#https://developer.mozilla.org/en-US/docs/Web/API/RTCDataChannel) : stream data between users.

**References**:

- [WebRTC project](#https://webrtc.org/)
- [Overview of WebRTC slides](#https://io13webrtc.appspot.com/#1)
- [WebRTC codelab](#https://codelabs.developers.google.com/codelabs/webrtc-web/#0)

</br>

### Signaling

WebRTC uses **RTCPeerConnection** to communicate streaming data between browsers, but also needs a mechanism to coordinate communication and to send control messages, a process known as **signaling**. Signaling methods and protocols are not specified by WebRTC. [Socket.IO](#https://socket.io/) is one way, but there are many alternatives.

**References**:

- [WebRTC-Experiment](#https://github.com/muaz-khan/WebRTC-Experiment/blob/master/Signaling.md)

</br>

### STUN and TURN

WebRTC is designed to work peer-to-peer, so users can connect by the most direct route possible. However, WebRTC is built to cope with real-world networking: client applications need to traverse NAT gateways and firewalls, and peer to peer networking needs fallbacks in case direct connection fails. As part of this process, the WebRTC APIs use **STUN servers** to _get the IP address of your computer_, and **TURN servers** to function as _relay servers_ in case peer-to-peer communication fails.

STUN:

- Tell me what my public IP address is
- Simple server, cheap to run
- Data flows peer-to-peer

TURN:

- Provide a cloud fallback if peer-to-peer communication fails
- Data is sent through server, uses server bandwidth
- Ensures the call works in almost all environments

Fallback Diagram: `NAT & firewalls ==> STUN & TURN`

</br>

### Security

Encryption is mandatory for all WebRTC components, and its JavaScript APIs can only be used from secure origins (HTTPS or localhost). _Signaling mechanisms aren't defined by WebRTC standards, so it's up to you make sure to use secure protocols_.

