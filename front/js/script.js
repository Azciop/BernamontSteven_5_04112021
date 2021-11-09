fetch("http://localhost:3000/api/products")
  .then(function(res) {
   /* if (!res.ok) {
      throw newError ("Impossible de récupérer les produits.")  
    }
    */
    return res.json();
  })
  .then(function(value) {
    console.log(value);
    let html= '';
    value.forEach(element => {
        console.log(element);
        html += `<a href="./product.html?id=` + element._id +`">
        <article>
          <img src="` + element.imageUrl +`" alt="` + element.altTxt +`">
          <h3 class="productName">` + element.name + `</h3>
          <p class="productDescription"> ` + element.description + `</p>
        </article>
      </a>`
    });
    let container = document.getElementById("items");
    container.innerHTML = html;
  })
  .catch(function(err) {
    alert(err)
  });

