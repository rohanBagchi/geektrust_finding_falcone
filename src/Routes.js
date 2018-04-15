import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import FindFalconeFormContainer from './FindFalconeFormContainer';
import FindFalconeResult from './FindFalconeResult';

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={FindFalconeFormContainer} />
            <Route exact path="/result" component={FindFalconeResult} />
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
