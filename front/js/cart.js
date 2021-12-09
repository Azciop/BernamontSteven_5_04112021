// uses of variables and getItem function to get objects from the localStorage
var cartStorage = JSON.parse(localStorage.getItem("cart"));

// Making a message who says if cart is empty or not
function cartStatus() {
	cartStatusMessage = document.querySelectorAll('h1')[0];
	if (localStorage.getItem("cart") === null) {
		cartStatusMessage.innerHTML = "Votre panier est vide !";
	} else {
		cartStatusMessage.innerHTML = "Votre panier";
	}
};
cartStatus();

/* uses of variables and forEach function to implement the objects from the localStorage
to the DOM by implementing them with elements */
let html = "";
cartStorage.forEach(function (cart, index) {
	html +=
		`<article class="cart__item" 
		>
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
		cart.color +
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
              <input data-index="` +
		index +
		`" type="number" class="itemQuantity" data-index="` +
		index +
		`" name="itemQuantity" min="1" max="100" value="` +
		cart.quantity +
		`">
            </div>
            <div class="cart__item__content__settings__delete">
              <p data-index="` +
		index +
		`" class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`;
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

// making a forEach function that delete the selected item from the cart when the button delete is used wi the eventListener click function
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
	updateCartTotalQuantity()
	updateCartTotalPrice()
	
}
let quantityInput = document.querySelectorAll(".itemQuantity");
quantityInput.forEach(input => {
	input.addEventListener("change", function () {
		changeQuantityFromCart(input.dataset.index, input.value);
	});
});

// Uses of a function and variables to update the total price of the cart when we add or remove a product for the cart
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

// Making alert if regex not correct


let orderButton = document.getElementById('order');
document.getElementById('order').onclick = function openConfirmationPage() {
	location.href = "http://127.0.0.1:5500/front/html/confirmation.html";
}
orderButton.addEventListener('click', function(){
if (reg == true) {
	openConfirmationPage();
} else if ( reg != true) {
	alert("Le formulaire n'est pas remplit entièrement");
}
})


