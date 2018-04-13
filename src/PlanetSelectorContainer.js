import { connect } from 'react-redux';
import PlanetSelector from './PlanetSelector';
import { selectPlanet } from './redux/PlanetDucks'

function mapState(state) {
    return {
        planets: state.planet_reducer.planets,
        form: state.planet_reducer.form
    }
}

function mapDispatch(dispatch) {
    return {
        selectPlanet: (planet, selector) =>
            dispatch(
                selectPlanet(dispatch, planet, selector)
            ),
    }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
    const { planets, form } = stateProps;
    const { selector } = ownProps;
    const { selected_planet } = form[selector];
    const available_planets = getAvailablePlanets({ planets, form, selected_planet });

    return {
        ...stateProps,
        ...dispatchProps,
        ...ownProps,
        selected_planet,
        planets: available_planets
    };
}

export default connect(
    mapState,
    mapDispatch,
    mergeProps
)(PlanetSelector);

function getAvailablePlanets({ planets, form, selected_planet }) {
    const not_selected_planets = getNotSelectedPlanets(planets, form);
    const current_selected_planet = getCurrentSelectedPlanet(planets, selected_planet);
    const available_planets = [...not_selected_planets];
    current_selected_planet && available_planets.push(current_selected_planet);
    return available_planets;
}

function getNotSelectedPlanets(planets, form) {
    const selected_planets = getSelectedPlanets(form);
    return planets.filter(planet => selected_planets.indexOf(planet.name) === -1);
}

function getSelectedPlanets(form) {
    const selected_planets = [];
    Object.keys(form).forEach(selector => {
        const { selected_planet } = form[selector];
        selected_planet && selected_planets.push(selected_planet);
    });
    return selected_planets;
}

function getCurrentSelectedPlanet(planets, selected_planet) {
    if (!selected_planet) return;
    return planets.filter(planet => planet.name === selected_planet)[0];
}
