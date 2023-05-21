const API_URL = "http://api.giphy.com/v1/gifs/search"
const API_KEY = "5RzOzCcx04jbdhsafO7qAAxApO3URXy9";

function requestGifXHR() {
    let gifInput = document.getElementById("gifInput").value;
    if (!gifInput || gifInput.trim().length == 0) {
        return
    }
    let resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";
    let params = "api_key=" + API_KEY + "&q=" + gifInput + "&limit=5&rating=g";
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            //processAlbumRequest(req.responseText);
            let response = JSON.parse(req.responseText)
            for (item of response.data) {
                let imgElement = document.createElement("img");
                imgElement.src = item.images.downsized_medium.url;
                imgElement.alt = item.title;
                resultDiv.appendChild(imgElement);
            }
        }
        else if (req.readyState == 4 && req.status != 200) {
            console.log(req.status + " Error with the imgur API: ", req.responseText);
        }
    }
    req.open('GET', API_URL + "?" + params, true); // true for asynchronous   
    req.send();
}

function requestGifFetch() {
    let gifInput = document.getElementById("gifInput").value;
    if (!gifInput || gifInput.trim().length == 0) {
        return
    }
    let resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";
    let params = "api_key=" + API_KEY + "&q=" + gifInput + "&limit=5"+"&rating=g";
    fetch(API_URL + "?" + params, {method: "GET"})
        .then((response) => {
            return response.text();
        })
        .then((data) => {
            let response = JSON.parse(data)
            for (item of response.data) {
                let imgElement = document.createElement("img");
                imgElement.src = item.images.downsized_medium.url;
                imgElement.alt = item.title;
                resultDiv.appendChild(imgElement);
            }
        })
        .catch((e) => {
            console.error(e);
        })
}
async function requestGifAsyncAwait() {
    let gifInput = document.getElementById("gifInput").value;
    if (!gifInput || gifInput.trim().length == 0) {
        return
    }
    let resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";
    let params = "api_key=" + API_KEY + "&q=" + gifInput + "&limit=5"+"&rating=g";
    let response = await fetch(API_URL + "?" + params, {method: "GET"}); // waits until request completion.
    let data = await response.json(); // waits until response completion
    for (item of data.data) {
        let imgElement = document.createElement("img");
        imgElement.src = item.images.downsized_medium.url;
        imgElement.alt = item.title;
        resultDiv.appendChild(imgElement);
    }
}

