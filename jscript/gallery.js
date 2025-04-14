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
    ]),
    new Gallery(null, 'lorem ipsum donor', 'images/proj-03.png', [
        'gallery/gallery-01/gallery-03.jpg',
        'gallery/gallery-01/gallery-02.jpg',
        'gallery/gallery-01/gallery-01.jpg',
    ])
];


let scr = {
    init: function() {
        document.addEventListener('keydown', function(event) {
            if(event.key === 'Escape') { scr.hideGallery(); }
        })
        document.getElementById("modal").addEventListener("click", function() {
            scr.hideGallery();
        })
        document.getElementById("closeGallery").addEventListener("click", function() {
            scr.hideGallery();
        })
        document.getElementById("next").addEventListener("click", function() {
            scr.nextImage();
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

        scr.changeGalleryImage(galleries[whichGallery].images[0])
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
    changeGalleryImage: function(image) {
        document.getElementById('galleryImage').src = image;
    },
    nextImage: function() {
        
    }
}

window.onload = (Event) => {
    scr.init();
}