import React from 'react'
import { AppBar, Toolbar, Typography, } from '@material-ui/core'
import { useSelector } from "react-redux";
import PeopleIcon from '@material-ui/icons/People';



function Header() {
    const countOfActiveUsers = useSelector((state) => state.impervaReducer.countOfActiveUsers);
    return (
        <React.Fragment>
            <AppBar>
                <Toolbar>
                    <Typography variant="h4">User management {`[${countOfActiveUsers} active users]`}</Typography>
                    <Typography variant="h4"><PeopleIcon/></Typography>
                </Toolbar>
            </AppBar>
            <Toolbar id="back-to-top-anchor" />
        </React.Fragment>
    );
}

export default Header;
