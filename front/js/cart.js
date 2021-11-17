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
       total = total + (price * quantity)
   }
   document.getElementById('totalPrice').innerText = total

};
