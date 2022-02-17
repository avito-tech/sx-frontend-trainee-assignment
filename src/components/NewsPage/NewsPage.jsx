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




 
  console.log(currentNews);
  console.log(news);
  console.log(selectedId);
  console.log(comments);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Card>
          <IconButton>
            <RefreshIcon></RefreshIcon>
            Обновить список 
          </IconButton>
          <CardContent>
            <Typography component='h2' variant='h5'>{currentNews.title}</Typography>
            <Typography variant="subtitle1" color="textSecondary">
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
