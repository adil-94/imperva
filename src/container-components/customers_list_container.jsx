import React from 'react'
import { Grid, Button, CircularProgress, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import Table from '../presentational-components/table'


function CustomersListContainer() {
    const loader = useSelector((state) => state.impervaReducer.loader);

    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <Grid className="flex-container" item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Typography variant="h5">Customers</Typography>
                </Grid>
                <Grid className="table-container" item xl={12} lg={12} md={12} sm={12} xs={12}>
                    {loader ? <CircularProgress /> : <Table />}
                </Grid>
            </Grid>
        </React.Fragment>
    )

}
export default CustomersListContainer;