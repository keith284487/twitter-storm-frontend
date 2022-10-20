//Full load of the page, including images, scripts, etc
//Usually we turn on everything during this moment. To avoid lags of initial loading
$(window).on('load', function(){
    

})

//Scripts, css loaded, can start do some scripting
$(document).ready(function () {
    
    //Some VH fix by deafault
    window.addEventListener("resize", () => {
        // We execute the same script as before
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
    });

    //Ini our events
    iniEvents ()

    var current = new Date;
    document.getElementById('fdate').valueAsDate = new Date(current.getTime() + (86400000 * 10));


    //Preloading fonts
    /*var newStyle = document.createElement('style');
    newStyle.appendChild(document.createTextNode("\
    @font-face {\
    font-family: 'Open Sans', sans-serif;\
    src: url('./Fonts/OpenSans-ExtraBold.ttf') format('truetype');\
    }\
    "));

    document.head.appendChild(newStyle);*/


});