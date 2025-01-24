import React, { useState } from 'react';
import './LoginModal.css';

function LoginModal({ isOpen, onClose, onLogin }) {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [userType, setUserType] = useState('student');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // 使用用户选择的类型来确定角色
    const userData = {
      username: formData.username,
      role: userType === 'teacher' ? 'teacher' : 'student',
      avatar: 'https://file.302.ai/gpt/imgs/20250121/7f0cde4d3b0541598dab4244058bb566.jpeg'
    };
    onLogin(userData);
    onClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>欢迎使用智慧学习系统</h2>
        <div className="user-type-toggle">
          <button 
            className={`type-btn ${userType === 'student' ? 'active' : ''}`}
            onClick={() => setUserType('student')}
          >
            学生端
          </button>
          <button 
            className={`type-btn ${userType === 'teacher' ? 'active' : ''}`}
            onClick={() => setUserType('teacher')}
          >
            教师端
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>用户名</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="请输入用户名"
              required
            />
          </div>
          <div className="form-group">
            <label>密码</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="请输入密码"
              required
            />
          </div>
          {!isLoginMode && (
            <div className="form-group">
              <label>确认密码</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="请再次输入密码"
                required
              />
            </div>
          )}
          <button type="submit" className="submit-btn">
            {isLoginMode ? '登录' : '注册'}
          </button>
        </form>
        <div className="modal-footer">
          <button 
            className="switch-mode-btn"
            onClick={() => setIsLoginMode(!isLoginMode)}
          >
            {isLoginMode ? '没有账号？立即注册' : '已有账号？立即登录'}
          </button>
          <button className="close-btn" onClick={onClose}>关闭</button>
        </div>
      </div>
    </div>
  );
}

export default LoginModal; 