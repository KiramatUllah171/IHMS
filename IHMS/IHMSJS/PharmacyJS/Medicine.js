var ismednameValid = false;
var ismanufacturerValid = false;
var isunitValid = false;
var iscategoryValid = false;
var issubcategoryValid = false;
var isgenericValid = false;



function validdate(txt, msg, data) {
    var pattern = /^[a-zA-Z\s/()\-.]*$/;  // Updated the regular expression pattern to allow whitespace characters
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
        if (txt == "#ddlcat") {
            var subcatid = $(txt + ' option:selected').val();
            LoadSubCat(subcatid);
        }
        return true;
    }
}

function validData() {

    ismednameValid = validdate('#txtname', '#msgname', 'Medicine Name');
    ismanufacturerValid = validdateDropDowns('#ddlmanufacturer', '#msgmanufacturer', 'Manufacturer');
    isunitValid = validdateDropDowns('#ddlunit', '#msgunit', 'Unit');
    iscategoryValid = validdateDropDowns('#ddlcat', '#msgcat', 'Category');
    issubcategoryValid = validdateDropDowns('#ddlsubcat', '#msgsub', 'Sub Category');
    isgenericValid = validdate('#txtGname', '#msgGname', 'Generic Name');
}

var BaseUrl = "https://localhost:44369/Pharmacy/Medicine/";

$(document).ready(function () {
    debugger;
    LoadManufacturer();
    LoadCategory();
    LoadUnit();
   // LoadSubCategory();
    LoadData();
});

function SubmitData() {
    debugger;
    if ($('#hdnmedicineId').val() != "") {
        Update();
    }
    else {
        Add();
    }
}

