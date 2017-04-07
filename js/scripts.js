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
  $(".pizza-size").val("");
  $("input:checkbox[name=pizza-toppings]:checked").prop("checked", false);
};

//User Interface Logic
$(document).ready(function(){
  //form submitted once button is clicked
  $("#order-form").submit(function(event){
    event.preventDefault();
    var nameInput = $("#name").val()
    var pizzaSizeInput = $(".pizza-size").val()

    var newOrder = new Order(nameInput, pizzaSizeInput);
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
      $("#orderPizzaSize").text(newOrder.orderPizzaSize);
      $("#orderPizzaToppings").text(newOrder.orderPizzaToppings.slice().join(", "));
      $("#total-cost").text(newPizzaStore.currentOrder.pizzaPrice);
    });
  });//form function close
});//document ready function close
