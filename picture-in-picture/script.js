const videoElement = document.getElementById('video')
const button = document.getElementById('button')

//Prompt to select media stream, pass to video element, then play
async function selectMediaStream(){
    try{
        const mediaStream = await navigator.mediaDevices.getDisplayMedia()
        videoElement.srcObject = mediaStream
        //this when video element loaded
        videoElement.onloadedmetadata=()=>{
            //this is for play
            videoElement.play()
        }
    }catch(error){
        //catch error here
        console.log('Whoops, error here:', error);
    }
}

button.addEventListener('click', async()=>{
    //Disable Button
    button.disabled = true
    // start picture in picture
    await videoElement.requestPictureInPicture()
    //Reset Button
    button.disabled = false
})

//on load
selectMediaStream()