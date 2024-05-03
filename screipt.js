window.onload = function () {
    const chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light1",
        title: {
            text: "Population Data"
        },
        axisX: {
            title: "Year"
        },
        axisY: {
            title: "Population"
        },
        data: [{
            type: "column",
            dataPoints: []
        }]
    });

    fetch('country-data.json')
        .then(response => response.json())
        .then(data => {
            const selectElement = document.getElementById('sel');
            selectElement.innerHTML = '';
            data.forEach(country => {
                const option = new Option(country.name, country.name);
                selectElement.add(option);
            });
            selectElement.addEventListener('change', function() {
                const selectedCountryName = this.value;
                const selectedCountry = data.find(country => country.name === selectedCountryName);
                updateChart(selectedCountry);
            });
        })
        .catch(error => console.log('Error:', error));

    function updateChart(selectedCountry) {
        const dataPoints = selectedCountry.population_data.map(entry => ({ 
            x: entry.year, y: entry.population, label: entry.year.toString() 
        }));
        
        chart.options.data[0].dataPoints = dataPoints;
        chart.options.title.text = "Population Data for " + selectedCountry.name;
        chart.render();
    }
}