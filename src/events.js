function iniEvents (){
    
    //Step 1 click save 
    $('.step-1-controls-save').on('click', function(){
        console.log('Clicked');
        changeToScreen('#step-2');
    })

    //Step 2 click save 
    $('.step-2-controls-save').on('click', function(){
        changeToScreen('#step-3');
    })

    //Click back
    $('.step-2-controls-back').on('click', function(){
        changeToScreen('#step-1');
    })

    //Step 3 click back 
    $('.step-3-controls-back').on('click', function(){
        changeToScreen('#step-2');
    })

    //TODO: STEP 3 submit form
    $('form').on('submit', function (e) {

        console.log('submitted')

      });
}

function changeToScreen (toScreen){
    console.log("Changing screen to: " + toScreen);
   
    //Switch off all
    $('#step-1, #step-2, #step-3').css({'opacity': '0', 'z-index': '0'});

    //Turn on required 
    $(toScreen).css({'opacity': '1', 'z-index': '1'});

}