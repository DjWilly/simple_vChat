const socket = io('http://localhost:4200')
const fromSocket = document.getElementById('userId')
const localVideo = document.getElementById('localVideo')
const remoteVideo = document.getElementById('remoteVideo')
const call = document.getElementById('call')
const stop = document.getElementById('stop')
const mute = document.getElementById('mute')
const unMute = document.getElementById('unMute')
const toSocket = document.getElementById('toSocket')
let tracks = []
const configuration ={iceServers:[{urls:['stun:stun.l.google.com:19302']}]}
let peer = new RTCPeerConnection(configuration)
let fromSocketId, toSocketId

//get socket id
socket.on('connect', () => {
    fromSocket.innerHTML = socket.id
    fromSocketId = socket.id
})

//get local media
const openMediaDevices = async () => {
    try {
        let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        localVideo.srcObject = stream
        tracks = stream.getTracks()
        return stream
    }
    catch (error) {
        console.log(error)
    }
}

//create offer
const createOffer = async () => {
    try {
        let stream = await openMediaDevices()
        stream.getTracks().forEach(track => peer.addTrack(track))
        let offer = await peer.createOffer()
        peer.setLocalDescription(new RTCSessionDescription(offer))
        //Ice candidate
        peer.addEventListener('icecandidate', e => {
            if (e.candidate) {
                console.log(e.candidate)
                socket.emit('callerCandidate', { 'candidate': e.candidate, 'fromSocketId': fromSocketId, 'toSocketId': toSocketId })
            }
           
        })

        ///console.log(peer, offer.sdp)
        //send offer to the server
        toSocketId = toSocket.value
        socket.emit('offer', { 'offer': offer, 'fromSocketId': fromSocketId, 'toSocketId': toSocketId})
    }
    catch (error) {
        console.log(error)
    }
}

//recieve offer
socket.on('offer', data => {
    peer.setRemoteDescription(data.offer)
    let stream = new MediaStream()
    createAnswer(data.fromSocketId)
    peer.ontrack = e => {
        stream.addTrack(e.track)
        remoteVideo.srcObject = stream
    }
})

//recieve answer
socket.on('answer', data => {
    peer.setRemoteDescription(data.answer)
    let stream = new MediaStream()
    peer.ontrack = e => {
        stream.addTrack(e.track)
        remoteVideo.srcObject = stream
    }
})

//create answer
const createAnswer = async (destination) => {
    try {
        let stream = await openMediaDevices()
        stream.getTracks().forEach(track => peer.addTrack(track))
        let answer = await peer.createAnswer()
        peer.setLocalDescription(new RTCSessionDescription(answer))
        //Ice candidate
        peer.addEventListener('icecandidate', e => {
            if (e.candidate) {
                console.log(e.candidate)
                socket.emit('calleeCandidate', { 'candidate': e.candidate, 'destination': destination})
            }

        })
        //send answer to server
        socket.emit('answer', {'answer': answer, 'destination': destination})
    }
    catch (error) {
        console.log(error)
    }
}

const muteTracks = () => {
    tracks.forEach(track => track.enabled = false)
    unMute.addEventListener('click', unMuteTracks)
}

const unMuteTracks = () => {
    tracks.forEach(track => track.enabled = true)
}

const stopTracks = () => {
    tracks.forEach(track => track.stop())
}

//start the call
call.addEventListener('click', () => {
    createOffer()
    mute.addEventListener('click', muteTracks)
    stop.addEventListener('click', stopTracks)
})

//caller candidate
socket.on('callerCandidate', data => {
    peer.addIceCandidate(data)
})

//callee candidate
socket.on('calleeCandidate', data => {
    peer.addIceCandidate(data)
})

//using constructor for the mediastream object
//let stream1 = new MediaStream()
//console.log('stream1', stream1)
//setTimeout(() => console.log('stream1 tracks', stream1.getTracks()), 2000)

//using MediaDevices
//navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//    .then(stream => {
//        console.log('stream2', stream)
//        let tracks = stream.getTracks()
//        tracks.forEach(track => stream1.addTrack(track))

//        let stream3 = stream.clone()
//        console.log('stream3', stream3)

