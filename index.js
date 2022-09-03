const loadNav = () => {
    const url = ` https://openapi.programming-hero.com/api/news/categories`
    fetch(url)
        .then(res => res.json())
        .then(data => displayNav(data.data.news_category))
}
const displayNav = loads => {
    const dataContainer = document.getElementById('data-container');
    
    loads.forEach(load => {

        console.log(load);
        const createLi = document.createElement('li');
        createLi.innerHTML = `
        <p onclick ="loadData('${load.category_id}')"> ${load.category_name}</p>
        `;
        dataContainer.appendChild(createLi);
    });
}


// const loadDataDetails = async (id) => {
//     const url = `https://openapi.programming-hero.com/api/news/category/${id}`
//     const res = await fetch(url)
//     const data = await res.json()
//     displayloadData(data.data);
// }
// const displayloadData = data => {
//     console.log(data);
// }


// loadData display show
const loadData = async (id) => {
    const url = ` https://openapi.programming-hero.com/api/news/category/${id}`
    const res = await fetch(url)
    const data = await res.json()
    displayDataLoad(data.data);
}
const displayDataLoad = loadData => {
    const displayDataContainer = document.getElementById('display-data-container');
    loadData.forEach(show => {
        console.log(show)

        const dataDiv = document.createElement('div');
        dataDiv.classList.add('row');
        dataDiv.innerHTML = `
                    <div class="col-md-4">
                        <img src="${show.image_url}" class="img-fluid rounded-start" alt="...">
                    </div>
                  <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${show.title}</h5>
                            <p class="card-text text-muted">${show.details}.</p>
                            <div class = "d-flex">
                                <div>
                                <img src="${show.author.img}" class="img-fluid rounded" style="max-width: 50px;" alt="...">
                                </div>
                                <div>
                                    <p>${show.author.name}</p>
                                    <p class= "text-muted">${show.author.published_date}</p>
                                </div>
                                <div>
                                <button class = "btn btn-primary">Show Details</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
        displayDataContainer.appendChild(dataDiv);
    })
}

loadNav();

loadData();

