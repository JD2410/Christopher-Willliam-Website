let cwbs = {
    navProperties: {
        navWidth: [],
        navPostionRight: [],
        currentSection: 0,
    },
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
            cwbs.scrollAnimation();
        })

        this.formScript();
        this.map();
        this.underlineMovement();
        this.scrollAnimation();
        this.servicesRevealDescription();
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
    scrollAnimation: function() {

        const elements = document.querySelectorAll('.animate-scroll');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');

                    if (entry.target.id == 'hero') {
                        this.navProperties.currentSection = 0;
                    } else if (entry.target.id == 'services') {
                        this.navProperties.currentSection = 1;
                    } else if (entry.target.id == 'about') {
                        this.navProperties.currentSection = 2;
                    } else if (entry.target.id == 'projects') {
                        this.navProperties.currentSection = 3;
                    } else if (entry.target.id == 'why') {
                        this.navProperties.currentSection = 4;
                    } else if (entry.target.id == 'contact') {
                        this.navProperties.currentSection = 5;
                    }
                    cwbs.moveUnderline(cwbs.navProperties.currentSection)
                }
            });
        }, {
            //The amount of screen displayed before animated. 0 is as soon as it appears on the page. 1 is a bit. 2 is...
            threshold: 0.2
        });

        elements.forEach(element => {
            observer.observe(element);
        });
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

document.addEventListener('DOMContentLoaded', () => {
    cwbs.init();
    scr.init();
    document.getElementsByTagName('body')[0].classList.add('startAnimate')
});