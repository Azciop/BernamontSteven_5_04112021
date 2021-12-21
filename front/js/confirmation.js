function renderConfirm() {
    if (localStorage.getItem("orderId")) {
        let idHTML = document.getElementById("orderId")
        idHTML.innerHTML = localStorage.getItem("orderId")
    } else {
        window.location.href = './index.html'
    }
}

renderConfirm()