let iconCart = document.querySelector('.cart-icon');
let closeCart = document.querySelector('.close');
let body = document.querySelector('body')
let listProductHTML = document.querySelector('listProduct');

let listProduct = [];

iconCart.addEventListener('click', () => {
    body.classList.toggle('showcart')
})
closeCart.addEventListener('click', () => {
    body.classList.toggle('showcart')
})

const initApp = () => {
    // get data from json
    fetch('product.json')
    .then(Response => Response.json())
    .then(data => {
        listProduct = data;
        console.log(listProduct); 
    })
}
initApp();


const collageImages = [...document.querySelectorAll('.collage.img')]

collageImages.map((item, i) => {
    item.addEventListener('mouseover', () => {
        collageImages.map((image, index) => {
            if(index !=1){
                image.style.filter = 'blur(10px)'; 
                item.style.zIndex = 2; 
            }
        })
    })
    item.addEventListener('mouseleave', () => {
        collageImages.map((image, index) => {
            image.style = null; 
        })
    })
})


let count = 0;
let totalcount = 0
function updatetotalcount(){
    totalcount = count + count1 + count2 + count3
    document.getElementById("cart-item-count").innerHTML = totalcount
}

document.getElementById("minus").onclick = function(){
    if(count == 0){
        return
    }
    count-=1 
    document.getElementById("quantity").innerHTML = count;
    updatetotalcount()
}
document.getElementById("plus").onclick = function(){
    count+=1 
    document.getElementById("quantity").innerHTML = count;
    updatetotalcount()
}

let count1 = 0;

document.getElementById("minus1").onclick = function(){
    if(count1 == 0){
        return
    }
    count1-=1 
    document.getElementById("quantity1").innerHTML = count1;
    updatetotalcount()
}
document.getElementById("plus1").onclick = function(){
    count1+=1 
    document.getElementById("quantity1").innerHTML = count1;
    updatetotalcount()
}

let count2 = 0;

document.getElementById("minus2").onclick = function(){
    if(count2 == 0){
        return
    }
    count2-=1 
    document.getElementById("quantity2").innerHTML = count2;
    updatetotalcount()
}
document.getElementById("plus2").onclick = function(){
    count2+=1 
    document.getElementById("quantity2").innerHTML = count2;
    updatetotalcount()
}

let count3 = 0;

document.getElementById("minus3").onclick = function(){
    if(count3 == 0){
        return
    }
    count3-=1 
    document.getElementById("quantity3").innerHTML = count3;
    updatetotalcount()
}
document.getElementById("plus3").onclick = function(){
    count3+=1 
    document.getElementById("quantity3").innerHTML = count3;
    updatetotalcount()
}


let btn = document.getElementById("fa-heart");
btn.addEventListener('click', function onClick() {
    btn.classList.toggle("likedheart")
})

let btn1 = document.getElementById("fa-heart1");
btn1.addEventListener('click', function onClick() {
    btn1.classList.toggle("likedheart")
})

let btn2 = document.getElementById("fa-heart2");
btn2.addEventListener('click', function onClick() {
    btn2.classList.toggle("likedheart")
})

let btn3 = document.getElementById("fa-heart3");
btn3.addEventListener('click', function onClick() {
    btn3.classList.toggle("likedheart")
})