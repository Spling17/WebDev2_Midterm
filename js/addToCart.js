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