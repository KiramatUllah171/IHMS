var isdoctorValid = false;
var isemailValid = false;
var iscontactValid = false;
var isdocfeeValid = false;
var iseducationValid = false;
var isimageValid = false;
var ispasswordValid = false;
var isstatusValid = false;
var isdepatValid = false;

function validdate1(txt, msg, data) {
    var pattern = /^[a-zA-Z\s]*$/;  // Updated the regular expression pattern to allow whitespace characters
      
    var name = $(txt).val().trim();
    // Trim any leading or trailing whitespace from the input value

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
      
    var name = $(txt).val().trim();
    // Trim any leading or trailing whitespace from the input value

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
        $(msg).html("Invalid mail");
        $(msg).show();
        $('#btnSubmit').prop("disabled", true);
        return false;
    }
}

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
    isdoctorValid = validdate1('#txtdoctorname', '#msgName', 'Doctor Name');
    isemailValid = validdate2('#txtemail', '#msgemail', 'Email');
    iscontactValid = validdate('#txtcontact', '#msgcon', 'Contact');
    isdocfeeValid = validdate('#txtdoctorfee', '#msgdocfee', 'Doctor Fee');
    iseducationValid = validdate('#txteducation', '#msgedu', 'Education');
    isimageValid = validdate('#txtimage', '#msgimg', 'Image');
    ispasswordValid = validdate('#txtpassword', '#msgpas', 'Password');
    isstatusValid = validdateDropDowns('#ddlstatus', '#msgStatus', 'Status');
    isdepatValid = validdateDropDowns('#department', '#msgdep', 'Department');
}

var BaseUrl = "https://localhost:44369/admindetailinfo/Doctor/";

$(document).ready(function () {
    debugger;
    LoadDepartment();
    LoadData();
});

function SubmitData() {
    debugger;
    if ($('#hdndoctorId').val() != "") {
        Update();
    }
    else {
        Add();
    }
}

function Add() {
    debugger;
    validData();
    if (isdoctorValid == true && isemailValid == true && iscontactValid == true && isdocfeeValid == true && iseducationValid == true && isimageValid == true && ispasswordValid == true && isstatusValid == true && isdepatValid == true) {
        var image = $("#txtimage").get(0).files;
        var formdata = new FormData();
        debugger;
        formdata.append("DoctorId", 0);  /*append use for direct data insertion*/
        formdata.append("DoctorName", $("#txtdoctorname").val());
        formdata.append("Email", $("#txtemail").val());
        formdata.append("Contact", $("#txtcontact").val());
        formdata.append("DoctorFee", $("#txtdoctorfee").val());
        formdata.append("Education", $("#txteducation").val());
        formdata.append("Password", $("#txtpassword").val());
        formdata.append("DepartmentId", $("#department option:selected").val());
        formdata.append("Status", $("#ddlstatus option:selected").val());
        formdata.append("MyImage", image[0]);
        $.ajax({
            type: 'POST',
            url: BaseUrl + "AddDoctor/",
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


function LoadDepartment() {
    debugger;
    $.ajax({
        type: 'GET',
        url: "https://localhost:44369/admindetailinfo/Department/GetData",

        dataType: 'JSON',
        success: function (data) {

            debugger;

            var html = '';
            html += '<select id="DepartmentId" class="form-control">';
            html += '<option value="-1">--- Select Department ---</option>';
            for (var i = 0; i < data.length; i++) {
                html += '<option value="' + data[i].DepartmentId + '">' + data[i].DepartmentName + '</option>';
            }
            /*  */
            html += '</select>';
            html += '<span class="text-danger" id="msgdep"></span>';
            $('#department').html(html);
        },
        error: function (data) {
            alert(data.statusText);
        }
    });
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
        if (data[i].MyDoctor.Status == 0) {
            status = '<span class="badge badge-danger">InActive</span>';
        }
        else {
            status = '<span class="badge badge-success">Active</span>';
        }
        html += '<tr>';
        html += '<td>' + ++sno + '</td>';
        html += '<td><img src="../../../../UploadImage/' + data[i].MyDoctor.Image + '"/></td>';
        html += '<td>' + data[i].MyDoctor.DoctorName + '</td>';
        html += '<td>' + data[i].MyDepartment.DepartmentName + '</td>';
        html += '<td>' + data[i].MyDoctor.Email + '</td>';
        html += '<td>' + data[i].MyDoctor.Contact + '</td>';
        html += '<td>' + data[i].MyDoctor.DoctorFee + '</td>';
        html += '<td>' + data[i].MyDoctor.Education + '</td>';
        html += '<td>' + data[i].MyDoctor.Password + '</td>';
        html += '<td>' + status + '</td>';
        html += '<td><a href="#" class="btn btn-primary" onclick="Edit(' + data[i].MyDoctor.DoctorId + ')"><i class="zmdi zmdi-edit"></i></a></td ></tr >';
    }
    $('#mytable').html(html);
}

function Edit(id) {
    debugger;
    //var obj = {
    //    DId: id,
    //};
    $.ajax({
        url: BaseUrl + 'EditById?DId=' + id,
        type: 'POST',
        contentType: "application/json;charset=utf-8",
       // data: JSON.stringify(obj),
        dataType: 'JSON',
        success: function (data) {
            debugger;
            $('#hdndoctorId').val(data.DoctorId);
            $('#txtdoctorname').val(data.DoctorName);
            $('#txtemail').val(data.Email);
            $('#txtcontact').val(data.Contact);
            $('#txtdoctorfee').val(data.DoctorFee);
            $('#txteducation').val(data.Education);
            $('#txtpassword').val(data.Password);
            $('#department').find('option[value="' + data.DepartmentId + '"]').prop('selected', true);

            $('#hdnImage').val(data.Image);
            $('#ddlstatus').val(data.status);
           // $('#btnSubmit').val("Update");
            $('#Modal').modal();
        },
        error: function (data) {
            alert(data.statusText);
        }
    });

}

function Update() {
    debugger;
        var image = $("#txtimage").get(0).files;
        var formdata = new FormData();
        
        formdata.append("DoctorId", $('#hdndoctorId').val());   /*append use for direct data insertion*/
        formdata.append("DoctorName", $("#txtdoctorname").val());
        formdata.append("Email", $("#txtemail").val());
        formdata.append("Contact", $("#txtcontact").val());
        formdata.append("DoctorFee", $("#txtdoctorfee").val());
        formdata.append("Education", $("#txteducation").val());
        formdata.append("Password", $("#txtpassword").val());
        formdata.append("DepartmentId", $("#department option:selected").val());
        formdata.append("Status", $("#ddlstatus option:selected").val());
        formdata.append("MyImage", image[0]);
        formdata.append("Image", $('#hdnImage').val());

        $.ajax({

            url: BaseUrl + 'AddDoctor/',
            type: 'POST',
            data: formdata,
            contentType: false,
            processData: false,
            success: function (data) {
                LoadData();
                iziToast.success({
                    title: 'OK',
                    position: 'center',
                    timeout: 3000,
                    message: 'Successfully Updated',
                });
                ClearTextBoxes();
            },
            error: function (data) {
                alert(data.statusText);
            }
        });
    
}

function ClearTextBoxes() {
    $('#DoctorId').val("");
    $('#txtdoctorname').val("");
    $('#txtemail').val("");
    $('#txtcontact').val("");
    $('#txtdoctorfee').val("");
    $('#txteducation').val("");
    $('#txtpassword').val("");
    $('#DepartmentId').val(-1);
    $('#hdnImage').val("");
    $('#ddlstatus').val(-1);
}