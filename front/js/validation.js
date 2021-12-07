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

/*
function getErrors(){
	// Creating error messages and validation messages when choosing product color and quantity
		// Getting the elements from the HTM
		let itemQuantityValue = document.getElementById("quantity");
		let colorSelectValue = document.getElementById("colors");

		// Making eventListener on 'change' for the errorMsg function
		itemQuantityValue.addEventListener("change", errorMsg);
		colorSelectValue.addEventListener("change", errorMsg);

		// Creating an element for the error message
		document.getElementsByClassName(
			"item__content__description"
		)[0].innerHTML += `<p id="errorMsg" style="color: red;font-size: 25px;"></p>`;

		// Making the function to creat the error message and to disable the button using an if else
		function errorMsg() {
			let orderButton = document.getElementById("addToCart");
			let colorSelectValue = document.getElementById("colors");
			itemQuantityValue.addEventListener("change", errorMsg);
			colorSelectValue.addEventListener("change", errorMsg);
			if (itemQuantityValue.value == 0 || colorSelectValue.value == "") {
				orderButton.style.display = "none";
				document.getElementById(
					"errorMsg"
				).innerHTML = `Veuillez choisir au minimum un article et une couleur !`;
			} else {
				orderButton.style.display = "inline-block";
				document.getElementById("errorMsg").innerHTML = "";
			}
		}
	}
    */