$(document).ready(function(){
loadVending()
vendingMachine();
})

function loadVending() {
  //clearContactTable()
  var itemsToDisplay = $('#vendingMachineItemsToList');
  var i = 1;
  $.ajax({
    type: 'GET',
    url: 'http://localhost:8080/items',
    success: function(itemArray) {
        $.each(itemArray, function(index, item) {
          var itemId = item.id;
          var name = item.name;
          var price = item.price;
          var quantity = item.quantity;
          var num = price;
          var n=num.toFixed(2);

              var row = '<button type="button" class="col-md-3" id="vendingMachineItem">';
              row +=  '<div id="localitem">' + itemId + '<div>';
              row +=  '<div id="name">' + name + '</div><br>';
              row += '<div id="price">$' + n + '</div><br><br>';
              row += '<div id="quantity">Quantity Left: ' + quantity + '</div>';
              row += '</button>'

              itemsToDisplay.append(row);







        });
    },
    error: function(){
        $('#errorMessages')
           .append($('<li>')
           .attr({class: 'list-group-item list-group-item-danger'})
           .text('Error calling web service. Please try again later.'));
    }
  });
}

function vendingMachine(){
  var total = 0;

  $('#vendingMachineItemsToList').click(function(event){
    $('#messages').val(itemName);
    $('.itemIdDisplay').val(itemId);

  })

$('#add-dollar-button').click(function(event){
total += 1.00;
$('#totalIn').val('$'+total.toFixed(2));
})

$('#add-quarter-button').click(function(event){
  total += .25;
  $('#totalIn').val('$'+total.toFixed(2));
})

$('#add-dime-button').click(function(event){
  total+= .10;
  $('#totalIn').val('$'+total.toFixed(2));
})
$('#add-nickel-button').click(function(event){
  total+= .05;
  $('#totalIn').val('$'+total.toFixed(2));
})
$('#make-purchase-button').click(function(event){
  id = $(itemId).val();

    $.ajax({
    type: 'GET',
    url: 'http://localhost:8080/money/' + total+ '/item/' + id,
    success: function(data) {
      $('#messages').val('Thank you!');

         $('#change').val(data.quarters + ' Quarter '+ data.dimes+' Dimes ' +
          + data.nickels + ' Nickels ' + data.pennies + ' Pennies ' );

       $('#change-return-button').click(function(event){
         location.reload();


       })
      total = 0;
       $('#totalIn').val('$'+total.toFixed(2));
    },
    error : function(data,xhr){

  $('#messages').val(JSON.parse(data.responseText).message);

    }
  })
})



}
