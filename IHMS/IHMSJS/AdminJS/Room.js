var isroomValid = false;
var isstatusValid = false;
var ispatient = false;
var isroomtype = false;

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
    isroomValid = validdate('#txtroomno', '#msgroom', 'Room');
    ispatient = validdateDropDowns('#ddlpat', '#msgpat', 'Patient');
    isroomtype = validdateDropDowns('#ddlrt', '#msgroomtype', 'Room Type');
    isstatusValid = validdateDropDowns('#ddlstatus', '#msgCatStatus', 'Status');
}

var BaseUrl = "https://localhost:44369/admindetailinfo/Room/";

$(document).ready(function () {
    debugger;
    LoadPatient();
    LoadRoomtype();
    LoadData();
});

function SubmitData() {
    debugger;
    if ($('#hdnroomId').val() != "") {
        Update();
    }
    else {
        Add();
    }
}

function Add() {
    debugger;
    validData();
    if (isroomValid == true && isstatusValid == true && ispatient == true && isroomtype == true) {
        var formdata = new FormData();
        debugger;
        formdata.append("RoomId", 0);  /*append use for direct data insertion*/
        formdata.append("RoomNo", $("#txtroomno").val());
        formdata.append("PatientId", $("#ddlpat option:selected").val());
        formdata.append("RoomTypeId", $("#ddlrt option:selected").val());
        formdata.append("Status", $("#ddlstatus option:selected").val());
        $.ajax({
            type: 'POST',
            url: BaseUrl + "AddRoom/",
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

function LoadRoomtype() {
    debugger;
    $.ajax({
        type: 'GET',
        url: "https://localhost:44369/admindetailinfo/RoomType/GetData",

        dataType: 'JSON',
        success: function (data) {

            debugger;

            var html = '';
            html += '<select id="RoomTypeId" class="form-control">';
            html += '<option value="-1">--- Select Room Type ---</option>';
            for (var i = 0; i < data.length; i++) {
                html += '<option value="' + data[i].RoomTypeId + '">' + data[i].Roomtype + '</option>';
            }
            /*  */
            html += '</select>';
            html += '<span class="text-danger" id="msgroomtype"></span>';
            $('#ddlrt').html(html);
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
        if (data[i].Status == 0) {
            status = '<span class="badge badge-danger">InActive</span>';
        }
        else {
            status = '<span class="badge badge-success">Active</span>';
        }
        html += '<tr>';
        html += '<td>' + ++sno + '</td>';
        html += '<td>' + data[i].MyRoom.RoomNo + '</td>';
        html += '<td>' + data[i].MyRoomType.Roomtype + '</td>';
        html += '<td>' + data[i].MyPatient.Name + '</td>';
        html += '<td>' + status + '</td>';
        html += '<td><a href="#" class="btn btn-primary" onclick="Edit(' + data[i].MyRoom.RoomId + ')"><i class="zmdi zmdi-edit"></i></a></td ></tr >';
    }
    $('#mytable').html(html);
}

function Edit(id) {
    debugger;
    //var obj = {
    //    DId: id,
    //};
    $.ajax({
        url: BaseUrl + 'EditById?RId=' + id,
        type: 'POST',
        contentType: "application/json;charset=utf-8",
        // data: JSON.stringify(obj),
        dataType: 'JSON',
        success: function (data) {
            debugger;
            $('#hdnroomId').val(data.RoomId);
            $('#txtroomno').val(data.RoomNo);
            $('#ddlrt').find('option[value="' + data.RoomTypeId + '"]').prop('selected', true);
            $('#ddlpat').find('option[value="' + data.PatientId + '"]').prop('selected', true);
            $('#ddlstatus').val(data.Status);
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
    formdata.append("RoomId", $('#hdnroomId').val());   /*append use for direct data insertion*/
    formdata.append("RoomNo", $("#txtroomno").val());
    formdata.append("PatientId", $("#ddlpat option:selected").val());
    formdata.append("RoomTypeId", $("#ddlrt option:selected").val());
    formdata.append("Status", $("#ddlstatus option:selected").val());

    $.ajax({

        url: BaseUrl + 'AddRoom/',
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
        },
        error: function (data) {
            alert(data.statusText);
        }
    });
}

function ClearTextBoxes() {
    $('#RoomId').val("");
    $('#txtroomno').val("");
    $('#PatientId').val(-1);
    $('#RoomTypeId').val(-1);
    $('#ddlstatus').val(-1);
}