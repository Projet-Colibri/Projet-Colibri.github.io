/* index.js */

document.addEventListener('DOMContentLoaded', async () => {
  // load the element data once
  const data = await fetch('data.json').then(r => r.json());

  const select = document.getElementById('metric-select');
  const cells  = document.querySelectorAll('.element[data-symbol]');

  // colour immediately (blank = no colour) and every time the user chooses
  colourByMetric(select.value);
  select.addEventListener('change', () => colourByMetric(select.value));

  function colourByMetric(metric) {
    cells.forEach(td => {
      td.style.backgroundColor = '';          // reset previous colour
      if (!metric) return;                    // nothing chosen → leave white

      const symbol = td.dataset.symbol.trim();
      const entry  = data[symbol];
      if (!entry) return;                     // no data for that cell

      const score = +entry[metric];           // 0–4 in your JSON
      if (score <= 0) return;                 // 0 = keep white

      // linear gradient: 1 → green (120°), 4 → red (0°)
      const hue = 120 - (score - 1) * 40;     // 1:120, 2:80, 3:40, 4:0
      td.style.backgroundColor = `hsl(${hue},70%,60%)`;
    });
  }
});


//a partir Rf dans data.json de la 0 donnees => mettre absence de donnees (pas de couleur)

@media screen and (orientation:landscape) {

  #container {
    -ms-transform: rotate(-90deg); /* IE 9 */
    -webkit-transform: rotate(-90deg); /* Chrome, Safari, Opera */
    transform: rotate(-90deg);
    width: /* screen width */ ;
    height: /* screen height */ ;
    overflow: scroll;
  }
}
