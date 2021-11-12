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
    
   let colors = value.colors;
   console.log(colors);
   var elm = document.getElementById('colors');
   colors.forEach(color => {
   elm.innerHTML = elm.innerHTML + '<option value="' + color + '">' + color + '</option>';
   }); 
   console.log(value);
   let container = document.getElementsByClassName("item");
   container.innerHTML = html;
   
  })
 
.catch(function(err) {
  let container = document.getElementsByClassName("item");
  container.innerHTML = "Impossible de récupérer les données de l'API ("+err+")";
});
