/*
*
* Getting everything we need from server
* 
*/

function getAllServerData() {

    /*
    * Loading data from server
    * - Json with sounds
    */

    $.support.cors = true;


    //Loading AUDIO from server 
    sendRequestSound().then((response) => {
        if (!response.ok) {
            console.log('Getting AUDIO, respond is not ok.')
        } else {
            console.log('Getting AUDIO, respond is  ok.')
            return response.json();
        }
    })
        .then((answer) => {
            console.log("Got AUDIO from aws.");
            console.log(answer);
            
            //Setting audio for project
            soundsDb = answer[0];
            
            preloadeCounter += 1;
            preloadeContentCheckState(preloadeCounter);

            

        })
        .catch(function (error) {
            console.log('Promis failed: ' + error);
        });

    function sendRequestSound() {
        console.log("Getting audio files from webserver");
        //URL = 'https://02242022.s3.eu-central-1.amazonaws.com/soundsData.json'; //Change to: https://di4gbz8m317bc.cloudfront.net/soundsData.json
        return fetch(URL)
    }
}
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
    iniEvents ();

    //Update date of the calendar form
    var current = new Date;
    document.getElementById('fdate').valueAsDate = new Date(current.getTime() + (86400000 * 10));

    //Change preview colors
    var bgColor = $('#background').val();
    var textColor = $('#text').val();

    $('#preview').css({'background-color':bgColor,'color':textColor});

    //Handling the form submission
     $(function() {
        //What happens after succesful submits
        $('#form').ajaxForm(function() {
            
            //Switching to finish screnn
            changeToScreen('#step-4');
            
            //Reloading page after n secs 
            setTimeout(function(){location.reload();},5000)
            

        });
      });

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


function iniEvents (){
    
    //Generatin preview
    $("#name").keyup(function(event) {
        var text = $(this).val();
        $("#preview").text(text);
      });

    //Changing BG color
    document.getElementById("background").onchange = function() {
        console.log('BG color changed');
        $('#preview').css('background-color',this.value)
      }
    
    document.getElementById("text").onchange = function() {
        console.log('Text color changed');
        $('#preview').css('color',this.value)
      }
    
    //Step 1 click save 
    $('.step-1-controls-save').on('click', function(){
        console.log('Clicked');

        if ($('#name')[0].validity.valid){
            changeToScreen('#step-2');
        } else {
            alert('Please fill the name ^_^')
        }
    })

    //Step 2 click save 
    $('.step-2-controls-save').on('click', function(){
        
        if ($('#text-1')[0].validity.valid){
            changeToScreen('#step-3');
        } else {
            alert('Please add at least one text ^_^')
        }
    })

    //Click back
    $('.step-2-controls-back').on('click', function(){
        changeToScreen('#step-1');
    })

    //Step 3 click back 
    $('.step-3-controls-back').on('click', function(){
        changeToScreen('#step-2');
    })

    //Saving form
    $('.step-3-controls-save').on('click', function(){
        
        if ($('#step-3-upload-images')[0].validity.valid){
            $('.step-3-controls-save').text('Uploading...')
            $('form').submit();
        } else {
            alert('Please add at least one image ^_^')
        }

        

        
    })

    $('form').on('submit', function (e) {

        console.log('Form was submitted');

      });
}

function changeToScreen (toScreen){
    console.log("Changing screen to: " + toScreen);
   
    //Switch off all
    $('#step-1, #step-2, #step-3').css({'opacity': '0', 'z-index': '0'});

    //Turn on required 
    $(toScreen).css({'opacity': '1', 'z-index': '1'});

}