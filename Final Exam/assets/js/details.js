let row = document.querySelector(".details");
let id = new URLSearchParams(window.location.search).get("id");
let BASE_URL = `http://localhost:5000/users`

function detailsCard(array) {
    row.innerHTML = "";
    item.forEach(item => {
        row.innerHTML = `
        <div class="col-md-3">
        <div class="robots-img">
            <img src="${item.photo}" alt="">
        </div>
        <div class="robots-text">
            <h4>${item.title}</h4>
            <p>${item.description}</p>
            <button>WIEW DETAILS</button>
        </div>
        <div class="icons">
      
            <i class="fa-solid fa-trash" onclick=deleteIcon(${item.id})></i>
      
        </div>
      </div> 
        
    });
    
        `;
}
 async function getData() {
    let resp = await axios(`${BASE_URL}/${id}`);
    let data = resp.data;
    console.log(data);
    detailsCard(data);
}
getData();
