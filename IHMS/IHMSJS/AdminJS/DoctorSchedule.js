
var isdocValid = false;
var isdeptValid = false;
var isscheduleValid = false;
var isstartValid = false;
var isendValid = false;
var isconsValid = false;

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
    isscheduleValid = validdate('#txtDate', '#msgdate', 'Schedule Date');
    isstartValid = validdate('#txttime', '#msgtime', 'Start Time');
    isendValid = validdate('#txtendtime', '#msgendtime', 'End Time');
    isconsValid = validdate('#txtcontime', '#msgcontime', 'Consulting Time');
}

var BaseUrl = "https://localhost:44369/admindetailinfo/DoctorSchedule/";

$(document).ready(function () {
    debugger;
    LoadData();
});

function SubmitData() {
    debugger;
    if ($('#hdndoctorscheduleId').val() != "") {
        Update();
    }
    else {
        Add();
    }
}

function Add() {
    debugger;
    validData();
    if (isscheduleValid == true && isstartValid == true && isendValid == true && isconsValid == true) {
        var formdata = new FormData();
        debugger;
        formdata.append("ScheduleId", 0);  /*append use for direct data insertion*/
        formdata.append("DoctorId", $("#DoctorId").val());
        formdata.append("DepartmentId", $("#hdndepartmentId").val());
        formdata.append("ScheduleDate", $('#txtDate').val());
        formdata.append("StartTime", $("#txttime").val());
        formdata.append("EndTime", $("#txtendtime").val());
        formdata.append("ConsultingTime", $("#txtcontime").val());
        $.ajax({
            type: 'POST',
            url: BaseUrl + "AddDoctorSchedule/",
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
        success: function (response) {
            debugger;

            $('#mytable').html(response);

        },
        error: function (data) {
            alert(data.statusText);
        }
    });

}

function Select() {
    debugger;
    $.ajax({
        url: BaseUrl + 'Selectbyid/',
        type: 'POST',
        dataType: 'JSON',
        data: { Id: $("#DoctorId").val() },
        success: function (data) {
            debugger;

            $('#hdndepartmentId').val(data.MyDepartment.DepartmentId);
            $("#departmentId").val(data.MyDepartment.DepartmentName);
        },
        error: function (data) {
            alert(data.statusText);
        }
    });
}

function Edit(id) {
    debugger;
    $.ajax({
        url: BaseUrl + 'EditById?DsId=' + id,
        type: 'POST',
        contentType: "application/json;charset=utf-8",
        dataType: 'JSON',
        success: function (data) {
            debugger;
            $('#hdndoctorscheduleId').val(data.ScheduleId);
            $('#DoctorId').val(data.DoctorId);
            $('#hdndepartmentId').val(data.DepartmentId);
            $('#txtdate').val(data.ScheduleDate);
            $('#txttime').val(data.StartTime);
            $('#txtendtime').val(data.EndTime);
            $('#txtcontime').val(data.ConsultingTime);
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
    formdata.append("ScheduleId", $('#hdndoctorscheduleId').val());   /*append use for direct data insertion*/
    formdata.append("DoctorId", $("#DoctorId").val());
    formdata.append("DepartmentId", $("#hdndepartmentId").val());
    formdata.append("ScheduleDate", $('#txtDate').val());
    formdata.append("StartTime", $("#txttime").val());
    formdata.append("EndTime", $("#txtendtime").val());
    formdata.append("ConsultingTime", $("#txtcontime").val());

    $.ajax({

        type: 'POST',
        url: BaseUrl + 'AddDoctorSchedule/',
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
    $('#ScheduleId').val("");
    $('#DoctorId').val("");
    $('#hdndepartmentId').val("");
    $('#txtdate').val("");
    $('#txttime').val("");
    $('#txtendtime').val("");
    $('#txtcontime').val("");
}