console.log("Hello world");
const OUTPUT = document.getElementById("spaceForJavaScriptOutput");
OUTPUT.innerHTML += "<h2></h2>";

//variables

/****************************
main code
****************************/
function getFormInput(){
const NAME_FIELD = document.getElementById("nameField");
let Username = NAME_FIELD.value;
OUTPUT.innerHTML += "<p>Hi "+ Username + "</p>";
}


function getorderInput () {
const ORDER_FIELD = document.getElementById("orderField");
let Userorder = ORDER_FIELD.value;
OUTPUT.innerHTML += "<p>Your Order: "+ Userorder + "</p>";
}

function getorderInput () {
const ORDER_FIELD = document.getElementById("orderField");
let Userorder = ORDER_FIELD.value;
OUTPUT.innerHTML += "<p>Your Order: "+ Userorder + "</p>";
}

function getQuantityInput() {
	const QUANTITY_FIELD = document.getElementById("quantityField");
	let Userquantity = QUANTITY_FIELD.value;
	OUTPUT.innerHTML += "<p>Quantity: "+ Userquantity + "</p>";
}

function submitOrder(event) {
	event.preventDefault();
	const NAME_FIELD = document.getElementById("nameField");
	const ORDER_FIELD = document.getElementById("orderField");
	const QUANTITY_FIELD = document.getElementById("quantityField");
	const name = NAME_FIELD ? NAME_FIELD.value.trim() : '';
	const order = ORDER_FIELD ? ORDER_FIELD.value.trim() : '';
	const quantity = QUANTITY_FIELD ? QUANTITY_FIELD.value.trim() : '';
	if (!name && !order && !quantity) return;
	OUTPUT.innerHTML += `<p>Hi ${name}</p>`;
	OUTPUT.innerHTML += `<p>Your Order: ${order}</p>`;
	OUTPUT.innerHTML += `<p>Quantity: ${quantity}</p>`;
	// optionally clear inputs
	NAME_FIELD.value = '';
	ORDER_FIELD.value = '';
}