
var isValid = false;
var ispatient = false;

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

//function validdate(txt, msg, data) {
//    var pattern = /^[a-zA-Z\s/()\-.]*$/;  // Updated the regular expression pattern to allow whitespace characters
//    var name = $(txt).val().trim();  // Trim any leading or trailing whitespace from the input value

//    if (name === "") {
//        var mymsg = data + ' is required';
//        $(txt).css("border-color", "red");
//        $(msg).html(mymsg);
//        $('#btnSubmit').prop("disabled", true);  // Corrected the property name to disable the button
//        return false;
//    } else if (pattern.test(name)) {
//        $(txt).css("border-color", "green");
//        $(msg).html("");
//        $('#btnSubmit').prop("disabled", false);  // Corrected the property name to enable the button
//        return true;
//    } else {
//        $(msg).html("Should contain only characters");
//        $(msg).show();
//        $('#btnSubmit').prop("disabled", true);
//        return false;
//    }
//}

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
    isValid = validdate('#txtsubcat', '#msgsubcat', 'SubCategory');
    ispatient = validdateDropDowns('#ddlct', '#msgcategory', 'Category');
}

var BaseUrl = "https://localhost:44369/Pharmacy/Subcategory/";

$(document).ready(function () {
    debugger;
    LoadData();
    LoadCategory();
});

function SubmitData() {
    debugger;
    if ($('#hdnsubcategoryId').val() != "") {
        Update();
    }
    else {
        Add();
    }
}

function Add() {
    debugger;
    validData();
    if (isValid == true && ispatient == true) {
        var formdata = new FormData();
        debugger;
        formdata.append("SubCategoryId", 0);  /*append use for direct data insertion*/
        formdata.append("CategoryId", $("#ddlct option:selected").val());
        formdata.append("SubCategoryName", $("#txtsubcat").val());
        $.ajax({
            type: 'POST',
            url: BaseUrl + "AddSubcategory/",
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
        dataType: 'JSON',
        success: function (data) {
            CreateTableRow(data);
        },
        error: function (data) {
            alert(data.statusText);
        }
    });

}

function LoadCategory() {
    debugger;
    $.ajax({
        type: 'GET',
        url: "https://localhost:44369/Pharmacy/Category/GetData",

        dataType: 'JSON',
        success: function (data) {

            debugger;

            var html = '';
            html += '<select id="CategoryId" class="form-control">';
            html += '<option value="-1">--- Select Category ---</option>';
            for (var i = 0; i < data.length; i++) {
                html += '<option value="' + data[i].CategoryId + '">' + data[i].CategoryName + '</option>';
            }
            /*  */
            html += '</select>';
            html += '<span class="text-danger" id="msgcategory"></span>';
            $('#ddlct').html(html);
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
        html += '<tr>';
        html += '<td>' + ++sno + '</td>';
        html += '<td>' + data[i].MyCategory.CategoryName + '</td>';
        html += '<td>' + data[i].MySubCategory.SubCategoryName + '</td>';
        html += '<td><a href="#" class="btn btn-primary" onclick="Edit(' + data[i].MySubCategory.SubCategoryId + ')"><i class="zmdi zmdi-edit"></i></a></td ></tr >';
    }
    $('#mytable').html(html);
}

function Edit(id) {
    debugger;
    //var obj = {
    //    DId: id,
    //};
    $.ajax({
        url: BaseUrl + 'EditById?SCId=' + id,
        type: 'POST',
        contentType: "application/json;charset=utf-8",
        // data: JSON.stringify(obj),
        dataType: 'JSON',
        success: function (data) {
            debugger;
            $('#hdnsubcategoryId').val(data.SubCategoryId);
            $('#txtsubcat').val(data.SubCategoryName);
            $('#CategoryId').find('option[value="' + data.CategoryId + '"]').prop('selected', true);
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
        formdata.append("SubCategoryId", $('#hdnsubcategoryId').val());   /*append use for direct data insertion*/
    formdata.append("CategoryId", $("#ddlct option:selected").val());
        formdata.append("SubCategoryName", $("#txtsubcat").val());

        $.ajax({

            url: BaseUrl + 'Addsubcategory/',
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
                /*ClearTextBoxes();*/
            },
            error: function (data) {
                alert(data.statusText);
            }
        });
}


function ClearTextBoxes() {
    $('#SubCategoryId').val("");
    $('#CategoryId').val(-1);
    $('#txtsubcat').val("");
}