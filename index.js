let iconCart = document.querySelector(".cart-icon");
let closeCart = document.querySelector(".close");
let body = document.querySelector("body");
let listproductHTML = document.querySelector(".listproduct");
let ListCartHTML = document.querySelector(".list-cart");
let iconCartSpan = document.querySelector(".cart span");

let listproducts = [];
let carts = [];

iconCart.addEventListener("click", () => {
  body.classList.toggle("showcart");
});
closeCart.addEventListener("click", () => {
  body.classList.toggle("showcart");
});

const addDataToHTML = () => {
  listproductHTML.innerHTML = "";
  if (listproducts.length > 0) {
    listproducts.forEach((product) => {
      let newProduct = document.createElement("div");
      newProduct.classList.add("items");
      newProduct.dataset.id = product.id;
      newProduct.innerHTML = `
            <img src=${product.image} alt="">
            <h2>${product.name}</h2>
            <div class="amount">$${product.price}</div>
            <button class="addcart "> 
              Add Cart
            </button>`;
      listproductHTML.appendChild(newProduct);
    });
  }
};

listproductHTML.addEventListener("click", (event) => {
  let positionClick = event.target;
  if (positionClick.classList.contains("addcart")) {
    let product_id = positionClick.parentElement.dataset.id;
    addToCart(product_id);
  }
});

const addToCart = (product_id) => {
  let positionThisProductInCart = carts.findIndex(
    (value) => value.product_id == product_id
  );
  if (carts.length <= 0) {
    carts = [
      {
        product_id: product_id,
        quantity: 1,
      },
    ];
  } else if (positionThisProductInCart < 0) {
    carts.push({
      product_id: product_id,
      quantity: 1,
    });
  } else {
    carts[positionThisProductInCart].quantity =
      carts[positionThisProductInCart].quantity + 1;
  }
  addCartToHTML();
  addCartToMemory();
};
const addCartToMemory = () => {
  localStorage.setItem("cart", JSON.stringify(carts));
};
const addCartToHTML = () => {
  ListCartHTML.innerHTML = "";
  let totalQuantity = 0;
  if (carts.length > 0) {
    carts.forEach((cart) => {
      totalQuantity = totalQuantity + cart.quantity;
      let newCart = document.createElement("div");
      newCart.classList.add("item");
      newCart.dataset.id = cart.product_id;
      let positionProduct = listproducts.findIndex(
        (value) => value.id == cart.product_id
      );
      let info = listproducts[positionProduct];
      newCart.innerHTML = `
             <div class="chimage">
             <img src="${info.image}" alt="">
         </div>
         <div class="chname">
             ${info.name}
         </div>
         <div class="chtotalprice">
             $${info.price * cart.quantity}
         </div>
         <div class="chquantity">
             <span class="chminus">-</span>
             <span>${cart.quantity}</span>
             <span class="chplus">+</span>
         </div>
         `;
      ListCartHTML.appendChild(newCart);
    });
  }
  iconCartSpan.innerText = totalQuantity;
};
ListCartHTML.addEventListener("click", (event) => {
  let positionClick = event.target;
  if (
    positionClick.classList.contains("chminus") ||
    positionClick.classList.contains("chplus")
  ) {
    let product_id = positionClick.parentElement.parentElement.dataset.id;
    let type = "chminus";
    if (positionClick.classList.contains("chplus")) {
      type = "chplus";
    }
    changeQuantity(product_id, type);
  }
});
const changeQuantity = (product_id, type) => {
  let positionItemInCart = carts.findIndex(
    (value) => value.product_id == product_id
  );
  if (positionItemInCart >= 0) {
    switch (type) {
      case "chplus":
        carts[positionItemInCart].quantity =
          carts[positionItemInCart].quantity + 1;
        break;

      default:
        let changeQuantity = carts[positionItemInCart].quantity - 1;
        if (changeQuantity > 0) {
          carts[positionItemInCart].quantity = changeQuantity;
        } else {
          carts.splice(positionItemInCart, 1);
        }
        break;
    }
  }
  addCartToHTML();
  addCartToMemory();
};
const initApp = () => {
  // get data from json
  fetch("product.json")
    .then((Response) => Response.json())
    .then((data) => {
      listproducts = data;
      console.log(listproducts);
      addDataToHTML();

      //   get cart from memory
      if (localStorage.getItem("cart")) {
        carts = JSON.parse(localStorage.getItem("cart"));
        addCartToHTML();
      }
    });
};
initApp();

const collageImages = [...document.querySelectorAll(".collage.img")];

