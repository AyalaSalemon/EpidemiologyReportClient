
import { Patient } from '../models/Patient.js'
import { Location } from '../models/Location.js'
//initialize patients list instead of going to the server
let patients = [
    new Patient("33333333", new Location(new Date('2022,06,26'), new Date('2022,06,26'), 'Jerusalem', 'library')),
    new Patient("66666666", new Location(new Date('2022,06,26'), new Date('2022,06,26'), 'Jerusalem', 'super')),
    new Patient("77777777", new Location(new Date('2022,06,26'), new Date('2022,06,26'), 'BneyBrak', 'library'))

]
let patient
window.onload = function () {
    document.querySelector('input').addEventListener('change', loadUserLocations)
    const jsonPatients=sessionStorage.getItem('patients')
    if(jsonPatients)
    patients=JSON.parse(jsonPatients)
}
//on  change id
function loadUserLocations(event) {
    const id = event.target.value
    patient = patients.find(pat => pat.id == id)
    var table = document.querySelector('table')
    //it's not an existing patient
    if (!patient) {
        //let him sign in now
        var input = document.getElementById('inputContainer').firstChild;
        if (!input)//if it is the first patient, there are no inputs yet
            createInputs()
        else//there was already a patient, we have to clear the table
            document.getElementById('tableContainer').removeChild(document.getElementById('tableContainer').firstChild);
    }
    else {//it is an existing patient

        if (table) { //it is not the first patient
            clearTable();
        }
        else {//it is the first patient, we have to create the table
            createTitels()
            var input = document.getElementById('inputContainer').firstChild;
            if (!input)
                createInputs()
        }
        fillPatientTable()
    }


}
function clearTable() {
    var table = document.querySelector('table')
    var titles = table.firstChild
    while (table.firstChild) {
        table.removeChild(table.firstChild)
    }
    table.appendChild(titles)
}
function createTitels() {
    var table = document.createElement('table')
    const fields = ['startDate', 'endDate', 'city', 'location', ' ']

    var tr = document.createElement('tr')
    for (var j = 0; j < 5; j++) {
        var th = document.createElement('th');
        th.innerText = fields[j]
        tr.appendChild(th);
    }
    table.appendChild(tr)
    document.getElementById('tableContainer').appendChild(table)
}
function fillPatientTable() {

    var table = document.querySelector('table')
    for (var i = 0; i < patient.locations.length; i++) {
        table.appendChild(addRowToPatient(i));
    }
    document.getElementById('tableContainer').appendChild(table)
    var patientsJson = JSON.stringify(patients)
    sessionStorage.setItem('patients', patientsJson)
}
function createInputs() {
    var inputsContainer = document.getElementById("inputContainer")// document.createElement('div')
    var startInput = document.createElement('input')
    startInput.setAttribute('id', 'startDate')
    startInput.setAttribute('placeHolder', 'start date')
    startInput.setAttribute('type', 'datetime-local')
    inputsContainer.appendChild(startInput)
    var endInput = document.createElement('input')
    endInput.setAttribute('id', 'endDate')
    endInput.setAttribute('placeHolder', 'end date')
    endInput.setAttribute('type', 'datetime-local')
    inputsContainer.appendChild(endInput)
    var cityInput = document.createElement('input')
    cityInput.setAttribute('id', 'city')
    cityInput.setAttribute('placeHolder', 'city')
    inputsContainer.appendChild(cityInput)
    var locationInput = document.createElement('input')
    locationInput.setAttribute('id', 'location')
    locationInput.setAttribute('placeHolder', 'location')
    inputsContainer.appendChild(locationInput)
    var addLocationButton = document.createElement('button')
    addLocationButton.addEventListener('click', addLocation)
    addLocationButton.innerText = "Add Location"
    inputsContainer.appendChild(addLocationButton)

}

function addRowToPatient(i) {
    var temp = document.getElementById("table-row");

    var startDate =new Date(patient.locations[i].startDate);
    var endDate = new Date(patient.locations[i].endDate);
    const clonRow = temp.content.cloneNode(true);
    clonRow.getElementById("startDateTd").innerHTML = `${[startDate.getDate(),
    startDate.getMonth() + 1,
    startDate.getFullYear()].join('/') + ' ' +
        [startDate.getHours(),
        startDate.getMinutes()].join(':')}`;
    clonRow.getElementById("endDateTd").innerHTML = `${[endDate.getMonth() + 1,
    endDate.getDate(),
    endDate.getFullYear()].join('/') + ' ' +
        [endDate.getHours(),
        endDate.getMinutes()].join(':')}`;
    clonRow.getElementById("cityTd").innerText = patient.locations[i].city;;
    clonRow.getElementById("locationTd").innerText = patient.locations[i].location;

    clonRow.querySelector("button").addEventListener('click', deleteLocation(patient.locations[i].id, i))
    return clonRow;

}
function addLocation() {
    const startDate = document.getElementById('startDate').value
    const endDate = document.getElementById('endDate').value
    const city = document.getElementById('city').value
    const location = document.getElementById('location').value
    const newLocation = new Location(new Date(startDate), new Date(endDate), city, location)
    if (!patient) {
        patient = new Patient(document.querySelector('input').value)
        patient.locations.push(newLocation)
        patients.push(patient)
        createTitels()
    }
    else {
        patient.locations.push(newLocation)

    }
    var table = document.querySelector('table');
    table.appendChild(addRowToPatient(patient.locations.length - 1));
    var patientsJson = JSON.stringify(patients)
    sessionStorage.setItem('patients', patientsJson)
}
function deleteLocation(id, i) {
    return function (event) {
        patient.locations = patient.locations.filter(loc => loc.id != id)

        patients[i].locations = patients[i].locations.filter(loc => loc.id != id)
        const tr = event.target.parentNode.parentNode
        tr.parentNode.removeChild(tr)
        var patientsJson = JSON.stringify(patients)
        sessionStorage.setItem('patients', patientsJson)
    }

}


