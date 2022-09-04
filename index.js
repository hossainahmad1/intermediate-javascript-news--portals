const loadNav = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    fetch(url)
        .then(res => res.json())
        .then(data => displayNav(data.data.news_category))
}
const displayNav = loads => {
    const dataContainer = document.getElementById('data-container');
    loads.forEach(load => {
        toggleSpinner(true);
        // console.log(load);
        const createLi = document.createElement('li');
        createLi.innerHTML = `
        <p onclick ="loadData('${load.category_id}')"> ${load.category_name}</p>
        `;
        dataContainer.appendChild(createLi);
    });
}

// display show loadData
const loadData = async (id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    const res = await fetch(url)
    const data = await res.json()
    displayDataLoad(data.data);
}
const displayDataLoad = loadData => {
    const displayDataContainer = document.getElementById('display-data-container');
    displayDataContainer.innerHTML = '';
    loadData.forEach(show => {
        // console.log(show)
        const dataDiv = document.createElement('div');
        dataDiv.classList.add('col-12');
        dataDiv.innerHTML = `
                <div class="card mb-3" >
                <div class="row g-0">
                <div class="col-md-4">
                    <img src="${show.image_url}" class="img-fluid rounded-start" alt="...">
                 </div>
                        <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${show.title}</h5>
                            <p class="card-text text-muted">${show.details.slice(0, 300) + "..."}.</p>
                            <div class = "d-flex">
                                <div>
                                <img src="${show.author.img}" class="img-fluid rounded-circle" style="max-width: 50px;" alt="...">
                                </div>
                                <div>
                                    <p>${show.author.name ? show.author.name : 'No Author Name'}</p>
                                    <p class= "text-muted">${show.author.published_date}</p>
                                </div>
                                <div>${show.total_view ? show.total_view : 'No View'}</div>
                                <div>
                                    <button onclick="showDataDetails('${show._id}')" href= "#" class ="btn btn-primary ms-5" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
                                </div>
                            </div>
                        </div>
                `;
        displayDataContainer.appendChild(dataDiv);
    })
    toggleSpinner(false);
}

const showDataDetails = async id => {
    const url = ` https://openapi.programming-hero.com/api/news/${id}`
    const res = await fetch(url)
    const data = await res.json()
    displayDataDetails(data.data[0]);
}
const displayDataDetails = data => {
    console.log(data);
    const modalTitle = document.getElementById('data-title');
    modalTitle.innerHTML = `
    <h4>${data.author.name ? data.author.name : 'No Author Name'}</h4>
    `;
    const dataDetails = document.getElementById('data-details');
    dataDetails.innerHTML = `
    <p>Published date: ${data.author ? data.author.published_date : 'No published date'}</p>
    <img src="${data.author.img}" class="img-fluid rounded" style="max-width: 50px;" alt="...">
    `
}

// spinner
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading === true) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }
}


loadNav();
loadData('01');

