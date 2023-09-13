
var ispatValid = false;
var isdocValid = false;
var isroomValid = false;
var isdaValid = false;
var isdisValid = false;
var isadvValid = false;
var isdieValid = false;

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
    ispatValid = validdateDropDowns('#ddlpat', '#msgpat', 'Patient');
    isdocValid = validdateDropDowns('#ddldoc', '#msgdoc', 'Doctor');
    isroomValid = validdateDropDowns('#ddlroom', '#msgroom', 'Room');
    isdaValid = validdate('#txtdateofadmit', '#msgadmit', 'Date of Admit');
    isdisValid = validdate('#txtdischarge', '#msgdischarge', 'Date of Charge');
    isadvValid = validdate('#txtadvance', '#msgadvance', 'Advance');
    isdieValid = validdate('#txtdieases', '#msgdieases', 'Dieases');
}

var BaseUrl = "https://localhost:44369/Doctor/InPatient/";

$(document).ready(function () {
    debugger;
    LoadPatient();
    LoadDoctor();
    LoadRoom();
    LoadData();
});

function SubmitData() {
    debugger;
    if ($('#hdnadmitId').val() != "") {
        Update();
    }
    else {
        Add();
    }
}

function Add() {
    debugger;
    validData();
    if (ispatValid == true && isdocValid == true && isroomValid == true && isdaValid == true && isdisValid == true && isadvValid == true && isdieValid == true) {
        var formdata = new FormData();
        debugger;
        formdata.append("AdmitId", 0);  /*append use for direct data insertion*/
        formdata.append("DoctorId", $("#ddldoc option:selected").val());
        formdata.append("RoomId", $("#ddlroom option:selected").val());
        formdata.append("PatientId", $("#ddlpat option:selected").val());
        formdata.append("DateofAdmit", $('#txtdateofadmit').val());
        formdata.append("DateofDischarge", $("#txtdischarge").val());
        formdata.append("Advance", $("#txtadvance").val());
        formdata.append("DieaseName", $("#txtdieases").val());
        $.ajax({
            type: 'POST',
            url: BaseUrl + "AddInPatient/",
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

function LoadRoom() {
    debugger;
    $.ajax({
        type: 'GET',
        url: "https://localhost:44369/admindetailinfo/Account/GetRoomData",

        dataType: 'JSON',
        success: function (data) {

            debugger;

            var html = '';
            html += '<select id="RoomId" class="form-control">';
            html += '<option value="-1">--- Select Room ---</option>';
            for (var i = 0; i < data.length; i++) {
                html += '<option value="' + data[i].RoomId + '">' + data[i].RoomNo + '</option>';
            }
            /*  */
            html += '</select>';
            html += '<span class="text-danger" id="msgroom"></span>';
            $('#ddlroom').html(html);
        },
        error: function (data) {
            alert(data.statusText);
        }
    });
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
            $('#ddlpat').html(html);
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
            $('#ddldoc').html(html);
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

//function CreateTableRow(data) {
//    debugger;
//    var html = '';
//    var sno = 0;
//    for (var i = 0; i < data.length; i++) { 
//        html += '<tr>';
//        //html += '<td>' + ++sno + '</td>';
//        //html += '<td>' + data[i].MyDoctor.DoctorName + '</td>';
//        //html += '<td>' + data[i].MyDepartment.DepartmentName + '</td>';
//        //html += '<td>' + data[i].MySchedule.ScheduleDate + '</td>';
//        //html += '<td>' + data[i].MySchedule.StartTime + '</td>';
//        //html += '<td>' + data[i].MySchedule.EndTime + '</td>';
//        //html += '<td>' + data[i].MySchedule.ConsultingTime + '</td>';
//        html += '<td><a href="#" class="btn btn-primary" onclick="Edit(' + data[i].MySchedule.ScheduleId + ')"><i class="zmdi zmdi-edit"></i></a></td ></tr >';
//    }
//    $('#mytable').html(html);
//}

function Edit(id) {
    debugger;
    $.ajax({
        url: BaseUrl + 'EditById?InId=' + id,
        type: 'POST',
        contentType: "application/json;charset=utf-8",
        dataType: 'JSON',
        success: function (data) {
            debugger;
            $('#hdnadmitId').val(data.AdmitId);
            $('#ddldoc').find('option[value="' + data.DoctorId + '"]').prop('selected', true);
            $('#ddlpat').find('option[value="' + data.PatientId + '"]').prop('selected', true);
            $('#ddlroom').find('option[value="' + data.RoomId + '"]').prop('selected', true);
            $('#txtdateofadmit').val(data.DateofAdmit);
            $('#txtdischarge').val(data.DateofCharge);
            $('#txtadvance').val(data.Advance);
            $('#txtdieases').val(data.DieaseName);
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
    formdata.append("AdmitId", $('#hdnadmitId').val());   /*append use for direct data insertion*/
    formdata.append("DoctorId", $("#ddldoc option:selected").val());
    formdata.append("RoomId", $("#ddlroom option:selected").val());
    formdata.append("PatientId", $("#ddlpat option:selected").val());
    formdata.append("DateofAdmit", $('#txtdateofadmit').val());
    formdata.append("DateofDischarge", $("#txtdischarge").val());
    formdata.append("Advance", $("#txtadvance").val());
    formdata.append("DieaseName", $("#txtdieases").val());

    $.ajax({

        url: BaseUrl + 'AddInpatient/',
        type: 'POST',
        data: formdata,
        contentType: false,
        processData: false,
        success: function (data) {
            LoadData();
            ClearTextBoxes();
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
    $('#AdmitId').val("");
    $('#DoctorId').val(-1);
    $('#RoomId').val(-1);
    $('#PatientId').val(-1);
    $('#txtdateofadmit').val("");
    $('#txtdischarge').val("");
    $('#txtadvance').val("");
    $('#txtdieases').val("");
}