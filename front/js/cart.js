// uses of variables and getItem function to get objects from the localStorage
var cartStorage = JSON.parse(localStorage.getItem("cart"));

/* uses of variables and forEach function to implement the objects from the localStorage 
to the DOM by implementing them with elements */
let html = "";
cartStorage.forEach(function (cart) {
	html +=
		`<article class="cart__item" data-id="` +
		cart._id +
		`" data-color="` +
		cart.colors +
		`">
        <div class="cart__item__img">
          <img src="` +
		cart.imageUrl +
		`" alt="` +
		cart.altTxt +
		`">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>` +
		cart.name +
		`</h2>
            <p>` +
		cart.colors +
		`</p>
            <p>` +
		cart.price +
		`` +
		"€" +
		`</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="` +
		cart.quantity +
		`">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`;
});
let container = document.getElementById("cart__items");
container.innerHTML = html;

// Creation of a variable to get the deleteItem button to work
var removeCartItem = document.getElementsByClassName("deleteItem");
// Making a loop and using an eventListener on click to delete an element from the cart using the deleteItem variable
for (var i = 0; i < removeCartItem.length; i++) {
	var remove = removeCartItem[i];
	remove.addEventListener("click", function (event) {
		var removeClick = event.target;
		removeClick.parentElement.parentElement.parentElement.parentElement.remove();
		updateCartTotal();
	});
}

// Making a variable to get the itemQuantity of every products in the cart
var quantityInputs = document.getElementsByClassName("itemQuantity");
// using a for, loop and and eventListener to change the total quantity of every products in the cart
for (var i = 0; i < quantityInputs.length; i++) {
	var input = quantityInputs[i];
	input.addEventListener("change", quantityChanged);
}
//Creation of a function to show total price of the cart
function quantityChanged(event) {
	var input = event.target;
	if (input.value <= 0) {
		input.value = 1;
	}
	updateCartTotal();
}

// Uses of a function and variables to update the total price of the cart when we add or remove a product for the cart
function updateCartTotal() {
	var cartItemContainer = document.getElementsByClassName("cart")[0];
	var cartPrices = cartItemContainer.getElementsByClassName("cart__item");
	var total = 0;
	for (var i = 0; i < cartPrices.length; i++) {
		var itemInfos = cartPrices[i];
		var priceElement = itemInfos.getElementsByClassName(
			"cart__item__content__description"
		)[0].children[2];
		var quantityElement = itemInfos.getElementsByClassName("itemQuantity")[0];
		var price = parseFloat(priceElement.innerText.replace("€", ""));
		var quantity = quantityElement.value;
		total += price * quantity;
	}
	document.getElementById("totalPrice").innerText = total;
}

updateCartTotal();

// creating a function to implement RegEx in the form
function reg(regex, input, msg) {
	// Making a variable who initializes the RegExp
	let r = new RegExp(regex);
	// Testing the RegExo with the imput value
	let test = r.test(input.value);
	// Getting the next element sibling to creat an error message
	let inputErrorMsg = input.nextElementSibling;

	/* If the test doesnt have an error, nothing happens. 
  Else, if RegExp failed, shows error message */
	if (test == true) {
		inputErrorMsg.innerHTML = "";
	} else {
		inputErrorMsg.innerHTML = msg;
	}
}

// getting the parent element
let form = document.querySelector(".cart__order__form");

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
