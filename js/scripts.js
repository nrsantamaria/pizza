//Business Logic
function PizzaStore (pizzaSizes, pizzaToppings, currentOrder) {
  this.pizzaSizes = ["Large", "Medium", "Small"];
  this.pizzaToppings = ["Extra Cheese", "Pepperoni", "Sausage", "Anchovy", "Mushrooms", "Olives"]
  this.currentOrder;
};

function Order (customerName, orderPizzaSize) {
  this.customerName = customerName;
  this.orderPizzaSize = orderPizzaSize;
  this.orderPizzaToppings;
  this.pizzaPrice = 10;
};

// Order.prototype.orderToppingsSelected = function(){
//   $("input:checkbox[name=pizza-toppings]:checked").each(function(){
//     var pizzaToppingsInput = $("input:checkbox[name=pizza-toppings]:checked").val();
//   });
//   this.orderPizzaToppings = pizzaToppingsInput;
// };

PizzaStore.prototype.orderPrice = function (){
  if (this.currentOrder.orderPizzaSize === this.pizzaSizes[0]){
    this.currentOrder.pizzaPrice += 15;
  } else if (this.currentOrder.orderPizzaSize === this.pizzaSizes[1]){
    this.currentOrder.pizzaPrice += 10;
  } else if (this.currentOrder.orderPizzaSize === this.pizzaSizes[2]){
    this.currentOrder.pizzaPrice += 5;
  }
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
    newPizzaStore.orderPrice();

    $("#customerName").append(newOrder.customerName);
    $("#orderPizzaSize").append(newOrder.orderPizzaSize);

    $("input:checkbox[name=pizza-toppings]:checked").each(function(){
      var pizzaToppingsInput = $(this).val();
      $("#orderPizzaToppings").append("<li>" + pizzaToppingsInput + "</li>");
    });

    $("#total-cost").append(newPizzaStore.currentOrder.pizzaPrice);
  });//form function close
});//document ready function close
