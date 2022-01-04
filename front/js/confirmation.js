// Making a function that show orderId when customer cart is valid or redirect to main index page if something went wrong
function renderConfirm() {
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get("orderId");
    if (orderId) {
        let idHTML = document.getElementById("orderId")
        idHTML.innerHTML = orderId;     
        
    } else {
        window.location.href = './index.html'
    }
}

renderConfirm();

