console.log('Hello world')
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id')
console.log(id);
fetch("http://localhost:3000/api/products/"+id)
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    let img = document.getElementsByClassName("item__img")[0];
    img.innerHTML = `<img src="` + value.imageUrl +`" alt="`+ value.altTxt+`">`;
    let name = document.getElementById("title");
    name.innerHTML =  ``+ value.name +``;
    let price = document.getElementById("price");
    price.innerHTML = ``+ value.price +``;
    let description = document.getElementById("description");
    description.innerHTML = ``+ value.description +``;
   
    console.log(value);
   

  })
  .catch(function(err) {
    
  });

