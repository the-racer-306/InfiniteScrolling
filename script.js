const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API

const count = 30;
const apiKey = "w3UyHykC2oJdXJx68kt2cP0vLWhJB1Qg5_1LoC68rNU";
const CapiKey = "jFgS8tteGD425f4oZfygQVaVnD6gt6GucN2yyz3xFek";
// const secretKey = "t7TaZEpIrCXILD9KdzOvC8VVG5-x9DLj4o9KvGd6O7w";
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${CapiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;

  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

//  Helper funtion to set attributes on Dom Elements

function SetAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Element For Links & Photos, Add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;

  // Run function for each object in photosArray
  photosArray.forEach((p) => {
    // Create <a> to link to unsplash;
    const item = document.createElement("a");
    SetAttributes(item, {
      href: p.links.html,
      target: "_blank",
    });

    // create <img> for photo
    const img = document.createElement("img");
    SetAttributes(img, {
      src: p.urls.regular,
      alt: p.description,
      title: p.description,
    });
    //  Event Listener, check when each is finished loading
    img.addEventListener("load", imageLoaded);
    // put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos form unsplash api
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    // catch error here
  }
}

// Check to see if scrolling near bottom of pages and load more photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// On Load
getPhotos();
