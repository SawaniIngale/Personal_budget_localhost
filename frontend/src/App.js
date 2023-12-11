import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import NavBar from './Navbar';
import Hero from './Hero';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import CreateBudget from './CreateBudget';
import AddExpenses from './AddExpense';
import Footer from './Footer';
import InactivityModal from './InactivityModal'; // Import your modal component

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [shouldLogout, setShouldLogout] = useState(false);
  // const navigate = useNavigate();

  const handleLogin = () => {
    setIsAuthenticated(true);
    setShouldLogout(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt'); // Clear JWT on logout
    setIsAuthenticated(false);
    setShouldLogout(true);
    setShowModal(false); // Close the modal if open
    // navigate('/login');
  };

  let inactivityTimer;
  const resetInactivityTimer = () => {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => setShowModal(true), 60000); // 1 minute of inactivity
  };

  const handleStayLoggedIn = () => {
    setShowModal(false);
    resetInactivityTimer();
  };

  useEffect(() => {
    if (isAuthenticated) {
      window.addEventListener('mousemove', resetInactivityTimer);
      window.addEventListener('keypress', resetInactivityTimer);

      resetInactivityTimer();

      return () => {
        clearTimeout(inactivityTimer);
        window.removeEventListener('mousemove', resetInactivityTimer);
        window.removeEventListener('keypress', resetInactivityTimer);
      };
    }
  }, [inactivityTimer, isAuthenticated, resetInactivityTimer]);

  useEffect(() => {
    let autoLogoutTimer;

    if (showModal) {
      autoLogoutTimer = setTimeout(handleLogout, 20000); // 20 seconds
    }

    return () => clearTimeout(autoLogoutTimer);
  }, [showModal]);

  return (
    <Router>
      <Hero />
      {isAuthenticated && <NavBar onLogout={handleLogout} />}
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        {isAuthenticated && (
          <>
            <Route path="/home" element={<Home shouldLogout={shouldLogout} setShouldLogout={setShouldLogout} />} />
            <Route path="/create-budget" element={<CreateBudget />} />
            <Route path="/add-expenses" element={<AddExpenses />} />
          </>
        )}
      </Routes>
      <Footer />
      <InactivityModal 
        show={showModal} 
        onStayLoggedIn={handleStayLoggedIn} 
        onLogout={handleLogout}
      />
    </Router>
  );
}

export default App;
