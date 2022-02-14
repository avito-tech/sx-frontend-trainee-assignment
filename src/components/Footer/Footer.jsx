import React from "react";
import { ButtonGroup, Container, Button } from "@mui/material";

const Footer = (props) => {
  return (
    <footer>
      <Container align="center" maxWidth="lg" display="flex">
        <ButtonGroup variant="outlined" size="large">
          <Button>Guidelines </Button>
          <Button>FAQ</Button>
          <Button>Lists</Button>
          <Button>API</Button>
          <Button>Security</Button>
          <Button>Legal</Button>
          <Button>Apply to YC</Button>
          <Button>Contact</Button>
        </ButtonGroup>
      </Container>
    </footer>
  );
};

export default Footer;
