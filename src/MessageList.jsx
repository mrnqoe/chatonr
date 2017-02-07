import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    // console.log(this.props.messages);
    return (
      <main className="messages">
        {
          this.props.messages.map( (m) => {
            return (<Message key={m.id} username={m.username} content={m.content}/>)
          })
        }
        <div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>
      </main>
    );
  }
}

export default MessageList;
