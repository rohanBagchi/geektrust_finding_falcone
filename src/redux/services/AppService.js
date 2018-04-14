import axios from "axios";

const vehicles_uri = "https://findfalcone.herokuapp.com/vehicles";
const planets_uri = "https://findfalcone.herokuapp.com/planets";
const token_uri = "https://findfalcone.herokuapp.com/token";
const find_falcone_uri = "https://findfalcone.herokuapp.com/find";
const axios_config = {
    headers: {
        "Accept": "application/json"
    }
};

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

function getToken() {
    return axios
        .post(token_uri, {}, axios_config)
        .then(res => res.data.token)
}

export function findfalcone(planets, vehicles) {
    return getToken()
        .then(token => {
            return axios
                .post(
                    find_falcone_uri,
                    {
                        token,
                        planet_names: planets,
                        vehicle_names: vehicles
                    },
                    axios_config
                )
                .then(res => {
                    debugger;
                })
        });
}
