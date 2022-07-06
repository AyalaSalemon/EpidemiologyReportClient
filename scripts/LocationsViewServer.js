let patients
let locations = []
window.onload = async function () {
    const res = await fetch("https://localhost:44363/api/Patient")
    const data = await res.json()
    locations = data;
    sortData()
    drawLlcationsList()
}

function sortData() {
    locations = locations.sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
}

function drawLlcationsList() {
    var ul = document.querySelector('ul');

    locations.forEach(loc => {
        var li = document.createElement('li');
        var startDate = new Date(loc.startDate)
        var endDate = new Date(loc.endDate);
        li.innerHTML = `<span>${[startDate.getDate(),
        startDate.getMonth() + 1,
        startDate.getFullYear()].join('/') + ' ' +
            [startDate.getHours(),
            startDate.getMinutes()].join(':')}    -   ${[endDate.getHours(),
            endDate.getMinutes()].join(':')}</span> |  <span>${loc.city}</span> | 
           ${loc.location}`
        ul.appendChild(li)
    })

}
async function filterList() {
    var input = document.getElementById('cityInput').value;
    const res = await fetch('https://localhost:44363/api/Patient/city?city=' + input)
    const data = await res.json();
    locations = data
    sortData()
    clearPage()
    drawLlcationsList()

}
function clearPage() {
    document.getElementById("locationsList").innerHTML = "";
}