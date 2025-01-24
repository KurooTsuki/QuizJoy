import React, { useState } from 'react';
import './TeacherProfile.css';
import { FaUserCircle, FaChalkboardTeacher, FaBook, FaChartBar, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

function TeacherProfile({ user }) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user.username,
    phone: '138****1234',
    school: '第一中学',
    subject: '数学',
    title: '高级教师',
    email: 'teacher@example.com'
  });
  const [editData, setEditData] = useState({ ...profileData });

  // 班级考试数据
  const examData = [
    { name: '第一次月考', 优秀: 8, 良好: 15, 及格: 10, 不及格: 2 },
    { name: '期中考试', 优秀: 10, 良好: 12, 及格: 11, 不及格: 2 },
    { name: '第二次月考', 优秀: 12, 良好: 14, 及格: 8, 不及格: 1 },
  ];

  // 使用莫兰迪色系
  const morandiColors = {
    优秀: '#A3A380',
    良好: '#D6CFC7',
    及格: '#B8B8D1',
    不及格: '#D1B3C4',
  };

  // 最近一次考试成绩分布
  const scoreDistribution = [
    { name: '90-100分', value: 12, color: '#52c41a' },
    { name: '80-89分', value: 14, color: '#1890ff' },
    { name: '60-79分', value: 8, color: '#faad14' },
    { name: '60分以下', value: 1, color: '#ff4d4f' },
  ];

  // 班级知识点掌握情况
  const topicMastery = [
    { topic: '三角函数', mastery: 85 },
    { topic: '数列', mastery: 78 },
    { topic: '概率统计', mastery: 72 },
    { topic: '立体几何', mastery: 80 },
    { topic: '解析几何', mastery: 75 },
  ];

  // 添加待办事项数据
  const [todos, setTodos] = useState([
    { id: 1, task: '准备下周的课程计划', completed: false },
    { id: 2, task: '批改期中考试试卷', completed: true },
  ]);

  const handleEditSubmit = () => {
    setProfileData(editData);
    setIsEditing(false);
  };

  const handleEditCancel = () => {
    setEditData({ ...profileData });
    setIsEditing(false);
  };

  return (
    <div className="teacher-profile">
      <div className="profile-layout">
        {/* 左侧个人信息 */}
        <div className="profile-info-section">
          <div className="profile-card">
            <div className="profile-header">
              <div className="avatar-container">
                {user.avatar ? (
                  <img src={user.avatar} alt="头像" className="avatar" />
                ) : (
                  <FaUserCircle className="avatar-placeholder" />
                )}
              </div>
              {!isEditing && (
                <button className="edit-btn" onClick={() => setIsEditing(true)}>
                  <FaEdit /> 编辑资料
                </button>
              )}
            </div>

            {isEditing ? (
              <div className="edit-form">
                <div className="form-group">
                  <label>姓名</label>
                  <input
                    type="text"
                    value={editData.name}
                    onChange={e => setEditData({...editData, name: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>手机号</label>
                  <input
                    type="text"
                    value={editData.phone}
                    onChange={e => setEditData({...editData, phone: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>学校</label>
                  <input
                    type="text"
                    value={editData.school}
                    onChange={e => setEditData({...editData, school: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>任教学科</label>
                  <input
                    type="text"
                    value={editData.subject}
                    onChange={e => setEditData({...editData, subject: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>职称</label>
                  <input
                    type="text"
                    value={editData.title}
                    onChange={e => setEditData({...editData, title: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>邮箱</label>
                  <input
                    type="email"
                    value={editData.email}
                    onChange={e => setEditData({...editData, email: e.target.value})}
                  />
                </div>
                <div className="edit-buttons">
                  <button className="save-btn" onClick={handleEditSubmit}>
                    <FaCheck /> 保存
                  </button>
                  <button className="cancel-btn" onClick={handleEditCancel}>
                    <FaTimes /> 取消
                  </button>
                </div>
              </div>
            ) : (
              <div className="info-list">
                <div className="info-item">
                  <label>姓名</label>
                  <span>{profileData.name}</span>
                </div>
                <div className="info-item">
                  <label>手机号</label>
                  <span>{profileData.phone}</span>
                </div>
                <div className="info-item">
                  <label>学校</label>
                  <span>{profileData.school}</span>
                </div>
                <div className="info-item">
                  <label>任教学科</label>
                  <span>{profileData.subject}</span>
                </div>
                <div className="info-item">
                  <label>职称</label>
                  <span>{profileData.title}</span>
                </div>
                <div className="info-item">
                  <label>邮箱</label>
                  <span>{profileData.email}</span>
                </div>
              </div>
            )}

            <div className="stats-summary">
              <div className="stat-card">
                <FaBook />
                <div className="stat-info">
                  <span className="stat-value">3</span>
                  <span className="stat-label">任教班级</span>
                </div>
              </div>
              <div className="stat-card">
                <FaChartBar />
                <div className="stat-info">
                  <span className="stat-value">105</span>
                  <span className="stat-label">学生总数</span>
                </div>
              </div>
            </div>

            <div className="todo-list">
              <h3>待办事项</h3>
              <ul>
                {todos.map(todo => (
                  <li key={todo.id} className={todo.completed ? 'completed' : ''}>
                    {todo.task}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 右侧数据分析 */}
        <div className="analysis-section">
          <div className="analysis-card">
            <h3>班级考试成绩趋势</h3>
            <div className="chart-container">
              <BarChart width={800} height={400} data={examData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="优秀" fill={morandiColors.优秀} />
                <Bar dataKey="良好" fill={morandiColors.良好} />
                <Bar dataKey="及格" fill={morandiColors.及格} />
                <Bar dataKey="不及格" fill={morandiColors.不及格} />
              </BarChart>
            </div>
          </div>

          <div className="analysis-card">
            <h3>最近考试成绩分布</h3>
            <PieChart width={400} height={300}>
              <Pie
                data={scoreDistribution}
                cx={200}
                cy={150}
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {scoreDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherProfile; 