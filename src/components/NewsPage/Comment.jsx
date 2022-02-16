import React, { useEffect } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch } from "react-redux";
import { getSubcommentsThunk } from "../../redux/app-reducer";
import { useSelector } from "react-redux";
import { getSubcommentsById, subcommentsSelector } from "../../redux/selectros";

const Comment = ({text,time,kids,by,id}) => {
    const dispatch = useDispatch()
    const subcomments = useSelector(subcommentsSelector(id))

    useEffect(()=> {
        if(id && kids) {
            dispatch(getSubcommentsThunk(id,kids))
        }
    },[id,kids])
    console.log(subcomments)

  return (
    <Grid>
      <Accordion >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box>
            <Typography variant="subtitle2">
              by {by} {time}
            </Typography>
            <br></br>
            <Typography variant="body2">{text}</Typography>
          </Box>
        </AccordionSummary>
        {subcomments?.length && subcomments.map((comment)=> (
            <AccordionDetails>
                <Typography>
                by {comment.by}
                </Typography>
                <Typography>
                    {comment.text}
                </Typography>
            </AccordionDetails>
        ))}
      </Accordion>
    </Grid>
  );
};

export default Comment
