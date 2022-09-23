$(document).ready(function() {
    $("#enviar").ready(function() {
      $.ajax({
        url: "/admin/showemail",
        type: "GET",
        beforeSend: function() {
          //$("#" + formName).html(preloaderAzul);
        },
        success: function(response) {
          var options = []
          for (var i = 0; i< response.length; i++)
            { 
                options.push('<option value="',
                response[i].email, '">',
                response[i].email, '</option>');
            }
            $("#emails").html(options.join(''));
        },
      });
    });
  });
