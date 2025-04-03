let cwbs = {
    init: function() {
        document.getElementById("menu").addEventListener('click', function() {
            document.getElementById("navigation").classList.toggle('open')
        })
    }
}

window.onload = function(){
    cwbs.init()
};