function Add() {
    debugger;
    validData();
    if (ismednameValid == true && ismanufacturerValid == true && isunitValid == true && iscategoryValid == true
        && issubcategoryValid == true && isgenericValid == true) {
        var formdata = new FormData();
        debugger;
        formdata.append("MedicineID", 0);  /*append use for direct data insertion*/
        formdata.append("MedicineName", $("#txtname").val());
        formdata.append("ManufacturerID", $("#ddlmanufacturer option:selected").val());
        formdata.append("UnitID", $("#ddlunit option:selected").val());
        formdata.append("CategoryID", $("#ddlcat option:selected").val());
        formdata.append("SubCategoryID", $("#ddlsubcat option:selected").val());
        formdata.append("GenericName", $("#txtGname").val());
        $.ajax({
            type: 'POST',
            url: BaseUrl + "AddMedicine/",
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

function LoadManufacturer() {
    debugger;
    $.ajax({
        type: 'GET',
        url: "https://localhost:44369/Pharmacy/Account/ManufacturerGet",

        dataType: 'JSON',
        success: function (data) {

            debugger;

            var html = '';
            html += '<select id="ManufacturerID" class="form-control">';
            html += '<option value="-1">--- Select Manufacturer ---</option>';
            for (var i = 0; i < data.length; i++) {
                html += '<option value="' + data[i].ManufacturerID + '">' + data[i].Name + '</option>';
            }
            /*  */
            html += '</select>';
            html += '<span class="text-danger" id="msgmanufacturer"></span>';
            $('#ddlmanufacturer').html(html);
        },
        error: function (data) {
            alert(data.statusText);
        }
    });
}


function LoadUnit() {
    $.ajax({
        type: 'GET',
        url: "https://localhost:44369/Pharmacy/Account/unitGet",
        dataType: 'JSON',
        success: function (data) {
            var html = '';
            html += '<select id="UnitID" class="form-control">';
            html += '<option value="-1">---Select Unit---</option>';
            for (var i = 0; i < data.length; i++) {
                html += '<option value="' + data[i].UnitId + '">' + data[i].UnitName + '</option>';
            }
            html += '</select>';
            html += '<span class="text-danger" id="msgunit"></span>';
            $('#ddlunit').html(html);
        },
        error: function (data) {
            alert(data.statusText);
        }
    })
}

function LoadCategory() {
    $.ajax({
        type: 'GET',
        url: "https://localhost:44369/Pharmacy/Account/CategoryGet",
        dataType: 'JSON',
        success: function (data) {
            var html = '';
            html += '<select id="CategoryID" class="form-control">';
            html += '<option value="-1">---Select Category---</option>';
            for (var i = 0; i < data.length; i++) {
                html += '<option value="' + data[i].CategoryId + '">' + data[i].CategoryName + '</option>';
            }
            html += '</select>';
            html += '<span class="text-danger" id="msgcat"></span>';
            $('#ddlcat').html(html);
        },
        error: function (data) {
            alert(data.statusText);
        }
    })
}


function LoadSubCat(id) {
    debugger;
    $.ajax({
        type: 'GET',
        url: "https://localhost:44369/Pharmacy/SubCategory/GetDataByCountryId?Id=" + id,
        dataType: 'JSON',
        success: function (data) {
            debugger;
            var html = '';
            html += '<select id="SubCategoryID" class="form-control">';
            html += '<option value="-1">--- Select Sub Category ---</option>';
            for (var i = 0; i < data.length; i++) {
                html += '<option value="' + data[i].MySubCategory.SubCategoryId + '">' + data[i].MySubCategory.SubCategoryName + '</option>';
            }
            /*  */
            html += '</select>';
            html += '<span class="text-danger" id="msgsub"></span>';
            $('#ddlsubcat').html(html);
        },
        error: function (data) {
            alert(data.statusText);
        }
    });
}

//function LoadSubCategory() {
//    $.ajax({
//        type: 'GET',
//        url: "https://localhost:44369/Pharmacy/Account/SubCategoryGet",
//        dataType: 'JSON',
//        success: function (data) {
//            var html = '';
//            html += '<select id="SubCategoryID" class="form-control">';
//            html += '<option value="-1">---Select Sub Category---</option>';
//            for (var i = 0; i < data.length; i++) {
//                html += '<option value="' + data[i].MySubCategory.SubCategoryId + '">' + data[i].MySubCategory.SubCategoryName + '</option>';
//            }
//            html += '</select>';
//            html += '<span class="text-danger" id="msgsubcat"></span>';
//            $('#ddlsubcat').html(html);
//        },
//        error: function (data) {
//            alert(data.statusText);
//        }
//    })
//}

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
        html += '<tr>';
        html += '<td>' + ++sno + '</td>';
        html += '<td>' + data[i].MyMedicine.MedicineName + '</td>';
        html += '<td>' + data[i].MyManufacturer.Name + '</td>';
        html += '<td>' + data[i].MyUnit.UnitName + '</td>';
        html += '<td>' + data[i].MyCategory.CategoryName + '</td>';
        html += '<td>' + data[i].MySubCategory.SubCategoryName + '</td>';
        html += '<td>' + data[i].MyMedicine.GenericName + '</td>';
        html += '<td><a href="#" class="btn btn-primary" onclick="Edit(' + data[i].MyMedicine.MedicineID + ')"><i class="zmdi zmdi-edit"></i></a></td ></tr >';
    }
    $('#mytable').html(html);
}

function Edit(id) {
    debugger;
    //var obj = {
    //    DId: id,
    //};
    $.ajax({
        url: BaseUrl + 'EditById?MID=' + id,
        type: 'POST',
        contentType: "application/json;charset=utf-8",
        // data: JSON.stringify(obj),
        dataType: 'JSON',
        success: function (data) {
            debugger;
            $('#hdnmedicineId').val(data.MedicineID);
            $('#ddlmanufacturer').find('option[value="' + data.ManufacturerID + '"]').prop('selected', true);
            $('#txtname').val(data.MedicineName);
            $('#ddlunit').find('option[value="' + data.UnitID + '"]').prop('selected', true);
            $('#ddlcat').find('option[value="' + data.CategoryID + '"]').prop('selected', true);
            $('#ddlsubcat').find('option[value="' + data.SubCategoryID + '"]').prop('selected', true);
            $('#txtGname').val(data.GenericName);
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
    formdata.append("MedicineID", $('#hdnmedicineId').val());   /*append use for direct data insertion*/
    formdata.append("MedicineName", $("#txtname").val());
    formdata.append("ManufacturerID", $("#ddlmanufacturer option:selected").val());
    formdata.append("UnitID", $("#ddlunit option:selected").val());
    formdata.append("CategoryID", $("#ddlcat option:selected").val());
    formdata.append("SubCategoryID", $("#ddlsubcat option:selected").val());
    formdata.append("GenericName", $("#txtGname").val());

    $.ajax({

        url: BaseUrl + 'AddMedicine/',
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
    $('#MedicineID').val("");
    $('#txtname').val("");
    $('#ManufacturerID').val(-1);
    $('#UnitID').val(-1);
    $('#CategoryID').val(-1);
    $('#SubCategoryID').val(-1);
    $('#txtGname').val("");
}