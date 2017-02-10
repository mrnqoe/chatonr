import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Activity from './Activity.jsx';

class App extends Component {
  constructor(props) {
   super(props);
   this.state = {
     currentUsr: {name: "Anonymous", color: "blue"},
     color: "red",
     activity: [],
     usersOn: 0,
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
    console.log('Current user before socket throw: ', this.state.currentUsr.name);
    this.chatty_server.send(JSON.stringify(data_out));
  }
// Funcxtion to create a new message item sent socket
  newMess(newMessage){
    let data_out = {
      type: 'message',
      username: this.state.currentUsr,
      body: newMessage
    }
    this.chatty_server.send(JSON.stringify(data_out));
  }

  componentDidMount() {
    this.chatty_server = new WebSocket("ws://www.localhost:4000/socketserver");
    this.chatty_server.onmessage = (event) => {
      const data_in = JSON.parse(event.data);
      console.log("DATA_IN:",data_in);
      if(data_in.color){
        this.state.currentUsr.color = data_in.color;
      }else if(data_in.count){
        this.setState({usersOn: data_in.count});
        console.log("STATE AFTER USERR ON:",this.state);
      }else if(data_in.activity){
        this.setState({activity: this.state.activity.concat(data_in)});
      }else{
        return 0;
      }
    }
    console.log("Users on: ", this.state.usersOn);
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span>Users online : {this.state.usersOn}</span>
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
}

export default App;
