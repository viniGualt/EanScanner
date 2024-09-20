document.getElementById('formEan').addEventListener('submit', async function (event) {
    event.preventDefault();
    var eanValue = document.getElementById("ean").value
    console.log(eanValue)
    var SEARCH_NUMS = 1
    var api = `https://www.googleapis.com/customsearch/v1?key=AIzaSyC7pjSJa1KugHZjua9tUBG8e5Z8UNlOwWA&cx=91e5c57c4ff0147a1&num=${SEARCH_NUMS}&searchType=image&q=EAN:${eanValue}`


    var response = await fetch(api, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(resp => resp.json())
        .then(data => {
            console.log(data.items)
        })
        .catch((err) => console.log(err))
})