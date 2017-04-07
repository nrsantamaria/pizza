//Business Logic
function PizzaStore (pizzaSizes, pizzaToppings, currentOrder) {
  this.pizzaSizes = ["Large", "Medium", "Small"];
  this.pizzaToppings = ["Extra Cheese", "Pepperoni", "Sausage", "Anchovy", "Mushrooms", "Olives"]
  this.currentOrder;
};

function Order (customerName, orderPizzaSize) {
  this.customerName = customerName;
  this.orderPizzaSize = orderPizzaSize;
  this.orderPizzaToppings = [];
  this.pizzaPrice = 10;
};

PizzaStore.prototype.orderPricePizzaSize = function (){
  if (this.currentOrder.orderPizzaSize === this.pizzaSizes[0]){
    this.currentOrder.pizzaPrice += 15;
  } else if (this.currentOrder.orderPizzaSize === this.pizzaSizes[1]){
    this.currentOrder.pizzaPrice += 10;
  } else if (this.currentOrder.orderPizzaSize === this.pizzaSizes[2]){
    this.currentOrder.pizzaPrice += 5;
  }
};

PizzaStore.prototype.orderPricePizzaTopping = function (){
    if (this.currentOrder.orderPizzaToppings === this.pizzaToppings[0]){
    this.currentOrder.pizzaPrice += 1;
  } else if (this.currentOrder.orderPizzaToppings === this.pizzaToppings[1] || this.currentOrder.orderPizzaToppings === this.pizzaToppings[2]){
    this.currentOrder.pizzaPrice += 4;
  } else if (this.currentOrder.orderPizzaToppings === this.pizzaToppings[3]){
    this.currentOrder.pizzaPrice += 3;
  } else if (this.currentOrder.orderPizzaToppings === this.pizzaToppings[4] || this.currentOrder.orderPizzaToppings === this.pizzaToppings[5]){
    this.currentOrder.pizzaPrice += 2;
  }
};

Order.prototype.resetFields = function (){
  $("#name").val("");
  $(".pizza-size").val("");
  $("input:checkbox[name=pizza-toppings]").prop("checked", false);
};

//User Interface Logic
$(document).ready(function(){
  $("#order-form").submit(function(event){
    event.preventDefault();
    var nameInput = $("#name").val()
    var pizzaSizeInput = $(".pizza-size").val()

    var newOrder = new Order(nameInput, pizzaSizeInput);
    var newPizzaStore = new PizzaStore(newOrder);

    newPizzaStore.currentOrder = newOrder;
    newPizzaStore.currentOrder.orderPizzaSize = pizzaSizeInput;

    $("#customerName").append(newOrder.customerName);
    $("#orderPizzaSize").append(newOrder.orderPizzaSize);

    $("input:checkbox[name=pizza-toppings]:checked").each(function(){
      var pizzaToppingsInput = $(this).val();
      newOrder.orderPizzaToppings.push(pizzaToppingsInput);
      $("#orderPizzaToppings").append("<li>" + pizzaToppingsInput + "</li>");
    });

    newPizzaStore.orderPricePizzaSize();
    newPizzaStore.orderPricePizzaTopping();

    $("#total-cost").append(newPizzaStore.currentOrder.pizzaPrice);
    newOrder.resetFields();
  });//form function close
});//document ready function close
