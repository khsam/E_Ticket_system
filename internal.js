
let seatArray = [];

function SelectSit(id)
{
    // delete the error message at the outset.
    document.getElementById('errorMsg').innerText = '';
    
    let selectedSeat = document.getElementById(id);
     // create dynamic ID for the new report column we are going to create
   let reportSeatId = 'idSeatDetailsInner' + id ;

    if (seatArray.length < 4)
    {         
        if (seatArray.indexOf(id) == -1) {
            seatArray.push(id);

            SeatSelectionAndTotal(id, selectedSeat, reportSeatId);
        }
        else if (seatArray.indexOf(id) >= 0)
        { 
            SeatRemovalAndTotal(id, selectedSeat, reportSeatId);       
        }
    }
    else
    {        
        if (seatArray.indexOf(id) == -1)
        {
            document.getElementById('errorMsg').innerText = 'ERROR : Maximum 4 tickets Allowed.';
        } else
        { 
            SeatRemovalAndTotal(id, selectedSeat, reportSeatId);   
        }
    }   
}


function SeatSelectionAndTotal(id, selectedSeat, reportSeatId) { 

    //remove old bg colour and add new one.
            selectedSeat.classList.remove('bg-base-200');
            selectedSeat.classList.add('bg-siteColor');


    let parentReportDiv = document.getElementById('idSeatDetails');
    // create new div element under parent div
    let childReportDiv = document.createElement('div');
    // add new class
            childReportDiv.classList.add("flex");
    childReportDiv.classList.add("justify-around");
    // add new id for the new created div
    childReportDiv.setAttribute('id', reportSeatId)
    //add the new child div
            parentReportDiv.appendChild(childReportDiv);

// add the report row in the new div created with dynamic seat.
            document.getElementById(`${reportSeatId}`).innerHTML =
                `<p class="w-24">${id}</p>
                            <p class="w-24">economic</p>
                            <p class="w-24 pl-5">550</p>`;
    
    //update seat No on the report
    document.getElementById('idTotalSeat').innerText = seatArray.length;

    // call UpdateTotal() function to update the total amount
    UpdateTotal();
}


function SeatRemovalAndTotal(id, selectedSeat, reportSeatId)
{ 
    // get the sit in the array so we can remove 
    let getSitIndex = seatArray.indexOf(id);
//remove new bg color and add old one.
    selectedSeat.classList.remove('bg-siteColor');
    selectedSeat.classList.add('bg-base-200');
// remove the report line from the right report
    document.getElementById(`${reportSeatId}`).innerHTML = '';
    // remove the seat from the Array
    seatArray.splice(getSitIndex, 1);
     //update seat No on the report
    document.getElementById('idTotalSeat').innerText = seatArray.length;
    
     // call UpdateTotal() function to update the total amount
     UpdateTotal();
}

function UpdateTotal()
{ 
    let totalElement = document.getElementById('idTotalAmount');
    let totalGrand = document.getElementById('idTotalGrand');
    let total = seatArray.length * 550;

    totalElement.innerText = total;
    totalGrand.innerText = total;

    // enable input coupon field and button if more than 1 seat selected
    if (seatArray.length > 1)
    {
        document.getElementById('idCouponInput').removeAttribute('disabled');
        document.getElementById('idCouponBtn').removeAttribute('disabled');
    }
    else
    { 
        document.getElementById('idCouponInput').setAttribute('disabled','disabled');
        document.getElementById('idCouponBtn').setAttribute('disabled','disabled');
    }
    // enable Next button if any seat selected
    seatArray.length > 0 ? document.getElementById('idBtnNext').removeAttribute('disabled') : document.getElementById('idBtnNext').setAttribute('disabled', 'disabled');
    
    // always remove the coupon error message.
    document.getElementById('errorMsgCopn').innerText = "";
    // remove the coupon if new button clicked.
    document.getElementById('idCouponInput').value = '';
}

// this Section is for the Coupon.
// remove the error message if we start writing in the coupon input 
let couponDataField = document.getElementById('idCouponInput');
couponDataField.addEventListener('keyup', function (e)
{ 
    let data = e.target.value;
    data.length > 0 ? document.getElementById('errorMsgCopn').innerText = "" :0;
});

// this Section is for the Coupon validation.
let coupenApplyButton = document.getElementById('idCouponBtn');
coupenApplyButton.addEventListener('click', function ()
{ 
    let inputCoupon = document.getElementById('idCouponInput').value;
    if (inputCoupon == '')
    {
        document.getElementById('errorMsgCopn').innerText = "Coupon Field cann't be empty";
    }
    else
    { 
        inputCoupon = inputCoupon.toLowerCase();
        
        if (inputCoupon == 'couple20' && seatArray.length == 2) {
            let totalAmount = parseInt(document.getElementById('idTotalAmount').innerText);
            let newGrandAmount = Math.round(totalAmount - ((totalAmount * 20) / 100));
            document.getElementById('idTotalGrand').innerText = newGrandAmount;
        }      
        else if (inputCoupon == 'couple20' && seatArray.length > 2)
        { 
            document.getElementById('errorMsgCopn').innerText = "couple20 is for only 2 tickets. Please use other coupon";
        }
        else if (inputCoupon == 'new15')
        {
                let totalAmount = parseInt(document.getElementById('idTotalAmount').innerText);
                let newGrandAmount = Math.round(totalAmount - ((totalAmount * 15) / 100));
                document.getElementById('idTotalGrand').innerText = newGrandAmount;
        }
        else
        { 
            document.getElementById('errorMsgCopn').innerText = "Not a valid coupon.";
        }
        
    }
    
})

// click function on NEXT button
document.getElementById('idBtnNext').addEventListener('click', function (e)
{ 
    document.getElementById('errorMsgNext').innerText = '';
    let totalSitLeft = parseInt(document.getElementById('totalSeat').innerText);
    
    let name = document.getElementById('idName').value;
    let phone = document.getElementById('idPhone').value;

    if (name != '' && phone != '')
    {
        seatArray.map(x => {      
            document.getElementById(`${x}`).setAttribute('disabled', 'disabled');
            console.log('inside map array');    
        });

        // update total seat
        totalSitLeft = totalSitLeft - seatArray.length;
        document.getElementById('totalSeat').innerText = totalSitLeft;
//show modal
        document.getElementById('confirmModal').showModal();
        // make array empty
        seatArray.length > 0 ? seatArray = [] : seatArray;

        // make name and phone field empty.
        document.getElementById('idName').value = '';
        document.getElementById('idPhone').value = '';
        
    } else { 
        document.getElementById('errorMsgNext').innerText = 'Name and Phone are mandatory.'
    }
    
})



