// récupération de l'API via un fetch et d'une fonction return 
fetch("http://localhost:3000/api/products")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  /* utilisation de then avec une fonction permettant de récupérer l'id de chaque valeurs et de créer
  des elements pour chaque objets via un forEach  */
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
  // création d'un catch permettant d'afficher un message d'erreur si les api ne peuvent pas être récupérées 
  .catch(function(err) {
    let container = document.getElementById("items");
    container.innerHTML = "Impossible de récupérer les données de l'API ("+err+")";
  });

