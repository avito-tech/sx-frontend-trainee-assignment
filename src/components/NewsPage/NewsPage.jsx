import { Card, CardContent, Grid, IconButton, Link, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCommentsThunk, getCurrentNewsByIdThunk } from "../../redux/app-reducer";
import {
  commentsSelector,
  getCurrentNewsById,
  newsSelector,
} from "../../redux/selectros";
import RefreshIcon from "@mui/icons-material/Refresh";

const NewsPage = () => {
  const dispatch = useDispatch();
  const { id: selectedId } = useParams();
  const news = useSelector(newsSelector);
  const comments = useSelector(commentsSelector);
  const currentNews = useSelector(getCurrentNewsById(selectedId));

   useEffect(()=> {
       if(currentNews.kids?.length) {
        dispatch(getCommentsThunk(currentNews.kids))
       }
      
    },[currentNews.kids]) 
  console.log(currentNews);
  console.log(news);
  console.log(selectedId);
  console.log(comments)

  return (
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
          <Link href={currentNews.url}>
            News source 
        </Link>
        </CardContent>
        
      </Card>
      <h1>{comments[0].by} {comments[0].text}</h1>
    </Grid>
    
  );
};

export default NewsPage;
