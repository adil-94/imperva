import React from 'react'
import { Grid, Button, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import Table from '../presentational-components/table'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


function CustomersDetailsContainer() {
    const dispatch = useDispatch();
    let history = useHistory();
    const counter = useSelector((state) => state.impervaReducer);
    const onClick = () => {
        history.push("/customers");
    }
    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <Grid className="flex-container" item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Typography variant="h5">Customer Details</Typography>
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Button startIcon={<ArrowBackIcon/>} variant='outlined' color='primary' onClick={onClick}>
                        Back to customers list
                    </Button>
                </Grid>
                <Grid className="table-container" item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Table />
                </Grid>
            </Grid>
        </React.Fragment>
    )

}
export default CustomersDetailsContainer;