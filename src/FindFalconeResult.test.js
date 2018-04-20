import React from 'react';
import ReactDOM from 'react-dom';
import FindFalconeResult from './FindFalconeResult';

it('renders <FindFalconeResult/> without crashing', () => {
    const div = document.createElement('div');

    const status = "FORM_1";
    const time_taken = "bar";
    const planet_found = "bar";
    const location = "bar";
    const resetAll = () => { };

    ReactDOM.render(
        <FindFalconeResult
            status={status}
            time_taken={time_taken}
            planet_found={planet_found}
            location={location}
            location={location}
            resetAll={resetAll}
        />,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});
