import React from 'react';

import SongItem from './SongItem';
import Card from '../../shared/components/UIElements/Card'
import Button from '../../shared/components/UIElements/Button'

import './SongList.css';

const SongList = props => {
    if (props.items.length === 0) {
        return (
            <div className="song-list-center">
                <Card>
                    <h2>No songs added! Add one!</h2>
                    <Button to="/songs/new">Share Song</Button>
                </Card>
            </div>
        );
    }

    return (
        <ul className = "song-list">
            {props.items.map(song => <SongItem 
                key={song.id} 
                id={song.id} 
                image={song.image} 
                title={song.title} 
                description={song.description} 
                length={song.length}/>)}
        </ul>
    );
};

export default SongList;