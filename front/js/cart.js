var productStorage = JSON.parse(localStorage.getItem('product'))
let html= '';
    productStorage.forEach(function(product) {
        html +=
        `<article class="cart__item" data-id="`+ product._id +`" data-color="`+ product.colors +`">
        <div class="cart__item__img">
          <img src="`+ product.imageUrl +`" alt="`+ product.altTxt +`">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>`+ product.name +`</h2>
            <p>`+ product.colors +`</p>
            <p>`+ product.price +`</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : `+ product.quantity +`</p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="`+ product.quantity +`">
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
    




/*
var removeCartItem = document.getElementsByClassName('deleteItem');
// création d'une loop for permettant de supprimer un kanap du cart
for (var i = 0; i < removeCartItem.length; i++) {
    var remove = removeCartItem[i]
    remove.addEventListener('click', function(event) {
        var removeClick = event.target
        removeClick.parentElement.parentElement.parentElement.parentElement.remove()
        updateCartTotal()
    })
    
}
var quantityInputs = document.getElementsByClassName('itemQuantity')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

function quantityChanged(event) {
    var input = event.target
    if (input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}
//

// création d'une fonction permettant de modifier le prix total du panier
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
//
*/

// création des messages d'erreurs grâce à l'utilisation des RegEx
let form = document.querySelector('.cart__order__form');

// message d'erreur du prénom
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

// message d'erreur du nom
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

// message d'erreur de l'adresse
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

// message d'erreur de la ville
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

// message d'erreur de l'adresse email
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
