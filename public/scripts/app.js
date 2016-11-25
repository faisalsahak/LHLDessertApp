// App //
$(document).ready(function() {

  var cart = [];
// have cart hidden when the user first enters the menu pages
//Once the user has selected an item the cart will appear
// $(".cart").hide();
// swtich to css display none

//When the food item one button is clicked the cart will appear
  $('.add-to-cart').on("click", function() {
    var foodItemId = $(this).closest(".food-item").data("food-item-id");
    var foodName = $(this).closest(".food-item").find(".title").text();
    // var new_cart_item = $('.cart-item.hidden').clone().removeClass('hidden').show().appendTo('.cart-items');

    // $(new_cart_item).find('.title').text(foodName);
    cart.push({order_id: foodItemId, foodName: foodName});

    renderCartItems();

// need to collect food item id, quantity, and order number -  then store into an object which, on click of order button, is sent to the database

  });

  $('.place-order').on("click", function () {
    $.ajax({
      method: "post",
      url: "/sendOrder",
      data: JSON.stringify(cart),
      dataType: 'json',

      success: function(i) {
        //Jquery modal

      }
    })

    console.log("ajax", ajax);


  })


  function renderCartItems() {
    $(".cart-items").empty('');
    $(cart).each(function(k, cartItem) {

      $('.cart-items').append(
      "<div  class=\"cart-item hidden\"><h5 class=\"title\">" + cartItem.foodName + "</h5><div class=\"quantity\"><span class=\"label\">x</span><span class=\"quantity number\">0</span></div>"

      );
    });
    if(cart.length >= 1) $('.place-order').show();
  };

///////// Counter - increase / decrease ///////////
// need a item quantity counter - starts at zero and can be increased or decreased by the push of a button - when item is added to the cart - the quantity value is save as a variable
//add-quantity
//subtract-quantity

  $('.add-quantity').on('click', function () {
    $('.counter').html(function(i, value) {
      return value * 1 + 1
    });
  });

  $('.subtract-quantity').on('click', function () {
    $('.counter').html(function(i, value) {
      return value * 1 - 1
    });
  });
});