collageImages.map((item, i) => {
  item.addEventListener("mouseover", () => {
    collageImages.map((image, index) => {
      if (index != 1) {
        image.style.filter = "blur(10px)";
        item.style.zIndex = 2;
      }
    });
  });
  item.addEventListener("mouseleave", () => {
    collageImages.map((image, index) => {
      image.style = null;
    });
  });
});





// Add this code to update the total price display
const totalPriceDisplay = document.getElementById("totalPriceDisplay");

const calculateTotalPrice = () => {
  return carts.reduce((sum, cart) => {
    let productInfo = listproducts.find((value) => value.id == cart.product_id);
    return sum + productInfo.price * cart.quantity;
  }, 0);
};

const updateTotalPriceDisplay = () => {
  let totalPrice = calculateTotalPrice();
  totalPriceDisplay.textContent = totalPrice > 0 ? `Total Price: $${totalPrice}` : "";
};

// Function to clear the cart
const clearCart = () => {
  carts = [];
  localStorage.removeItem("cart");
};

// Event listener for cart-related changes
document.body.addEventListener("click", (event) => {
  if (
    event.target.classList.contains("addcart") ||
    event.target.classList.contains("chminus") ||
    event.target.classList.contains("chplus")
  ) {
    updateTotalPriceDisplay();
  }
});

// Event listener for the checkout button
document.getElementById("checkout-btn").addEventListener("click", () => {
  // Ensure the cart is cleared before updating the total price
  clearCart();
  updateTotalPriceDisplay();
  alert("Checkout Successful!"); // Replace this line with your actual checkout logic
});

// Update the total price display initially
updateTotalPriceDisplay();








// let totalcount = 0;

// const countMain = ( id, plus) => {
//   let totalcount = 0;
//   document.getElementById(id).onclick = function () {
//     document.getElementById(plus).onclick = function () {
//         totalcount += 1;
//         document.getElementById("cart-total-count").innerHTML = totalcount;
//         updatetotalcount();
//   };

//   }
// //   function updatetotalcount() {
// //     totalcount =+ count
// //     document.getElementById("cart-item-count").innerHTML = totalcount;
// //   }
// };

// countMain(0, "plus");
// countMain(0, "plus1");
// countMain(0, "plus2");
// countMain(0,  "plus3");

// document.getElementById("minus").onclick = function(){
//     if(count == 0){
//         return
//     }
//     count-=1
//     document.getElementById("quantity").innerHTML = count;
//     updatetotalcount()
// }
// document.getElementById("plus").onclick = function(){
//     count+=1
//     document.getElementById("quantity").innerHTML = count;
//     updatetotalcount()
// }

// let count1 = 0;

// document.getElementById("minus1").onclick = function () {
//   if (count1 == 0) {
//     return;
//   }
//   count1 -= 1;
//   document.getElementById("quantity1").innerHTML  = count1;
//   updatetotalcount();
// };
// document.getElementById("plus1").onclick = function () {
//   count1 += 1;
//   document.getElementById("quantity1").innerHTML = count1;
//   updatetotalcount();
// };

// let count2 = 0;

// document.getElementById("minus2").onclick = function () {
//   if (count2 == 0) {
//     return;
//   }
//   count2 -= 1;
//   document.getElementById("quantity2").innerHTML = count2;
//   updatetotalcount();
// };
// document.getElementById("plus2").onclick = function () {
//   count2 += 1;
//   document.getElementById("quantity2").innerHTML = count2;
//   updatetotalcount();
// };

// let count3 = 0;

// document.getElementById("minus3").onclick = function () {
//   if (count3 == 0) {
//     return;
//   }
//   count3 -= 1;
//   document.getElementById("quantity3").innerHTML = count3;
//   updatetotalcount();
// };
// document.getElementById("plus3").onclick = function () {
//   count3 += 1;
//   document.getElementById("quantity3").innerHTML = count3;
//   updatetotalcount();
// };

let btn = document.getElementById("fa-heart");
btn.addEventListener("click", function onClick() {
  btn.classList.toggle("likedheart");
});

let btn1 = document.getElementById("fa-heart1");
btn1.addEventListener("click", function onClick() {
  btn1.classList.toggle("likedheart");
});

let btn2 = document.getElementById("fa-heart2");
btn2.addEventListener("click", function onClick() {
  btn2.classList.toggle("likedheart");
});

let btn3 = document.getElementById("fa-heart3");
btn3.addEventListener("click", function onClick() {
  btn3.classList.toggle("likedheart");
});
