const axios  = require("axios");

async function sendRequest(){

    const request = await axios.post(
        'http://localhost:8080/upload_file',
        {
            username : 'hola'
        }
    );
    //console.log(request.data);
}

sendRequest();