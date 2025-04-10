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
