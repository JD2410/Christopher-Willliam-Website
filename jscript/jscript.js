let cwbs = {
    init: function() {
        document.getElementById("menu").addEventListener('click', function() {
            document.getElementById("navigation").classList.toggle('open')
        })

        const navigationLinks = document.querySelectorAll('#navigation a')
        navigationLinks.forEach(function(element, index) {
            element.addEventListener('click', function() {
                document.getElementById("navigation").classList.toggle('open');
            })
            element.addEventListener('mouseover', function() {
                cwbs.moveUnderline(index)
            })
            element.addEventListener('mouseout', function() {
                cwbs.moveUnderline(cwbs.navProperties.currentSection)
            })
            if(window.innerWidth > 768) {
                cwbs.navProperties.navWidth.unshift(element.getBoundingClientRect().width)
            }
        })

        document.getElementById('cookie-accept').addEventListener('mousedown', () => {
            document.cookie = "cookie-consent=1"
            document.getElementById('cookie-box-container').classList.remove('show')
        })

        if (!document.cookie.includes("cookie-consent=1")) {
            document.getElementById('cookie-box-container').classList.add('show')
        }
        

        window.addEventListener("resize", function() {
            if(cwbs.navProperties.navPostionRight.length == 0 & window.innerWidth > 768) {
                navigationLinks.forEach(function(element) {
                    cwbs.navProperties.navWidth.unshift(element.getBoundingClientRect().width)
                })
                cwbs.underlineMovement();
            }
            cwbs.getSectionPositions();
            cwbs.scrollAnimation();
        })

        let timer = null;
        window.addEventListener("scroll", function() {
            cwbs.scrollAnimation();
        })

        this.formScript();
        this.formInputStyling();
        this.map.init();
        if(window.innerWidth > 768) {
            this.underlineMovement();
            this.getSectionPositions();
            cwbs.scrollAnimation();
            this.heroImage.init();
        }
    },
    navProperties: {
        navWidth: [],
        navPostionRight: [],
        currentSection: 0,
        services: 0,
        servicesCards : [0, 0, 0],
        about: 0,
        projects: 0,
        contact: 0,
        windowHeight: 0,
    },
    getSectionPositions: function() {
        this.navProperties.services = document.getElementById("services").getBoundingClientRect().top + window.scrollY;
        this.navProperties.about = document.getElementById("about").getBoundingClientRect().top + window.scrollY;
        this.navProperties.projects = document.getElementById("projects").getBoundingClientRect().top + window.scrollY;
        this.navProperties.contact = document.getElementById("map").getBoundingClientRect().top + window.scrollY;
        this.navProperties.servicesCards[0] = document.querySelector(".services-listed .card:first-child").getBoundingClientRect().top + window.scrollY;
        this.navProperties.servicesCards[1] = document.querySelector(".services-listed .card:nth-child(4)").getBoundingClientRect().top + window.scrollY;
        this.navProperties.servicesCards[2] = document.querySelector(".services-listed .card:nth-child(8)").getBoundingClientRect().top + window.scrollY;
        this.navProperties.windowHeight = window.innerHeight;
    },
    scrollAnimation: function() {
        const bufferPixel = 230;
        let windowPosition = window.scrollY + 100;
        let scroll = window.scrollY + cwbs.navProperties.windowHeight - bufferPixel;
            
        if(this.navProperties.services < scroll) {
            document.getElementById('services-container').classList.add("animate")
        }
        if((this.navProperties.servicesCards[0] - 200) < scroll) {
            document.getElementById('services-container').classList.add("animate-first-row")
        }
        if((this.navProperties.servicesCards[1] - 200) < scroll) {
            document.getElementById('services-container').classList.add("animate-second-row")
        }
        if((this.navProperties.servicesCards[2] - 200) < scroll) {
            document.getElementById('services-container').classList.add("animate-third-row")
        }
        if(this.navProperties.about < scroll) {
            document.getElementById('profile').classList.add("animate");
        }
        if(this.navProperties.projects < scroll) {
            document.getElementById('projects-wrapper').classList.add("animate")
        }
        if(this.navProperties.contact < scroll) {
            document.getElementById('contact-form').classList.add("animate")
        }

        if (windowPosition < this.navProperties.services) {
            this.navProperties.currentSection = 0;
        }
        if(windowPosition > this.navProperties.services && windowPosition < this.navProperties.about) {
            this.navProperties.currentSection = 1;
        }
        if(windowPosition > this.navProperties.about && windowPosition < this.navProperties.projects) {
            this.navProperties.currentSection = 2;
        }
        if(windowPosition > this.navProperties.projects && windowPosition < this.navProperties.contact) {
            this.navProperties.currentSection = 3;
        }
        if(windowPosition > this.navProperties.contact) {
            this.navProperties.currentSection = 4;
        }
        cwbs.moveUnderline(cwbs.navProperties.currentSection)
    },
    underlineMovement: function() {
        let rightSpacerCounter = 11;
        this.navProperties.navPostionRight.push(rightSpacerCounter)
        cwbs.navProperties.navWidth.forEach(function(ele, index) {
            if(index < (cwbs.navProperties.navWidth.length - 1)) {
                rightSpacerCounter += parseFloat(ele);
                rightSpacerCounter += 30;
                cwbs.navProperties.navPostionRight.unshift(rightSpacerCounter)
            }
        })
        cwbs.navProperties.navWidth.reverse()
        this.moveUnderline(cwbs.navProperties.currentSection)
    },
    moveUnderline: function(which) {
        document.getElementById("underline").style.width = cwbs.navProperties.navWidth[which] + "px";
        document.getElementById("underline").style.right = cwbs.navProperties.navPostionRight[which] + "px";
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
    },
    heroImage: {
        primaryImages: ["project-new-kitchen.webp", "big-hero-2.webp", "big-hero-3.webp"],
        secondaryImages: ["project-new-study.webp", "small-hero-2.webp", "small-hero-3.webp"],
        selection: 1,
        path: "images/hero-images/",
        state: true,
        heroTimer: "",
        init: () => {
            const primaryContainer = document.getElementById("primary-image");
            const secondaryContainer = document.getElementById("secondary-image");

            let primaryBacking = document.createElement("img");

            primaryBacking.src = cwbs.heroImage.path + cwbs.heroImage.primaryImages[1];
            primaryBacking.alt = 'Examples of work from Christorpher William - Building Solutions'
            primaryContainer.appendChild(primaryBacking);

            let scondaryBacking = document.createElement("img");
            scondaryBacking.src = cwbs.heroImage.path + cwbs.heroImage.secondaryImages[1];
            scondaryBacking.alt = 'Examples of work from Christorpher William - Building Solutions'

            secondaryContainer.appendChild(scondaryBacking);

            cwbs.heroImage.heroTimer = setInterval(() => { cwbs.heroImage.loadNextImage() }, 2000)
        },
        loadNextImage: () => {

            const primaryImageHolder = document.getElementById("primary-image")

            if (cwbs.heroImage.state) {

                if (!primaryImageHolder.classList.contains("fade")) {
                    primaryImageHolder.classList.add("fade");
                    cwbs.heroImage.selection++;
                    if(cwbs.heroImage.selection > (cwbs.heroImage.primaryImages.length - 1)) {
                        cwbs.heroImage.selection = 0;
                    }
                    setTimeout(() => {
                        document.querySelector("#primary-image img:first-child").src = cwbs.heroImage.path + cwbs.heroImage.primaryImages[cwbs.heroImage.selection];
                    }, 2000);
                } else {
                    document.getElementById("secondary-image").classList.add("fade");
                    setTimeout(() => {
                        document.querySelector("#secondary-image img:first-child").src = cwbs.heroImage.path + cwbs.heroImage.secondaryImages[cwbs.heroImage.selection];
                    }, 2000)
                    cwbs.heroImage.state = false;
                }
            } else {
                if (primaryImageHolder.classList.contains("fade")) {
                    cwbs.heroImage.selection++;
                    if(cwbs.heroImage.selection > (cwbs.heroImage.primaryImages.length - 1)) {
                        cwbs.heroImage.selection = 0;
                    }
                    primaryImageHolder.classList.remove("fade")
                    setTimeout(() => {
                        document.querySelector("#primary-image img:nth-child(2)").src = cwbs.heroImage.path + cwbs.heroImage.primaryImages[cwbs.heroImage.selection];
                    }, 2000)
                } else {
                    document.getElementById("secondary-image").classList.remove("fade")
                    setTimeout(() => {
                        document.querySelector("#secondary-image img:nth-child(2)").src = cwbs.heroImage.path + cwbs.heroImage.secondaryImages[cwbs.heroImage.selection];
                    }, 2000)
                    cwbs.heroImage.state = true;
                }
            }
        }
    }
}

window.onload = function(){
    cwbs.init();
    scr.init();
    document.getElementById('hero').classList.add('animate')
    document.getElementById('highlights').classList.add('animate')
    document.getElementsByTagName('body')[0].classList.add('startAnimate')
};