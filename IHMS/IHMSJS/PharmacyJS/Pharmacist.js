

var isValid = false;

function validdate(txt, msg, data) {
    debugger;
    if ($(txt).val() == "") {
        var mymsg = data + ' is required';
        $(txt).css("border-color", "red");
        $(msg).html(mymsg);
        $('#btnSubmit').css("Enabled", "false");
        return false;
    }
    else {

        $(txt).css("border-color", "green");
        $(msg).html("");
        $('#btnSubmit').css("Enabled", "true");
        return true;
    }
}
function validdate1(txt, msg, data) {
    var pattern = /^[\w.-]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;  // Updated the regular expression pattern to allow whitespace characters
    var name = $(txt).val().trim();  // Trim any leading or trailing whitespace from the input value

    if (name === "") {
        var mymsg = data + ' is required';
        $(txt).css("border-color", "red");
        $(msg).html(mymsg);
        $('#btnSubmit').prop("disabled", true);  // Corrected the property name to disable the button
        return false;
    } else if (pattern.test(name)) {
        $(txt).css("border-color", "green");
        $(msg).html("");
        $('#btnSubmit').prop("disabled", false);  // Corrected the property name to enable the button
        return true;
    } else {
        $(msg).html("Invalid Mail address");
        $(msg).show();
        $('#btnSubmit').prop("disabled", true);
        return false;
    }
}

var BaseUrl = "https://localhost:44369/Pharmacy/Account/";

function LogInValid() {

    isValid = validdate1('#txtemail', '#email', 'Email ');
    isvalid = validdate('#txtpassword', '#password', 'Password');
}

function Login() {
    LogInValid();
    debugger;
    if (isValid) {
        var adminObj = {
            email: $("#txtemail").val(),
            password: $("#txtpassword").val()
        }

        $.ajax({
            type: 'POST',
            url: BaseUrl + "SignIn/",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            dataType: 'JSON',
            data: JSON.stringify(adminObj),
            success: function (data) {
                debugger;
                if (data.msg == true) {
                    var url = "https://localhost:44369/Pharmacy/Dashboard/Index";
                    location.href = url;
                }
                else {
                    iziToast.error({
                        title: 'OK',
                        position: 'center',
                        timeout: 3000,
                        message: 'Login Failed Email or Password is Incorrect',
                    });
                }
            },
            error: function (data) {
                iziToast.error({
                    title: 'Error',
                    message: 'Illegal operation',
                });
            }
        });
    }
}

function ForgotInValid() {

    isValid = validdate1('#txtemail', '#email', 'Email ');
}

function Forgot() {
    ForgotInValid();
    debugger;
    if (isValid) {
        var adminObj = {
            email: $("#txtemail").val(),
        }

        $.ajax({
            type: 'POST',
            url: BaseUrl + "ForgotPassword/",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            dataType: 'JSON',
            data: JSON.stringify(adminObj),
            success: function (data) {
                debugger;
                if (data.msg == true) {
                    iziToast.success({
                        title: 'OK',
                        position: 'center',
                        timeout: 3000,
                        message: 'Please check your mail that you open in mobile or any device',
                    });
                }
                else {
                    iziToast.error({
                        title: 'Sorry',
                        position: 'center',
                        timeout: 3000,
                        message: 'No user found with that email',
                    });
                }
            },
            error: function (data) {
                iziToast.error({
                    title: 'Error',
                    message: 'Illegal operation',
                });
            }
        });
    }
}

function ResetInValid() {

    isValid = validdate1('#txtemail', '#email', 'Email ');
    isvalid = validdate('#txtpassword', '#password', 'Password');
}

function Reset() {
    ResetInValid();
    debugger;
    if (isValid) {
        var adminObj = {
            email: $("#txtemail").val(),
            password: $("#txtpassword").val()
        }

        $.ajax({
            type: 'POST',
            url: BaseUrl + "Reset/",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            dataType: 'JSON',
            data: JSON.stringify(adminObj),
            success: function (data) {
                debugger;
                if (data.msg == true) {
                    iziToast.success({
                        title: 'OK',
                        position: 'center',
                        timeout: 3000,
                        message: 'Your password is successfully changed please check your mail',
                    });
                }
                else {
                    iziToast.error({
                        title: 'Sorry',
                        position: 'center',
                        timeout: 3000,
                        message: 'No user found with that email',
                    });
                }
            },
            error: function (data) {
                iziToast.error({
                    title: 'Error',
                    message: 'Illegal operation',
                });
            }
        });
    }
}