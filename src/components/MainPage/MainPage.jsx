import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Link,
  Typography,
} from "@mui/material";

import react from "react";
import { useSelector } from "react-redux";
import { dateToTime } from "../../utils/helpers/dateFormatter";
import { useNavigate } from 'react-router-dom';


const MainPage = (props) => {
  const news = useSelector((state) => state.news);
  const isLoading = useSelector((state) => state.isLoading);
  const navifate = useNavigate();
  if (isLoading) {
    return <h1>Данные загружаются</h1>;
  }

  return (
    <Grid>
      {news.map((item, index) => (
        <CardActionArea onClick={()=>navifate(`/news/${item.id}`)}>
          <Card
            sx={{
              display: "flex",
            }}
          >
            <CardContent>
              <Typography component="h2" variant="h5">
                {item.title}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {item.score} points by {item.by} {item.time}
              </Typography>
              <Link href={item.url} variant="subtitle1">
                Read the full text of the news...
              </Link>
            </CardContent>
          </Card>
        </CardActionArea>
      ))}
    </Grid>
  );
};

export default MainPage;
