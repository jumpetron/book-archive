const toggleSpinner = displayStyle =>{
    document.getElementById('spinner').style.display = displayStyle;
}



const searchField = () => {
    const searchBook = document.getElementById('search-box');
    const searchText = searchBook.value;
    

    toggleSpinner('block')

    // clear data
    searchBook.value = '';

    const url = `https://openlibrary.org/search.json?q=${searchText}`

    // load data
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.docs))
}

const displaySearchResult = docs =>{
    
        const searchResult = document.getElementById('search-result');
        searchResult.textContent = '';

        const noResultFound = document.getElementById('no-result-found');

        noResultFound.textContent = '';

        if(docs.length == 0){
            

            const p = document.createElement('p');
            p.innerHTML = `<p class="fw-bold text-center text-warning">No Result Found</p>`

            noResultFound.appendChild(p)
        } 
        
        else{
            docs?.forEach(doc => {
                console.log(doc)

                const div = document.createElement('div');
                div.classList.add('col-lg-4');
                div.innerHTML = `
        <div class="card">
            <img src="https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg" class="card-img-top img-fluid w-100">
            <div class="card-body">
                <h4 class="card-title">${doc.title}</h4>
                <p class="card-text text-muted mt-4"><span class="fw-bold">Author Name:</span> ${doc.author_name}</p>
                <p class="card-text text-muted"><span class="fw-bold">Publisher:</span> ${doc.publisher}</p>
                <p class="card-text text-muted"><span class="fw-bold">First Published:</span> ${doc.first_publish_year}</p>
            </div>
        </div>
        `
                
                searchResult.appendChild(div);
            })
        }
        
        toggleSpinner('none');
}

