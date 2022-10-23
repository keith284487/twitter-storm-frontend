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
            changeToScreen('#step-5');
        } else {
            alert('Please add at least one text ^_^')
        }
    })

    //Click back
    $('.step-2-controls-back').on('click', function(){
        changeToScreen('#step-1');
    })

    //Step 3 click save 
    $('.step-5-controls-save').on('click', function(){
        
        changeToScreen('#step-3');
        
    })

    //Click back
    $('.step-5-controls-back').on('click', function(){
        changeToScreen('#step-2');
    })

    //Step 3 click back 
    $('.step-3-controls-back').on('click', function(){
        changeToScreen('#step-5');
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
    $('#step-1, #step-2, #step-5, #step-3').css({'opacity': '0', 'z-index': '0'});

    //Last screen not showing preview to avoid mess
    if (toScreen == '#step-3' || toScreen == '#step-2' || toScreen == '#step-5'){
        $('#preview').hide();
    } else {
        $('#preview').show(); 
    }

    //Turn on required 
    $(toScreen).css({'opacity': '1', 'z-index': '2'});

    //Helper to fix empty areas around
    $('#helper').css({'opacity': '1', 'z-index': '1'});

}