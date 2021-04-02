import React from "react";

import WoundItem from "./WoundItem";
import WoundTable from "./WoundTable";
import Card from "../../shared/components/UIElements/Card";
import { Button } from "@material-ui/core";
import "./SongList.css";

const WoundList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="song-list-center">
        <Card>
          <h2>No songs added! Add one!</h2>
          <Button to="/wounds/new">Share Song</Button>
        </Card>
      </div>
    );
  }

  return (
    <>
      <ul className="song-list">
        {props.items.map((wound) => (
          <WoundItem
            key={wound.id}
            id={wound.id}
            name={wound.name}
            bodyPart={wound.bodyPart}
            description={wound.description}
            dateCreated={wound.dateCreated}
          />
        ))}
      </ul>
    </>
  );
};

export default WoundList;
