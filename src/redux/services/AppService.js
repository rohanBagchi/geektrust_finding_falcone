import axios from "axios";

const vehicles_uri = "https://findfalcone.herokuapp.com/vehicles";
const planets_uri = "https://findfalcone.herokuapp.com/planets";

function fetchPlanets() {
    return axios.get(planets_uri);
}

function fetchVehicles() {
    return axios.get(vehicles_uri);
}

export function fetchInitialAppData() {
    return axios
        .all([
            fetchPlanets(),
            fetchVehicles()
        ])
        .then(response => {
            const planets = response[0].data;
            const vehicles = response[1].data;

            return {
                planets,
                vehicles
            };
        });
}
