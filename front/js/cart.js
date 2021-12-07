// uses of variables and getItem function to get objects from the localStorage
var cartStorage = JSON.parse(localStorage.getItem("cart"));

/* uses of variables and forEach function to implement the objects from the localStorage
to the DOM by implementing them with elements */
let html = "";
cartStorage.forEach(function (cart, index) {
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
              <input type="number" class="itemQuantity" data-index="`+ index + `" name="itemQuantity" min="1" max="100" value="` +
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
// Making a loop and using an eventListener on click to delete an element from the cart using the localStorage.removeItem 
for (var i = 0; i < removeCartItem.length; i++) {
	var remove = removeCartItem[i];
	remove.addEventListener("click", function (event) {
		localStorage.removeItem('cart')
		location.reload();
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
	updateCartTotalPrice();
	updateCartTotalQuantity()
}

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
};

updateCartTotalQuantity();


/*
RegEx was added in the validation.js file
*/