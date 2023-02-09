
async function getProductsData(){
  const res = await sendHTTPRequest("GET","https://gist.githubusercontent.com/Spling17/07221f7ee7e0e878b496a44fcbb9961a/raw/3a268bca84b5fb9c63ac552465210bd7ec4640f2/products.json")
  const productTemplate = document.querySelector("template")
  const wrapperProsuct = document.querySelector(".wrapper")
  for (const product of res) {
    // console.log(product.name)
    // content.textContent = product.name
    
    // product list
    const productElClone = document.importNode(productTemplate.content, true)
    productElClone
      .querySelector('img')
      .setAttribute('src', product.imgSrc)
    productElClone.querySelector('.productName').textContent =
      product.name
    productElClone.querySelector('.productPrice').textContent = product.price
    productElClone.querySelector('.description').textContent = product.description
    productElClone.querySelector('.item').id = product.id
    wrapperProsuct.appendChild(productElClone)
  }
} 

async function sendHTTPRequest(method, url){
  const { data } = await axios(url, {method})
  console.log(data);
  return data;
}

window.addEventListener("DOMContentLoaded",getProductsData)

const btn = document.querySelectorAll(".addbtn")
function getBtnData () {
  btn.forEach(() =>{
    console.log(btn)
  })
}

/*
// 
//ADD TO CART
function addTOCart(id){
  console.log(id);
}

*/

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