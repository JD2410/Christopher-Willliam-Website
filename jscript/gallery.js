function Gallery(title, description, pageThumbnail, images) {
    this.title = title;
    this.description = description;
    this.thumbnail = pageThumbnail;
    this.images = images;
}

let galleries = [
    new Gallery(null, null, 'images/proj-01.png', [
        'gallery/proj-01/entrance-01.jpg',
        'gallery/proj-01/entrance-02.jpg',
        'gallery/proj-01/entrance-03.jpg',
    ]),
    new Gallery(null, null, 'images/proj-02.png', [
        'gallery/proj-02/kitchen-01.jpg',
        'gallery/proj-02/kitchen-02.jpg',
        'gallery/proj-02/kitchen-03.jpg',
        'gallery/proj-02/kitchen-04.jpg',
        'gallery/proj-02/kitchen-05.jpg',
        'gallery/proj-02/kitchen-06.jpg',
    ]),
    new Gallery(null, null, 'images/proj-03.png', [
        'gallery/proj-03/loft-01.jpg',
        'gallery/proj-03/loft-02.jpg',
        'gallery/proj-03/loft-03.jpg',
        'gallery/proj-03/loft-04.jpg',
        'gallery/proj-03/loft-05.jpg',
        'gallery/proj-03/loft-06.jpg',
        'gallery/proj-03/loft-07.jpg',
    ]),
    new Gallery(null, null, 'images/proj-04.png', [
        'gallery/proj-04/outside-render-01.jpg',
        'gallery/proj-04/outside-render-02.jpg',
    ]),
    new Gallery(null, null, 'images/proj-05.png', [
        'gallery/proj-05/entrance-chimney-01.jpg',
        'gallery/proj-05/entrance-chimney-02.jpg',
        'gallery/proj-05/entrance-chimney-03.jpg',
        'gallery/proj-05/entrance-chimney-04.jpg',
        'gallery/proj-05/entrance-chimney-05.jpg',
    ]),
    new Gallery(null, null, 'images/proj-06.png', [
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
    new Gallery(null, null, 'images/proj-07.png', [
        'gallery/proj-07/pond-patio-01.jpg',
        'gallery/proj-07/pond-patio-02.jpg',
        'gallery/proj-07/pond-patio-03.jpg',
        'gallery/proj-07/pond-patio-04.jpg',
        'gallery/proj-07/pond-patio-05.jpg',
        'gallery/proj-07/pond-patio-06.jpg',
        'gallery/proj-07/pond-patio-07.jpg',
        'gallery/proj-07/pond-patio-08.jpg',
    ]),
    new Gallery(null, null, 'images/proj-08.png', [
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
    new Gallery(null, null, 'images/proj-09.png', [
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
    new Gallery(null, null, 'images/proj-10.png', [
        'gallery/proj-10/stairs-01.jpg',
        'gallery/proj-10/stairs-02.jpg',
        'gallery/proj-10/stairs-03.jpg',
        'gallery/proj-10/stairs-04.jpg',
    ]),
];


let scr = {
    init: function() {
        document.addEventListener('keydown', function(event) {
            if(event.key === 'Escape') { scr.hideGallery(); }
        })
        document.getElementById("closeGallery").addEventListener("click", function() {
            scr.hideGallery();
        })
        document.getElementById("next").addEventListener("click", function() {
            scr.findNextImage(true);
        })
        document.getElementById("previous").addEventListener("click", function() {
            scr.findNextImage(false);
        })
        this.createGalleryThumbnails()
    },
    createGalleryThumbnails: function() {
        let container = document.getElementById("gallery");

        Array.from(galleries).forEach(function(item, index, array) {
            let thumbImage = document.createElement('img')
            thumbImage.src = item.thumbnail
            thumbImage.setAttribute('draggable', false)
            thumbImage.addEventListener('click', function(element) {
                scr.showGallery(index)
            })
            container.appendChild(thumbImage)
        })
    },
    showGallery: function(whichGallery) {
        document.querySelector('body').classList.toggle("gallery-open");
        let ele = document.getElementById("modal");
        ele.style.opacity = 0;
        ele.style.display = "grid";
        ele.dataset.gallery = whichGallery;
        ele.dataset.indexCount = 0;

        (function fade() {
            let opa = parseFloat(ele.style.opacity);
            let opaNext = opa += .04;
            if (opaNext <= 1) {
                ele.style.opacity = opaNext;
                requestAnimationFrame(fade)
            }
        })()

        scr.initalLoadGalleryImage(galleries[whichGallery].images[0])
    },
    hideGallery: function() {
        let ele = document.getElementById("modal");
        document.querySelector('body').classList.toggle("gallery-open");
        (function fade() {
            let opa = parseFloat(ele.style.opacity);
            let opaNext = opa -= .04;
            if (opaNext >= 0) {
                ele.style.opacity = opaNext;
                requestAnimationFrame(fade)
            } else {
                ele.removeAttribute("style")
            }
        })()
    },
    initalLoadGalleryImage: function(imageSource) {
        var galleryImage =  document.getElementById('galleryImage');
        if (galleryImage == null) {
            let image = document.createElement('img')
            image.src = imageSource;
            image.id = "galleryImage";
            image.style.zIndex = 2;
            image.style.opacity = 1;
            document.getElementById("galleryImageContainer").appendChild(image);
        } else {
            galleryImage.src = imageSource;
        }
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

        this.swapGalleryImage(galleries[whatGallery].images[newImage])
    },
    swapGalleryImage: function(imageSource) {
        //document.getElementById("galleryImage").src = imageSource;

        let originalImage = document.getElementById("galleryImage")
        console.log(document.getElementById("galleryImage").style.opacity);

        (function fade() {
            let opa = parseFloat(originalImage.style.opacity);
            let opaNext = opa -= .01;
            console.log(opa)
            if (opaNext >= 0) {
                originalImage.style.opacity = opaNext;
                requestAnimationFrame(fade)
            }
        })()
    }
}