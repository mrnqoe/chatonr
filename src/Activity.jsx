import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

class Activity extends Component {
  render() {
    return (
      <main id="message-list" className="messages">
        {
          this.props.activity.map( (a) => {
            switch(a.type){
              case 'message':
                return (<Message key={a.mess_id} username={a.mess_usr} color={a.mess_color} content={a.mess_txt}/>)
              break;
              case 'notification':
                return (<Notification key={a.noti_id} user={a.noti_usr} new_user={a.noti_new_usr}/>)
              break;
            }
          })
        }
      </main>
    );
  }
}

export default Activity;
