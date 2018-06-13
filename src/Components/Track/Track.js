import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
    this.addTrack= this.addTrack.bind(this);
    this.renderAction= this.renderAction.bind(this);
    this.removeTrack= this.removeTrack.bind(this);
  }
    renderAction (isRemoval) {
      if(isRemoval) {
        return <a onClick= {this.removeTrack} className="Track-action">-</a>;
      } else {
        return <a onClick= {this.addTrack} className="Track-action">+</a>;
      }
    }

    addTrack(event){
      this.props.onAdd(this.props.track);
      event.preventDefault();
    }

    removeTrack(event){
      this.props.onRemove(this.props.track);
      event.preventDefault();
    }

    render(){
      return (
        <div className="Track">
          <div className="Track-information">
            <h3>{this.props.track.name}</h3>
            <p>{this.props.track.artist} | {this.props.track.album}</p>
          </div>
          {this.renderAction()}
        </div>
      );
    }
  }
  export default Track;
