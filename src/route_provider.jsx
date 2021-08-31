import React, { useEffect, } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { getLoader, getCustomerList, } from './actions/imperva_actions';
import CustomersListContainer from './container-components/customers_list_container';
import CustomersDetailsContainer from './container-components/customer_details_container'


function RouteProvider() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCustomerList(''))
    }, [])
    return (
        <Router>
            <Switch>
                <Route exact path='/'>
                    <CustomersListContainer />
                </Route>
                <Route exact path='/customers'>
                    <CustomersListContainer />
                </Route>
                <Route path='/customer/:id'>
                    <CustomersDetailsContainer />
                </Route>
            </Switch>
        </Router>
    )
}
export default RouteProvider;