let total = 0 // global variable total

function addToCart(currentButton){
  // add items to cart bu creating new item if not already in cart or updating old item if it already is in the cart
  console.log(currentButton)
  var price = getprice(currentButton)
  var itemName = getItemName(currentButton)
  addItemToCart(price, itemName)
}

function getprice(currentButton){
  var price = currentButton.previousElementSibling.innerHTML;
  return price;
}

function getItemName(currentButton){
  var name = currentButton.previousElementSibling.previousElementSibling.innerHTML;
  return name;
}


function addItemToCart(price, name){
  isAlreadyInCart = checkIfItemIsAlredyInCart(name)
  if(isAlreadyInCart == 1)
    incrementElementInCart(price, name)
  else 
    createNewItemToCart(price, name)
    showTotal()
}

function checkIfItemIsAlredyInCart(name){
  //return 1 if item is already in cart and 0 if not
  item = document.getElementById(name)
  if(item != null && item.value != ''){
    return 1
  }
  return 0
}

function createNewItemToCart(price, name){
  //create a new div tag add info info about item added to card
  totalItemPrice = trimPrice(price)
  var itemInCart = document.createElement('div')
  itemInCart.id = name
  itemInCart.innerHTML = `<span class="quantity">1</span><span class="itemName">${name}</span><span class="itemPrice">${price}</span><span>$</span><span class="totalItemPrice">${totalItemPrice}</span>`
  cart = document.getElementById("cart")
  cart.append(itemInCart)
  total = Math.round((total + Number(totalItemPrice))* 100) / 100
}

function trimPrice(price){
  //trime price to remove dollar sign and per pound
  totalItemPrice = price.slice(1,-3)
  totalItemPrice = totalItemPrice.slice()
  return totalItemPrice
}

function incrementElementInCart(price, name){
  //item is already in cart. this function increments the quantity and total price for the item
  singlePrice = trimPrice(price)
  console.log(singlePrice)
  item = document.getElementById(name)
  quantity = item.getElementsByClassName("quantity")[0]
  totalItemPrice = item.getElementsByClassName("totalItemPrice")[0]
  quantity.textContent = Number(quantity.textContent) + 1
  totalItemPrice.textContent = Number(totalItemPrice.textContent) + Number(singlePrice)
  total = Math.round((total + Number(singlePrice))* 100) / 100
}

function showTotal(){
  //show total price
  totalDiv = document.getElementById("totalDiv")
  totalDiv.innerHTML = `<span id="totalWord">TOTAL</span><span>$</span><span id="totalPrice">${total}</span>`
}

const myButton = document.querySelectorAll(".btn-primary");
console.log(myButton)
myButton.forEach(function(button){
  button.addEventListener("click", function(){
    addToCart(this)
  });
})


