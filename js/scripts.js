//Business Logic
function PizzaStore (pizzaSizes, pizzaToppings) {
  this.pizzaSizes = ["Large", "Medium", "Small"];
  this.pizzaToppings = ["Extra Cheese", "Pepperoni", "Sausage", "Anchovy", "Mushrooms", "Olives"]
};

function Order (customerName, orderPizzaSize, orderPizzaToppings1, orderPizzaToppings2, orderPizzaToppings3, orderPizzaToppings4, orderPizzaToppings5, orderPizzaToppings6) {
  this.customerName = customerName;
  this.orderPizzaSize = orderPizzaSize;
  this.orderPizzaToppings = [orderPizzaToppings1, orderPizzaToppings2, orderPizzaToppings3, orderPizzaToppings4, orderPizzaToppings5, orderPizzaToppings6];
  this.orderPrice = 10;
};

Order.prototype.orderToppingsSelected = function(){
  $("input:checkbox[name=pizza-toppings]:checked").each(function(){
    var pizzaToppingsInput = $(this).val();
  });
};



//User Interface Logic
$(document).ready(function(){
  $("#order-form").submit(function(event){
    event.preventDefault();
    var nameInput = $("#name").val()
    var pizzaSizeInput = $(".pizza-size").val()
    var newOrder = new Order(nameInput, pizzaSizeInput, pizzaToppingsInput);
    var newPizzaStore = new PizzaStore();
    console.log(newOrder.orderToppingsSelected);
    $("#customerName").append(newOrder.customerName);
    $("#orderPizzaSize").append(newOrder.orderPizzaSize);      $("#orderPizzaToppings").append("<li>" + newOrder.orderToppingsSelected + "</li>");
  });//form function close
});//document ready function close
