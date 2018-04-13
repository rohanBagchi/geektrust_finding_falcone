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
    const { form } = stateProps;
    const { selector } = ownProps;
    const { selected_planet } = form[selector];

    return {
        ...stateProps,
        ...dispatchProps,
        ...ownProps,
        selected_planet
    };
}

export default connect(
    mapState,
    mapDispatch,
    mergeProps
)(PlanetSelector);
