// Picking up the id of every objects with variable using the URLSearchParameters interface and search property
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
// getting the product's ID using fetch //
fetch("http://localhost:3000/api/products/" + id)
	.then(function (res) {
		if (res.ok) {
			return res.json();
		}
	})
	// Creating the then with a function that include every functions that we need on the product page //
	.then(function (value) {
		renderHTML(value);
		addToCart(value);
		errorMsg(value);
	})

	// Using a catch function to show the error message if the API cant be reached
	.catch(function (err) {
		let container = document.getElementsByClassName("item");
		container.innerHTML =
			"Impossible de récupérer les données de l'API (" + err + ")";
	});

// Making a function to creat HTML using the DOM
function renderHTML(value) {
	let img = document.getElementsByClassName("item__img")[0];
	img.innerHTML =
		`<img src="` + value.imageUrl + `" alt="` + value.altTxt + `">`;
	let name = document.getElementById("title");
	name.innerHTML = value.name;
	let price = document.getElementById("price");
	price.innerHTML = value.price;
	let description = document.getElementById("description");
	description.innerHTML = value.description;
	let colors = value.colors;
	var elm = document.getElementById("colors");
	colors.forEach(color => {
		elm.innerHTML += '<option value="' + color + '">' + color + "</option>";
	});
}

// making a function that add the product to the local storage
function addToCart(value) {
	// getting the document elements for the button and the colors value
	let orderButton = document.getElementById("addToCart");
	var elm = document.getElementById("colors");
	// Making an eventlistener on click when clicking add to cart button
	orderButton.addEventListener("click", function () {
		var cartStorage = JSON.parse(localStorage.getItem("cart")) || [];
		value["color"] = elm.value;
		value["quantity"] = Number(document.getElementById("quantity").value);

		let needToAdd = true;
		/* making a forEach function that push the selected item to the localStorage. Ff the item with the same color
		 is already in the localstorage, it only add the new number value to the string instead of making an other item */
		cartStorage.forEach((element, index) => {
			if (element._id === value._id && elm.value === element.color) {
				cartStorage[index].quantity += Number(
					document.getElementById("quantity").value
				);
				needToAdd = false;
			}
		});
		if (needToAdd) {
			cartStorage.push(value);
		}
		// converting the object into a string using the stringify function
		localStorage.setItem("cart", JSON.stringify(cartStorage));
		// Making an alert message to confirm that the item was added to the cart
		alert("Votre produit a bien été ajouté à votre panier !");
	});
}

// Creating error messages and validation messages when choosing product color and quantity
function errorMsg() {
	// Getting the elements from the HTML
	let itemQuantityValue = document.getElementById("quantity");
	let colorSelectValue = document.getElementById("colors");

	// Making eventListener on 'change' for the errorMsg function
	itemQuantityValue.addEventListener("change", errorMsg);
	colorSelectValue.addEventListener("change", errorMsg);

	// Creating an element for the error message
	document.getElementsByClassName(
		"item__content__description"
	)[0].innerHTML += `<p id="errorMsg" style="color: red;font-size: 25px;"></p>`;

	let orderButton = document.getElementById("addToCart");

	/* making an if else that take off the order button and show an error message if no color
	 is choosen or if 0 is selected in the input element */
	if (itemQuantityValue.value == 0 || colorSelectValue.value == "") {
		orderButton.style.display = "none";
		document.getElementById(
			"errorMsg"
		).innerHTML = `Veuillez choisir au minimum un article et une couleur !`;
	} else {
		orderButton.style.display = "inline-block";
		document.getElementById("errorMsg").innerHTML = "";
	}
}
