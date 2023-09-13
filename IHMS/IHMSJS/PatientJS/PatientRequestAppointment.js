
var BaseUrl = "https://localhost:44369/Patient/Dashboard/";

//$(document).ready(function () {
//    //    debugger;
//    LoadData();
//});

//function LoadData() {
//    debugger;
//    $.ajax({
//        type: 'GET',
//        url: BaseUrl + 'AddDashboard/',
//        dataType: 'JSON',
//        success: function (data) {
//            debugger;
//            CreateTableRow(data);
//        },
//        error: function (data) {
//            alert(data.statusText);
//        }
//    });

//}

//function CreateTableRow(data) {
//    debugger;
//    var html = '';
//    for (var i = 0; i < data.length; i++) {
//        /*html += '<tr style="color:black!important"><td>' + (i + 1) + '</td><td>' + data[i].DepartmentName + '</td>';*/
//        html += '<td><a href="#" class="btn btn-primary" onclick="Request(' + data[i].DoctorId + ')"><i class="zmdi zmdi-edit"></i></a></td></tr>';
//    }
//}


function Request(id) {
    debugger;
    $.ajax({
        url: BaseUrl + "RequestAppointment?DocId=" + id,
        type: 'Get',
        contentType: 'application/json;charset=utf-8',
      //  dataType: 'JSON',

        success: function () {
            debugger;
            var url = "https://localhost:44369/Patient/Dashboard/RequestAppointment";
            location.href = url;
        },
        error: function (data) {
            alert(data.statusText);
        }
    });
}

function RequestAppointment() {
    debugger;
    $.ajax({
        url: BaseUrl + "RequestAppointment/",
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
      //  dataType: 'JSON',

        success: function () {
            debugger;
            iziToast.success({
                title: 'OK',
                position: 'center',
                timeout: 3000,
                message: 'Your request sent to doctor Successfully please wait for doctor response',
            });
        },
        error: function (data) {
            alert(data.statusText);
        }
    });
}