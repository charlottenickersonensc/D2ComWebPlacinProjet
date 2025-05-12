import './App.css'
import Connecter from "./Components/Connecter"
import CreerCompte from './Components/CreerCompte'
import Prof from './Components/Prof';
import Student from './Components/Student';
import Accueil from './Components/Accueil';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  

  return (
    <>
     
      <Router>
        <Routes>
          <Route path='/creerCompte' element={<CreerCompte />} />
          <Route path='/connecter' element={<Connecter />} />
          <Route path='/' element={<Accueil />} />
          <Route path='/prof' element={<Prof />} />
          <Route path='/student' element={<Student />} />
        </Routes>
      </Router>
      
    </>
  )
}

export default App
