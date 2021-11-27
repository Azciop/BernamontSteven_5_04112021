// uses of variables and getItem function to get objects from the localStorage
var cartStorage = JSON.parse(localStorage.getItem('cart'))

/* uses of variables and forEach function to implement the objects from the localStorage 
to the DOM by implementing them with elements */
let html= '';
cartStorage.forEach(function(cart) {
        html +=
        `<article class="cart__item" data-id="`+ cart._id +`" data-color="`+ cart.colors +`">
        <div class="cart__item__img">
          <img src="`+ cart.imageUrl +`" alt="`+ cart.altTxt +`">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>`+ cart.name +`</h2>
            <p>`+ cart.colors +`</p>
            <p>`+ cart.price +``+ '€' +`</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="`+ cart.quantity +`">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`
    });
    let container = document.getElementById("cart__items");
    container.innerHTML = html;
    

// Creation of a variable to get the deleteItem button to work
var removeCartItem = document.getElementsByClassName('deleteItem');
// Making a loop and using an eventListener on click to delete an element from the cart using the deleteItem variable
for (var i = 0; i < removeCartItem.length; i++) {
    var remove = removeCartItem[i]
    remove.addEventListener('click', function(event) {
        var removeClick = event.target
        removeClick.parentElement.parentElement.parentElement.parentElement.remove()
        updateCartTotal()
    })
    
}

// Making a variable to get the itemQuantity of every products in the cart
var quantityInputs = document.getElementsByClassName('itemQuantity')
// using a for, loop and and eventListener to change the total quantity of every products in the cart
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }
//Creation of a function to show total price of the cart
    function quantityChanged(event) {
        var input = event.target
        if (input.value <= 0) {
            input.value = 1
        }
        updateCartTotal()
    }



// Uses of a function and variables to update the total price of the cart when we add or remove a product for the cart
function updateCartTotal() {
   var cartItemContainer = document.getElementsByClassName('cart')[0]
   var cartPrices = cartItemContainer.getElementsByClassName('cart__item')
   var total = 0
   for (var i = 0; i < cartPrices.length; i++) {
       var itemInfos = cartPrices[i]
       var priceElement = itemInfos.getElementsByClassName('cart__item__content__description')[0].children[2]
       var quantityElement = itemInfos.getElementsByClassName('itemQuantity')[0]
       var price = parseFloat(priceElement.innerText.replace('€', ''))
       var quantity = quantityElement.value 
       total += (price * quantity)
   }
   document.getElementById('totalPrice').innerText = total
};

updateCartTotal()


// Creating error messages in the form using RegEx
// making a querySelector to navigate easier in the DOM
let form = document.querySelector('.cart__order__form');

// First Name Error Message
form.firstName.addEventListener('change', function() {
    validFirstName(this)
});

var validFirstName = function(inputFirstName) {
    let firstNameRegex = new RegExp ('^[a-zA-Z]+$');
    let testFirstName = firstNameRegex.test(inputFirstName.value);
    let firstNameErrorMsg = inputFirstName.nextElementSibling;

    if(testFirstName == true) {
    firstNameErrorMsg.innerHTML = "";
    }
    else {
        firstNameErrorMsg.innerHTML = "Le prénom de peut pas contenir de chiffres !";
    }
};

// Last Name Error Message
form.lastName.addEventListener('change', function() {
    validLastName(this)
});

var validLastName = function(inputLastName) {
    let lastNameRegex = new RegExp ('^[a-zA-Z]+$');
    let testLastName = lastNameRegex.test(inputLastName.value);
    let lastNameErrorMsg = inputLastName.nextElementSibling;

    if(testLastName == true) {
        lastNameErrorMsg.innerHTML = "";
    }
    else {
        lastNameErrorMsg.innerHTML = "Le nom de peut pas contenir de chiffres !";
    }
};

// Address Error Message
form.address.addEventListener('change', function() {
    validAddress(this)
});

var validAddress = function(inputAddress) {
    let addressRegex = new RegExp ('^[^@&"()!_$*€£`+=\/;?#]+$');
    let testAddress = addressRegex.test(inputAddress.value);
    let addressErrorMsg = inputAddress.nextElementSibling;

    if(testAddress == true) {
       addressErrorMsg.innerHTML = "";
    }
    else {
        addressErrorMsg.innerHTML = "Adresse non valide";
    }
};

// City Error Message
form.city.addEventListener('change', function() {
    validCity(this)
});

var validCity = function(inputCity) {
    let cityRegex = new RegExp ('^[^@&"()!_$*€0123456789£`+=\/;?#]+$');

    let testCity = cityRegex.test(inputCity.value);
    let cityErrorMsg = inputCity.nextElementSibling;

    if(testCity == true) {
    cityErrorMsg.innerHTML = "";
    }
    else {
        cityErrorMsg.innerHTML = "Ville non valide!";
    }
};

// Email Error Message
form.email.addEventListener('change', function() {
    validEmail(this)
});

var validEmail = function(inputEmail) {
    let emailRegex = new RegExp ('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g'
    );

    let testEmail = emailRegex.test(inputEmail.value);
    let emailErrorMsg = inputEmail.nextElementSibling;

    if(testEmail == true) {
    emailErrorMsg.innerHTML = "";
    }
    else {
        emailErrorMsg.innerHTML = "L'adresse email n'est pas valide !";
    }
};
//
