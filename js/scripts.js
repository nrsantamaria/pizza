//Business Logic
function PizzaStore (pizzaSizes, pizzaToppings, currentOrder) {
  this.pizzaSizes = ["Large", "Medium", "Small"];
  this.pizzaToppings = ["Extra Cheese", "Pepperoni", "Sausage", "Anchovy", "Mushrooms", "Olives"]
  this.currentOrder;
};

function Order (customerName, street, city, state, zip, orderPizzaSize) {
  this.customerName = customerName;
  this.customerStreet = street;
  this.customerCity = city;
  this.customerState = state;
  this.customerZip = zip;
  this.orderPizzaSize = orderPizzaSize;
  this.orderPizzaToppings = [];
  this.pizzaPrice = 10;
};

Order.prototype.addressGroup = function (){
  return (this.customerStreet + ", " + this.customerCity + ", " + this.customerState + " " + this.customerZip);
};

PizzaStore.prototype.orderPrice = function (){
  if (this.currentOrder.orderPizzaSize === this.pizzaSizes[0]){
    this.currentOrder.pizzaPrice += 15;
  } else if (this.currentOrder.orderPizzaSize === this.pizzaSizes[1]){
    this.currentOrder.pizzaPrice += 10;
  } else if (this.currentOrder.orderPizzaSize === this.pizzaSizes[2]){
    this.currentOrder.pizzaPrice += 5;
  }
    if (this.currentOrder.orderPizzaToppings.length >= 1){
    this.currentOrder.pizzaPrice += (this.currentOrder.orderPizzaToppings.length * 2);
  }
};

Order.prototype.resetFields = function (){
  $("#name").val("");
  $("#street-input").val("");
  $("#city-input").val("");
  $("#state-input").val("");
  $("#zipCode-input").val("");
  $(".pizza-size").val("");
  $("input:checkbox[name=pizza-toppings]:checked").prop("checked", false);
};

//User Interface Logic
$(document).ready(function(){
  //form submitted once button is clicked
  $("#order-form").submit(function(event){
    event.preventDefault();
    var nameInput = $("#name").val()
    var streetInput = $("#street-input").val();
    var cityInput = $("#city-input").val();
    var stateInput = $("#state-input").val();
    var zipCodeInput = $("#zipCode-input").val();
    var pizzaSizeInput = $(".pizza-size").val()


    var newOrder = new Order(nameInput, streetInput, cityInput, stateInput, zipCodeInput, pizzaSizeInput);
    var newPizzaStore = new PizzaStore(newOrder);

    newPizzaStore.currentOrder = newOrder;
    newPizzaStore.currentOrder.orderPizzaSize = pizzaSizeInput;

    $("input:checkbox[name=pizza-toppings]:checked").each(function(){
      var pizzaToppingsInput = $(this).val();
      newOrder.orderPizzaToppings.push(pizzaToppingsInput);
    });
    //call orderPrice function to determine cost of selected items
    newPizzaStore.orderPrice();
    //call function to reset fields
    newOrder.resetFields();

    //show list of customer names
    $(".order-list").show();
    $(".orders").append("<li><span class='orderLink'>" + newOrder.customerName + "</span></li>")
    //show order details of customers once their name is clicked on
    $(".orderLink").last().click(function(){
      $(".output").show();
      $("#customerName").text(newOrder.customerName);
      //call function to return customer address
      $("#customerAddress").text(newOrder.addressGroup());
      $("#orderPizzaSize").text(newOrder.orderPizzaSize);
      //if statement to hide toppings header if none are selected by the user
      if (newOrder.orderPizzaToppings.length >= 1){
        $("#orderPizzaToppings").text(newOrder.orderPizzaToppings.slice().join(", "));
      } else {
        $("#toppingsHeader").empty();
      };
      
      $("#total-cost").text(newPizzaStore.currentOrder.pizzaPrice);
    });
  });//form function close
});//document ready function close
