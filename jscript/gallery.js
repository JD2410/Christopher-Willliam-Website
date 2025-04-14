function Gallery(title, description, pageThumbnail, images) {
    this.title = title;
    this.description = description;
    this.thumbnail = pageThumbnail;
    this.images = images;
}

let galleries = [
    new Gallery(null, null, 'images/proj-01.png', [
        'gallery/gallery-01/gallery-01.jpg',
        'gallery/gallery-01/gallery-02.jpg',
        'gallery/gallery-01/gallery-03.jpg',
    ]),
    new Gallery('Title', null, 'images/proj-02.png',[
        'gallery/gallery-01/gallery-02.jpg',
        'gallery/gallery-01/gallery-01.jpg',
        'gallery/gallery-01/gallery-03.jpg',
        'gallery/gallery-01/gallery-01.jpg',
        'gallery/gallery-01/gallery-03.jpg',
    ]),
    new Gallery(null, 'lorem ipsum donor', 'images/proj-03.png', [
        'gallery/gallery-01/gallery-03.jpg',
        'gallery/gallery-01/gallery-02.jpg',
        'gallery/gallery-01/gallery-01.jpg',
        'gallery/gallery-01/gallery-02.jpg',
        'gallery/gallery-01/gallery-01.jpg',
        'gallery/gallery-01/gallery-02.jpg',
        'gallery/gallery-01/gallery-01.jpg',
    ]),
    new Gallery(null, null, 'images/proj-04.png', [
        'gallery/gallery-01/gallery-01.jpg',
        'gallery/gallery-01/gallery-02.jpg',
        'gallery/gallery-01/gallery-03.jpg',
    ]),
    new Gallery(null, null, 'images/proj-05.png', [
        'gallery/gallery-01/gallery-01.jpg',
        'gallery/gallery-01/gallery-02.jpg',
        'gallery/gallery-01/gallery-03.jpg',
    ]),
    new Gallery(null, null, 'images/proj-06.png', [
        'gallery/gallery-01/gallery-01.jpg',
        'gallery/gallery-01/gallery-02.jpg',
        'gallery/gallery-01/gallery-03.jpg',
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

        if (newImage) {
            newImage = parseInt(currentImageIndex) + 1;

            if(newImage <= (howManyImages - 1)) {
                galleryDetails.dataset.indexCount = newImage;
            } else {
                galleryDetails.dataset.indexCount = 0;
                newImage = 0;
            }
        } else {
            newImage = parseInt(currentImageIndex) - 1;

            if(newImage > 0) {
                galleryDetails.dataset.indexCount = newImage;
            } else {
                galleryDetails.dataset.indexCount = howManyImages - 1;
                newImage = howManyImages - 1;
            }
        }

        this.swapGalleryImage(galleries[whatGallery].images[newImage])
    },
    swapGalleryImage: function(imageSource) {
        document.getElementById("galleryImage").src = imageSource;
    }
}

window.onload = (Event) => {
    scr.init();
}