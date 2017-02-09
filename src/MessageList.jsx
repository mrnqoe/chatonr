import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    console.log(this.props.messages);
    return (
      <main className="messages">
        {
          this.props.messages.map( (m) => {
            return (<Message key={m.mess_id} username={m.mess_usr} content={m.mess_txt}/>)
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
