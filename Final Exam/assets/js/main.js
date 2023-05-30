let row = document.querySelector(".robotics")
let search = document.querySelector(".search")
let loadMore = document.querySelector(".load-btn")
let sortBtn = document.querySelector(".btn")
let BASE_URL = `http://localhost:5000/users`
let BASE_URLsecond = ` http://localhost:5000/favorite`
let allData = [];
let searchData = [];
let max = allData.value


axios(BASE_URL).then((res) => robotsCard(res.data))

function robotsCard(arr) {
    row.innerHTML = "";
    arr.forEach(element => {
        row.innerHTML += `
        <div class="col-md-3">
        <div class="robots-img">
            <img src="${element.photo}" alt="">
        </div>
        <div class="robots-text">
            <h4>${element.title}</h4>
            <p>${element.description}</p>
            <p>Price:${element.price}</p>
            
            <button>WIEW DETAILS</button>
        </div>
        <div class="icons">
            <i class="fa-solid fa-circle-info" href="details.html?id=${element.id}")></i>
            <i class="fa-regular fa-heart"  onclick=favIcon(${element.id})></i>
            <i class="fa-solid fa-trash"  onclick=deleteIcon(${element.id})></i>
            <i class="fa-regular fa-pen-to-square"  href="form.html?id=${element.id}"></i>
        </div>
    </div>
    
        `

    });
}
async function getAllInfo() {
    let firstInfo = await axios(BASE_URL)
    let getFirstInfo = firstInfo.data
    // let secondInfo = await axios(BASE_URLsecond)
    // let getSecondInfo=secondInfo.value
    allData = getFirstInfo
    searchData = search.value ? searchData : allData
    robotsCard(searchData.slice(0, max))
}
getAllInfo()


sortBtn.addEventListener("click", function () {
    if (sortBtn.innerHTML == 'sort') {
        searchData = searchData.sort((a, b) => b.price - a.price)
        sortBtn.innerHTML = 'ascending'

    } else if (sort.innerHTML == "ascending") {
        searchData = searchData.sort((a, b) => a.price - b.price)
        sortBtn.innerHTML = 'descending'

    } else {
        sortBtn.innerHTML = "sort"
    }
    robotsCard(searchData.slice(0, max))
})

async function deleteIcon(id) {
    await axios.delete(`${BASE_URL}/${id}`);

}


search.addEventListener("input", function (event) {
    searchData = allData
    searchData = searchData.filter((item) =>
        item.title.toLowerCase().includes(event.target.value.toLowerCase()))
        console.log(searchData);
    robotsCard(searchData.slice(0, max))
})


loadMore.addEventListener("click", function () {
    max += 3
    if (max >= searchData.length) {
        loadMore.style.display = "none"

    }
    if (searchData.length) {
        robotsCard(searchData.slice(0, max))


    } else {
        getAllInfo()
    }
})