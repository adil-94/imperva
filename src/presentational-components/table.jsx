import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead,
    TablePagination, TableRow
} from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import { setCustomerList, getDigestedIds, getLoader, getCustomerDetails, getActiveUersCount } from '../actions/imperva_actions'
import { useParams, useHistory } from 'react-router-dom';
import '../App.css'

const columnsList = [
    { _id: 'isActive', label: 'Active', minWidth: 200 },
    { _id: 'name', label: 'First,Last Name', minWidth: 200 },
    { _id: 'company', label: 'Company', minWidth: 200 },
    { _id: 'digest', label: 'Digest', minWidth: 200 },
];
const columnsDetailedList = [
    { _id: 'isActive', label: 'Active', minWidth: 200 },
    { _id: 'balance', label: 'Balance', minWidth: 200 },
    { _id: 'picture', label: 'Picture', minWidth: 200 },
    { _id: 'age', label: 'Age', minWidth: 200 },
    { _id: 'eyeColor', label: 'Eye Color', minWidth: 400 },
    { _id: 'name', label: 'Name', minWidth: 400 },
    { _id: 'company', label: 'Company', minWidth: 200 },
    { _id: 'email', label: 'Email Id', minWidth: 200 },
    { _id: 'phone', label: 'Phone', minWidth: 200 },
    { _id: 'address', label: 'Address', minWidth: 200 },
    { _id: 'about', label: 'About', minWidth: 200 },
    { _id: 'registered', label: 'Registered', minWidth: 200 },
];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: '100vh',
        backgroundColor: '#f5f5f5'
    },
});

export default function StickyHeadTable() {
    const classes = useStyles();
    const dispatch = useDispatch();
    let history = useHistory();
    let { id } = useParams();

    const customerList = useSelector((state) => state.impervaReducer.customersList);
    const customerDetails = useSelector((state) => state.impervaReducer.customerDetails);
    const countOfActiveUsers = useSelector((state) => state.impervaReducer.countOfActiveUsers);


    const page = useSelector((state) => state.impervaReducer.currentPage);
    let columns = columnsList;
    let data = customerList;
    if (id != undefined) {
        columns = columnsDetailedList;
        data = customerDetails
    }

    const handleChangePage = (event, newPage) => {
        dispatch(getLoader(true))
        dispatch(getDigestedIds({ newPage, customerList }))
    };

    const onActiveToggleChange = (row, index) => {
        if (row.isActive) dispatch(getActiveUersCount(countOfActiveUsers - 1))
        else dispatch(getActiveUersCount(countOfActiveUsers + 1))

        let payload = [...data];
        payload[index].isActive = !payload[index].isActive;
        if (id != undefined) {
            dispatch(getCustomerDetails(payload))
        } else {
            dispatch(setCustomerList(payload))
        }

    }
    const onDoubleClick = (event, row) => {
        if (event.detail % 2 === 0 && row.isActive) {
            history.push(`/customer/:${row._id}`);
            dispatch(getCustomerDetails([row]))
        }

    }

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column._id}
                                    align={column.align}
                                    className={column._id == 'eyeColor' ? "headers col-eye" : "headers"}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.slice(page * 10, page * 10 + 10).map((row, index) => {
                            return (
                                <TableRow onClick={(event) => onDoubleClick(event, row)} className={row.isActive ? 'active' : "greyed"} hover role="checkbox" tabIndex={-1} key={row._id}>
                                    {columns.map((column) => {
                                        const value = row[column._id];
                                        return (
                                            <TableCell key={column._id} align={column.align}>
                                                {column._id == 'name' ? value.first + value.last :
                                                    column._id == 'isActive' ? <Switch
                                                        checked={!!value}
                                                        onChange={() => onActiveToggleChange(row, index)}
                                                        color="primary"
                                                        name="checkedB"
                                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                                    /> : column._id == 'picture' ? <img src={value} /> : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                // ActionsComponent={<h6>Bunkrn</h6>}
                rowsPerPageOptions={[]}
                component="div"
                count={data.length}
                rowsPerPage={10}
                page={page}
                onPageChange={handleChangePage}
            />
        </Paper>
    );
}
