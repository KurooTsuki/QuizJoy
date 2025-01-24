import React, { useState } from 'react';
import './TestBank.css';
import { FaStar, FaRegStar, FaClock, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function TestBank() {
  const navigate = useNavigate();

  // 小测题单数据
  const testSets = [
    {
      id: 1,
      title: '三角函数基础专项练习',
      description: '包含三角函数基本概念、诱导公式、三角恒等变换等基础题目',
      difficulty: 3,
      questionCount: 15,
      duration: 30,
      topics: ['三角函数', '基础题'],
      completed: false,
      score: null
    },
    {
      id: 2,
      title: '数列求和技巧强化',
      description: '等差数列、等比数列、数列求和方法与技巧专项训练',
      difficulty: 4,
      questionCount: 12,
      duration: 25,
      topics: ['数列', '求和'],
      completed: true,
      score: 85
    },
    {
      id: 3,
      title: '概率统计入门测试',
      description: '概率与统计的基本概念、计数原理、古典概型等内容',
      difficulty: 2,
      questionCount: 10,
      duration: 20,
      topics: ['概率', '统计'],
      completed: false,
      score: null
    },
    {
      id: 4,
      title: '函数与导数综合测试',
      description: '函数的性质、导数的定义与计算、导数应用问题等综合练习',
      difficulty: 4,
      questionCount: 18,
      duration: 35,
      topics: ['函数', '导数', '应用题'],
      completed: true,
      score: 92
    },
    {
      id: 5,
      title: '立体几何专题训练',
      description: '空间几何体的表面积、体积计算，空间向量应用等',
      difficulty: 3,
      questionCount: 12,
      duration: 25,
      topics: ['立体几何', '空间向量'],
      completed: false,
      score: null
    },
    {
      id: 6,
      title: '解析几何基础巩固',
      description: '直线、圆锥曲线的基本性质和方程应用',
      difficulty: 2,
      questionCount: 15,
      duration: 30,
      topics: ['解析几何', '圆锥曲线'],
      completed: true,
      score: 78
    },
    {
      id: 7,
      title: '复数运算专项练习',
      description: '复数的四则运算、复平面图像、复数的三角形式',
      difficulty: 3,
      questionCount: 10,
      duration: 20,
      topics: ['复数', '复平面'],
      completed: false,
      score: null
    },
    {
      id: 8,
      title: '矩阵变换提高训练',
      description: '矩阵运算、线性变换、特征值与特征向量应用',
      difficulty: 5,
      questionCount: 12,
      duration: 30,
      topics: ['矩阵', '线性代数'],
      completed: true,
      score: 88
    }
  ];

  // 筛选状态
  const [filters, setFilters] = useState({
    difficulty: '全部',
    completion: '全部',
    searchText: ''
  });

  // 渲染星级
  const renderStars = (count) => {
    return (
      <div className="stars">
        {[...Array(5)].map((_, index) => (
          index < count ? <FaStar key={index} /> : <FaRegStar key={index} />
        ))}
      </div>
    );
  };

  // 根据筛选条件过滤题单
  const filteredTestSets = testSets
    .filter(test => {
      const difficultyMatch = filters.difficulty === '全部' || 
        test.difficulty === Number(filters.difficulty);
      
      const completionMatch = filters.completion === '全部' ||
        (filters.completion === '已完成' && test.completed) ||
        (filters.completion === '未完成' && !test.completed);

      const searchMatch = filters.searchText === '' || 
        test.title.toLowerCase().includes(filters.searchText.toLowerCase()) ||
        test.description.toLowerCase().includes(filters.searchText.toLowerCase()) ||
        test.topics.some(topic => 
          topic.toLowerCase().includes(filters.searchText.toLowerCase())
        );

      return difficultyMatch && completionMatch && searchMatch;
    })
    .sort((a, b) => {
      // 未完成的排在前面
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      return 0;
    });

  // 添加开始测试的处理函数
  const handleStartTest = (testId) => {
    navigate(`/test/${testId}`);  // 导航到测试页面
  };

  return (
    <div className="test-bank">
      {/* 筛选区域 */}
      <div className="filter-bar">
        <select
          value={filters.difficulty}
          onChange={(e) => setFilters({...filters, difficulty: e.target.value})}
          className="difficulty-select"
        >
          <option value="全部">全部难度</option>
          <option value="1">★☆☆☆☆ 入门</option>
          <option value="2">★★☆☆☆ 基础</option>
          <option value="3">★★★☆☆ 进阶</option>
          <option value="4">★★★★☆ 挑战</option>
          <option value="5">★★★★★ 难题</option>
        </select>

        <select
          value={filters.completion}
          onChange={(e) => setFilters({...filters, completion: e.target.value})}
          className="completion-select"
        >
          <option value="全部">全部状态</option>
          <option value="已完成">已完成</option>
          <option value="未完成">未完成</option>
        </select>

        <div className="search-box">
          <input
            type="text"
            placeholder="搜索题单..."
            value={filters.searchText}
            onChange={(e) => setFilters({...filters, searchText: e.target.value})}
          />
          <button className="search-button" onClick={() => {}}>
            <FaSearch />
          </button>
        </div>
      </div>

      {/* 题单列表 */}
      <div className="test-sets-container">
        {filteredTestSets.map(test => (
          <div 
            key={test.id} 
            className={`test-card ${test.completed ? 'completed' : ''}`}
          >
            <div className="test-card-header">
              <h3>{test.title}</h3>
              <div className="difficulty-stars">
                {renderStars(test.difficulty)}
              </div>
            </div>
            
            <p className="test-description">{test.description}</p>
            
            <div className="test-meta">
              <span className="question-count">
                题目数量: {test.questionCount}
              </span>
              <span className="duration">
                <FaClock /> {test.duration} 分钟
              </span>
            </div>

            <div className="test-topics">
              {test.topics.map(topic => (
                <span key={topic} className="topic-tag">{topic}</span>
              ))}
            </div>

            {test.completed ? (
              <div className="completion-info">
                已完成测试，分数：{test.score}
              </div>
            ) : (
              <button 
                className="start-test-btn"
                onClick={() => handleStartTest(test.id)}
              >
                开始测试
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TestBank; 