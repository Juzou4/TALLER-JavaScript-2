import { series as dataSeries } from "./data.js";
var seriesTbody = document.getElementById('series');
var avgSeasonsDiv = document.getElementById('avg-seasons');
// refs de la card
var card = document.getElementById('detail-card');
var cardImg = document.getElementById('detail-image');
var cardTitle = document.getElementById('detail-title');
var cardDesc = document.getElementById('detail-description');
var cardChannel = document.getElementById('detail-channel');
var cardSeasons = document.getElementById('detail-seasons');
var cardLink = document.getElementById('detail-link');
var cardClose = document.getElementById('detail-close');
function renderSeriesInTable(series) {
    // limpia
    while (seriesTbody.firstChild)
        seriesTbody.removeChild(seriesTbody.firstChild);
    series.forEach(function (s) {
        var tr = document.createElement("tr");
        tr.innerHTML = "\n        <td>".concat(s.id, "</td>\n        <td><a href=\"#\" class=\"series-link\" data-id=\"").concat(s.id, "\">").concat(s.name, "</a></td>\n        <td>").concat(s.channel, "</td>\n        <td>").concat(s.seasons, "</td>");
        seriesTbody.appendChild(tr);
    });
    // promedio
    var total = series.reduce(function (acc, s) { return acc + s.seasons; }, 0);
    var avg = Math.round(total / (series.length || 1));
    var trAvg = document.createElement("tr");
    trAvg.innerHTML = "<td colspan=\"4\"><strong>Seasons average: ".concat(avg, "</strong></td>");
    seriesTbody.appendChild(trAvg);
}
// click en cualquier
seriesTbody.addEventListener('click', function (ev) {
    var _a;
    var target = ev.target;
    var a = (_a = target.closest) === null || _a === void 0 ? void 0 : _a.call(target, 'a.series-link');
    if (!a)
        return;
    ev.preventDefault();
    var id = Number(a.dataset.id);
    var s = dataSeries.filter(function (x) { return x.id === id; })[0];
    if (s)
        showSeriesCard(s);
});
function showSeriesCard(s) {
    // texto
    cardTitle.textContent = s.name;
    cardDesc.textContent = s.description;
    cardChannel.textContent = s.channel;
    cardSeasons.textContent = String(s.seasons);
    // link
    if (s.link && s.link.trim() !== '') {
        cardLink.href = s.link;
        cardLink.classList.remove('d-none');
    }
    else {
        cardLink.classList.add('d-none');
    }
    // imagen
    if (s.imageUrl && s.imageUrl.trim() !== '') {
        cardImg.src = s.imageUrl;
        cardImg.alt = "Poster de ".concat(s.name);
        cardImg.classList.remove('d-none');
    }
    else {
        cardImg.classList.add('d-none');
    }
    // mostrar card
    card.classList.remove('d-none');
}
// cerrar card
cardClose.addEventListener('click', function () {
    card.classList.add('d-none');
});
// utilidades
function getAverageSeasons(series) {
    return series.length === 0 ? 0 : series.reduce(function (acc, s) { return acc + s.seasons; }, 0) / series.length;
}
// inicializacion
renderSeriesInTable(dataSeries);
