
var ispatValid = false;
var isdocValid = false;
var isdisValid = false;

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
    ispatValid = validdateDropDowns('#ddlPatient', '#msgpat', 'Patient');
    isdocValid = validdateDropDowns('#ddlDoctor', '#msgdoc', 'Doctor');
    isdisValid = validdate('#txtdischarge', '#msgdischarge', 'Date of Charge');
}

var BaseUrl = "https://localhost:44369/Doctor/Outpatient/";

$(document).ready(function () {
    debugger;
    LoadDoctor();
    LoadPatient();
    LoadData();
});

function SubmitData() {
    debugger;
    if ($('#hdnoutpatientId').val() != "") {
        Update();
    }
    else {
        Add();
    }
}

function Add() {
    debugger;
    validData();
    if (ispatValid == true && isdocValid == true && isdisValid == true) {
        var formdata = new FormData();
        debugger;
        formdata.append("OutPatientId", 0);  /*append use for direct data insertion*/
        formdata.append("DoctorId", $("#ddlDoctor option:selected").val());
        formdata.append("PatientId", $("#ddlPatient option:selected").val());
        formdata.append("DischargeDate", $("#txtdischarge").val());
        $.ajax({
            type: 'POST',
            url: BaseUrl + "AddOutpatient/",
            data: formdata,
            contentType: false,
            processData: false,
            success: function (data) {
                debugger;
                LoadData();
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

function LoadPatient() {
    debugger;
    $.ajax({
        type: 'GET',
        url: "https://localhost:44369/Patient/PatientAccount/GetData",

        dataType: 'JSON',
        success: function (data) {

            debugger;

            var html = '';
            html += '<select id="PatientId" class="form-control">';
            html += '<option value="-1">--- Select Patient ---</option>';
            for (var i = 0; i < data.length; i++) {
                html += '<option value="' + data[i].PatientId + '">' + data[i].Name + '</option>';
            }
            /*  */
            html += '</select>';
            html += '<span class="text-danger" id="msgpat"></span>';
            $('#ddlPatient').html(html);
        },
        error: function (data) {
            alert(data.statusText);
        }
    });
}

function LoadDoctor() {
    debugger;
    $.ajax({
        type: 'GET',
        url: "https://localhost:44369/Doctor/Account/GetdoctData",

        dataType: 'JSON',
        success: function (data) {

            debugger;

            var html = '';
            html += '<select id="DoctorId" class="form-control">';
            html += '<option value="-1">--- Select Doctor ---</option>';
            for (var i = 0; i < data.length; i++) {
                html += '<option value="' + data[i].DoctorId + '">' + data[i].DoctorName + '</option>';
            }
            /*  */
            html += '</select>';
            html += '<span class="text-danger" id="msgdoc"></span>';
            $('#ddlDoctor').html(html);
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
        success: function (response) {
            debugger;

            $('#mytable').html(response);

        },
        error: function (data) {
            alert(data.statusText);
        }
    });

}



function Edit(id) {
    debugger;
    $.ajax({
        url: BaseUrl + 'EditById?otpId=' + id,
        type: 'POST',
        contentType: "application/json;charset=utf-8",
        dataType: 'JSON',
        success: function (data) {
            debugger;
            $('#hdnoutpatientId').val(data.OutPatientId);
            $('#ddlDoctor').find('option[value="' + data.DoctorId + '"]').prop('selected', true);
            $('#ddlPatient').find('option[value="' + data.PatientId + '"]').prop('selected', true);
            $('#txtdischarge').val(data.DischargeDate);
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
    formdata.append("OutPatientId", $('#hdnoutpatientId').val());   /*append use for direct data insertion*/
    formdata.append("DoctorId", $("#ddlDoctor option:selected").val());
    formdata.append("PatientId", $("#ddlPatient option:selected").val());
    formdata.append("DischargeDate", $("#txtdischarge").val());

    $.ajax({

        url: BaseUrl + 'AddOutpatient/',
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