// uses of variables and getItem function to get objects from the localStorage
var cartStorage = JSON.parse(localStorage.getItem("cart"));

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
              <input type="number" class="itemQuantity" data-index="`+ index + `" name="itemQuantity" min="1" max="100" value="` +
		cart.quantity +
		`">
            </div>
            <div class="cart__item__content__settings__delete">
              <p data-index="`+ index +`" class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`;
});
let container = document.getElementById("cart__items");
container.innerHTML = html;

function deleteFromCart(index){
	cartStorage.splice(index, 1);
	localStorage.setItem('cart', JSON.stringify(cartStorage));
};

let deleteButton = document.getElementsByClassName('deleteItem');
console.log(deleteButton)
deleteButton.forEach((button) => {
	button.addEvenListener('click', function() {
		deleteFromCart(button.dataset.index);
	});
});

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