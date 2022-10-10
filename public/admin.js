ADMIN = new Object();

$(document).ready(function () {

  function RequestShowEmail() {
    $.ajax({
      url: "/admin/showemail",
      type: "GET",
    }).done(function (resp) {
      GetEmails(resp)
      console.log(resp)
    });
  }

  RequestShowEmail()

  function GetEmails(emails) {
    $("#emails").empty()
    var options = []
    for (var i = 0; i < emails.length; i++) {
      $('#emails').append($('<option>').val(emails[i].status).text(emails[i].email))
    }

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

    var body = { email: emailValue, status: statusValue }
    $.ajax({
      url: "/admin/email",
      type: "POST",
      contentType: 'application/json',
      data: JSON.stringify(body),
    }).done(function (resp) {
      RequestShowEmail()
      alert("Alterado com sucesso !")
    });
  }

  ADMIN.AddEmail = function () {
    var newEmail = $("#novoemail").val()
    var newStatus = $("#novostatus").val()

    if (newStatus === 'true') {
      newStatus = true
    } else {
      newStatus = false
    }

    body = { email: newEmail, status: newStatus }
    $.ajax({
      url: "/admin/addemail",
      type: "POST",
      contentType: 'application/json',
      data: JSON.stringify(body),
    }).done(function (resp) {
      RequestShowEmail()
      $("#novoemail").val('')
      alert("Adicionado com sucesso !");
    });
  }

  ADMIN.RemoveEmail = function () {
    var emailValue = $("#emails option:selected").text()
    if (confirm(`Deseja mesmo deletar o email ${emailValue} ?`)) {
      body = { email: emailValue }
      $.ajax({
        url: "/admin/deletaremail",
        type: "POST",
        contentType: 'application/json',
        data: JSON.stringify(body),
      }).done(function (resp) {
        RequestShowEmail()
        $("#novoemail").val('')
        console.log(resp)
      });
    }
  }
});

