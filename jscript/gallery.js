function Gallery(title, description, pageThumbnail, thumbnailAlt, images) {
    this.title = title;
    this.description = description;
    this.thumbnail = pageThumbnail;
    this.thumbnailAlt = thumbnailAlt;
    this.images = images;
}

let galleries = [
    new Gallery("Entrance", null, 'images/proj-01.webp', null, [
        'gallery/proj-01/entrance-01.jpg',
        'gallery/proj-01/entrance-02.jpg',
        'gallery/proj-01/entrance-03.jpg',
    ]),
    new Gallery("Kitchen", null, 'images/proj-02.webp', "New Kitchen", [
        'gallery/proj-02/kitchen-01.jpg',
        'gallery/proj-02/kitchen-02.jpg',
        'gallery/proj-02/kitchen-03.jpg',
        'gallery/proj-02/kitchen-04.jpg',
        'gallery/proj-02/kitchen-05.jpg',
        'gallery/proj-02/kitchen-06.jpg',
    ]),
    new Gallery(null, "Some text to explain the lof conversion.", 'images/proj-03.webp', "Loft Conversion", [
        'gallery/proj-03/loft-01.jpg',
        'gallery/proj-03/loft-02.jpg',
        'gallery/proj-03/loft-03.jpg',
        'gallery/proj-03/loft-04.jpg',
        'gallery/proj-03/loft-05.jpg',
        'gallery/proj-03/loft-06.jpg',
        'gallery/proj-03/loft-07.jpg',
    ]),
    new Gallery(null, null, 'images/proj-04.webp', null, [
        'gallery/proj-04/outside-render-01.jpg',
        'gallery/proj-04/outside-render-02.jpg',
    ]),
    new Gallery(null, null, 'images/proj-05.webp', null, [
        'gallery/proj-05/entrance-chimney-01.jpg',
        'gallery/proj-05/entrance-chimney-02.jpg',
        'gallery/proj-05/entrance-chimney-03.jpg',
        'gallery/proj-05/entrance-chimney-04.jpg',
        'gallery/proj-05/entrance-chimney-05.jpg',
    ]),
    new Gallery(null, null, 'images/proj-06.webp', "Gym Building construction project", [
        'gallery/proj-06/gym-render-01.jpg',
        'gallery/proj-06/gym-render-02.jpg',
        'gallery/proj-06/gym-render-03.jpg',
        'gallery/proj-06/gym-render-04.jpg',
        'gallery/proj-06/gym-render-05.jpg',
        'gallery/proj-06/gym-render-06.jpg',
        'gallery/proj-06/gym-render-07.jpg',
        'gallery/proj-06/gym-render-08.jpg',
        'gallery/proj-06/gym-render-09.jpg',
    ]),
    new Gallery(null, null, 'images/proj-07.webp', null, [
        'gallery/proj-07/pond-patio-01.jpg',
        'gallery/proj-07/pond-patio-02.jpg',
        'gallery/proj-07/pond-patio-03.jpg',
        'gallery/proj-07/pond-patio-04.jpg',
        'gallery/proj-07/pond-patio-05.jpg',
        'gallery/proj-07/pond-patio-06.jpg',
        'gallery/proj-07/pond-patio-07.jpg',
        'gallery/proj-07/pond-patio-08.jpg',
    ]),
    new Gallery(null, null, 'images/proj-08.webp', "Patio and pool construction project", [
        'gallery/proj-08/pool-patio-01.jpg',
        'gallery/proj-08/pool-patio-02.jpg',
        'gallery/proj-08/pool-patio-03.jpg',
        'gallery/proj-08/pool-patio-04.jpg',
        'gallery/proj-08/pool-patio-05.jpg',
        'gallery/proj-08/pool-patio-06.jpg',
        'gallery/proj-08/pool-patio-07.jpg',
        'gallery/proj-08/pool-patio-08.jpg',
        'gallery/proj-08/pool-patio-09.jpg',
        'gallery/proj-08/pool-patio-10.jpg',
        'gallery/proj-08/pool-patio-11.jpg',
        'gallery/proj-08/pool-patio-12.jpg',
        'gallery/proj-08/pool-patio-13.jpg',
    ]),
    new Gallery(null, null, 'images/proj-09.webp', null, [
        'gallery/proj-09/mural-entertainment-01.jpg',
        'gallery/proj-09/mural-entertainment-02.jpg',
        'gallery/proj-09/mural-entertainment-03.jpg',
        'gallery/proj-09/mural-entertainment-04.jpg',
        'gallery/proj-09/mural-entertainment-05.jpg',
        'gallery/proj-09/mural-entertainment-06.jpg',
        'gallery/proj-09/mural-entertainment-07.jpg',
        'gallery/proj-09/mural-entertainment-08.jpg',
        'gallery/proj-09/mural-entertainment-09.jpg',
        'gallery/proj-09/mural-entertainment-10.jpg',
        'gallery/proj-09/mural-entertainment-11.jpg',
        'gallery/proj-09/mural-entertainment-12.jpg',
    ]),
    new Gallery(null, null, 'images/proj-10.webp', "New Staircase", [
        'gallery/proj-10/stairs-01.jpg',
        'gallery/proj-10/stairs-02.jpg',
        'gallery/proj-10/stairs-03.jpg',
        'gallery/proj-10/stairs-04.jpg',
    ]),
];


