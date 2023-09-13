var isValid = false;

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
    isValid = validdateDropDowns('#ddlmed', '#msgmed', 'Medicine Name');
    isValid = validdate('#txtquantity', '#msgquantity', 'Quantity');
    isValid = validdate('#txtprice', '#msgprice', 'Price');
    isValid = validdate('#txtdiscount', '#msgdiscount', 'Discount');
    isValid = validdate('#txtbonus', '#msgbonus', 'Bonus');
}

var BaseUrl = "https://localhost:44369/Pharmacy/MedicineSell/";

$(document).ready(function () {
    debugger;
    Loadmedicine();
    LoadData();
});

function AddMore() {
    debugger;
    validData();
    if (isValid) {
        var formdata = new FormData();
        debugger;
        formdata.append("MedicineSellId", 0);  /*append use for direct data insertion*/
        formdata.append("MedicineId", $("#ddlmed option:selected").val());
        formdata.append("InvoiceNo", $("#InvoiceNo").val());
        formdata.append("Quantity", $("#txtquantity").val());
        formdata.append("SoldPrice", $("#txtprice").val());
        formdata.append("Dicount", $("#txtdiscount").val());
        formdata.append("Bonus", $("#txtbonus").val());
        $.ajax({
            type: 'POST',
            url: BaseUrl + "SellMedicineList/",
            data: formdata,
            contentType: false,
            processData: false,
            success: function (data) {
                debugger;

                if (data.msg == true) {
                    LoadData();
                    var url = "https://localhost:44369/Pharmacy/MedicineSell/AddMedicineSell";
                    location.href = url;
                }
                else {
                    iziToast.error({
                        title: 'Please select your Data',
                        position: 'center',
                        timeout: 4000
                    });
                }
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

//function Confirm() {
//    debugger;
//    $.ajax({
//        type: 'POST',
//        url: BaseUrl + 'AddMedicineSell/',
//        dataType: 'JSON',
//        success: function (data) {
//            if (data.msg == true) {
//                LoadData();
//                var url = "https://localhost:44369/Pharmacy/MedicineSell/AddMedicineSell";
//                location.href = url;
//                iziToast.success({
//                    title: 'Successfully addedd',
//                    position: 'center',
//                    timeout: 4000
//                });
//                ClearTextBoxes();
//            }
//            else if (data.msg) {
//              //  alert(data.msg);
//                LoadData();
//                var url = "https://localhost:44369/Pharmacy/MedicineSell/AddMedicineSell";
//                location.href = url;
//                iziToast.success({
//                    title: 'Sorry this medicine is not available',
//                    position: 'center',
//                    timeout: 4000
//                });
//            }
//            else {
//                iziToast.error({
//                    title: 'Please select your Data',
//                    position: 'center',
//                    timeout: 4000
//                });
//            }

//        },
//        error: function (data) {
//            alert(data.statusText);
//        }
//    });
//}

function Loadmedicine() {
    debugger;
    $.ajax({
        type: 'GET',
        url: "https://localhost:44369/Pharmacy/Medicine/GetData",

        dataType: 'JSON',
        success: function (data) {

            debugger;

            var html = '';
            html += '<select id="MedicineID" class="form-control">';
            html += '<option value="-1">--- Select Medicine ---</option>';
            for (var i = 0; i < data.length; i++) {
                html += '<option value="' + data[i].MyMedicine.MedicineID + '">' + data[i].MyMedicine.MedicineName + '</option>';
            }
            /*  */
            html += '</select>';
            html += '<span class="text-danger" id="msgmed"></span>';
            $('#ddlmed').html(html);
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
        // dataType: 'JSON',
        success: function (response) {

            $('#mytable').html(response);
        },
        error: function (data) {
            alert(data.statusText);
        }
    });

}

function ClearTextBoxes() {
    $('#hdnmedsellId').val("");
    $('#ddlmed').val("");
    $('#InvoiceNo').val("");
    $('#txtquantity').val("");
    $('#txtprice').val("");
    $('#txtdiscount').val("");
    $('#txtbonus').val("");
}

//function Clear() {
//    debugger;
//    $.ajax({
//        type: 'POST',
//        url: BaseUrl + 'MedPurchaseClear/',
//        dataType: 'JSON',
//        success: function (data) {
//            if (data.msg == true) {
//                iziToast.error({
//                    title: 'You Can Add New Entry',
//                    position: 'center',
//                    timeout: 4000
//                });
//            }

//        },
//        error: function (data) {
//            alert(data.statusText);
//        }
//    });
//}

//function Clear(Id) {

//    debugger;
//    //var obj = {
//    //    MID: Id
//    //};
//    $.ajax({

//        url: BaseUrl + 'MedPurchaseClear?MID=' + Id,
//        type: 'POST',
//        contentType: "application/json;charset=utf-8",
//        //data: JSON.stringify(obj),
//        dataType: 'JSON',
//        success: function (data) {
//            iziToast.warning({
//                theme: 'dark',
//                icon: 'icon-person',
//                title: 'Hey',
//                message: 'Are you sure want to delete this data!',
//                position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
//                progressBarColor: 'rgb(0, 255, 184)',
//                buttons: [
//                    ['<button>Yes</button>', function (instance, toast) {
//                        if (data.msg == true) {
//                            LoadData();
//                            var url = "https://localhost:44369/Pharmacy/MedPurchase/AddMedPurchase";
//                            location.href = url;
//                        }
//                        // Code Here
//                    }, true], // true to focus
//                    ['<button>No</button>', function (instance, toast) {
//                        instance.hide({
//                            transitionOut: 'fadeOutUp',
//                            onClosing: function (instance, toast, closedBy) {
//                                console.info('closedBy: ' + closedBy); // The return will be: 'closedBy: buttonName'
//                            }
//                        }, toast, 'buttonName');
//                    }]
//                ],
//                onOpening: function (instance, toast) {
//                    console.info('callback abriu!');
//                },
//                onClosing: function (instance, toast, closedBy) {
//                    console.info('closedBy: ' + closedBy); // tells if it was closed by 'drag' or 'button'
//                }
//            });

//        },
//        error: function (data) {
//            alert(data.statusText);
//        }
//    });

//}



