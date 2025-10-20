import { dataSeries } from './data.js';
// Nodos del DOM
var seriesTbody = document.getElementById('series');
var avgSeasonsDiv = document.getElementById('avg-seasons');
function renderSeriesInTable(series) {
    series.forEach(function (s) {
        var tr = document.createElement('tr');
        tr.innerHTML = "\n        <td>".concat(s.id, "</td>\n        <td>\n            <a href=\"").concat(s.link, "\" target=\"_blank\" rel=\"noopener\">\n            ").concat(s.name, "\n            </a>\n        </td>\n        <td>").concat(s.channel, "</td>\n        <td>").concat(s.seasons, "</td>\n        ");
        seriesTbody.appendChild(tr);
    });
    var total = series.reduce(function (acc, s) { return acc + s.seasons; }, 0);
    var avg = Math.round(total / (series.length || 1));
    var trAvg = document.createElement("tr");
    trAvg.innerHTML = "<td colspan=\"4\"><strong>Seasons average: ".concat(avg, "</strong></td>");
    seriesTbody.appendChild(trAvg);
}
//Promedio de temporadas
function getAverageSeasons(series) {
    return series.length === 0
        ? 0
        : series.reduce(function (acc, s) { return acc + s.seasons; }, 0) / series.length;
}
function renderAverage(series) {
    var avg = getAverageSeasons(series);
    avgSeasonsDiv.textContent = "Promedio de temporadas: ".concat(avg.toFixed(2));
}
//inicializacion ( si tu <script> esta al final del <body>, con esto basta)
renderSeriesInTable(dataSeries);
renderAverage(dataSeries);
