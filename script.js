const accessKey = "WR8IGD2388I5bdpM_5ZvX9sWU1Vi86JZ17PdbMHPrkc";
const form = document.querySelector("form");
const inputel = document.getElementById("search_input");
const searchResults = document.getElementById("search-results");
const showmore = document.getElementById("show-more-btn");

let input_data = "";
let page = 1;

async function searchimages() {
    input_data = inputel.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${input_data}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if (page === 1) {
        searchResults.innerHTML = "";
    }
    results.map((result) => {
        const imgwrap = document.createElement('div');
        imgwrap.classList.add('search-result');
        const img = document.createElement('img');
        img.src = result.urls.regular;
        img.alt = result.alt_description;

        const imagelink = document.createElement('a');
        imagelink.href = result.links.html;
        imagelink.target = "_blank";

        imagelink.textContent = result.alt_description;

        imgwrap.appendChild(img);
        imgwrap.appendChild(imagelink);
        searchResults.appendChild(imgwrap);
    });

    page++;
    if (results.length > 0) {
        showmore.style.display = "block";
    } else {
        showmore.style.display = "none";
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchimages();
});

showmore.addEventListener("click", (e) => {
    searchimages();
});