let galleryView = document.querySelector("#view")
let main = document.querySelector("#main-section")

// galleryView maintain 
galleryView.addEventListener("click", function (e) {

    main.textContent = ""
    e.target.parentNode.marginTop = 0;
    e.target.parentNode.childNodes[1].classList.remove("mt-5");
    main.innerHTML = e.target.parentNode.innerHTML;
    main.removeChild(main.lastElementChild)


})


function sendMail(value) {
    var link = "mailto:me@example.com" +
        "?cc=myCCaddress@example.com" +
        "&subject=" + encodeURIComponent("This is my subject") +
        "&body=" + encodeURIComponent(value);

    window.location.href = link;
}

// contact section maintain 
let contact = document.querySelector("#contact")
contact.addEventListener("click", function () {
    main.textContent = ''
    main.innerHTML = `
  <div class="container">
        <div class=" w-50 mx-auto py-5  form">
            <input  type="text" class="form-control mt-4" id="name" placeholder="Your name">

            <input  type="email" class="form-control mt-4" id="email" placeholder="name@example.com">

            <div class="mb-3">
            <textarea class="form-control mt-5" id="comment" rows="3" placeholder = "Your Commnet"></textarea>
            </div>

            <button id="data-btn" class="btn fw-bold food-btn rounded-0"> Send Data</button>
        </div>
</div>
    
    `

    let form = document.querySelector(".form")
    form.addEventListener("click", function (e) {
        if (e.target.classList.contains("btn")) {
            let nameInput = document.querySelector("#name")
            let emailInput = document.querySelector("#email")
            let comment = document.querySelector("#comment")
            let value = nameInput.value + " " + emailInput.value + " " + comment;
            sendMail(value)

            nameInput.value = ""
            emailInput.value = ""
            comment.value = ""
        }
    })

})


// handletop btn

let gotop = document.querySelector("#go-top")
gotop.addEventListener("click", goTop)

function goTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    document.body.style.transition = "all 2s"
}

function handleBtn() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        gotop.style.display = "block"
    } else {
        gotop.style.display = "none"
    }
}

window.onscroll = function () {
    handleBtn()
}

fetch(`https://world.openfoodfacts.org/api/v0/product/`)
    .then(res => res.json())
    .then(data => console.log(data))