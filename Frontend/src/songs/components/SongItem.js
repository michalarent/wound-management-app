import React from 'react';

import Button from '../../shared/components/UIElements/Button'
import Card from '../../shared/components/UIElements/Card'
import './SongItem.css';


const SongItem = props => {
    return (
        <li className="song-item">
            <Card className="song-item__content">
                <div className="song-item__image">
                    <img src={props.image} alt={props.title}></img>
                </div>
                <div className="song-item__info">
                    <h2>{props.title}</h2>
                    <h3>{props.address}</h3>
                    <p>{props.description}</p>
                </div>
                <div className="song-item__actions">
                    <Button inverse >VIEW ON SPOTIFY</Button>
                    <Button to={`/songs/${props.id}`}>EDIT</Button>
                    <Button danger>DELETE</Button>
                </div>
            </Card>
        </li>
    );
}

export default SongItem;