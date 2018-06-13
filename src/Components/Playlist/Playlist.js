import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
    this.handleNameChange=this.handleNameChange.bind(this);
  }

  handleNameChange(event){
    this.props.onNameChange( { name: event.target.value } );
  }

    render(){
      return (
        <div className="Playlist">
          <input defaultValue={"New Playlist"} onChange={this.handleNameChange} />
          <TrackList tracks={this.props.list} onRemove={this.props.onRemove} isRemoval="true" />
          <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
        </div>
      );
    }
  }
  export default Playlist;
