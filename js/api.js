
// async function getProductsData(){
//   const res = await sendHTTPRequest("GET","https://gist.githubusercontent.com/Spling17/07221f7ee7e0e878b496a44fcbb9961a/raw/b6942b1fa385845b8c1ee15702855975e763ed6d/products.json")
//   const productTemplate = document.querySelector("template")
//   const items = document.querySelector(".items")
//   for (const product of res) {
//     // console.log(product.name)
//     // content.textContent = product.name
    
//     // product list
//     const productElClone = document.importNode(productTemplate.content, true)
//     productElClone
//       .querySelector('img')
//       .setAttribute('src', product.imgSrc)
//     productElClone.querySelector('.productName').textContent = product.name
//     productElClone.querySelector('.productPrice').textContent = product.price
//     productElClone.querySelector('.description').textContent = product.description
//     productElClone.querySelector('.item').id = product.id
//     items.appendChild(productElClone)
//   }
// } 

// async function sendHTTPRequest(method, url){
//   const { data } = await axios(url, {method})
//   console.log(data);
//   return data;
// }

// window.addEventListener("DOMContentLoaded",getProductsData)
