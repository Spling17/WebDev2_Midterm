// CART
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
const cartContent = document.querySelector('.cart-content')
const cartTemplate = document.querySelector('#cart')
const myCart = []
const tmpData = []

//Open Cart
cartIcon.onclick = () => {
  cart.classList.add("active");
};
//Close Cart
closeCart.onclick = () => {
  cart.classList.remove("active");
};

//Cart Working JS
if (document.readyState == 'loading'){
  document.addEventListener('DOMContentLoaded',ready)
}else{
  ready();
}

// ===================================
// From bottom JSON
// ===================================
async function getProductsData() {
  const res = await sendHTTPRequest(
    'GET',
    'https://gist.githubusercontent.com/Spling17/07221f7ee7e0e878b496a44fcbb9961a/raw/b6942b1fa385845b8c1ee15702855975e763ed6d/products.json'
  )
  const productTemplate = document.querySelector('template')
  const items = document.querySelector('.items')
  for (const product of res) {
    // product list
    const productElClone = document.importNode(productTemplate.content, true)
    productElClone.querySelector('img').setAttribute('src', product.imgSrc)
    productElClone.querySelector('.productName').textContent = product.name
    productElClone.querySelector('.productPrice').textContent = product.price
    productElClone.querySelector('.description').textContent =
      product.description
    productElClone.querySelector('.item').id = product.id
    items.appendChild(productElClone)
  }

  addCartClicked(res)
}

async function sendHTTPRequest(method, url) {
  const { data } = await axios(url, { method })
  console.log(data)
  return data
}

window.addEventListener('DOMContentLoaded', getProductsData)

//Making Function
function ready() {
  //Remove Items From Cart
  var removeCartButtons = document.getElementsByClassName('cart-remove')
  console.log(removeCartButtons)
  for (var i = 0; i < removeCartButtons.length; i++){
    var button = removeCartButtons[i]
    button.addEventListener('click', removeCartItem)
  }
  //Quantity Changes
  var quantityInputs = document.getElementsByClassName("cart-quantity");
  for (var i = 0; i < quantityInputs.length; i++){
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }
  //Add To Cart
  var addCart = document.getElementsByClassName('add-cart');
  for (var i = 0; i < addCart.length; i++){
    var button = addCart[i];
    button.addEventListener("click",addCartClicked)
  }
  // //Buy Button Work
  // document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyButtonClicked);
}

//Buy Button
function buyButtonClicked(){
  alert('Your Order is placed')
  var cartContent = document.getElementsByClassName('cart-content')[0]
  while(cartContent.hasChildNodes()){
    cartContent.removeChild(cartContent.firstChild);
  }
  upDataTotal();
}

//Remove Items From Cart
function removeCartItem(event){
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  upDataTotal();
}

//Quantity Changes
function quantityChanged(event){
  var input = event.target
  if (isNaN(input.value)||input.value <= 0){
    input.value = 1;
  }
  upDataTotal();
}

//Add To Cart
// function addCartClicked(event){
//   var button = event.target;
//   var shopProducts = button.parentElement;
//   var title = shopProducts.getElementsByClassName("productName")[0].innerText;
//   var price = shopProducts.getElementsByClassName("productPrice")[0].innerText;
//   var productImg = shopProducts.getElementsByClassName("img")[0].src;
//   addProductToCart(title, price, productImg);
//   upDataTotal();
// }

function addCartClicked(res) {
  const addBtns = document.querySelectorAll('.addbtn')
  let currQuantity = 0
  // const addVal = 1
  addBtns.forEach((item) => {
    item.addEventListener('click', function (e) {
      e.preventDefault()
      const thisID = this.parentElement.id
      if (tmpData.length > 0) tmpData.pop()

      let isExist = false
      for (const product of myCart) {
        if (product.id == thisID) isExist = true
      }

      while (cartContent.firstChild) {
        cartContent.removeChild(cartContent.firstChild)
      }

      if (!isExist) {
        for (const product of res) {
          if (thisID == product.id) {
            product['quantity'] = 0
            product.quantity += 1
            myCart.push(product)
            tmpData.push(product)
            createEl(myCart, thisID)
          }
        }
        console.log('Not Exist')
      } else {
        console.log('Exist')
        updEl(myCart, thisID)
      }
            // document
      //   .querySelector('.cart-quantity')
      //   .setAttribute('value', currQuantity)
      console.log(document.querySelector('.cart-quantity'))
      console.log(tmpData)
    })
  })
}

function addCartClicked(event){
  var button = event.target;
  var shopProducts = button.parentElement;
  var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
  var price = shopProducts.getElementsByClassName("price")[0].innerText;
  var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
  addProductToCart(title, price, productImg);
  upDataTotal();
}

function addProductToCart(title, price, productImg){
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add('cart-box')
  var cartItems = document.getElementsByClassName("cart-content")[0]
  var cartItemsNames = document.getElementsByClassName("cart-product-title");
  // for (var i = 0; i < cartItemsNames.length; i++){
  //   alert("You have already add this item to cart")
  //   return;
  // }
}

// var cartBoxContent = `
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
function upDataTotal(){
  var cartContent = document.getElementsByClassName('cart-content')[0];
  var cartBoxes = cartContent.getElementsByClassName('cart-box');
  var total = 0;
  for (var i = 0; i < cartBoxes.length; i++){
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName("cart-price")[0];
    var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
    var price = parseFloat(priceElement.innerText.replace("$",""));
    var quantity = quantityElement.value;
    total = total + (price * quantity);
    //If price Contain some
    total = Math.round(total * 100) / 100;
    
    document.getElementsByClassName('total-price')[0].innerText = "$" + total;
  }
}