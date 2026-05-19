let cwbs = {
    init: function() {
        
        this.cookiePolicy()
        this.navgationInit();

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
        this.map();

        if(window.innerWidth > 768) {
            this.underlineMovement();
            this.getSectionPositions();
            cwbs.scrollAnimation();
        }
        this.servicesRevealDescription();
    },
    navProperties: {
        navWidth: [],
        navPostionRight: [],
        currentSection: 0,
        services: 0,
        about: 0,
        projects: 0,
        why: 0,
        contact: 0,
        footer: 0,
        windowHeight: 0,
    },
    navgationInit: () => {
        // Allows user to open the menu in mobile screen proportions
        document.getElementById("menu").addEventListener('click', function() {
            document.getElementById("navigation").classList.toggle('open')
        })

        // Sets up the scripts for the underline
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
    },
    cookiePolicy: () => {
        document.getElementById('cookie-accept').addEventListener('click', (e) => {
            e.preventDefault();
            document.cookie = "cookie-consent=1"
            document.getElementById('cookie-box-container').classList.remove('show')
        })

        if (!document.cookie.includes("cookie-consent=1")) {
            document.getElementById('cookie-box-container').classList.add('show')
        }
    },
    getSectionPositions: function() {
        this.navProperties.services = document.getElementById("services").getBoundingClientRect().top + window.scrollY;
        this.navProperties.about = document.getElementById("about").getBoundingClientRect().top + window.scrollY;
        this.navProperties.projects = document.getElementById("projects").getBoundingClientRect().top + window.scrollY;
        this.navProperties.why = document.getElementById("why-us").getBoundingClientRect().top + window.scrollY;
        this.navProperties.contact = document.getElementById("contact").getBoundingClientRect().top + window.scrollY;
        this.navProperties.footer = document.getElementById("footer").getBoundingClientRect().top + window.scrollY;
        this.navProperties.windowHeight = window.innerHeight;
    },
    scrollAnimation: function() {
        let scroll = (window.scrollY + cwbs.navProperties.windowHeight) - 230;
        
        document.getElementById('temp').innerHTML = document.getElementById("services").getBoundingClientRect().top - 200;

        if(scroll > this.navProperties.services) {
            document.getElementById('services-container').classList.add("animate");
        }
        if(scroll > this.navProperties.about) {
            document.getElementById('profile').classList.add("animate");
        }
        if(this.navProperties.projects < scroll) {
            document.getElementById('projects-wrapper').classList.add("animate");
        }
        if(this.navProperties.why < scroll) {
            document.getElementById('why-us').classList.add("animate")
        }
        if(this.navProperties.contact < scroll) {
            document.getElementById('contact-form').classList.add("animate")
        }
        if((window.scrollY + cwbs.navProperties.windowHeight) > this.navProperties.footer) {
            document.getElementById('footer').classList.add("animate")
        }

        let windowPosition = window.scrollY + 200;

        if (windowPosition < this.navProperties.services) {
            this.navProperties.currentSection = 0;
        }
        if(windowPosition > this.navProperties.services && windowPosition < this.navProperties.about) {
            this.navProperties.currentSection = 1;
        }
        if(windowPosition > this.navProperties.about && windowPosition < this.navProperties.projects) {
            this.navProperties.currentSection = 2;
        }
        if(windowPosition > this.navProperties.projects && windowPosition < this.navProperties.why) {
            this.navProperties.currentSection = 3;
        }
        if(windowPosition > this.navProperties.why && windowPosition < this.navProperties.contact) {
            this.navProperties.currentSection = 4;
        }
        if(windowPosition > this.navProperties.contact) {
            this.navProperties.currentSection = 5;
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
                    cwbs.contactFormMessage("Please wait...", "info")

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
                                cwbs.contactFormMessage("Form submitted successfully", "success")
                            } else {
                                console.log(response);
                                cwbs.contactFormMessage(json.message, "failed")
                            }
                        })
                        .catch(error => {
                            console.log(error);
                            cwbs.contactFormMessage("Something went wrong!", "failed")
                        })
                        .then(function() {
                            form.reset();
                        });
                    }
                } else {
                    cwbs.contactFormMessage("Please confirm you have understood our usage of cookies in the popup", "info")
                }
            
          });
    },
    contactFormMessage: function(message, status) {
        
        const resultMessage = document.getElementById('result-message');
        const resultCon = document.getElementById('result-container');

        resultCon.classList.remove("success")
        resultCon.classList.remove("info")
        resultCon.classList.remove("failed")

        resultMessage.innerHTML = message;
        resultCon.classList.add(status);
        resultCon.style.display = "flex";

    },
    // Loads the map
    map: () => {
        const mapCentre = [51.7095, 0.2428];
        const map = L.map('map', {
            center: mapCentre,
            zoom: 9,
            dragging: true,
            scrollWheelZoom: false
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        }).addTo(map);

        L.circle(mapCentre, {
            color: '#00E539',
            fillColor: '#00E539',
            fillOpacity: 0.2,
            radius: 32186.8,
        }).addTo(map);

        L.marker(mapCentre).addTo(map)
    },
    // Reveals the service description when screen size is mobile proportions
    servicesRevealDescription: () => {
        let services = document.querySelectorAll('.card');
        services.forEach( ele => {
            ele.addEventListener('click', () => {
                ele.classList.toggle('show')
            })
        })
    }
}

window.onload = function(){
    cwbs.init();
    scr.init();
    document.getElementsByTagName('body')[0].classList.add('startAnimate')
};