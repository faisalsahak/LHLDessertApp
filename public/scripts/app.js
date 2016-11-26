// App //
$(document).ready(function() {
  $('.collapsible').collapsible();

  const cart = [];
  const orderNumber = 0;
  const quantityValue = 0;
  $('.counter').text(Number(quantityValue));

  ///////// Counter - increase / decrease ///////////
// need a item quantity counter - starts at zero and can be increased or decreased by the push of a button - when item is added to the cart - the quantity value is save as a variable
//add-quantity
//subtract-quantity
  $('.add-quantity').on('click', function () {
    $('.counter').html(function(i, value) {
      return value * 1 + 1
    });
  });

  $('.subtract-quantity').on('click', function (event) {
    $('.counter').html(function(i, value) {
      if (value > 0) {
        return value - 1;
      }
    });
  });





// have cart hidden when the user first enters the menu pages
//Once the user has selected an item the cart will appear
// $(".cart").hide();
// swtich to css display none

//When the food item one button is clicked the cart will appear
  $('.add-to-cart').on("click", function(element) {
    var dessert_item_id = $(this).closest(".food-item").data("food-item-id");
    var dessertName = $(this).closest(".description").find(".title").text();
    var quantity = $(this).closest(".food-item").find(".counter").text();

    //  if (quantity === 0) {
    //   element.preventDefault();
    //   return false;
    // }

    console.log("quantity", quantity);



    console.log("foodItemID", dessert_item_id)
    console.log("dessertName", dessertName)
    console.log("foodQuant", quantity);
    // var new_cart_item = $('.cart-item.hidden').clone().removeClass('hidden').show().appendTo('.cart-items');

    // $(new_cart_item).find('.title').text(foodName);
    cart.push({dessert_item_id: dessert_item_id, dessertName: dessertName, quantity: quantity});

    console.log("cart order", cart);
    console.log("JSON ffdfdfdfdfdfdf", JSON.stringify(cart));

    //Working
    // cart.push({foodItemId: foodItemId, foodName: foodName});


    // Format for object being submitted to DB
    // {FoodItemId: 1, Quantity: 2, OrderNumber: 1}

    renderCartItems();
  });



  $('.place-order').on("click", function (event) {

    event.preventDefault();

    // orderNumber++;
     console.log("order number", cart);
     var payload = JSON.stringify({ 'order': cart });

    $.ajax({
      method: "POST",
      url: "/sendOrder",
      data: payload,
      contentType: 'application/json',
      // dataType: 'json',

      success: function() {
        console.log("Success!")
      },
      error: function() {
        alert("Something went wrong");
      }
    });

  });


  function renderCartItems() {
    $(".cart-items").empty('');
    $(cart).each(function(k, cartItem) {

      $('.cart-items').append(
      "<div  class=\"cart-item hidden\"><h5 class=\"title\">" + cartItem.dessertName + "</h5><div class=\"quantity\"><span class=\"label\">x</span><span class=\"quantity number\">" + cartItem.quantity + "</span></div>"

      );
    });
    if(cart.length >= 1) $('.place-order').show();
  };

});
