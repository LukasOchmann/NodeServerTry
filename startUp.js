$.ajax({
   method: 'GET',
   url: location.href+'sayHallo',
   success: function (data) {
       alert(data);
   }
});