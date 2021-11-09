fetch("http://localhost:3000/api/products")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
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
    let container = document.getElementById("items");
    container.innerHTML = "Impossible de récupérer les données de l'API ("+err+")";
  });

