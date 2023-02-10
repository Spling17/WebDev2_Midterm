// CART
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

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
  for (var i = 0; i < removeCartButtons.length; i++){
    var button = addCart[i];
    button.addEventListener("click",addCartClicked)
  }
}

// //Buy Button Work
// document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyButtonClicked);

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
  for (var i = 0; i < removeCartButtons.length; i++){
    alert("You have already add this item to cart")
    return;
  }
}
var cartBoxContent = `
      <img src="${productImg}" alt="" class="cart-img">
      <div class="detail-cox">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div>
        <input type="number" value="1" class="cart-quantity">
      </div>
      <i class='bx bx-trash-alt cart-remove'></i>
`
cartShopBox.innertHTML = cartBoxContent
cartItems.append(cartShopBox)
cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click',removeCartItem);
cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change',quantityChanged);

//Update Total
function upDataTotal(){
  var cartContent = document.getElementsByClassName('cart-content')[0];
  var cartBoxes = cartContent.getElementsByClassName('cart-box');
  for (var i = 0; i < cartBoxes.length; i++){
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName("cart-price")[0];
    var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
    var price = parseFloat(priceElement.innerText.replace("$",""));
    var quantity = quantityElement.value;
    total = total + price * quantity;
    //If price Contain some
    total = total + price * quantity;
    
    document.getElementsByClassName('total-price')[0].innerText = "$" + total;
  }
}






// const btn = document.querySelectorAll(".addbtn")

// function getBtnData () {
//   btn.forEach(() =>{
//     console.log(btn)
//   })
// }


// //SERECT ELEMENTS
// const productsEl = document.querySelector(".item");

// //RENDER PRODUCTS
// function renderProducts(){
//   products.forEach( (product) => {
//     productsEl.innerHTML += ``
//   }
//   )
// }
// renderProducts();


// alert("abc");

/*
queryselectorAll を使ってボタンを全て取得
ボタンをforeachで回して、addEventListenerを使ってクリックしたエレメントのIDを取得
2のIDをproductのidと合っているか評価する
合っていたら表示する用のカートに追加する (表示用の配列と表示用に追加する為の配列を用意する)
カートに追加したアイテムをdomで表示する

4の追加するための配列は毎回、中身をクリアする
*わからなくなったらconsole.log()等を使って返ってくる値を確認する。
*2でthisを使うとボタンのNodeが返ってくるはずだからthis.nodeParentをつけてdivのNodeの情報をconsoleで出すように
*3で2の時にとったNodeのidをproduct.idと等しいかifで評価する。 trueならカートへ
*/