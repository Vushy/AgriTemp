const loadingIndicator = document.getElementById('loading');

// Initialize the map, centered on the Philippines
let map = L.map('map').setView([7.899717, 125.086777], 11.5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

let Stadia_AlidadeSmoothDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}', {
    minZoom: 0,
    maxZoom: 20,
    attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    ext: 'png'
});
Stadia_AlidadeSmoothDark.addTo(map);

let heatmapLayer = L.heatLayer([], {
    radius: 30,
    blur: 20,
    maxZoom: 11.5,
    max: 1.0,
    gradient: {
        0.0: 'purple',
        0.2: 'blue',
        0.5: 'green',
        0.75: 'orange',
        1.0: 'red'
    }
}).addTo(map);

function formatTime(hour) {
    const date = new Date();
    date.setHours(hour); // Set the hour

    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return date.toLocaleString('en-US', options);
}

let temperatureChart; // Variable to hold the temperature chart instance
let windSpeedChart; // Variable to hold the wind speed chart instance

function createTemperatureChart(hourlyTemperatures) {
    if (temperatureChart) {
        temperatureChart.destroy(); // Destroy existing chart
    }

    if (!hourlyTemperatures || !Array.isArray(hourlyTemperatures)) {
        console.error("Invalid temperature data:", hourlyTemperatures);
        return;
    }

    const ctx = document.getElementById('temperatureChart').getContext('2d');
    temperatureChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: hourlyTemperatures.length }, (_, i) => formatTime(i)),
            datasets: [{
                label: 'Temperature (°C)',
                data: hourlyTemperatures,
                borderColor: 'rgb(255,65,65)',
                borderWidth: 2,
                fill: false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
        }
    });
}

function createWindSpeedChart(hourlyWindSpeeds) {
    if (windSpeedChart) {
        windSpeedChart.destroy(); // Destroy existing chart
    }

    if (!hourlyWindSpeeds || !Array.isArray(hourlyWindSpeeds)) {
        console.error("Invalid wind speed data:", hourlyWindSpeeds);
        return;
    }

    const ctx = document.getElementById('windSpeedChart').getContext('2d');
    windSpeedChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: hourlyWindSpeeds.length }, (_, i) => formatTime(i)),
            datasets: [{
                label: 'Wind Speed (km/h)',
                data: hourlyWindSpeeds,
                borderColor: 'rgb(179,198,152)',
                borderWidth: 2,
                fill: false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
        }
    });
}

async function fetchWeatherData(lat, lon) {
    loadingIndicator.style.display = 'block';

    const proxy = 'https://thingproxy.freeboard.io/fetch/';
    const apiURL = `https://barmmdrr.com/connect/gweather_api?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`;

    try {
        const response = await fetch(proxy + apiURL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data && data.current && data.current.temperature_2m) {
            return {
                temperature: data.current.temperature_2m,
                windSpeed: data.current.wind_speed_10m,
                hourlyTemperatures: data.hourly.temperature_2m || [], // Ensure it's an array
                hourlyWindSpeeds: data.hourly.wind_speed_10m || [] // Ensure it's an array
            };
        } else {
            console.error("No current weather data available for this location");
            return null;
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return null;
    } finally {
        loadingIndicator.style.display = 'none';
    }
}

function normalizeTemperature(temp) {
    const minTemp = -30;
    const maxTemp = 50;
    return Math.max(0, Math.min(1, (temp - minTemp) / (maxTemp - minTemp)));
}

let markerCoords = [
    { lat: 7.899717, lon: 125.086777, name: 'Valencia' },
    { lat: 8.153990, lon: 125.128014, name: 'Malaybalay' },
    { lat: 7.998073, lon: 125.023529, name: 'Lantapan' },
    { lat: 7.942064, lon: 125.120448, name: 'Sugod' },
    { lat: 7.840156, lon: 125.044281, name: 'Dologon' },
    { lat: 7.856723, lon: 125.050074, name: 'Musuan' },
    { lat: 8.051313, lon: 125.135084, name: 'Aglayan' },
    { lat: 7.917525, lon: 125.329413, name: 'San Fernando' },
    { lat: 7.893515, lon: 125.074853, name: 'Lumbo' },
    { lat: 8.076857, lon: 125.298866, name: 'Cabanglasan' }
];

async function addHeatmapForMarkers() {
    heatmapLayer.setLatLngs([]);

    // Clear previous data
    temperatureData = [];
    windSpeedData = [];

    for (const coord of markerCoords) {
        const weatherData = await fetchWeatherData(coord.lat, coord.lon);
        if (weatherData) {
            const temperature = weatherData.temperature;
            const windSpeed = weatherData.windSpeed;
            const normalizedTemp = normalizeTemperature(temperature);
            heatmapLayer.addLatLng([coord.lat, coord.lon, normalizedTemp]);

            // Push the temperature and wind speed to their respective arrays
            temperatureData.push(temperature);
            windSpeedData.push(windSpeed);
        }
    }
}

const markerIcon = L.icon({
    iconUrl: 'assets/images/icons/map.png',
    iconSize: [50, 50],
    iconAnchor: [25, 41],
    popupAnchor: [1, -39],
});

markerCoords.forEach(coord => {
    let marker = L.marker([coord.lat, coord.lon], { icon: markerIcon }).addTo(map);
    marker.on('click', async function() {
        const weatherData = await fetchWeatherData(coord.lat, coord.lon);
        if (weatherData) {
            marker.bindPopup(`<b>${coord.name}</b>`).openPopup();
            document.getElementById('loc_Name').innerText = coord.name;
            document.getElementById('Temps').innerText = "Current Temperature: " + weatherData.temperature + "°C";
            // Update the chatbox input with the clicked location's name
            const message = `Location:` + coord.name;
            document.getElementById('chatbox-input').value = message; // Ensure this ID matches
            // Update the charts with the clicked marker's coordinates
            // Simulate a click on the send button
            document.querySelector('.send__button').click(); // Make sure this selector matches your send button

            displayWeatherData(coord.lat, coord.lon);
            sendMessageToApp()
        }
    });
});

// Function to handle the send button click
document.querySelector('.send__button').addEventListener('click', function() {
    const message = document.getElementById('chatbox-input').value;
});
function sendMessageToApp() {
    const message = document.getElementById('chatbox-input').value;

    if(message){
        console.log("Message sent:" + message);
        // Optionally, clear the input after sending
        document.getElementById('chatbox-input').value = '';
    }

}

addHeatmapForMarkers();

// Toggle sidebar visibility on icon click
const sidebar = document.getElementById('sidebar');
const sidebarToggleIcon = document.getElementById('showSidebarIcon');

sidebarToggleIcon.addEventListener('click', () => {
    sidebar.classList.toggle('show');
});

async function displayWeatherData(lat, lon) {
    const weatherData = await fetchWeatherData(lat, lon);
    if (weatherData) {
        createTemperatureChart(weatherData.hourlyTemperatures);
        createWindSpeedChart(weatherData.hourlyWindSpeeds);
    }
}


