// récupération de l'id de chaque objets via des const et grâce à l'interface URLSearchParams et a la propriété search 
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
// récupération de l'ID via un fetch et d'une fonction return //
fetch("http://localhost:3000/api/products/" + id)
	.then(function (res) {
		if (res.ok) {
			return res.json();
		}
	})
// création d'une fonction permettant de créer des élements pour chaque objets 
	.then(function (value) {
		let img = document.getElementsByClassName("item__img")[0];
		img.innerHTML =
			`<img src="` + value.imageUrl + `" alt="` + value.altTxt + `">`;
		let name = document.getElementById("title");
		name.innerHTML =  value.name ;
		let price = document.getElementById("price");
		price.innerHTML = value.price ;
		let description = document.getElementById("description");
		description.innerHTML = value.description ;
		let colors = value.colors;
		var elm = document.getElementById("colors");
		colors.forEach(color => {
			elm.innerHTML += '<option value="' + color + '">' + color + "</option>";
		
		});
		let orderButton = document.getElementById('addToCart');
		orderButton.addEventListener('click', function(){
		var productStorage = JSON.parse(localStorage.getItem('product')) || []
		let product = {
			altTxt: value.altTxt,
			colors: elm.value,
			description: value.description,
			imageUrl: value.imageUrl,
			name: value.name,
			price: value.price,
			_id: value._id,
			quantity: document.getElementById('quantity').value
		}	
		productStorage.push(product);
		localStorage.setItem('product', JSON.stringify(productStorage));
		})
	})

	

  // création d'un catch permettant d'afficher un message d'erreur si les api ne peuvent pas être récupérées 
	.catch(function (err) {
		let container = document.getElementsByClassName("item");
		container.innerHTML =
			"Impossible de récupérer les données de l'API (" + err + ")";
	});

