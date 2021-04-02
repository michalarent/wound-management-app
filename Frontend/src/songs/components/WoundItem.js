import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

// const WoundItem = (props) => {
//   return (
//     <li className="song-item">
//       <Card className="song-item__content">
//         <div className="song-item__info">
//           <h2>{props.name}</h2>
//           <h3>{props.bodyPart}</h3>
//           <p>{props.description}</p>
//         </div>
//         <div className="song-item__actions">
//           <Button to={`/wounds/${props.id}`}>EDIT</Button>
//           <Button danger>DELETE</Button>
//         </div>
//       </Card>
//     </li>
//   );
// };

const useStyles = makeStyles({
    root: {
      marginTop: "40vh",
      marginLeft: "50vh",  
      marginRight: "50vh",  
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

const WoundItem = (props) => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Injury Name
        </Typography>
        <Typography variant="h5" component="h2">
          {props.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {props.bodyPart}
        </Typography>
        <Typography variant="body2" component="p">
          {props.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default WoundItem;
