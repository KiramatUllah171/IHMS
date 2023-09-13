


var n = false;
var e = false;
var c = false;
var a = false;
var C = false;
var s = false;

function validdate1(txt, msg, data) {
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

function validdate(txt, msg, data) {
    var pattern = /^[a-zA-Z\s/]*$/;  // Updated the regular expression pattern to allow whitespace characters
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
    n = validdate('#txtname', '#msgName', 'Customer');
    e = validdate2('#txtemail', '#msgemail', 'Email');
    c = validdate1('#txtcontact', '#msgcontact', 'Contact');
    a = validdate1('#txtaddress', '#msgadres', 'Address');
    C = validdate1('#txtcompanycode', '#msgcompanycode', 'Company Code');
    s = validdateDropDowns('#ddlstatus', '#msgStatus', 'Status');
}

var BaseUrl = "https://localhost:44369/Pharmacy/Manufacturer/";

$(document).ready(function () {
    //    debugger;
    LoadData();
});

function SubmitData() {
    debugger;
    if ($('#hdnmanuID').val() != "") {
        Update();
    }
    else {
        Add();
    }
}

function Add() {
    debugger;
    validData();
    if (n == true && e == true && c == true && a == true && C == true && s == true) {
        var formdata = new FormData();
        debugger;
        formdata.append("ManufacturerID", 0);  /*append use for direct data insertion*/
        formdata.append("Name", $("#txtname").val());
        formdata.append("Email", $("#txtemail").val());
        formdata.append("Contact", $("#txtcontact").val());
        formdata.append("Address", $("#txtaddress").val());
        formdata.append("CompanyCode", $("#txtcompanycode").val());
        formdata.append("status", $("#ddlstatus option:selected").val());
        $.ajax({
            type: 'POST',
            url: BaseUrl + "AddManufacturer/",
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
                    timeout: 3000,
                    message: 'Data Successfully Added',
                });
                ClearTextBoxes();
            },
            error: function (data) {
                debugger;
                iziToast.error({
                    title: 'Error',
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
            debugger;
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
    for (var i = 0; i < data.length; i++) {
        var status = '';
        if (data[i].Status == 0) {
            status = '<span class="badge badge-danger">InActive</span>';
        }
        else {
            status = '<span class="badge badge-success">Active</span>';
        }
        html += '<tr style="color:black!important"><td>' + (i + 1) + '</td><td>' + data[i].Name + '</td>';
        html += '<td>' + data[i].Email + '</td>';
        html += '<td>' + data[i].Contact + '</td>';
        html += '<td>' + data[i].Address + '</td>';
        html += '<td>' + data[i].CompanyCode + '</td>';
        html += '<td>' + status + '</td>';
        html += '<td><a href="#" class="btn btn-primary" onclick="Edit(' + data[i].ManufacturerID + ')"><i class="zmdi zmdi-edit"></i></a></td></tr>';
    }
    $('#mytable').html(html);
}

function Edit(id) {
    debugger;
    //var obj = {
    //    DId: id,
    //};
    $.ajax({

        url: BaseUrl + 'EditById?MID=' + id,
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        // data: JSON.stringify(obj),
        dataType: 'JSON',

        success: function (data) {
            debugger;
            $('#hdnmanuID').val(data.ManufacturerID);
            $('#txtname').val(data.Name);
            $('#txtemail').val(data.Email);
            $('#txtcontact').val(data.Contact);
            $('#txtaddress').val(data.Address);
            $('#txtcompanycode').val(data.CompanyCode);
            $('#ddlstatus').val(data.status);
            $('#btnSubmit').val("Update");
            $('#Modal').modal();

        },
        error: function (data) {
            alert(data.statusText);
        }
    });

}


function Update() {
        var formdata = new FormData();
        debugger;
        formdata.append("ManufacturerID", $("#hdnmanuID").val());  /*append use for direct data insertion*/
        formdata.append("Name", $("#txtname").val());
        formdata.append("Email", $("#txtemail").val());
        formdata.append("Contact", $("#txtcontact").val());
        formdata.append("Address", $("#txtaddress").val());
        formdata.append("CompanyCode", $("#txtcompanycode").val());
        formdata.append("status", $("#ddlstatus option:selected").val());

        $.ajax({

            url: BaseUrl + 'AddManufacturer/',
            type: 'POST',
            data: formdata,
            contentType: false,
            processData: false,
            success: function (data) {
                LoadData();
                ClearTextBoxes();
                /* $('#Modal').hide();*/
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
    $('#ManufacturerID').val("");
    $('#txtname').val("");
    $('#txtemail').val("");
    $('#txtcontact').val("");
    $('#txtaddress').val("");
    $('#txtcompanycode').val("");
    $('#status').val(-1);
}


