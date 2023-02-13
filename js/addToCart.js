// CART
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#close-cart");
const cartContent = document.querySelector(".cart-content");
const cartTemplate = document.querySelector("#cart");
let myCart = [];
const tmpData = [];

// const amountItem = document.querySelector('#cart-icon')

//Open Cart
cartIcon.onclick = () => {
  cart.classList.add("active");
};
//Close Cart
closeCart.onclick = () => {
  cart.classList.remove("active");
};

//Cart Working JS
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

// ===================================
// From bottom JSON
// ===================================
async function getProductsData() {
  const res = await sendHTTPRequest(
    "GET",
    "https://gist.githubusercontent.com/Spling17/07221f7ee7e0e878b496a44fcbb9961a/raw/b6942b1fa385845b8c1ee15702855975e763ed6d/products.json"
  );
  const productTemplate = document.querySelector("template");
  const items = document.querySelector(".items");
  for (const product of res) {
    // product list
    const productElClone = document.importNode(productTemplate.content, true);
    productElClone.querySelector("img").setAttribute("src", product.imgSrc);
    productElClone.querySelector(".productName").textContent = product.name;
    productElClone.querySelector(".productPrice").textContent = product.price;
    productElClone.querySelector(".description").textContent =
      product.description;
    productElClone.querySelector(".item").id = product.id;

    //attach even eventlistener on addbtn
    productElClone
      .querySelector(".addbtn")
      .addEventListener("click", function () {
        console.log(product);
        addCartClicked(product);
      });

    items.appendChild(productElClone);
    // cart-box.appendChild(productElClone)
  }
  // addCartClicked(res);
}

async function sendHTTPRequest(method, url) {
  const { data } = await axios(url, { method });
  console.log(data);
  return data;
}

window.addEventListener("DOMContentLoaded", getProductsData);

//Making Function
function ready() {
  //   // Remove Items From Cart
  //   const removeCartButtons = document.getElementsByClassName('cart-remove')
  //   console.log(removeCartButtons)
  //   for (let i = 0; i < removeCartButtons.length; i++){
  //     const button = removeCartButtons[i]
  //     button.addEventListener('click', removeCartItem)
  //   }
  //   //Quantity Changes
  //   const quantityInputs = document.getElementsByClassName("cart-quantity");
  //   for (let i = 0; i < quantityInputs.length; i++){
  //     const input = quantityInputs[i];
  //     input.addEventListener("change", quantityChanged);
  //   }
  //   //Add To Cart
  //   const addCart = document.getElementsByClassName('addbtn');
  //   for (let i = 0; i < addCart.length; i++){
  //     const button = addCart[i];
  //     button.addEventListener("click",addCartClicked)
  //   }
  //   // //Buy Button Work
  //   // document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyButtonClicked);
}

//Buy Button
function buyButtonClicked() {
  alert("Your Order is placed");
  const cartContent = document.getElementsByClassName("cart-content")[0];
  while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
  }
  upDataTotal();
}

//Remove Items From Cart
function removeCartItem(event) {
  const buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  upDataTotal();
}

//Quantity Changes
function quantityChanged(event, id) {
  const input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  
  //update the myCart product quantity
  myCart.forEach(cart => {
    if(cart.id === id){
      cart.quantity += 1
    }
  })

  upDataTotal();
}

function addCartClicked(product) {
  if (myCart.length === 0) {
    product.quantity = 1;
    myCart.push(product);
  } else {
    //check if product exists in the cart and return the index of the element in the cart array
    const foundIndex = myCart.findIndex((cart) => cart.id === product.id);

    // -1 means it didnt find the product in myCart array
    if (foundIndex !== -1) {
      //product exists in cart, update the quantity
      myCart[foundIndex].quantity += 1;
    } else {
      //add new product to cart (doesnt exists)
      product.quantity = 1;
      myCart.push(product);
    }
  }

  createEl();
}

// function addCartClicked(res) {
//   const addBtns = document.querySelectorAll(".addbtn");
//   let currQuantity = 0;
//   // const addVal = 1
//   addBtns.forEach((item) => {
//     item.addEventListener("click", function (e) {
//       e.preventDefault();
//       const thisID = this.parentElement.id;
//       if (tmpData.length > 0) tmpData.pop();

