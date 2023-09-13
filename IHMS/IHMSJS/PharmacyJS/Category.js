
var isValid = false;

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

function validData() {
    isValid = validdate('#txtname', '#msgname', 'Category');

}

var BaseUrl = "https://localhost:44369/Pharmacy/Category/";


$(document).ready(function () {
    //    debugger;
    LoadData();
});


function SubmitData() {
    debugger;
    if ($('#hdnCatId').val() != "") {
        Update();
    }
    else {
        Add();
    }
}

function Add() {
    debugger;
    validData();
    if (isValid == true) {
        var formdata = new FormData();
        debugger;
        formdata.append("CategoryId", 0);  /*append use for direct data insertion*/
        formdata.append("CategoryName", $("#txtname").val());
        $.ajax({
            type: 'POST',
            url: BaseUrl + "AddCategory/",
            data: formdata,
            contentType: false,
            processData: false,
            success: function (data) {
                debugger;
                if (data.msg == true) {
                    iziToast.error({
                        title: 'Sorry This Category Already stored please choose another name',
                        position: 'center',
                        timeout: 4000
                    });
                }
                else {
                    LoadData();
                    ClearTextBoxes();
                    iziToast.success({
                        title: 'OK',
                        position: 'center',
                        timeout: 3000,
                        message: 'Data Successfully Added',
                    });
                }
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
        html += '<tr style="color:black!important"><td>' + (i + 1) + '</td><td>' + data[i].CategoryName + '</td>';
        html += '<td><a href="#" class="btn btn-primary" onclick="Edit(' + data[i].CategoryId + ')"><i class="zmdi zmdi-edit"></i></a></td></tr>';
    }
    $('#mytable').html(html);
}

function Edit(id) {
    debugger;
    //var obj = {
    //    DId: id,
    //};
    $.ajax({

        url: BaseUrl + 'EditById?CId=' + id,
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        // data: JSON.stringify(obj),
        dataType: 'JSON',

        success: function (data) {
            debugger;
            $('#hdnCatId').val(data.CategoryId);
            $('#txtname').val(data.CategoryName);
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
        formdata.append("CategoryId", $('#hdnCatId').val());  /*append use for direct data insertion*/
        formdata.append("CategoryName", $("#txtname").val());

        $.ajax({

            url: BaseUrl + 'AddCategory/',
            type: 'POST',
            data: formdata,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data.msg == true) {
                    iziToast.error({
                        title: 'Sorry No Updated Because of this Category Already stored please choose another name',
                        position: 'center',
                        timeout: 4000
                        /*message: '',*/
                    });
                }
                else {
                    LoadData();
                    ClearTextBoxes();
                    /* $('#Modal').hide();*/
                    iziToast.success({
                        title: 'OK',
                        position: 'center',
                        timeout: 3000,
                        message: 'Successfully Updated',
                    });
                }
            },
            error: function (data) {
                alert(data.statusText);
            }
        });
}

function ClearTextBoxes() {
    $('#CategoryId').val("");
    $('#CategoryName').val("");
}