//        console.log('all tracks', tracks)
//        let videoTracks = stream.getVideoTracks()
//        console.log('Video tracks', videoTracks)
//        let audioTracks = stream.getAudioTracks()
//        console.log('Audio Tracks', audioTracks)
//    })





//const socket = io()
//const fromSocket = document.getElementById('userId')
//const localVideo = document.getElementById('localVideo')
//const remoteVideo = document.getElementById('remoteVideo')
//const call = document.getElementById('call')
//const mute = document.getElementById('mute')
//const unMute = document.getElementById('unMute')
//const stop = document.getElementById('stop')
//const toSocket = document.getElementById('toSocket')
//let tracks = []
//const configuration = {iceServers : [{urls : ['stun:stun.l.google.com:19302']}]}
//let peer = new RTCPeerConnection(configuration)
//let fromSocketId, toSocketId
//console.log(configuration)

////Get socket Id
//socket.on('connect', () => {
//    fromSocket.innerHTML = socket.id
//    fromSocketId = socket.id
//})

////check if called socket open
//const socketCheck = () => {
    
//}

////get Local Media
//const openMediaDevices = async() => {
//    try {
//        let stream = await navigator.mediaDevices.getUserMedia({video:true,audio:false})
//        localVideo.srcObject = stream
//        tracks = stream.getTracks()
//        return stream
//    } catch (error) {
//        console.log(error)
//    }
//}

////Create Offer
//const createOffer = async() => {
//    try {
//        let stream = await  openMediaDevices()
//        stream.getTracks().forEach( track => peer.addTrack(track))
//        let offer = await peer.createOffer()
//        peer.setLocalDescription (new RTCSessionDescription(offer))
//        //Ice Candidate
//        peer.addEventListener('icecandidate', e => {
//            if (e.candidate){
//                console.log(e.candidate)
//                socket.emit('callerCandidate',{'candidate': e.candidate, "fromSocketId": fromSocketId, 'toSocketId': toSocketId})
//            }     
//        })
//        //send Offer to Server
//        toSocketId = toSocket.value
//        socket.emit('offer', {'offer': offer, "fromSocketId": fromSocketId, 'toSocketId': toSocketId})
//    } catch (error) {
//        console.log(error)
//    }
//}

////create Answer
//const createAnswer = async(destination) => {
//    try {
//        let stream = await  openMediaDevices()
//        stream.getTracks().forEach( track => peer.addTrack(track))
//        let answer = await peer.createAnswer()
//        peer.setLocalDescription (new RTCSessionDescription(answer))
//        //Ice Candidate
//        peer.addEventListener('icecandidate', e => {
//            if (e.candidate){
//                console.log(e.candidate)
//                socket.emit('calleeCandidate',{'candidate': e.candidate, 'destination': destination})
//            }     
//        })
//        //Send Answer to Server
//        socket.emit('answer', {'answer': answer, 'destination': destination})

//    } catch (error) {
//        console.log(error)
//    } 
//}

////Receive Offer
//socket.on('offer', data => {
//    peer.setRemoteDescription(data.offer)
//    let stream = new MediaStream()
//    createAnswer(data.fromSocketId)
//    peer.ontrack = e => {
//        stream.addTrack(e.track)
//        remoteVideo.srcObject = stream
//        console.log(e)
//    }
//})

////Receive Answer
//socket.on('answer', data => {
//    peer.setRemoteDescription(data.answer)
//    let stream = new MediaStream()
//    peer.ontrack = e => {
//        stream.addTrack(e.track)
//        remoteVideo.srcObject = stream
//        console.log(e)
//    }
//})

////Start a Call
//call.addEventListener('click',() => {
//    createOffer()
//    mute.addEventListener('click',muteTracks)
//    stop.addEventListener('click',stopTracks)
//})

////Mute Tracks
//const muteTracks = () => {
//    tracks.forEach( track => track.enabled = false)
//    unMute.addEventListener('click',unMuteTracks)
//}

////unMute Tracks
//const unMuteTracks = () => {
//    tracks.forEach( track => track.enabled = true)
//}

////Stop Tracks
//const stopTracks = () => {
//    tracks.forEach( track => track.stop())
//}

////caller Candidates
//socket.on('callerCandidate', data => {
//    peer.addIceCandidate(data)
//})

////callee Candidates
//socket.on('calleeCandidate', data => {
//    peer.addIceCandidate(data)
//})