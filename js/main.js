const toggleSpinner = displayStyle =>{
    document.getElementById('spinner').style.display = displayStyle;
}



const searchField = () => {
    const searchBook = document.getElementById('search-box');
    const searchText = searchBook.value;
    

    toggleSpinner('block')
    searchBook.value = '';

    const url = `https://openlibrary.org/search.json?q=${searchText}`

    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.docs))
}

const displaySearchResult = docs =>{
    const searchResult = document.getElementById('search-result');
    
    searchResult.textContent = '';
    docs.forEach (doc => {
        console.log(doc)

        const div = document.createElement('div');
        div.classList.add('col-lg-4');
        div.innerHTML = `
        <div class="card">
            <img src="https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg" class="card-img-top img-fluid w-100">
            <div class="card-body">
                <h5 class="card-title">${doc.title}</h5>
                <p class="card-text">Author Name: ${doc.author_name}</p>
                <p class="card-text">Publisher: ${doc.publisher}</p>
                <p class="card-text">First Published: ${doc.first_publish_year}</p>
            </div>
        </div>
        `

        searchResult.appendChild(div)
    })
    toggleSpinner('none')
}

