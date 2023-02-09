//SERECT ELEMENTS
const productsEl = document.querySelector(".item");

//RENDER PRODUCTS
function renderProducts(){
  products.forEach( (product) => {
    productsEl.innerHTML += ``
  }
  )
}
renderProducts();