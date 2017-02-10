import React, {Component} from 'react';

class Notification extends Component {
  render() {
    console.log(this.props.new_user);
    return (
      <div className="message system">
        <span className="message-content">{this.props.user} Changed username to {this.props.new_user}</span>
      </div>
    );
  }
}

export default Notification;
