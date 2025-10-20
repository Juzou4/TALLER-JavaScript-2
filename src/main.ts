    import {Serie} from './serie.js';
    import {dataSeries} from './data.js';

    // Nodos del DOM
    const  seriesTbody= document.getElementById('series') as HTMLElement;
    const avgSeasonsDiv= document.getElementById('avg-seasons') as HTMLElement;

    function renderSeriesInTable(series: Serie[]): void {
    series.forEach(s => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
        <td>${s.id}</td>
        <td>
            <a href="${s.link}" target="_blank" rel="noopener">
            ${s.name}
            </a>
        </td>
        <td>${s.channel}</td>
        <td>${s.seasons}</td>
        `;
        seriesTbody.appendChild(tr);
    });

    const total = series.reduce((acc, s) => acc + s.seasons, 0);
    const avg = Math.round(total / (series.length || 1));
    const trAvg = document.createElement("tr");
    trAvg.innerHTML = `<td colspan="4"><strong>Seasons average: ${avg}</strong></td>`;
    seriesTbody.appendChild(trAvg);
    
  }


    //Promedio de temporadas
    function getAverageSeasons(series: Serie []): number {
        return series.length === 0
        ? 0
        : series.reduce((acc, s) => acc + s.seasons, 0) / series.length;

    }

    function renderAverage (series: Serie[]): void {
        const avg = getAverageSeasons(series);
        avgSeasonsDiv.textContent = `Promedio de temporadas: ${avg.toFixed(2)}`;
    }

    //inicializacion ( si tu <script> esta al final del <body>, con esto basta)

    renderSeriesInTable(dataSeries);
    renderAverage(dataSeries);