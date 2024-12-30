
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
    } else
    { 
        document.getElementById('errorMsg').innerText = 'ERROR : Maximum 4 tickets Allowed.';
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
                            <p class="w-24">550</p>`;


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

}