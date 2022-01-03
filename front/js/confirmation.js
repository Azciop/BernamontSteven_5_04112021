// Making a function that show orderId when customer cart is valid or redirect to main index page if something went wrong
function renderConfirm() {
    if (localStorage.getItem("orderId")) {
        let idHTML = document.getElementById("orderId")
        idHTML.innerHTML = localStorage.getItem("orderId")
        localStorage.clear();
    } else {
        window.location.href = './index.html'
    }
}

renderConfirm();

