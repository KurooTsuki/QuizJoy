import React, { useState } from 'react';
import './App.css';
import { BsSun, BsMoon, BsPerson, BsBook, BsPencilSquare, BsPersonCircle } from 'react-icons/bs';
import LoginModal from './components/LoginModal';
import ProfilePage from './components/ProfilePage';
import ProblemBank from './components/ProblemBank';
import TestBank from './components/TestBank';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TestPaper from './components/TestPaper';
import ProblemDetail from './components/ProblemDetail';
import TeacherProfile from './components/TeacherProfile';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoginModalOpen(false);
  };

  const handleNavigation = (path) => {
    if (window.location.pathname.startsWith('/test/')) {
      const confirmLeave = window.confirm('测试正在进行中，退出将需要重新开始。确定要退出吗？');
      if (!confirmLeave) {
        return;
      }
    }

    if (path === 'profile' && !user) {
      setIsLoginModalOpen(true);
      return;
    }
    setCurrentPage(path);
    window.location.hash = path;
  };

  const renderMainContent = () => {
    switch (currentPage) {
      case 'profile':
        return user?.role === 'teacher' ? (
          <TeacherProfile user={user} />
        ) : (
          <ProfilePage user={user} onLogin={() => setIsLoginModalOpen(true)} />
        );
      case 'test':
        return <TestBank />;
      default:
        return <ProblemBank />;
    }
  };

  return (
    <Router>
      <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
        <nav className="navbar">
          <div className="nav-left">
            <h1>智慧学习系统</h1>
          </div>
          <div className="nav-center">
            <a 
              href="#" 
              className={`nav-item ${currentPage === 'home' ? 'active' : ''}`}
              onClick={() => handleNavigation('home')}
            >
              <BsBook className="nav-icon" />
              <span>题库</span>
            </a>
            <a 
              href="#" 
              className={`nav-item ${currentPage === 'test' ? 'active' : ''}`}
              onClick={() => handleNavigation('test')}
            >
              <BsPencilSquare className="nav-icon" />
              <span>小测</span>
            </a>
            <a 
              href="#" 
              className={`nav-item ${currentPage === 'profile' ? 'active' : ''}`}
              onClick={() => handleNavigation('profile')}
            >
              <BsPersonCircle className="nav-icon" />
              <span>我的</span>
            </a>
          </div>
          <div className="nav-right">
            <div className="user-avatar">
              {user ? (
                <img 
                  src="https://file.302.ai/gpt/imgs/20250121/7f0cde4d3b0541598dab4244058bb566.jpeg"
                  alt="用户头像"
                  className="avatar-img"
                />
              ) : (
                <BsPerson className="avatar-placeholder" />
              )}
            </div>
            <button 
              className="login-btn"
              onClick={() => setIsLoginModalOpen(true)}
            >
              {user ? user.username : '登录/注册'}
            </button>
            <button 
              className="theme-toggle"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <BsSun /> : <BsMoon />}
            </button>
          </div>
        </nav>

        <LoginModal 
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onLogin={handleLogin}
        />

        <Routes>
          <Route path="/" element={renderMainContent()} />
          <Route 
            path="/test/:testId" 
            element={<TestPaper setCurrentPage={setCurrentPage} />} 
          />
          <Route path="/problem/:problemId" element={<ProblemDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 