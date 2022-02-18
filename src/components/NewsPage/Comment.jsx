import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubcommentsThunk } from "../../redux/app-reducer";
import { subcommentsSelector } from "../../redux/selectros";

const Comment = ({ text, time, kids, by, id }) => {
  const dispatch = useDispatch();
  const subcomments = useSelector(subcommentsSelector(id));

  useEffect(() => {
    if (id && kids) {
      dispatch(getSubcommentsThunk(id, kids));
    }
  }, [id, kids]);
  console.log(subcomments);

  return (
    <Grid item xs={12}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box>
            <Typography variant="subtitle2">
              by {by} {time}
            </Typography>
            <br></br>
            <Typography variant="body2">{text}</Typography>
          </Box>
        </AccordionSummary>
        {subcomments?.length &&
          subcomments.map((comment) => (
            <AccordionDetails>
              <Typography variant="subtitle2">by {comment.by}</Typography>
              <Typography variant="body2">{comment.text}</Typography>
            </AccordionDetails>
          ))}
      </Accordion>
    </Grid>
  );
};

export default Comment;
