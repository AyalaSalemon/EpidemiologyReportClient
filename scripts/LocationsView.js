let patients
let locations = []
window.onload = function () {
    patients = JSON.parse(sessionStorage.getItem("patients"));
    patients.forEach(pat => pat.locations.forEach(
        loc => locations.push(loc)
    ))
    locations = locations.sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
    drawLlcationsList()
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
function filterList() {
    var input = document.getElementById('cityInput');
    var filterContent = input.value.toUpperCase();
    var ul = document.getElementById("locationsList");
    var li = ul.getElementsByTagName('li');


    for (var i = 0; i < li.length; i++) {
        var city = li[i].getElementsByTagName("span")[1];
        var txtValue = city.textContent || city.innerText;


        if (txtValue.toUpperCase().indexOf(filterContent) == 0) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}