import { AppBar, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography component="h2" variant="h5" onClick={() => navigate(`/`)}>
          Hack News
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
