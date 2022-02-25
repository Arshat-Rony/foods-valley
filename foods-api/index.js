let btn = document.querySelector("#button-search")
btn.addEventListener("click", loadFood)
let input = document.querySelector("#input")

function loadFood() {
    let inputValue = input.value;
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${input.value}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayItem(data.meals))
    input.value = ""
}

let showedItem = document.querySelector(".show-food")

function displayItem(data) {
    showedItem.textContent = ""
    data.forEach(item => {
        showedItem.innerHTML += `
        <div class="card mx-4 my-4" style="width: 18rem;">
            <img src="${item.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 id="heading" class="card-title">${item.strMeal}</h5>
            </div>
            <button id="btn-details" class="btn-details btn btn-danger">Order Now</button>
        </div>
    `
    });
    let btn = document.querySelector("#btn-details")
    btn.addEventListener("click", function (e) {
        const priceList = price()
        let item = e.target.parentNode.parentNode;
        let showOod = document.querySelector("#show-food")
        console.log(showOod)
        let desc = document.querySelector("#description");
        desc.innerHTML = ""
        // showOod.innerHTML = ""
        desc.innerHTML = item.innerHTML;
        const classItem = ["d-flex", "justify-content-center", "align-items-center"]
        desc.append(priceList)
        desc.classList.add(...classItem)
        item.innerHTML = ''
    })
}

// function loadMainFood() {

//     fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=a')
//         .then(res => res.json())
//         .then(data => displayMainFood(data.meals))
// }
// loadMainFood()

let heading = document.querySelectorAll("#heading")

function loadDetails(searchItem) {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchItem}`
    fetch(url)
        .then(res => res.json())
        .then(data => displaySpecialItem(data.meals));
}
let specialItem = document.querySelector(".specialitem")
specialItem.style.display = "none"
let card = document.querySelectorAll(".container")[0]
console.log(card)
let btnDetails = document.querySelectorAll("#btn-details")

// function foodsBank(item) {
//     const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${item}`
//     fetch(url)
//         .then(response => response.json())
//         .then(data => displaySpecialItem(data.meals))
// }

let mainFood = document.querySelector(".main-food")
let allbtn = document.querySelectorAll("#btn-details")
allbtn.forEach(btn => {
    btn.addEventListener("click", function (e) {
        const priceList = price()
        let item = e.target.parentNode.parentNode;
        let desc = document.querySelector("#description");
        desc.innerHTML = ""
        desc.innerHTML = item.innerHTML;
        desc.appendChild(priceList)
        const classItem = ["d-flex", "justify-content-center", "align-items-center", "float"]
        const classItem2 = ["d-flex", "mt-5", "justify-content-evenly", "align-items-center"]
        desc.classList.add(...classItem)
        let newDiv = document.createElement('div')
        newDiv.append(desc)
        newDiv.append(priceList)
        newDiv.classList.add(...classItem2)
        mainFood.append(newDiv)
    })
})

function price() {
    let div = document.createElement("div")
    div.innerHTML = `
            <h2 class= "text-center mt-3 fs-1 fw-bold" >Your Delicious Food</h2> 
            <h2 class= "text-center mt-3 fs-1 fw-bold" >Taste It By Placing Order</h2> 
            
            <h2 class= "text-center mt-3" >Price : <span id="price"> 480</span>Tk </h2> 
          <div class = "d-flex justify-content-center align-items-center " >
          <button class="btn btn-primary mt-3 add"><i class="fa fa-plus" aria-hidden="true"></i></button>
          <button class="btn btn-primary mt-3 mx-3 remove"><i class="fa fa-minus" aria-hidden="true"></i></button>
          </div>
 
         `

    div.addEventListener("click", function (e) {
        let priceValue = parseInt(document.querySelector("#price").innerText);
        if (e.target.classList.contains("add")) {
            document.querySelector("#price").innerText = priceValue + 480;
        } else if (e.target.classList.contains("remove")) {
            if (priceValue > 0) {
                document.querySelector("#price").innerText = priceValue - 480;
            }
        }
    })
    return div;
}

// function displaySpecialItem(data) {
//     // mainFood.classList.add("d-flex");

//     desc.textContent = ""

//     console.log(data)
//     specialItem.style.display = "block"
//     console.log(specialItem)
//     data.forEach(meal => {
//         specialItem.innerHTML += `
//     <div class="card mx-4 my-4" style="width: 18rem;">
//     <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
//         <div class="card-body">
//             <h5 class="card-title fs-1 fw-bold">${meal.strMeal}</h5>
//             <p class="card-text">${meal.strInstructions.slice(0,200)}.</p>
//             <button id="order-now" class="btn-details btn btn-danger">Order Now</button>
//         </div>                       
//     </div> 

// <div>
// `
//     })
// }