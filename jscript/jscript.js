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
            if(window.innerWidth > 768) {
                cwbs.navigationWidth[0].unshift(element.getBoundingClientRect().width)
            }
        })

        window.addEventListener("resize", function() {
            if(cwbs.navigationWidth[1].length == 0 & window.innerWidth > 768) {
                navigationLinks.forEach(function(element) {
                    cwbs.navigationWidth[0].unshift(element.getBoundingClientRect().width)
                })
                cwbs.underlineMovement();
            }
        })

        this.formScript();
        this.formInputStyling();
        if(window.innerWidth > 768) {
            this.underlineMovement();
        }
    },
    navigationWidth: [[], []],
    underlineMovement: function() {
        let rightSpacerCounter = 11;
        this.navigationWidth[1].push(rightSpacerCounter)
        cwbs.navigationWidth[0].forEach(function(ele, index) {
            if(index < (cwbs.navigationWidth[0].length - 1)) {
                rightSpacerCounter += parseFloat(ele);
                rightSpacerCounter += 30;
                cwbs.navigationWidth[1].unshift(rightSpacerCounter)
            }
        })
        cwbs.navigationWidth[0].reverse()
        this.moveUnderline(0)
    },
    moveUnderline: function(which) {
        document.getElementById("underline").style.width = cwbs.navigationWidth[0][which] + "px";
        document.getElementById("underline").style.right = cwbs.navigationWidth[1][which] + "px";
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