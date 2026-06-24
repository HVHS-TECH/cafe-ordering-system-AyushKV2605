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

function submitOrder(event) {
	event.preventDefault();
	const NAME_FIELD = document.getElementById("nameField");
	const ORDER_FIELD = document.getElementById("orderField");
	const name = NAME_FIELD ? NAME_FIELD.value.trim() : '';
	const order = ORDER_FIELD ? ORDER_FIELD.value.trim() : '';
	if (!name && !order) return;
	OUTPUT.innerHTML += `<p>Hi ${name}</p>`;
	OUTPUT.innerHTML += `<p>Your Order: ${order}</p>`;
	// optionally clear inputs
	NAME_FIELD.value = '';
	ORDER_FIELD.value = '';
}