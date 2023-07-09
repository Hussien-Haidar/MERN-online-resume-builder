import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

// pages & components
import Home from './components/pages/Home'
import Navbar from './components/partials/_navbar'
import Login from './components/pages/Login'
import Signup from './components/pages/Signup'
import ResumeDetails from './components/pages/ResumeDetails'
import CreateResume from './components/pages/CreateResume'
import ProfileCard from './components/pages/ProfileCard'
import EditProfile from './components/pages/EditProfile'
import ViewResume from './components/pages/ViewResume'
import EditResume from './components/pages/EditResume'

function App() {
  const { user } = useSelector(state => state.user)

  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path='/' element={user ? <Home /> : <Navigate to="/login" />} />
            <Route path='/login' element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path='/signup' element={!user ? <Signup /> : <Navigate to="/" />} />
            <Route path='/create' element={user ? <CreateResume /> : <Navigate to="/login" />} />
            <Route path='/profile' element={user ? <ProfileCard /> : <Navigate to="/login" />} />
            <Route path='/profile/edit' element={user ? <EditProfile /> : <Navigate to="/login" />} />
            <Route path='view/resume/:id' element={user ? <ViewResume /> : <Navigate to='/login' />} />
            <Route path='view/resume/edit/:id' element={user ? <EditResume /> : <Navigate to='/login' />} />
            <Route path='me/resume/:id' element={user ? <ResumeDetails /> : <Navigate to='/login' />} />
            

          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;