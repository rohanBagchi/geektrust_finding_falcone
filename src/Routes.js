import React from 'react';
import { Route, Switch } from 'react-router-dom';
import FindFalconeFormContainer from './FindFalconeFormContainer';
import FindFalconeResultContainer from './FindFalconeResultContainer';

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={FindFalconeFormContainer} />
            <Route exact path="/result" component={FindFalconeResultContainer} />
            <Route component={NoMatch} />
        </Switch>
    );
};

export default Routes;

function NoMatch() {
    return (
        <div>
            Invalid path.
        </div>
    )
}
