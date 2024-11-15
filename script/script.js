document.getElementById('formEan').addEventListener('submit', async function (event) {
    event.preventDefault();
    var eanValue = document.getElementById("ean").value
    var SEARCH_NUMS = 2
    var api = `https://www.googleapis.com/customsearch/v1?key=AIzaSyC7pjSJa1KugHZjua9tUBG8e5Z8UNlOwWA&cx=91e5c57c4ff0147a1&num=${SEARCH_NUMS}&searchType=image&q=EAN:${eanValue}`
    let nomeProduto = "Nenhum produto encontrado"
    let produtos = {}

    await fetch(api, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    .then(resp => resp.json())
    .then(data => {
        if (data.items && data.items.length > 0) {
            nomeProduto = data.items[0].title;
        }
    })

    .catch ((err) => console.log("Erro na requisição:", err));

    const ml = `https://api.mercadolibre.com//sites/MLB/search?q=${nomeProduto}`

    await fetch(ml, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(data => {
        produtos = data.results;
    })

    function showAttributes () {
        var div = document.getElementById("img")
        var thead = document.getElementById("thead")
        var tbody = document.getElementById("tbody")

        // Apaga pesquisas anteriores
        thead.innerHTML = '';
        tbody.innerHTML = '';
        div.innerHTML = '';

        var produto = produtos[0]

        const trName = document.createElement("tr")

        const th = document.createElement("th")
        th.setAttribute("colspan", "2")
        th.textContent = produto.title

        trName.appendChild(th)
        thead.appendChild(trName)

        if (produto.attributes && Array.isArray(produto.attributes)) {
            produto.attributes.forEach(atributo => {

                const tr = document.createElement("tr")

                const attributeName = document.createElement("td");
                attributeName.classList.add("font-weight-bold");
                attributeName.textContent = atributo.name;

                const attributeValue = document.createElement("td");
                attributeValue.textContent = atributo.value_name;

                tr.appendChild(attributeName);
                tr.appendChild(attributeValue);
                tbody.appendChild(tr);
            });
        }

        const img = document.createElement("img")
        img.src = produto.thumbnail

        div.appendChild(img)
    }

    showAttributes();
})