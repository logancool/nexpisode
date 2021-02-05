import Bachelor from './components/Bachelor';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/bachelor">
          {/* <Bachelor /> */}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
