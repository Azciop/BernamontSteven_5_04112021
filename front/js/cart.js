// Getting the cart storage obejcts using getItem function
var cartStorage = JSON.parse(localStorage.getItem("cart"));

// Making a message who says if cart is empty or not
function cartStatus() {
	cartStatusMessage = document.querySelectorAll("h1")[0];
	cartElements = document.getElementsByClassName("cart__order")[0];
	cartTotal = document.getElementsByClassName("cart__price")[0];
	if (localStorage.getItem("cart") === null) {
		cartStatusMessage.innerHTML = "Votre panier est vide !";
		cartElements.style.display = "none";
		cartTotal.style.display = "none";
	} else {
		cartStatusMessage.innerHTML = "Votre panier";
	}
}

// Calling the cartStatus function
cartStatus();

/* uses of variables and forEach function to implement the objects from the localStorage
to the DOM by implementing them with elements */
let html = "";
cartStorage.forEach(function (cart, index) {
	html +=
		`<article class="cart__item" >
        <div class="cart__item__img"> <img src="` +
		cart.imageUrl +
		`" alt="` +
		cart.altTxt +
		`"> </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>` +
		cart.name +
		`</h2> <p>` +
		cart.color +
		`</p>
            <p>` +
		cart.price +
		`` +
		"€" +
		`</p></div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input data-index="` +
		index +
		`" type="number" class="itemQuantity" data-index="` +
		index +
		`" 
			  name="itemQuantity" min="1" max="100" value="` +
		cart.quantity +
		`"></div>
            <div class="cart__item__content__settings__delete">
              <p data-index="` +
		index +
		`" class="deleteItem">Supprimer</p></div>
          </div></div></article>`;
});
let container = document.getElementById("cart__items");
container.innerHTML = html;

// making a function that delete the selected item from the localStorage using splice function removeItem function and data-index function
function deleteFromCart(index) {
	cartStorage.splice(index, 1);
	if (cartStorage.length === 0) {
		localStorage.removeItem("cart");
	} else {
		localStorage.setItem("cart", JSON.stringify(cartStorage));
	}
	// uses of reload function to reload the page when item is deleted
	window.location.reload();
}

// making a forEach function that delete the selected item from the cart when the button delete is used with the eventListener click function
let deleteButton = document.querySelectorAll(".deleteItem");
deleteButton.forEach(button => {
	button.addEventListener("click", function () {
		deleteFromCart(button.dataset.index);
	});
});

// Making a function that change the cartQuantity
function changeQuantityFromCart(index, value) {
	cartStorage[index]["quantity"] = Number(value);
	localStorage.setItem("cart", JSON.stringify(cartStorage));
	// calling the two others functions to make it work
	updateCartTotalQuantity();
	updateCartTotalPrice();
}
let quantityInput = document.querySelectorAll(".itemQuantity");
quantityInput.forEach(input => {
	input.addEventListener("change", function () {
		changeQuantityFromCart(input.dataset.index, input.value);
	});
});

// Making a function that show the total price of the cart
function updateCartTotalPrice() {
	let totalAmount = 0;
	cartStorage.forEach(function (product) {
		totalAmount += product.quantity * product.price;
		document.getElementById("totalPrice").innerText = totalAmount;
	});
}
updateCartTotalPrice();

// Making a function to show total of item in the cart
function updateCartTotalQuantity() {
	let totalQty = 0;
	cartStorage.forEach(function (product) {
		totalQty += product.quantity;
		document.getElementById("totalQuantity").innerText = totalQty;
	});
}

updateCartTotalQuantity();	

// creating a function to implement RegEx in the form
function reg(regex, input, msg) {
	// Making a variable who initializes the RegExp
	let r = new RegExp(regex);
	// Testing the RegEx with the imput value
	let test = r.test(input.value);
	// Getting the next element sibling to creat an error message
	let inputErrorMsg = input.nextElementSibling;

	/* If the test doesnt have an error, nothing happens. 
  Else, if RegExp failed, shows error message */
	if (test == true) {
		inputErrorMsg.innerHTML = "";
	} else {
		inputErrorMsg.innerHTML = msg;
		isFormValid = false;
	}
}

let isFormValid = true;
// getting the parent element
let form = document.querySelector("form");

// Making an eventListener on change using a function to implement the error messages
form.firstName.addEventListener("change", function () {
	reg("^[a-zA-Z]+$", this, "Le prénom ne peut pas contenir de chiffres !");
});

form.lastName.addEventListener("change", function () {
	reg("^[a-zA-Z]+$", this, "Le nom ne peut pas contenir de chiffres !");
});

// Address Error Message
form.address.addEventListener("change", function () {
	reg('^[^@&"()!_$*€£`+=/;?#]+$', this, "Adresse non valide !");
});

form.city.addEventListener("change", function () {
	reg('^[^@&"()!_$*€0123456789£`+=/;?#]+$', this, "Ville non valide !");
});

form.email.addEventListener("change", function () {
	reg(
		"^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$",
		this,
		"L'adresse email n'est pas valide !"
	);
});

// Checking if the form is valid, if he is, calls the orderSuccess function
form.addEventListener("submit", function (event) {
	event.preventDefault();
	isFormValid = true;
	reg(
		"^[a-zA-Z]+$",
		form.firstName,
		"Le prénom ne peut pas contenir de chiffres !"
	);
	reg(
		"^[a-zA-Z]+$",
		form.lastName,
		"Le nom ne peut pas contenir de chiffres !"
	);
	reg('^[^@&"()!$*€£`+=/;?#]+$', form.address, "Adresse non valide !");
	reg('^[^@&"()!$*€0123456789£`+=/;?#]+$', form.city, "Ville non valide !");
	reg(
		"^[a-zA-Z0-9.-]+[@]{1}[a-zA-Z0-9.-]+[.]{1}[a-z]{2,10}$",
		form.email,
		"L'adresse email n'est pas valide !"
	);

	if (isFormValid) {
		orderSuccess();
	}
});

// Making a function that creat a object and arry with every products id and contacts info from the form
function orderSuccess(event) {
	// making the items id array
	var cartIds = [];
	cartStorage.forEach(function (cart) {
		cartIds.push(cart._id);
	});

	//Making the contact info object by getting the valus first using variables
	var firstName = document.getElementById("firstName").value;
	var lastName = document.getElementById("lastName").value;
	var address = document.getElementById("address").value;
	var city = document.getElementById("city").value;
	var email = document.getElementById("email").value;

	//contact info objects
	let contactInfo = {
		firstName: firstName,
		lastName: lastName,
		address: address,
		city: city,
		email: email,
	};

	//making an object variable to send the values to the local storage
	let objectToSend = {
		contact: contactInfo,
		products: cartIds,
	};
	//Making a post request using fetch
	fetch("http://localhost:3000/api/products/order", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(objectToSend),
	})
		.then(function (res) {
			if (res.ok) {
				return res.json();
			}
			//Making a function that clear the local storage and put the orderId in the confirmation's Url
		})
		.then(function orderId(response) {
			localStorage.clear();
			document.location.href = `confirmation.html?orderId=${response.orderId}`;
		})
		//Making a catch to display an error if something went wrong
		.catch(function (err) {
			"Impossible de récupérer les données de l'API (" + err + ")";
		});

}
Q