//       let isExist = false;
//       for (const product of myCart) {
//         if (product.id == thisID) isExist = true;
//       }

//       while (cartContent.firstChild) {
//         cartContent.removeChild(cartContent.firstChild);
//       }

//       if (!isExist) {
//         for (const product of res) {
//           if (thisID == product.id) {
//             product["quantity"] = 0;
//             product.quantity += 1;
//             myCart.push(product);
//             tmpData.push(product);
//             createEl(myCart, thisID);
//           }
//         }
//         console.log("Not Exist");
//       } else {
//         console.log("Exist");
//         updEl(myCart, thisID);
//       }
//       // document
//       //   .querySelector('.cart-quantity')
//       //   .setAttribute('value', currQuantity)
//       console.log(document.querySelector(".cart-quantity"));
//       console.log(tmpData);
//     });
//   });
// }

function createEl() {
  cartContent.innerHTML = "";
  myCart.forEach((cartItem) => {
    // if (cartItem.id == thisId) {
    const cartElClone = document.importNode(cartTemplate.content, true);

    const quantityClone = cartElClone.querySelector(".cart-quantity")
    quantityClone.setAttribute("value", cartItem.quantity);
    quantityClone.addEventListener("change", (event) => quantityChanged(event, cartItem.id))

    cartElClone.querySelector(".cart-price").textContent = cartItem.price;
    cartElClone.querySelector(".cart-product-title").textContent =
      cartItem.name;
    cartElClone.querySelector(".detail-cox");
    cartElClone.querySelector(".cart-img").setAttribute("src", cartItem.imgSrc);
    cartElClone.querySelector(".cart-box").id = cartItem.id;
    cartContent.appendChild(cartElClone);
    // }
  });

  upDataTotal();
}

// Add To Cart
//   function addCartClicked(event){
//     const button = event.target;
//   const shopProducts = button.parentElement;
//   const title = shopProducts.getElementsByClassName("product-title")[0].innerText;
//   const price = shopProducts.getElementsByClassName("price")[0].innerText;
//   const productImg = shopProducts.getElementsByClassName("product-img")[0].src;
//   addProductToCart(title, price, productImg);
//   upDataTotal();
// }

// function addProductToCart(title, price, productImg){
//   const cartShopBox = document.createElement("div");
//   cartShopBox.classList.add('cart-box')
//   const cartItems = document.getElementsByClassName("cart-content")[0]
//   const cartItemsNames = document.getElementsByClassName("cart-product-title");
//   for (let i = 0; i < cartItemsNames.length; i++){
//     alert("You have already add this item to cart")
//     return;
//   }
// }

// const cartBoxContent = `
//       // <img src="${productImg}" alt="" class="cart-img">
//       // <div class="detail-cox">
//       //   <div class="cart-product-title">${title}</div>
//       //   <div class="cart-price">${price}</div>
//       //   <input type="number" value="1" class="cart-quantity">
//       // </div>
//       // <i class='bx bx-trash-alt cart-remove'></i>
// `
// cartShopBox.innertHTML = cartBoxContent
// cartItems.append(cartShopBox)
// cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click',removeCartItem);
// cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change',quantityChanged);

//Update Total
function upDataTotal() {

  document.getElementsByClassName("total-price")[0].innerText = `$${myCart
    .reduce((total, current) => total + current.price * current.quantity, 0)
    .toFixed(2)}`;

  // const cartContent = document.getElementsByClassName("cart-content")[0];
  // const cartBoxes = cartContent.getElementsByClassName("cart-box");
  // const total = 0;
  // for (let i = 0; i < cartBoxes.length; i++) {
  //   const cartBox = cartBoxes[i];
  //   const priceElement = cartBox.getElementsByClassName("cart-price")[0];
  //   const quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
  //   const price = parseFloat(priceElement.innerText.replace("$", ""));
  //   const quantity = quantityElement.value;
  //   total = total + price * quantity;
  //   //If price Contain some
  //   total = Math.round(total * 100) / 100;

  //   document.getElementsByClassName("total-price")[0].innerText = "$" + total;
  // }
}
