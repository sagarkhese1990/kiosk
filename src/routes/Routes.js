//Routing
import React from 'react';
import { Route, Switch} from 'react-router-dom';
import Home from '../modules/home/Home';


const Routes = (props) => {
    console.log(props);
    return (
        <Switch>
            <Route exact path={`/`} component={Home} />
        </Switch>
    )
}

export default Routes;