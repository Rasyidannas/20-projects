const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let ready = false
let imagesLoaded = 0
let totalImages = 0
let photosArray = []

//Unsplash API
let count = 10
const apiKey = '4mfjFLMh2kJ4AEtjDuN0NF38uJHOfOsoYSJK5pLdIpE'
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`

//check if all images were loaded
function imageLoaded(){
    // console.log('image loaded');
    imagesLoaded++
    console.log(imagesLoaded);
    if(imagesLoaded === totalImages){
        ready = true
        loader.hidden = true
        count = 30 //this is for redisgn count in apiUrl
        // console.log('ready =', ready);
    }
}

//Helper function to set attibutes on DOM Elements
function setAttribute(element, attributes) {
    for(const key in attributes){//this will be loop a object
        element.setAttribute(key, attributes[key])
    }
}

//Create Elements for Links & Photos, Add to DOM
function displayPhotos (){
    imagesLoaded = 0
    totalImages = photosArray.length
    // console.log('total images', totalImages);

    //run function for each object in photosArray and add photo in HTMl
    photosArray.forEach((photo)=>{
        //Create <a> to Link to Unsplash
        const item = document.createElement('a')
        // item.setAttribute('href', photo.links.html)
        // item.setAttribute('target', '_blank')
        
        //this is using function and same with above
        setAttribute(item,{
            href:photo.links.html,
            target: '_blank'
        })
        //Create <img> for photo
        const img = document.createElement('img')

        // img.setAttribute('src', photo.urls.regular)
        // img.setAttribute('alt', photo.alt_description)
        // img.setAttribute('title', photo.alt_description)

        //this is using function and same with above
        setAttribute(img,{
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })

        //eventListener, check when each is finished loading
        img.addEventListener('load', imageLoaded)

        //Put <img> inside <a>, then put both inside imageContainer element
        item.appendChild(img)
        imageContainer.appendChild(item)
    })
}

//get photots from unsplash API
async function getPhotos(){
    try{
        const response = await fetch(apiUrl)
        photosArray = await response.json()
        displayPhotos()
        // console.log(photosArray);
    }catch{
        //catch Error here
    }
}

//Check it see if scrolling near bottom of page, Load more photos
window.addEventListener('scroll', ()=>{
    // console.log('Scrolled');
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        // console.log('load more')
        ready = false
        getPhotos()
    }
})

//On Load
getPhotos()