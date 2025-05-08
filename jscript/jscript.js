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
        if(window.innerWidth > 768) {
            this.underlineMovement();
            this.getSectionPositions();
            cwbs.scrollAnimation();
        }
    },
    navProperties: {
        navWidth: [],
        navPostionRight: [],
        currentSection: 0,
        services: 0,
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
        this.navProperties.windowHeight = window.innerHeight;
    },
    scrollAnimation: function() {
        const bufferPixel = 230;
        let windowPosition = window.scrollY
        let scroll = windowPosition + cwbs.navProperties.windowHeight - bufferPixel;
        
        if(this.navProperties.services < scroll) {
            document.getElementById('services-container').classList.add("animate")
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
        const result = document.getElementById('result');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(form);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);
            result.innerHTML = "Please wait..."
          
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
                          result.innerHTML = "Form submitted successfully";
                      } else {
                          console.log(response);
                          result.innerHTML = json.message;
                      }
                  })
                  .catch(error => {
                      console.log(error);
                      result.innerHTML = "Something went wrong!";
                  })
                  .then(function() {
                      form.reset();
                      setTimeout(() => {
                          result.style.display = "none";
                      }, 3000);
                  });
          });
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