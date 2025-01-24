import React, { useState, useRef } from 'react';
import './ProfilePage.css';
import { BsCamera } from 'react-icons/bs';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function ProfilePage({ user, onLogin }) {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    nickname: '张三',
    school: '第一中学',
    class: '高三(1)班',
    achievements: ['熬夜卷王', '清晨霸主']
  });
  const fileInputRef = useRef(null);

  // 如果用户未登录，显示登录提示
  if (!user) {
    return (
      <div className="login-prompt">
        <h2>请先登录或注册一个账号！</h2>
        <button className="login-btn" onClick={() => onLogin()}>
          去登录
        </button>
      </div>
    );
  }

  // 模拟成绩数据
  const scoreData = {
    labels: ['1月', '2月', '3月', '4月'],
    datasets: [{
      label: '测试成绩',
      data: [85, 88, 92, 95],
      borderColor: '#B8A6D9',
      tension: 0.4
    }]
  };

  // 知识点掌握度数据
  const knowledgeData = {
    labels: ['三角函数', '数列', '概率统计', '立体几何', '解析几何'],
    datasets: [{
      label: '掌握度',
      data: [85, 70, 90, 75, 80],
      backgroundColor: '#E1BEE7',
      borderColor: '#CE93D8',
      borderWidth: 1
    }]
  };

  // 生成热力图数据
  const generateHeatmapData = () => {
    const values = [];
    const today = new Date();
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 6);
    startDate.setDate(1);
    
    while (startDate <= today) {
      const isWeekend = startDate.getDay() === 0 || startDate.getDay() === 6;
      const baseValue = isWeekend ? Math.floor(Math.random() * 3) + 1 : Math.floor(Math.random() * 4);
      const streak = Math.random() > 0.8;
      
      values.push({
        date: new Date(startDate).toISOString().split('T')[0],
        count: streak ? 3 : baseValue
      });
      
      startDate.setDate(startDate.getDate() + 1);
    }
    return values;
  };

  const heatmapValues = generateHeatmapData();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        localStorage.setItem('userAvatar', reader.result);
        setUserInfo(prev => ({...prev}));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">个人学习档案</h1>
      <div className="profile-content">
        {/* 左侧个人信息 */}
        <aside className="profile-left">
          <div className="avatar-section">
            <div className="avatar-container">
              <img 
                src="https://file.302.ai/gpt/imgs/20250121/7f0cde4d3b0541598dab4244058bb566.jpeg"
                alt="用户头像" 
              />
              <button 
                className="upload-btn"
                onClick={() => fileInputRef.current.click()}
              >
                <BsCamera />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/png,image/jpeg"
                style={{ display: 'none' }}
              />
            </div>
          </div>

          <div className="user-info">
            {isEditing ? (
              <div className="edit-form">
                <input
                  type="text"
                  value={userInfo.nickname}
                  onChange={(e) => setUserInfo({...userInfo, nickname: e.target.value})}
                  placeholder="昵称"
                />
                <input
                  type="text"
                  value={userInfo.school}
                  onChange={(e) => setUserInfo({...userInfo, school: e.target.value})}
                  placeholder="学校"
                />
                <input
                  type="text"
                  value={userInfo.class}
                  onChange={(e) => setUserInfo({...userInfo, class: e.target.value})}
                  placeholder="班级"
                />
                <div className="edit-buttons">
                  <button onClick={() => setIsEditing(false)}>保存</button>
                  <button onClick={() => setIsEditing(false)}>取消</button>
                </div>
              </div>
            ) : (
              <div className="info-display">
                <h2>{userInfo.nickname}</h2>
                <p>{userInfo.school}</p>
                <p>{userInfo.class}</p>
                <button onClick={() => setIsEditing(true)}>编辑资料</button>
              </div>
            )}

            <div className="ranking-display">
              <h3>班级排名</h3>
              <div className="ranking">
                <span className="ranking-number">2</span>
                <span className="ranking-total">/47</span>
              </div>
            </div>

            <div className="achievements">
              <h3>成就</h3>
              <div className="achievement-tags">
                {userInfo.achievements.map((achievement, index) => (
                  <span key={index} className="achievement-tag">
                    {achievement}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* 右侧主要内容区域 */}
        <main className="profile-main">
          {/* 上方热力图 */}
          <div className="heatmap-container">
            <CalendarHeatmap
              values={heatmapValues}
              classForValue={(value) => {
                if (!value) return 'color-empty';
                return `color-scale-${value.count}`;
              }}
              startDate={(() => {
                const date = new Date();
                date.setMonth(date.getMonth() - 6);
                date.setDate(1);
                return date;
              })()}
              endDate={new Date()}
              showMonthLabels={true}
              monthLabelsStyle={{
                fontSize: '8px',
                color: '#999'
              }}
              gutterSize={2}
              horizontal={true}
              monthLabelGutter={8}
              transformDayElement={(element, value, index) => ({
                ...element,
                props: {
                  ...element.props,
                  rx: 2,
                  width: '7px',
                  height: '7px'
                }
              })}
            />
          </div>

          {/* 下方数据展示区域 */}
          <div className="data-visualization">
            {/* 左侧知识点掌握度 */}
            <section className="knowledge-mastery">
              <h3>知识点掌握度</h3>
              <div className="chart-container">
                <Bar data={knowledgeData} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: true,
                    aspectRatio: 1.5,
                    scales: {
                      y: {
                        beginAtZero: true,
                        max: 100
                      }
                    },
                    plugins: {
                      legend: {
                        display: false
                      }
                    }
                  }}
                />
              </div>
            </section>

            {/* 右侧成绩趋势和排名 */}
            <section className="score-trends">
              <div className="score-chart">
                <h3>成绩趋势</h3>
                <Line data={scoreData} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: true,
                    aspectRatio: 1.5,
                    plugins: {
                      legend: {
                        display: false
                      }
                    }
                  }}
                />
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ProfilePage; 