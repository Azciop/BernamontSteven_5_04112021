//fetching to get the API and using a then function to return JSON
fetch("http://localhost:3000/api/products")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  
  /* Using then with a function to get the id of every values and creating elements in the DOM for
  every object using a ForEach
  .then(function(value) {
    let html= '';
    value.forEach(element => {
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
  */
   
  // Using a catch function to show the error message if the API cant be reached
  .catch(function(err) {
    let container = document.getElementById("items");
    container.innerHTML = "Impossible de récupérer les données de l'API ("+err+")";
  });

  
