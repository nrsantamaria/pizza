//Business Logic

//User Interface Logic
$(document).ready(function(){
  $("#order-form").submit(function(event){
    event.preventDefault();
    var name = $("#name").val()
    var pizzaSize = $(".pizza-size").val()

    $("#customerName").append(name);
    $("#orderPizzaSize").append(pizzaSize);
    $("input:checkbox[name=pizza-toppings]:checked").each(function(){
      var pizzaToppings = $(this).val();
      $("#orderPizzaToppings").append("<li>" + pizzaToppings + "</li>");
    });

  });//form function close
});//document ready function close
