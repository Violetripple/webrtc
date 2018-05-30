# WebRTC

## Table of Contents

- [Introduction](#introduction)
  - [Signaling](#signaling)
  - [STUN and TURN](#stun-and-turn)
  - [Security](#security)
- [WebRTC connectivity](#webrtc-connectivity)

----
</br>

## Introduction

WebRTC is a set of protocols which interact with one another.

[WebRTC](#https://webrtc.org/) is a free, open project that provides **browsers** and **mobile applications** with **Real-Time Communications (RTC**) capabilities via simple APIs, The WebRTC components have been optimized to best serve this purpose.

Mission: To enable rich, high-quality RTC applications to be developed for the **browser**, **mobile platforms**, and **IoT devices**, and allow them all to communicate via a common set of protocols.

**Protocols on top of which the WebRTC API is built**:

- ICE (Interactive Connectivity Establishment (ICE))
  - STUN
  - NAT
  - TURN
  - SDP

**Commonly used WebRTC JavaScript APIs**:

- [`getUserMedia()`](#https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) : capture audio and video.
- [`MediaRecorder`](#https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder) : record audio and video.
- [`RTCPeerConnection`](#https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection) : stream audio and video between users.
- [`RTCDataChannel`](#https://developer.mozilla.org/en-US/docs/Web/API/RTCDataChannel) : stream data between users.

**References**:

- [WebRTC project](#https://webrtc.org/)
- [Overview of WebRTC slides](#https://io13webrtc.appspot.com/#1)
- [WebRTC codelab](#https://codelabs.developers.google.com/codelabs/webrtc-web/#0)
- [Introduction to WebRTC protocols](#https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Protocols)

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

Fallback Diagram:

```bash
NAT & firewalls ----> STUN & TURN
```

</br>

### Security

Encryption is mandatory for all WebRTC components, and its JavaScript APIs can only be used from secure origins (HTTPS or localhost). _Signaling mechanisms aren't defined by WebRTC standards, so it's up to you make sure to use secure protocols_.

----
</br>

## WebRTC connectivity

Various WebRTC-related protocols interact with one another so that to create a connection and transfer data and/or media among peers.

</br>

### Offer/Answer and Signal Channel

Peer A who will be the initiator of the connection, will create an Offer. They will then send this offer to Peer B using the chosen signal channel. Peer B will receive the Offer from the signal channel and create an Answer. They will then send this back to Peer A along the signal channel.

Diagram:

```text
                         Handled by ICE
----------------------------------------------------------------------
|                    Offer: local description                         |
|                   -------------------------->                       |
| Peer A: Initiator    (through signal channel)    Peer B: Receiver   |
|                   <--------------------------                       |
|                    Answer: remote description                       |
----------------------------------------------------------------------
```

</br>

#### Session descriptions

**Session description**: The configuration of an endpoint on a WebRTC connection.

basic steps which must occur to exchange the offer and answer, leaving out the ICE layer for the moment:

1. The _caller_ calls `RTCPeerConnection.createOffer()` to create an _offer_.

2. The _caller_ calls `RTCPeerConnection.setLocalDescription()` to set that _offer_ as the _local description_ (that is, the description of the local end of the connection).

3. The _caller_ uses the signaling server to transmit the _offer_ to the intended receiver of the call.

4. The _recipient_ receives the _offer_ and calls `RTCPeerConnection.setRemoteDescription()` to record it as the _remote description_ (the description of the other end of the connection).

5. The _recipient_ does any setup it needs to do for its end of the call, including adding outgoing streams to the connection.

6. The _recipient_ then creates an _answer_ by calling `RTCPeerConnection.createAnswer()`.

7. The _recipient_ calls `RTCPeerConnection.setLocalDescription()` to set the _answer_ as its _local description_. The _recipient_ now knows the **configuration of both ends of the connection**.

8. The _recipient_ uses the signaling server to send the _answer_ to _the caller_.

9. The _caller_ receives the _answer_.

10. The _caller_ calls `RTCPeerConnection.setRemoteDescription()` to set the _answer_ as the _remote description_ for its end of the call. It now knows the **configuration of both peers**. Media begins to flow as configured.

Diagram:

```text
RTCPeerConnection.createOffer(): Create Offer
RTCPeerConnection.setLocalDescription(): Set Offer as local description

....................transmit..................

RTCPeerConnection.setRemoteDescription(): Record as remote description
setup (adding outgoing streams)......
RTCPeerConnection.createAnswer(): Create Answer
RTCPeerConnection.setLocalDescription(): Set answer as local description
...................send answer

```