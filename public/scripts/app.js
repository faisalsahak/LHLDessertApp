// App //
$(document).ready(function() {
  $('.collapsible').collapsible();
   $('.modal').modal()

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

  $('.subtract-quantity').on('click', function () {
    $('.counter').html(function(i, value) {
      if (value > 0) {
      return value * 1 - 1;
      }
    });
  });



// have cart hidden when the user first enters the menu pages
//Once the user has selected an item the cart will appear
// $(".cart").hide();
// swtich to css display none

//When the food item one button is clicked the cart will appear
  $('.add-to-cart').on("click", function(element) {
     $('.empty-cart-message').hide();
    var foodItemId = $(this).closest(".food-item").data("food-item-id");
    var foodName = $(this).closest(".description").find(".title").text();
    var foodQuantity = $(this).closest(".food-item").find(".counter").text();

    if (foodQuantity == 0 ) {
      element.preventDefault();
      console.log("if stat foodQuantity", foodQuantity);
    } else {

    cart.push({dessert_item_id: foodItemId, foodName: foodName, foodQuantity: foodQuantity});

    console.log("cart order", cart);

    // Format for object being submitted to DB
    // {FoodItemId: 1, Quantity: 2, OrderNumber: 1}

    renderCartItems();
    }

    $('.counter').html(function(i, value) {
      return 0;
    })

  });



  $('.place-order').on("click", function (event) {
    event.preventDefault();

     console.log("order number", orderNumber);
    $.ajax({
      method: "POST",
      url: "/sendOrder",
      data: { order: JSON.stringify(cart) },
      //dataType: 'json',
      success: function(data) {
        console.log("Success!", JSON.stringify(cart))
      },
      error: function(data){
        alert("Something went wrong!");
      }
    });


    $('#modal1').modal('open');
      $('.modal').modal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: .5, // Opacity of modal background
      in_duration: 300, // Transition in duration
      out_duration: 200, // Transition out duration
      starting_top: '4%', // Starting top style attribute
      ending_top: '10%', // Ending top style attribute
      ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
        console.log(modal, trigger);
      },
      complete: function() {
      } // Callback for Modal close
    }
  );

      $('.cart-items').empty();
      $('.place-order').hide();

  });









  function renderCartItems() {
    $(".cart-items").empty('');
    $(cart).each(function(k, cartItem) {

      $('.cart-items').append(
      "<div  class=\"cart-item hidden\"><h5 class=\"cartTitle\">" + cartItem.foodName + "</h5><div class=\"quantity\"><span class=\"label\">x</span><span class=\"cartQuantity number\">" + cartItem.foodQuantity + "</span></div>"

      );
    });
    if(cart.length >= 1) $('.place-order').show();

    $('.empty').on("click", function(event) {

        $(this).closest('div.cart-item').remove();

        // $(this).closest('div').remove();
        // cart.pop();

        // $('.cartQuantity').remove();
        // $('.place-order').remove();
        // $('.empty').remove();
        });



  };

/////// Restarurant //////////

  $('.restaurant-alert').css('color', 'red');

  $('.confirm-time-btn').on("click" , function (event) {
    $('.restaurant-alert').css('color', 'green');
  })

  //restaurant-side actions
  $(".action-accept-btn").on("click", function(event) {
    event.preventDefault();
    console.log("accepted!");
  });

  $(".action-complete-btn").on("click", function(event) {
    $(".order-box").empty("");
    $(".order-box").html("<h2>No new orders</h2>");
    console.log("order complete!");
  });


  $(".action-decline-btn").on("click", function(event) {
    $('.modal').modal("open");
    $(".order-box").empty("");
    $(".order-box").html("<h2>Order declined.</h2>");
    console.log("declined!");

  });


});
