// Add Spinner
const toggleSpinner = displayStyle =>{
    document.getElementById('spinner').style.display = displayStyle;
}

// Add Search Result
const toggleSearchResult = displayStyle => {
    document.getElementById('count-result').style.display = displayStyle;
}




// Fectch Data
const searchBtn = () => {
    const searchBook = document.getElementById('search-box');
    const searchText = searchBook.value;

    toggleSpinner('block');
    

    // clear data
    searchBook.value = '';

    const url = `https://openlibrary.org/search.json?q=${searchText}`

    // load data
    const noResultFound = document.getElementById('no-result-found');
    noResultFound.textContent = '';

    if(searchText == ''){
        const p = document.createElement('p');
        p.innerHTML = `<p class="fw-bold text-center text-warning">Please write something</p>`

        noResultFound.appendChild(p)
        toggleSpinner('none')
        toggleSearchResult('none')
        
    }

    else{
        
        // books Found
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.docs))

        // result found
        fetch(url)
            .then(res => res.json())
            .then(data => showResultCount(data.numFound))
    }
    
}

// Display search result
const showResultCount = numFound =>{
    const countFoundResult = document.getElementById('count-result')
    countFoundResult.textContent = '';

    const p =  document.createElement('p')
    p.innerHTML = `<p>Search result : ${numFound}</p>`
    countFoundResult.appendChild(p)
}

// Display Data
const displaySearchResult = docs =>{

        // Search result add
        const searchResult = document.getElementById('search-result');
        searchResult.textContent = '';

        // No result found
        const noResultFound = document.getElementById('no-result-found');
        noResultFound.textContent = '';

        if(docs.length == 0){
            const p = document.createElement('p');
            p.innerHTML = `<p class="fw-bold text-center text-warning">No Result Found</p>`

            noResultFound.appendChild(p)

            toggleSpinner('none')
            toggleSearchResult('none')
        }
        
        else{
            docs?.forEach(doc => {
                const div = document.createElement('div');
                div.classList.add('col-lg-4');
                div.innerHTML = `
        <div class="card">
            <img src="https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg" class="card-img-top img-fluid w-100">
            <div class="card-body">
            <div>
                <h4 class="card-title">${doc.title}</h4>
                <p class="card-text text-muted mt-4"><span class="fw-bold">Author Name:</span> ${doc.author_name}</p>
                <p class="card-text text-muted"><span class="fw-bold">Publisher:</span> ${doc.publisher}</p>
                <p class="card-text text-muted"><span class="fw-bold">First Published:</span> ${doc.first_publish_year}</p>
            </div>
            </div>
        </div>
        `
                searchResult.appendChild(div);
                toggleSearchResult('block')
            })
        }
        
        toggleSpinner('none');
}

