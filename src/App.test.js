import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders <App/> without crashing', () => {
    const fetchInitialAppData = jest.fn();
    const div = document.createElement('div');
    ReactDOM.render(
        <App
            fetchInitialAppData={fetchInitialAppData}
            children={1}
        />,
        div
    );
    ReactDOM.unmountComponentAtNode(div);

    expect(fetchInitialAppData).toHaveBeenCalledTimes(1);
});
