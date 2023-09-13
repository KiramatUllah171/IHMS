var m = false;
var q = false;
var p = false;
var d = false;
var b = false;

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
    m = validdateDropDowns('#ddlmed', '#msgmed', 'Medicine Name');
    q = validdate('#txtquantity', '#msgquantity', 'Quantity');
    p = validdate('#txtprice', '#msgprice', 'Price');
    d = validdate('#txtdiscount', '#msgdiscount', 'Discount');
    b = validdate('#txtbonus', '#msgbonus', 'Bonus');
   // d = validdateDropDowns('#ddldis', '#msgdis', 'Distributor Name');
}

var BaseUrl = "https://localhost:44369/Pharmacy/MedPurchase/";

$(document).ready(function () {
    debugger;
    Loadmedicine();
   // Loaddis();
    //LoadData();
});

function AddMore() {
    debugger;
    validData();
    if (m == true && q == true && p == true && d == true && b == true) {
        var formdata = new FormData();
        debugger;
        formdata.append("MedicinePurchaseID", 0);  /*append use for direct data insertion*/
        formdata.append("MedicineID", $("#ddlmed option:selected").val());
        formdata.append("InvoiceNo", $("#InvoiceNo").val());
        formdata.append("Quantity", $("#txtquantity").val());
        formdata.append("PurchasePrice", $("#txtprice").val());
        formdata.append("Discount", $("#txtdiscount").val());
        formdata.append("Bonus", $("#txtbonus").val());
       // formdata.append("DistributorId", $("#ddldis option:selected").val());
        $.ajax({
            type: 'POST',
            url: BaseUrl + "MedicineList/",
            data: formdata,
            contentType: false,
            processData: false,
            success: function (data) {
                debugger;

                if (data.msg == true) {
                    /*LoadData();*/
                    var url = "https://localhost:44369/Pharmacy/MedPurchase/AddMedPurchase";
                    location.href = url;
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

function Loaddis() {
    debugger;
    $.ajax({
        type: 'GET',
        url: "https://localhost:44369/Pharmacy/Distributor/GetData",

        dataType: 'JSON',
        success: function (data) {

            debugger;

            var html = '';
            html += '<select id="DistributorId" class="form-control">';
            html += '<option value="-1">--- Select Distributor ---</option>';
            for (var i = 0; i < data.length; i++) {
                html += '<option value="' + data[i].DistributorId + '">' + data[i].SupplierName + '</option>';
            }
            /*  */
            html += '</select>';
            html += '<span class="text-danger" id="msgdis"></span>';
            $('#ddldis').html(html);
        },
        error: function (data) {
            alert(data.statusText);
        }
    });
}

function Confirm() {
    debugger;
    $.ajax({
        type: 'POST',
        url: BaseUrl + 'AddMedPurchase/',
        dataType: 'JSON',
        success: function (data) {

            if (data.msg == true) {
                //LoadData();
                var url = "https://localhost:44369/Pharmacy/MedPurchase/AddMedPurchase";
                location.href = url;
                iziToast.success({
                    title: 'Successfully Added',
                    position: 'center',
                    timeout: 4000
                });
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
            alert(data.statusText);
        }
    });
}

//function LoadData() {
//    debugger;
//    $.ajax({
//        type: 'GET',
//        url: BaseUrl + 'GetData/',
//        // dataType: 'JSON',
//        success: function (response) {

//            $('#mytable').html(response);
//        },
//        error: function (data) {
//            alert(data.statusText);
//        }
//    });

//}

function ClearTextBoxes() {
    $('#hdnmedpurchaseId').val("");
    $('#MedicineID').val("");
    $('#InvoiceNo').val("");
    $('#txtquantity').val("");
    $('#txtprice').val("");
    $('#txtdiscount').val("");
    $('#txtbonus').val("");
    //$('#SupplierId').val("");
}

function MedPayment(id) {
    $.ajax({
        url: BaseUrl + 'MedicinePayment?MPId=' + id,
        type: 'POST',
        contentType: "application/json;charset=utf-8",
        //  dataType: 'JSON',
        success: function (data) {
            if (data.msg == true) {
                LoadData();
                var url = "https://localhost:44369/Pharmacy/MedPurchase/AddMedPurchase";
                location.href = url;
            }
            if (data.msg == true) {
                iziToast.success({
                    title: 'Successfully Paid',
                    position: 'center',
                    timeout: 4000
                });
            }
            debugger;
        },
        error: function (data) {
            alert(data.statusText);
        }
    });
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



