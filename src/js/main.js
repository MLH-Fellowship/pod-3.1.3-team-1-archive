window.onload = async (event) => {
    fetch("https://quotes.rest/qod?language=en", requestOptions)
        .then(response => response.json())
        .then((result) => {
            const quote = result['contents']['quotes'][0];
            document.getElementById("quote").innerHTML = `“${quote.quote}”`;
            document.getElementById("author").innerHTML = `~ ${quote.author}`;
        })
        .catch(error => console.log('error', error));
};