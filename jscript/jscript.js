let cwbs = {
    init: function() {
        document.getElementById("menu").addEventListener('click', function() {
            document.getElementById("navigation").classList.toggle('open')
        })

        const navigationLinks = document.querySelectorAll('#navigation a')

        navigationLinks.forEach(function(element) {
            element.addEventListener('click', function() {
                document.getElementById("navigation").classList.toggle('open')
            })
        })

        document.getElementById('result-container').addEventListener('click', function() {
            this.removeAttribute("style");
        })

        this.formScript();
        this.formInputStyling();
        this.map.init();
        this.heroImage.init()
        cwbs.cookie.init();
    },
    heroImage: {
        primaryImages: ["big-hero.png", "big-hero-2.png", "big-hero-3.png"],
        secondaryImages: ["small-hero.png", "small-hero-2.png", "small-hero-3.png"],
        selection: 0,
        path: "images/hero-images/",
        init: () => {
            const primaryContainer = document.getElementById("primary-image");
            const secondaryContainer = document.getElementById("secondary-image");

            let primaryBacking = document.createElement("img");
            primaryBacking.src = cwbs.heroImage.path + cwbs.heroImage.primaryImages[1];
            primaryContainer.appendChild(primaryBacking);

            let scondaryBacking = document.createElement("img");
            scondaryBacking.src = cwbs.heroImage.path + cwbs.heroImage.secondaryImages[1];
            secondaryContainer.appendChild(scondaryBacking);

        }
    },
    cookie: {
        init: function() {
            if (!document.cookie.includes("cookie-consent=1")) {
                document.getElementById('cookie-box-container').classList.add('show');
                document.getElementById('cookie-accept').addEventListener('click', function(e) {
                    e.preventDefault();
                    cwbs.cookie.acceptPolicy();
                });
            } else {
                cwbs.cookie.loadScript();
            }
        },
        acceptPolicy: function() {
            document.cookie = "cookie-consent=1; max-age=31536000; path=/";
            document.getElementById('cookie-box-container').classList.remove('show');
            cwbs.cookie.loadScript();
        },
        loadScript: function() {
            let script = document.createElement('script');
            script.setAttribute('type', 'text/javascript');
            script.setAttribute('src', 'https://web3forms.com/client/script.js');
            document.head.appendChild(script);
        }
    },
    formScript: function() {

        const form = document.getElementById('form');
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            if (document.cookie.includes("cookie-consent=1")) { 
                const hCaptcha = form.querySelector('textarea[name=h-captcha-response]').value;
                if (!hCaptcha) {
                    e.preventDefault();
                    alert("Please fill out captcha field")
                } else {
                    const formData = new FormData(form);
                    const object = Object.fromEntries(formData);
                    const json = JSON.stringify(object);
                    cwbs.contectFormMessage("Please wait...", "info")

                    fetch('https://api.web3forms.com/submit', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            },
                            body: json
                        })
                        .then(async (response) => {
                            let json = await response.json();
                            if (response.status == 200) {
                                cwbs.contectFormMessage("Form submitted successfully", "success")
                            } else {
                                console.log(response);
                                cwbs.contectFormMessage(json.message, "failed")
                            }
                        })
                        .catch(error => {
                            console.log(error);
                            cwbs.contectFormMessage("Something went wrong!", "failed")
                        })
                        .then(function() {
                            form.reset();
                        });
                    }
                } else {
                    cwbs.contectFormMessage("Please confirm you have understood our usage of cookies in the popup", "info")
                }
            
          });
    },
    contectFormMessage: function(message, status) {
        
        const resultMessage = document.getElementById('result-message');
        const resultCon = document.getElementById('result-container');

        resultCon.classList.remove("success")
        resultCon.classList.remove("info")
        resultCon.classList.remove("failed")

        resultMessage.innerHTML = message;
        resultCon.classList.add(status);
        resultCon.style.display = "flex";

    },
     map: {
        init: () => {

            const isMobile = window.innerWidth <= 768;
            const mapPos = isMobile ? [51.7095, 0.2428] : [51.7095, 1.1428] ;
            const zoom = 9;
            
            const londonLatLng = [51.7095, 0.2428];
            const map = L.map('map', {
                center: mapPos,
                zoom: zoom,
                dragging: false,
                scrollWheelZoom: false
            });

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
            }).addTo(map);

            const radiusInMeters = 20 * 1609.34;

            L.circle(londonLatLng, {
                color: '#00E539',
                fillColor: '#00E539',
                fillOpacity: 0.2,
                radius: radiusInMeters,
            }).addTo(map);

            L.marker(londonLatLng).addTo(map)
        }
    },
    formInputStyling: function() {
        let inputs = document.querySelectorAll(".cus-input")
        for(let input of inputs) {

            let $input = input.getElementsByTagName('input');

            if ($input.length >= 1) {
                $input = input.getElementsByTagName('input')[0];
            } else {
                $input = input.getElementsByTagName('textarea')[0];
            }
           
            input.addEventListener("click", function() {
                let $this = this;
                $this.classList.add("selected");
                $this.classList.add("selected-colour");
                $input.select();
            })

            $input.addEventListener("focus", function() {
                let $this = this;
                let $outer = $this.closest(".cus-input")
                $outer.classList.add("selected");
                $outer.classList.add("selected-colour");
                $input.select();
            })

            $input.addEventListener("blur", function() {
                let $this = this;
                input.classList.remove("selected-colour")
                if($this.value == "") {
                    input.classList.remove("selected")
                }
            })

            $input.addEventListener("keyup", function() {
                let $this = this;
                if($this.value.toUpperCase() == "ERROR") {
                    input.classList.add("error")
                } else {
                    input.classList.remove("error")
                }
            })
        }
    }
}

window.onload = function(){
    cwbs.init();
    scr.init();
};