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