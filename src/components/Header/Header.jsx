import { AppBar, Toolbar, Typography } from "@mui/material";
import React from "react";


const Header = () => {
    return(
        <AppBar position="static">
            <Toolbar>
                <Typography component='h2' variant='h5'>
                Hack News
                </Typography>
           
            </Toolbar>
        </AppBar>
    )
}
export default Header   