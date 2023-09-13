var isnameValid = false;
var isemailValid = false;
var iscontactValid = false;
var isimageValid = false;
var ispasswordValid = false;
var isstatusValid = false;
var isgenderValid = false;

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
    var pattern = /^[a-zA-Z\s]*$/;  // Updated the regular expression pattern to allow whitespace characters
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
        $(msg).html("Should contain only characters");
        $(msg).show();
        $('#btnSubmit').prop("disabled", true);
        return false;
    }
}
function validdate2(txt, msg, data) {
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
function validdateDropDowns(txt, msg, data) {
    debugger;
    if ($(txt + ' option:selected').val() == "-1") {
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

function validData() {
    isnameValid = validdate1('#txtname', '#msgName', 'Name');
    isemailValid = validdate2('#txtemail', '#msgemail', 'Email');
    iscontactValid = validdate('#txtcontact', '#msgcon', 'Contact');
    isimageValid = validdate('#txtimage', '#msgimg', 'Image');
    ispasswordValid = validdate('#txtpassword', '#msgpas', 'Password');
    isstatusValid = validdateDropDowns('#ddlstatus', '#msgCatStatus', 'Status');
    isgenderValid = validdateDropDowns('#ddlgender', '#msggender', 'Gender');
}

var BaseUrl = "https://localhost:44369/admindetailinfo/Pharmacist/";

$(document).ready(function () {
    debugger;
    LoadData();
});

function SubmitData() {
    debugger;
    if ($('#hdnpharmacistId').val() != "") {
        Update();
    }
    else {
        Add();
    }
}

function Add() {
    debugger;
    validData();
    if (isnameValid == true && isemailValid == true && iscontactValid == true && isimageValid == true && ispasswordValid == true
        && isstatusValid == true && isgenderValid == true) {
        var image = $("#txtimage").get(0).files;
        var formdata = new FormData();
        debugger;
        formdata.append("PharmacistId", 0);  /*append use for direct data insertion*/
        formdata.append("Name", $("#txtname").val());
        formdata.append("Email", $("#txtemail").val());
        formdata.append("Contact", $("#txtcontact").val());
        formdata.append("Password", $("#txtpassword").val());
        formdata.append("Gender", $("#ddlgender option:selected").val());
        formdata.append("Status", $("#ddlstatus option:selected").val());
        formdata.append("MyImage", image[0]);
        $.ajax({
            type: 'POST',
            url: BaseUrl + "AddPharmacist/",
            data: formdata,
            contentType: false,
            processData: false,
            success: function (data) {
                debugger;
                LoadData();
                ClearTextBoxes();
                iziToast.success({
                    title: 'OK',
                    position: 'center',
                    timeout: 2000,
                    message: 'Successfully Addedd',
                });

            },
            error: function (data) {
                debugger;
                iziToast.error({
                    title: 'Error',
                    position: 'center',
                    message: 'Illegal operation',
                });
            }
        });
    }

}

function LoadData() {
    debugger;
    $.ajax({
        type: 'GET',
        url: BaseUrl + 'GetData/',
        dataType: 'JSON',
        success: function (data) {
            CreateTableRow(data);
        },
        error: function (data) {
            alert(data.statusText);
        }
    });

}

function CreateTableRow(data) {
    debugger;
    var html = '';
    var sno = 0;
    for (var i = 0; i < data.length; i++) {
        var status = '';
        var gender = '';
        if (data[i].Gender == "Male") {
            gender = 'Male';
        }
        else {
            gender = 'Female';
        }
        //break
        if (data[i].Status == 0) {
            status = '<span class="badge badge-danger">InActive</span>';
        }
        else {
            status = '<span class="badge badge-success">Active</span>';
        }
        html += '<tr>';
        html += '<td>' + ++sno + '</td>';
        html += '<td><img src="../../../../UploadImage/' + data[i].Image + '"/></td>';
        html += '<td>' + data[i].Name + '</td>';
        html += '<td>' + data[i].Email + '</td>';
        html += '<td>' + data[i].Contact + '</td>';
        html += '<td>' + data[i].Password + '</td>';
        html += '<td>' + gender + '</td>';
        html += '<td>' + status + '</td>';
        html += '<td><a href="#" class="btn btn-primary" onclick="Edit(' + data[i].PharmacistId + ')"><i class="zmdi zmdi-edit"></i></a></td ></tr >';
    }
    $('#mytable').html(html);
}

function Edit(id) {
    debugger;
    //var obj = {
    //    DId: id,
    //};
    $.ajax({
        url: BaseUrl + 'EditById?PId=' + id,
        type: 'POST',
        contentType: "application/json;charset=utf-8",
        // data: JSON.stringify(obj),
        dataType: 'JSON',
        success: function (data) {
            debugger;
            $('#hdnpharmacistId').val(data.PharmacistId);
            $('#txtname').val(data.Name);
            $('#txtemail').val(data.Email);
            $('#txtcontact').val(data.Contact);
            $('#txtpassword').val(data.Password);
            $('#hdnImage').val(data.Image);
            $('#ddlstatus').val(data.Status);
            $('#ddlgender').val(data.Gender);
            $('#btnSubmit').val("Update");
            $('#Modal').modal();
        },
        error: function (data) {
            alert(data.statusText);
        }
    });

}

function Update() {


    var image = $("#txtimage").get(0).files;
    var formdata = new FormData();
    debugger;
    formdata.append("PharmacistId", $('#hdnpharmacistId').val());   /*append use for direct data insertion*/
    formdata.append("Name", $("#txtname").val());
    formdata.append("Email", $("#txtemail").val());
    formdata.append("Contact", $("#txtcontact").val());
    formdata.append("Password", $("#txtpassword").val());
    formdata.append("Gender", $("#ddlgender option:selected").val());
    formdata.append("Status", $("#ddlstatus option:selected").val());
    formdata.append("MyImage", image[0]);
    formdata.append("Image", $('#hdnImage').val());

    $.ajax({

        url: BaseUrl + 'AddPharmacist/',
        type: 'POST',
        data: formdata,
        contentType: false,
        processData: false,
        success: function (data) {
            LoadData();
            ClearTextBoxes()
            iziToast.success({
                title: 'OK',
                position: 'center',
                timeout: 3000,
                message: 'Successfully Updated',
            });
        },
        error: function (data) {
            alert(data.statusText);
        }
    });

}

function ClearTextBoxes() {
    $('#PharmacistId').val("");
    $('#txtname').val("");
    $('#txtemail').val("");
    $('#txtcontact').val("");
    $('#txtpassword').val("");
    $('#ddlgender').val(-1);
    $('#ddlstatus').val(-1);
}