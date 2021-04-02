import React from 'react';

import Button from '../../shared/components/UIElements/Button'
import Card from '../../shared/components/UIElements/Card'
import './SongItem.css';

const AppointmentItem = props => {
    return (
        <li className="appointment-item">
            <Card className="appointment-item__content">
                <div className="appointment-item__image">
                    <img src={props.image} alt={props.title}></img>
                </div>
                <div className="appointment-item__info">
                    <h2>{props.title}</h2>
                    <h2>{props.date}</h2>
                    <h3>{props.address}</h3>
                    <p>{props.description}</p>
                </div>
                <div className="appointment-item__actions">
                    <Button to={`/appointment/${props.id}`}>EDIT</Button>
                    <Button danger>DELETE</Button>
                </div>
            </Card>
        </li>
    );
}

export default AppointmentItem;