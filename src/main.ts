    import { Serie } from "./serie.js";
    import { series as dataSeries } from "./data.js";

    const seriesTbody = document.getElementById('series') as HTMLElement;
    const avgSeasonsDiv = document.getElementById('avg-seasons') as HTMLElement;

    // refs de la card
    const card = document.getElementById('detail-card') as HTMLElement;
    const cardImg = document.getElementById('detail-image') as HTMLImageElement;
    const cardTitle = document.getElementById('detail-title') as HTMLElement;
    const cardDesc = document.getElementById('detail-description') as HTMLElement;
    const cardChannel = document.getElementById('detail-channel') as HTMLElement;
    const cardSeasons = document.getElementById('detail-seasons') as HTMLElement;
    const cardLink = document.getElementById('detail-link') as HTMLAnchorElement;
    const cardClose = document.getElementById('detail-close') as HTMLButtonElement;

    function renderSeriesInTable(series: Serie[]): void {
    // limpia
    while (seriesTbody.firstChild) seriesTbody.removeChild(seriesTbody.firstChild);

    series.forEach(s => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
        <td>${s.id}</td>
        <td><a href="#" class="series-link" data-id="${s.id}">${s.name}</a></td>
        <td>${s.channel}</td>
        <td>${s.seasons}</td>`;
        seriesTbody.appendChild(tr);
    });

    // promedio
    const total = series.reduce((acc, s) => acc + s.seasons, 0);
    const avg = Math.round(total / (series.length || 1));
    const trAvg = document.createElement("tr");
    trAvg.innerHTML = `<td colspan="4"><strong>Seasons average: ${avg}</strong></td>`;
    seriesTbody.appendChild(trAvg);
    }

    // click en cualquier
    seriesTbody.addEventListener('click', (ev) => {
    const target = ev.target as HTMLElement;
    const a = target.closest?.('a.series-link') as HTMLAnchorElement | null;
    if (!a) return;

    ev.preventDefault();
    const id = Number(a.dataset.id);
    const s = dataSeries.filter(x => x.id === id)[0];
    if (s) showSeriesCard(s);
    });

    function showSeriesCard(s: Serie): void {
    // texto
    cardTitle.textContent = s.name;
    cardDesc.textContent = s.description;
    cardChannel.textContent = s.channel;
    cardSeasons.textContent = String(s.seasons);

    // link
    if (s.link && s.link.trim() !== '') {
        cardLink.href = s.link;
        cardLink.classList.remove('d-none');
    } else {
        cardLink.classList.add('d-none');
    }

    // imagen
    if (s.imageUrl && s.imageUrl.trim() !== '') {
        cardImg.src = s.imageUrl;
        cardImg.alt = `Poster de ${s.name}`;
        cardImg.classList.remove('d-none');
    } else {
        cardImg.classList.add('d-none');
    }

    // mostrar card
    card.classList.remove('d-none');
    }

    // cerrar card
    cardClose.addEventListener('click', () => {
    card.classList.add('d-none');
    });

    // utilidades
    function getAverageSeasons(series: Serie[]): number {
    return series.length === 0 ? 0 : series.reduce((acc, s) => acc + s.seasons, 0) / series.length;
    }

    // inicializacion
    renderSeriesInTable(dataSeries);
    

