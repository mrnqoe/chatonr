import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Activity from './Activity.jsx';

class App extends Component {
  constructor(props) {
   super(props);
   this.state = {
     currentUsr: {name: "Anonymous", color: "blue"},
     activity: [],
     usersOn: 0
   };
  }
// function to changew user
  changeUsr(_usr, usr){
    this.state.currentUsr.name = usr;
    let data_out = {
      type: 'notification',
      body: {
        usr: usr,
        old_usr: _usr
      }
    }
    this.chatty_server.send(JSON.stringify(data_out));
  }
// Funcxtion to create a new message item sent socket
  newMess(newMessage){
    let data_out = {
      type: 'message',
      body: newMessage
    }
    this.chatty_server.send(JSON.stringify(data_out));
  }

  componentDidMount() {
    this.chatty_server = new WebSocket("ws://www.localhost:4000/socketserver");
    this.chatty_server.onmessage = (event) => {
      const data_in = JSON.parse(event.data);
      if(data_in.color){
        this.setState({currentUsr: {name: data_in.name, color: data_in.color}})
      }else if(data_in.count){
        this.setState({usersOn: data_in.count});
      }else{
        this.setState({activity: this.state.activity.concat(data_in)});
      }
    }
  }

  // componentWillUnmount() {
  //   this.chatty_server.reconnect = false;
  // }

  render() {
    console.log('STATE:',this.state);
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty
            <span>Users online : {this.state.usersOn}</span>
          </a>
        </nav>
        <Activity activity={this.state.activity}/>
        <ChatBar
          color={this.state.currentUsr.color}
          currentUsr={this.state.currentUsr.name}
          changeUsr={this.changeUsr.bind(this)}
          newMess={this.newMess.bind(this)}
          currentId={this.state.currentId}
        />
      </div>
    );
  }

  componentDidUpdate() {
    var objDiv = document.getElementById("message-list");
    objDiv.scrollTop = objDiv.scrollHeight;
  }
}

export default App;
