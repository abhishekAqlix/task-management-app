import { Routes , Route, BrowserRouter} from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import TaskManager from './pages/TaskManager';
 

//Css
import './App.css';



function App() {
  
  return (
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Register/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/task' element={<TaskManager/>}/>
  </Routes>
  </BrowserRouter>
       
  )
}

export default App;
