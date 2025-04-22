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
        this.formScript();
        this.formInputStyling();
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