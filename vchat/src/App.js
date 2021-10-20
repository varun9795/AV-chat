// import socketIO from 'socket.io-client';
import './App.css';
import {BrowserRouter as Router,Route} from "react-router-dom";
import Login from './Component/login';
import Chat from './Component/chat'

// const ENDPOINT='http://localhost:4500/';
// const socket=socketIO(ENDPOINT , { transports:['websocket']});

function App() {

  return (
    <div className="App">
    <Router>
      <Route exact path="/" component={Login}/>
      <Route exact path="/chat" component={Chat}>
      </Route>
    </Router>
    </div>
  );
}

export default App;
