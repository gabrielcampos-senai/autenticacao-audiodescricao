ADMIN = new Object();

$(document).ready(function () {


  function RequestShowEmail() {
    $("#enviar").ready(function () {
      $.ajax({
        url: "/admin/showemail",
        type: "GET",
        success: function (response) {
          GetEmails(response)
        },
      });
    });
  }

  RequestShowEmail()

  function GetEmails(emails) {
    var options = []
    for (var i = 0; i < emails.length; i++) {
      options.push('<option value="',
        emails[i].status, '">',
        emails[i].email, '</option>');
    }
    $("#emails").html(options.join(''));
    ADMIN.GetStatus()
  }


  ADMIN.GetStatus = function () {
    $("#status").val($('#emails').val())
  }

  ADMIN.SetStatus = function () {
    var statusValue = $("#status").val()
    var emailValue = $("#emails option:selected").text()

    if (statusValue === 'true') {
      statusValue = true
    } else {
      statusValue = false
    }

    var x = { email: emailValue, status: statusValue }
    $.ajax({
      url: "/admin/email",
      type: "POST",
      contentType: 'application/json',
      data: JSON.stringify(x),
    });
    RequestShowEmail()
  }
});

