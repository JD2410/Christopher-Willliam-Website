function Gallery(title, description, pageThumbnail, images) {
    this.title = title;
    this.description = description;
    this.thumbnail = pageThumbnail;
    this.images = images;
}

let galleries = [
    new Gallery(null, null, 'images/proj-01.jpg', [
        'gallery/gallery-01/gallery-01.jpg',
        'gallery/gallery-01/gallery-02.jpg',
        'gallery/gallery-01/gallery-03.jpg',
    ]),
    new Gallery('Title', null, 'images/proj-02.jpg',[
        'gallery/gallery-01/gallery-02.jpg',
        'gallery/gallery-01/gallery-01.jpg',
        'gallery/gallery-01/gallery-03.jpg',
    ]),
    new Gallery(null, 'lorem ipsum donor', 'images/proj-03.jpg', [
        'gallery/gallery-01/gallery-03.jpg',
        'gallery/gallery-01/gallery-02.jpg',
        'gallery/gallery-01/gallery-01.jpg',
    ])
];


let scr = {
    init: function() {
        document.addEventListener('keydown', function(event) {
            if(event.key === 'Escape') {
                scr.hideGallery();
            }
        })
        let galleryThumbnails = document.getElementsByClassName("thumbnails")
        Array.from(galleryThumbnails).forEach(function(element) {
            element.addEventListener('click', function() {
                scr.showGallery();
            })
        })
    },
    showGallery: function() {
        document.querySelector('body').classList.toggle("gallery-open");
        let ele = document.getElementById("modal");
        ele.style.opacity = 0;
        ele.style.display = "grid";

        (function fade() {
            let opa = parseFloat(ele.style.opacity);
            let opaNext = opa += .04;
            if (opaNext <= 1) {
                ele.style.opacity = opaNext;
                requestAnimationFrame(fade)
            }
        })()
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
    }
}

window.onload = (Event) => {
    scr.init();
   //scr.showGallery()
}