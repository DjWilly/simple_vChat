const socket = io('http://localhost:4200')

////const socket = io()
////const fromSocket = document.getElementById('userId')
////const localVideo = document.getElementById('localVideo')
////const remoteVideo = document.getElementById('remoteVideo')
////const call = document.getElementById('call')
////const mute = document.getElementById('mute')
////const unMute = document.getElementById('unMute')
////const stop = document.getElementById('stop')
////const toSocket = document.getElementById('toSocket')
////let tracks = []
////const configuration = {iceServers : [{urls : ['stun:stun.l.google.com:19302']}]}
////let peer = new RTCPeerConnection(configuration)
////let fromSocketId, toSocketId
////console.log(configuration)

//////Get socket Id
////socket.on('connect', () => {
////    fromSocket.innerHTML = socket.id
////    fromSocketId = socket.id
////})

//////check if called socket open
////const socketCheck = () => {
    
////}

//////get Local Media
////const openMediaDevices = async() => {
////    try {
////        let stream = await navigator.mediaDevices.getUserMedia({video:true,audio:false})
////        localVideo.srcObject = stream
////        tracks = stream.getTracks()
////        return stream
////    } catch (error) {
////        console.log(error)
////    }
////}

//////Create Offer
////const createOffer = async() => {
////    try {
////        let stream = await  openMediaDevices()
////        stream.getTracks().forEach( track => peer.addTrack(track))
////        let offer = await peer.createOffer()
////        peer.setLocalDescription (new RTCSessionDescription(offer))
////        //Ice Candidate
////        peer.addEventListener('icecandidate', e => {
////            if (e.candidate){
////                console.log(e.candidate)
////                socket.emit('callerCandidate',{'candidate': e.candidate, "fromSocketId": fromSocketId, 'toSocketId': toSocketId})
////            }     
////        })
////        //send Offer to Server
////        toSocketId = toSocket.value
////        socket.emit('offer', {'offer': offer, "fromSocketId": fromSocketId, 'toSocketId': toSocketId})
////    } catch (error) {
////        console.log(error)
////    }
////}

//////create Answer
////const createAnswer = async(destination) => {
////    try {
////        let stream = await  openMediaDevices()
////        stream.getTracks().forEach( track => peer.addTrack(track))
////        let answer = await peer.createAnswer()
////        peer.setLocalDescription (new RTCSessionDescription(answer))
////        //Ice Candidate
////        peer.addEventListener('icecandidate', e => {
////            if (e.candidate){
////                console.log(e.candidate)
////                socket.emit('calleeCandidate',{'candidate': e.candidate, 'destination': destination})
////            }     
////        })
////        //Send Answer to Server
////        socket.emit('answer', {'answer': answer, 'destination': destination})

////    } catch (error) {
////        console.log(error)
////    } 
////}

//////Receive Offer
////socket.on('offer', data => {
////    peer.setRemoteDescription(data.offer)
////    let stream = new MediaStream()
////    createAnswer(data.fromSocketId)
////    peer.ontrack = e => {
////        stream.addTrack(e.track)
////        remoteVideo.srcObject = stream
////        console.log(e)
////    }
////})

//////Receive Answer
////socket.on('answer', data => {
////    peer.setRemoteDescription(data.answer)
////    let stream = new MediaStream()
////    peer.ontrack = e => {
////        stream.addTrack(e.track)
////        remoteVideo.srcObject = stream
////        console.log(e)
////    }
////})

//////Start a Call
////call.addEventListener('click',() => {
////    createOffer()
////    mute.addEventListener('click',muteTracks)
////    stop.addEventListener('click',stopTracks)
////})

//////Mute Tracks
////const muteTracks = () => {
////    tracks.forEach( track => track.enabled = false)
////    unMute.addEventListener('click',unMuteTracks)
////}

//////unMute Tracks
////const unMuteTracks = () => {
////    tracks.forEach( track => track.enabled = true)
////}

//////Stop Tracks
////const stopTracks = () => {
////    tracks.forEach( track => track.stop())
////}

//////caller Candidates
////socket.on('callerCandidate', data => {
////    peer.addIceCandidate(data)
////})

//////callee Candidates
////socket.on('calleeCandidate', data => {
////    peer.addIceCandidate(data)
////})
