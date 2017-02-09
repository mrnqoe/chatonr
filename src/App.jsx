import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
   super(props);
   this.state = {
     currentUser: {name: "Anonymous"},
     messages: []
   };
  }

  changeUsr(usr){
    this.state.currentUser.name = usr;
    return usr;
  }

  newMess(newMessage){
    this.chatty_server.send(JSON.stringify(newMessage));
  }

  componentDidMount() {
    this.chatty_server = new WebSocket("ws://www.localhost:4000/socketserver");
    this.chatty_server.onmessage = (event) => {
      let messages;
      var data_in = JSON.parse(event.data);
      if(Array.isArray(data_in)){
        messages = data_in;
      } else {
        messages = this.state.messages.concat(data_in);
      }
      this.setState({messages: messages})
    }
  }

  render() {
    return (
      <div>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser.name} newMess={this.newMess.bind(this)} currentId={this.state.currentId}/>
      </div>
    );
  }
}

export default App;
