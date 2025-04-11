scr = {
    init: function() {
        document.addEventListener('keydown', function(event) {
            if(event.key === 'Escape') {
                scr.hideGallery();
            }
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
    scr.showGallery()
}