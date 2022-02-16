import {
  Accordion,
  AccordionSummary,
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getCommentsThunk,
  getCurrentNewsByIdThunk,
  getSubcommentsThunk,
} from "../../redux/app-reducer";
import {
  commentsSelector,
  getCurrentNewsById,
  getSubcommentsById,
  newsSelector,
} from "../../redux/selectros";
import RefreshIcon from "@mui/icons-material/Refresh";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Comment from "./Comment";

const NewsPage = () => {
    

  const dispatch = useDispatch();
  const { id: selectedId } = useParams();
  const news = useSelector(newsSelector);
  const comments = useSelector(commentsSelector);
  const currentNews = useSelector(getCurrentNewsById(selectedId));
  /* const subcomments = useSelector(getSubcommentsById(comments.id)) */


  useEffect(()=>{
    if(!news.length) {
    dispatch(getCurrentNewsByIdThunk(selectedId))
  }
},[news])

  useEffect(() => {
    if (currentNews.kids?.length) {
      dispatch(getCommentsThunk(currentNews.kids));
    }
  }, [currentNews?.kids]);

  useEffect(() => {
    if (comments.id && comments.kids) {
        dispatch(getSubcommentsThunk(comments.id, comments.kids))
    }
}, [comments.id, comments.kids])


 
  console.log(currentNews);
  console.log(news);
  console.log(selectedId);
  console.log(comments);

  return (
    <Grid>
      <Grid>
        <Card>
          <IconButton>
            <RefreshIcon></RefreshIcon>
          </IconButton>
          <CardContent>
            <Typography>{currentNews.title}</Typography>
            <Typography>
              {currentNews.score} poinst by {currentNews.by} {currentNews.time}
            </Typography>
            <Link href={currentNews.url}>News source</Link>
          </CardContent>
        </Card>
      </Grid>

      {comments.map((comment) => (
       <Comment
       text={comment.text}
       by={comment.by}
       id={comment.id}
       time={comment.time}
       kids={comment.kids}
       />
      ))}
    </Grid>
  );
};

export default NewsPage;
