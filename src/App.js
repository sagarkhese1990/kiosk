import './App.scss';
import Routes from './routes/Routes'
import { BrowserRouter as Router, useHistory } from 'react-router-dom'
import store from './redux/store';
import { Provider } from 'react-redux';
function App() {
  let history = useHistory();
  return (
    <>
    
      <Router history={history}>
        <Provider store={store}>
          <Routes> </Routes>
        </Provider>
      </Router>
    </>
  );
}

export default App;
