document.addEventListener('DOMContentLoaded', () => {
    // First load and apply the score colors
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            colorElementsByScore(data);
        });

    // Then keep your existing click handler
    const elements = document.querySelectorAll('.element');
    elements.forEach(element => {
        element.addEventListener('click', () => {
            const symbol = element.getAttribute('data-symbol');
            fetch('data.json')
                .then(response => response.json())
                .then(data => {
                    const elementData = data[symbol];
                    if (elementData) {
                        displayInfo(elementData);
                    }
                });
        });
    });
});

function colorElementsByScore(elementsData) {
    document.querySelectorAll('.element[data-symbol]').forEach(element => {
        const symbol = element.getAttribute('data-symbol');
        const elementData = elementsData[symbol];
        
        // Remove any existing color classes
        element.classList.remove('radioactif-1', 'radioactif-2', 'radioactif-3', 'no-radioactif');
        
        if (elementData && elementData.score) {
            // Add dynamic color class based on score
            element.classList.add(`radioactif-${elementData.radioactif}`);
        } else {
            // Add class for elements with no score
            element.classList.add('no-radioactif');
        }
    });
}

// Keep your existing displayInfo and closeInfo functions
function displayInfo(elementData) {
    const infoDiv = document.getElementById('element-info');
    const symbol = document.getElementById('element-symbol');
    const properties = document.getElementById('element-properties');

    symbol.textContent = elementData.symbol;
    properties.innerHTML = '';

    for (let key in elementData) {
        if (key !== 'symbol') {
            const li = document.createElement('li');
            li.textContent = `${key}: ${elementData[key]}`;
            properties.appendChild(li);
        }
    }

    infoDiv.classList.remove('hidden');
}

function closeInfo() {
    const infoDiv = document.getElementById('element-info');
    infoDiv.classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
  const cells      = document.querySelectorAll('.element[data-symbol]');
  const selector   = document.getElementById('metric-select');
  let   elementMap = {};

  /* 1. Load JSON only once */
  fetch('data.json')
    .then(r => r.json())
    .then(json => {
      elementMap = json;
      colourBy('radioactif');          // default view
    });

  /* 2. Change view when user picks another metric */
  selector.addEventListener('change', e => colourBy(e.target.value));

  /* ---------- helpers ---------- */
  const ALL_CLASSES = ['score-0','score-1','score-2','score-3','score-4','no-data'];

  function colourBy(metric) {
    cells.forEach(td => {
      td.classList.remove(...ALL_CLASSES);          // reset

      const sym   = td.dataset.symbol;
      const entry = elementMap[sym];

      if (!entry || !(metric in entry) || entry[metric] === 0) {
        td.classList.add('no-data');
        return;
      }
      const score = Math.max(1, Math.min(4, entry[metric]));  // clamp 1-4
      td.classList.add(`score-${score}`);
    });
  }
});
