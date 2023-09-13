
var isValid = false;

function validdate(txt, msg, data) {

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

function validData() {
    isValid = validdate('#txtroomtype', '#msgname', 'Room Type');

}

var BaseUrl = "https://localhost:44369/admindetailinfo/RoomType/";


$(document).ready(function () {
    LoadData();
});


function SubmitData() {
    debugger;
    if ($('#hdnroomtypeId').val() != "") {
        Update();
    }
    else {
        Add();
    }
}

function Add() {
    debugger;
    validData();
    if (isValid) {
        var formdata = new FormData();
        debugger;
        formdata.append("RoomTypeId", 0);  /*append use for direct data insertion*/
        formdata.append("Roomtype", $("#txtroomtype").val());
        $.ajax({
            type: 'POST',
            url: BaseUrl + "AddRoomType/",
            data: formdata,
            contentType: false,
            processData: false,
            success: function (data) {
                debugger;
                LoadData();
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
        html += '<tr style="color:black!important"><td>' + (i + 1) + '</td><td>' + data[i].Roomtype + '</td>';
        html += '<td><a href="#" class="btn btn-primary" onclick="Edit(' + data[i].RoomTypeId + ')"><i class="zmdi zmdi-edit"></i></a></td></tr>';
    }
    $('#mytable').html(html);
}

function Edit(id) {
    debugger;
    $.ajax({

        url: BaseUrl + 'EditById?RId=' + id,
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        // data: JSON.stringify(obj),
        dataType: 'JSON',

        success: function (data) {
            debugger;
            $('#hdnroomtypeId').val(data.RoomTypeId);
            $('#txtroomtype').val(data.Roomtype);
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
    formdata.append("RoomTypeId", $('#hdnroomtypeId').val());  /*append use for direct data insertion*/
    formdata.append("Roomtype", $("#txtroomtype").val());

    $.ajax({

        url: BaseUrl + 'AddRoomType/',
        type: 'POST',
        data: formdata,
        contentType: false,
        processData: false,
        success: function (data) {
            LoadData();
            /* $('#Modal').hide();*/
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
    $('#hdnroomtypeId').val("");
    $('#txtroomtype').val("");
}