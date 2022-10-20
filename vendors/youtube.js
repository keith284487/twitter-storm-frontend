//create the script for the API and append it to the DOM
var tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//Player instance 
var player;

//Caching for player to avoid recreation
var cachePlayer = {};


function startYTPlayer(element) {
    console.log("Video Player ini");
    console.log(element);

    if (typeof player !== "undefined") {
        console.log("Player already defined");

        if (player.h.id != element){
            console.log("Player already defined and element is different");
            console.log("Prev player:" + player.h.id);
            console.log("Current player:" + element);

            //Checking if we have cached element
            if (cachePlayer[element] !== "undefined"){
                player = cachePlayer[element];
            } else {
                onYouTubePlayerAPIReady(element);
            }
            
        
        } 
    } 

    if (typeof player === "undefined"){
        console.log("Player not defined");

        onYouTubePlayerAPIReady(element);
    
    }

    function onYouTubePlayerAPIReady(element) {
        player = new YT.Player(element, {
            events: {
                'onReady': propagateClicks,
                'onStateChange': onPlayerStateChange
            }
        });
        
        cachePlayer[element] = player;
    }

    /*function onPlayerReady(event) {
        document.getElementById('button').addEventListener('click', function () {
            player.pauseVideo();
        })
    }*/

    //When YT player changing status. Play, Stop, Pause, etc.
    function onPlayerStateChange(event) {
        console.log("YT player state changed.");
        console.log("PLAYING: 1, PAUSED: 2. Status: " + event.data);

        //Playin YT need to stop audio
        if (event.data == 1) {
            console.log("YT is playing.")
            
            //iOS is standart player
            if (!iOS()){
                audioObjBg.pause();
            } else {
                audioObj.pause();
            }
        }

        //PAUSED :: Pause YT need to continue audio
        if (event.data == 2) {
            console.log("YT is paused.");

            //iOS is using standart player
            if (!iOS()){
                audioObjBg.play();
            } else {
                audioObj.play();
            }
        }

        //ENDED :: Pause YT need to continue audio
        if (event.data == 0) {
            console.log("YT is ended.");

            //iOS is using standart player
            if (!iOS()){
                audioObjBg.play();
            } else {
                audioObj.play();
            }
        }
        /*if (event.data == YT.PlayerState.PLAYING && !done) {
            setTimeout(stopVideo, 6000);
            done = true;
          }*/
    }

    function propagateClicks () {
        console.log("Propagating clicks. Ini.");
    
        $(".view-photos-elements_element__cover").unbind();

        $(".view-photos-elements_element__cover").on("click", function(e){
            console.log("YT helper layer is clicked");
            //console.log(e);
    
            if (player.getPlayerState() != 1){
                console.log("Playing YT via layer");
                player.playVideo();
            } else {
                console.log("Pausing YT via layer");
                player.pauseVideo();
            }
    
            
        })
    
    }
}

