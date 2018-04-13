import { connect } from 'react-redux';
import PlanetSelector from './PlanetSelector';

function mapState(state) {
    return {
        planets: state.planet_reducer.planets,
    }
}

function mapDispatch(dispatch) {
    return {
    }
}

export default connect(
    mapState,
    mapDispatch
)(PlanetSelector);
