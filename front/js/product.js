 // Picking up the id of every objects with variable using the URLSearchParameters interface and search property
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
// récupération de l'ID via un fetch et d'une fonction return //
fetch("http://localhost:3000/api/products/" + id)
	.then(function (res) {
		if (res.ok) {
			return res.json();
		}
	})
// Using a function to creat elements in the DOM for every objects
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
// Uses of variables and eventLister to add Objects to the localStorage
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

	

  // Using a catch function to show the error message if the API cant be reached
	.catch(function (err) {
		let container = document.getElementsByClassName("item");
		container.innerHTML =
			"Impossible de récupérer les données de l'API (" + err + ")";
	});