let scr = {
    disableGalleryNextPrev: false,
    init: function() {
        document.addEventListener('keydown', function(event) {
            scr.disableGalleryNextPrev = false;
            if(event.key === 'Escape') { scr.hideGallery(); }
        })
        document.getElementById("closeGallery").addEventListener("click", function() {
            scr.disableGalleryNextPrev = false;
            scr.hideGallery();
        })
        document.getElementById("next").addEventListener("click", function(element) {
            if (!scr.disableGalleryNextPrev) {
                scr.disableGalleryNextPrev = true;
                scr.findNextImage(true);
            }
        })
        document.getElementById("previous").addEventListener("click", function(element) {
            if (!scr.disableGalleryNextPrev) {
                scr.disableGalleryNextPrev = true;
                scr.findNextImage(false);
            }
        })
        this.createGalleryThumbnails();
        this.galleryInitialiser();
    },
    createGalleryThumbnails: function() {
        let container = document.getElementById("gallery");

        Array.from(galleries).forEach(function(item, index, array) {
            let thumbImage = document.createElement('img')
            thumbImage.src = item.thumbnail;
            if(item.thumbnailAlt != null) {
                thumbImage.setAttribute("alt", item.thumbnailAlt);
            } else {
                thumbImage.setAttribute("alt", "Building Project");
            }
            thumbImage.setAttribute("width", "284px");
            thumbImage.setAttribute("height", "152px");
            thumbImage.setAttribute('draggable', false)
            thumbImage.addEventListener('click', function(element) {
                scr.showGallery(index)
            })
            container.appendChild(thumbImage)
        })
    },
    galleryInitialiser: function() {
        let modalContainer = document.getElementById('modal')
        let divElement = document.createElement("div")
        divElement.addEventListener('click', function() {
            scr.hideGallery();
        })
        divElement.classList.add("close-container");
        modalContainer.appendChild(divElement);
    },
    showGallery: function(whichGallery) {
        document.querySelector('body').classList.toggle("gallery-open");
        let ele = document.getElementById("modal");
        ele.style.opacity = 0;
        ele.style.display = "grid";
        ele.dataset.gallery = whichGallery;
        ele.dataset.indexCount = 0;

        // Creates the link to the image source
        let sourceLink = document.createElement('a');
        sourceLink.href = galleries[whichGallery].images[0];
        sourceLink.textContent = "Open in new Window";
        sourceLink.target = "_blank";
        sourceLink.classList.add("open-image-window")
        sourceLink.id = "openLink";

        document.getElementById("galleryImageContainer").appendChild(sourceLink)

        // Update content details or hide them depedning on the availble information.
        if( galleries[whichGallery].description == null && galleries[whichGallery].title == null ) {
            document.getElementById("modal").classList.add("hide-details");
        } else {
            let title = document.querySelectorAll(".image-description .header")[0];
            if(galleries[whichGallery].title != null) {
                title.innerHTML = galleries[whichGallery].title;
            } else {
                document.getElementById("modal").classList.add("hide-title");
            }

            let description = document.querySelectorAll(".image-description p")[0];

            if(galleries[whichGallery].description != null) {
                description.innerHTML = galleries[whichGallery].description;
            } else {
                document.getElementById("modal").classList.add("hide-description");
            }
        }

        (function fade() {
            let opa = parseFloat(ele.style.opacity);
            let opaNext = opa += .04;
            if (opaNext <= 1) {
                ele.style.opacity = opaNext;
                requestAnimationFrame(fade)
            }
        })()

        scr.loadImage(galleries[whichGallery].images[0])
    },
    hideGallery: function() {
        let ele = document.getElementById("modal");
        (function fade() {
            let opa = parseFloat(ele.style.opacity);
            let opaNext = opa -= .04;
            if (opaNext >= 0) {
                ele.style.opacity = opaNext;
                requestAnimationFrame(fade)
            } else {
                ele.removeAttribute("style")
                document.getElementById("galleryImage").remove();
                document.getElementById("modal").removeAttribute("class")
                document.querySelector('body').classList.toggle("gallery-open");
                document.getElementById("openLink").remove();
            }
        })()
    },
    findNextImage: function(nextImage) {
        let galleryDetails = document.getElementById("modal")
        const whatGallery = galleryDetails.dataset.gallery;
        const currentImageIndex = galleryDetails.dataset.indexCount;
        const howManyImages = galleries[whatGallery].images.length;

        let newImage;

        if (nextImage) {
            newImage = parseInt(currentImageIndex) + 1;
            
            if(newImage <= (howManyImages - 1)) {
                galleryDetails.dataset.indexCount = newImage;
            } else {
                galleryDetails.dataset.indexCount = 0;
                newImage = 0;
            }
        } else {
            newImage = parseInt(currentImageIndex) - 1;
            
            if(newImage >= 0) {
                galleryDetails.dataset.indexCount = newImage;
            } else {
                galleryDetails.dataset.indexCount = howManyImages - 1;
                newImage = howManyImages - 1;
            }
        }

        this.fadeImageOut(galleries[whatGallery].images[newImage])
    },
    fadeImageOut: function(imageSource) {
        let ele = document.getElementById("galleryImage");
        (function fade() {
            let opa = parseFloat(ele.style.opacity);
            let opaNext = opa -= .04;
            if (opaNext >= 0) {
                ele.style.opacity = opaNext;
                requestAnimationFrame(fade)
            } else {
                ele.remove();
                scr.loadImage(imageSource)
            }
        })()
    },
    loadImage: function(imageSource) {
        let image = document.createElement('img')
        image.id = "galleryImage";
        image.style.zIndex = 2;
        image.style.opacity = 0;
        image.src = imageSource;
        
        image
        .decode()
        .then(() => {
            document.getElementById("galleryImageContainer").appendChild(image);
            loadedImage = document.getElementById('galleryImage');
            document.getElementById("openLink").href = imageSource;

            (function fade() {
                let opa = parseFloat(loadedImage.style.opacity);
                let opaNext = opa += .04;
                if (opaNext <= 1) {
                    loadedImage.style.opacity = opaNext;
                    requestAnimationFrame(fade)
                } else {
                    scr.disableGalleryNextPrev = false;
                }
            })()
        })
        .catch(encodingError => console.error(encodingError));
    }
}