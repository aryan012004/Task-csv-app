import SignUp from './Component/SignUp';
import logo from './logo.svg';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignIn from './Component/SignIn';
import Dashboard from './Component/Dashboard';
import Header from './Component/Header';
import Adduser from './Component/Adduser';
import Adminreg from './Component/Adminreg';
import Adminlogin from './Component/Adminlogin';
import Adminview from './Component/Adminview';
import About from './Component/About';
import Contact from './Component/Contact';

function App() {
  return (
    <div className="App">
           <BrowserRouter>
         <Header/>
          <Routes>
                 
                  <Route path="//" element={<SignUp />} />
                  <Route path="/signin" element={<SignIn />} />
                <Route path="/dashboard/:userId" element={<Dashboard />} />
                  <Route path="/user" element={<Adduser/>} />
                  <Route path="/about" element={<About/>} />
                  <Route path="/contact" element={<Contact/>} />
                  
                  <Route path="/addminview" element={<Adminview/>} />
                  
                  
          </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
