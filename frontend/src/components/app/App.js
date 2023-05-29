import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { AppRouts } from '../routes/ruotes';
import { NavbarComponent } from '../navbar/navbar-component';;


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavbarComponent />
        <header>
          <h1>Welcome to my App</h1>
        </header>
        <AppRouts />
      </div>
    </BrowserRouter>
  );
}

export default App;

