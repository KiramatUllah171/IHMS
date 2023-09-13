

var n = false;
var e = false;
var c = false;
var a = false;
var C = false;
var p = false;
var sh = false;
var s = false;

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
    n = validdate1('#txtname', '#msgName', 'Customer');
    e = validdate('#txtemail', '#msgemail', 'Email');
    c = validdate('#txtcontact', '#msgcontact', 'Contact');
    a = validdate('#txtaddress', '#msgaddress', 'Address');
    C = validdate('#txtCNIC', '#msgCNIC', 'CNIC');
    p = validdate('#txtpostalcode', '#msgpostalcode', 'Postal Code');
    sh = validdate1('#txtshopname', '#msgshopname', 'Shop Name');
    s = validdateDropDowns('#ddlstatus', '#msgStatus', 'Status');
}

var BaseUrl = "https://localhost:44369/Pharmacy/Distributor/";


$(document).ready(function () {
    //    debugger;
    LoadData();
});

function SubmitData() {
    debugger;
    if ($('#hdndistributorId').val() != "") {
        Update();
    }
    else {
        Add();
    }
}

function Add() {
    debugger;
    validData();
    if (n == true && e == true && c == true && a == true && C == true && p == true && s == true && sh == true) {
        var formdata = new FormData();
        debugger;
        formdata.append("DistributorId", 0);  /*append use for direct data insertion*/
        formdata.append("SupplierName", $("#txtname").val());
        formdata.append("SupplierEmail", $("#txtemail").val());
        formdata.append("SupplierContact", $("#txtcontact").val());
        formdata.append("SupplierAddress", $("#txtaddress").val());
        formdata.append("SupplierCNIC", $("#txtCNIC").val());
        formdata.append("PostalCode", $("#txtpostalcode").val());
        formdata.append("ShopName", $("#txtshopname").val());
        formdata.append("status", $("#ddlstatus option:selected").val());
        $.ajax({
            type: 'POST',
            url: BaseUrl + "AddDistributor/",
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
        html += '<tr style="color:black!important"><td>' + (i + 1) + '</td><td>' + data[i].SupplierName + '</td>';
        html += '<td>' + data[i].SupplierEmail + '</td>';
        html += '<td>' + data[i].SupplierContact + '</td>';
        html += '<td>' + data[i].SupplierAddress + '</td>';
        html += '<td>' + data[i].SupplierCNIC + '</td>';
        html += '<td>' + data[i].PostalCode + '</td>';
        html += '<td>' + data[i].ShopName + '</td>';
        html += '<td>' + status + '</td>';
        html += '<td><a href="#" class="btn btn-primary" onclick="Edit(' + data[i].DistributorId + ')"><i class="zmdi zmdi-edit"></i></a></td></tr>';
    }
    $('#mytable').html(html);
}

function Edit(id) {
    debugger;
    //var obj = {
    //    DId: id,
    //};
    $.ajax({

        url: BaseUrl + 'EditById?DID=' + id,
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        // data: JSON.stringify(obj),
        dataType: 'JSON',

        success: function (data) {
            debugger;
            $('#hdndistributorId').val(data.DistributorId);
            $('#txtname').val(data.SupplierName);
            $('#txtemail').val(data.SupplierEmail);
            $('#txtcontact').val(data.SupplierContact);
            $('#txtaddress').val(data.SupplierAddress);
            $('#txtCNIC').val(data.SupplierCNIC);
            $('#txtpostalcode').val(data.PotalCode);
            $('#txtshopname').val(data.ShopName);
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
    formdata.append("DistributorId", $("#hdndistributorId").val());  /*append use for direct data insertion*/
    
    formdata.append("SupplierName", $("#txtname").val());
    formdata.append("SupplierEmail", $("#txtemail").val());
    formdata.append("SupplierContact", $("#txtcontact").val());
    formdata.append("SupplierAddress", $("#txtaddress").val());
    formdata.append("SupplierCNIC", $("#txtCNIC").val());
    formdata.append("PostalCode", $("#txtpostalcode").val());
    formdata.append("ShopName", $("#txtshopname").val());
    formdata.append("status", $("#ddlstatus option:selected").val());

    $.ajax({

        url: BaseUrl + 'AddDistributor/',
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
    $('#DistributorId').val("");
    $('#txtname').val("");
    $('#txtemail').val("");
    $('#txtcontact').val("");
    $('#txtaddress').val("");
    $('#txtCNIC').val("");
    $('#txtpostalcode').val("");
    $('#txtshopname').val("");
    $('#status').val(-1);
}


