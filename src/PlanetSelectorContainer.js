import { connect } from 'react-redux';
import PlanetSelector from './PlanetSelector';
import { selectPlanet } from './redux/PlanetDucks';
import {
    getSelectedPlanets,
    getAvailablePlanets
} from './utils/SelectorUtils';

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


