let btn = document.querySelector("#button-search")
btn.addEventListener("click", function(){
    let inputValue = input.value;
    if(inputValue.includes("juice")){
        loadJuice()
        return;
    }    
    loadFood(inputValue)
    input.value = ""
})
const juiceUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita`
let input = document.querySelector("#input")
document.querySelector("#breakfast").addEventListener("click",function(){loadFood("breakfast")})
document.querySelector("#lunch").addEventListener("click",function(){loadFood("fish")})


function loadFood(inputValue) {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`
    let returnedData ;        
    fetch(url)
        .then(res => res.json())
        .then(data => {
            displayItem(data.meals)
            returnedData = data
    })  
   return returnedData;
}


let showedItem = document.querySelector(".show-food")
let foods = document.querySelector(".main-food")
document.querySelector("#drinks").addEventListener("click",function(){
    loadJuice(juiceUrl,showedItem)
})
function displayItem(data) {
    showedItem.textContent = ""
    console.log(data)

    if(!data){
      
        showedItem.innerHTML = `<h2>sorry! Your searched item is not present</h2>`
    }else{
        data.forEach(item => {
            showedItem.innerHTML += `
            <div class="card food-card mx-4 my-4" style="width: 18rem;">
                <img src="${item.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 id="heading" class="card-title">${item.strMeal}</h5>
                </div>
                <button id="btn-details" class="btn-details btn btn-danger" onclick="loadSingleProduct ('${item.idMeal}')" >Order Now</button>
            </div>
        `
        });
    }
    
}

function loadSingleProduct(id) {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    fetch(url)
    .then(res => res.json())
    .then (data => displaySingleProduct(data.meals[0]))

}
let mainFood = document.querySelector(".main-food")
const displaySingleProduct = (data) =>{
    const priceList = price()
    let desc = document.querySelector("#description");
    desc.innerHTML = ""
    desc.innerHTML = `
    <img src="${data.strMealThumb}" class="card-img-top" alt="...">
    <h5 id="heading">${data.strMeal}</h5>
    `
    const classItem = ["d-flex", "justify-content-center", "align-items-center", "my-5"]
    desc.append(priceList)
    desc.classList.add(...classItem)
    mainFood.textContent = ''
    mainFood.prepend(desc)
}

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
          <button class="btn btn-primary mt-3 add" ><i class="fa fa-plus" aria-hidden="true"></i></button>
          <button class="btn btn-primary mt-3 mx-3 remove"><i class="fa fa-minus" aria-hidden="true"></i></button>
          </div>
         ` 
         return div;
}
// document.querySelector(".add").addEventListener("click",function(){
//     document.querySelector("#price").innerText = priceValue + 480;
// })
// document.querySelector(".remove").addEventListener("click",function(){
//     if (priceValue > 0) {
//         document.querySelector("#price").innerText = priceValue - 480;
//     }
// })



function displayJuice(data,showedItem) {
    showedItem.textContent = ""

if(!data){
    showedItem.innerHTML = `<h2>sorry! Your searched item is not present</h2>`   
}else{
    data.forEach(item => {
        showedItem.innerHTML += `
        <div class="card food-card mx-4 my-4" style="width: 18rem;">
            <img src="${item.strDrinkThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 id="heading" class="card-title">${item.strDrink}</h5>
            </div>
            <button id="btn-details" class="btn-details btn btn-danger">Order Now</button>
        </div>
    `
    });
    let btn = document.querySelector("#btn-details")
    console.log(btn)
    btn.addEventListener("click", function (e) {
        console.log(this)
        const priceList = price()
        let item = e.target.parentNode.parentNode;
        let showOod = document.querySelector("#show-food")
        let desc = document.querySelector("#description");
        desc.innerHTML = ""
        desc.innerHTML = item.innerHTML;
        const classItem = ["d-flex", "justify-content-center", "align-items-center","my-5"]
        desc.append(priceList)
        desc.classList.add(...classItem)
        item.innerHTML = ''
    })
}
   
}
function loadJuice(juiceUrl,showedItem){
    fetch(juiceUrl)
.then(res=>res.json())
.then(data=>
        displayJuice(data.drinks,showedItem))
}


