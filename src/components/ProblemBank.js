import React, { useState } from 'react';
import './ProblemBank.css';
import { FaSearch, FaStar, FaRegStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function ProblemBank() {
  const navigate = useNavigate();
  
  // 知识点数据
  const topics = [
    { name: '三角函数', count: 524 },
    { name: '数列', count: 286 },
    { name: '概率统计', count: 198 },
    { name: '立体几何', count: 474 },
    { name: '解析几何', count: 407 },
    { name: '函数与导数', count: 368 },
    { name: '不等式', count: 224 },
    { name: '数系', count: 156 },
    { name: '向量', count: 249 },
    { name: '集合', count: 183 },
    { name: '复数', count: 224 },
    { name: '平面几何', count: 337 }
  ];

  // 题目数据
  const problems = [
    {
      id: 1,
      title: '抛物线焦点问题',
      type: '解答题',
      status: '正确',
      difficulty: 3,
      tags: ['解析几何', '二次函数']
    },
    {
      id: 2,
      title: '等差数列求和',
      type: '填空题',
      status: '正确',
      difficulty: 2,
      tags: ['数列', '代数']
    },
    {
      id: 3,
      title: '概率的基本计算',
      type: '选择题',
      status: '错误',
      difficulty: 3,
      tags: ['概率', '统计']
    },
    {
      id: 4,
      title: '复数的加法运算',
      type: '选择题',
      status: '正确',
      difficulty: 1,
      tags: ['复数', '代数']
    },
    {
      id: 5,
      title: '函数的极值问题',
      type: '解答题',
      status: '暂无',
      difficulty: 4,
      tags: ['函数', '微积分']
    },
    {
      id: 6,
      title: '矩阵的乘法',
      type: '填空题',
      status: '错误',
      difficulty: 3,
      tags: ['矩阵', '线性代数']
    },
    {
      id: 7,
      title: '立体几何中的体积',
      type: '解答题',
      status: '正确',
      difficulty: 2,
      tags: ['立体几何', '三维空间']
    },
    {
      id: 8,
      title: '不等式的解法',
      type: '填空题',
      status: '暂无',
      difficulty: 3,
      tags: ['不等式', '代数']
    },
    {
      id: 9,
      title: '三角函数的图像',
      type: '选择题',
      status: '正确',
      difficulty: 3,
      tags: ['三角函数', '图像']
    },
    {
      id: 10,
      title: '导数的应用',
      type: '解答题',
      status: '错误',
      difficulty: 4,
      tags: ['微积分', '导数']
    },
    {
      id: 11,
      title: '圆的标准方程应用',
      type: '解答题',
      status: '暂无',
      difficulty: 3,
      tags: ['解析几何', '圆']
    },
    {
      id: 12,
      title: '三角函数诱导公式',
      type: '选择题',
      status: '正确',
      difficulty: 2,
      tags: ['三角函数', '基础题']
    },
    {
      id: 13,
      title: '数列求和方法',
      type: '填空题',
      status: '错误',
      difficulty: 4,
      tags: ['数列', '求和']
    },
    {
      id: 14,
      title: '立体几何体积计算',
      type: '解答题',
      status: '暂无',
      difficulty: 3,
      tags: ['立体几何', '计算题']
    },
    {
      id: 15,
      title: '导数应用最值问题',
      type: '解答题',
      status: '正确',
      difficulty: 4,
      tags: ['导数', '应用题']
    },
    {
      id: 16,
      title: '平面向量基本定理',
      type: '选择题',
      status: '暂无',
      difficulty: 3,
      tags: ['向量', '基础题']
    },
    {
      id: 17,
      title: '概率计算基础',
      type: '填空题',
      status: '正确',
      difficulty: 2,
      tags: ['概率', '基础题']
    },
    {
      id: 18,
      title: '不等式证明',
      type: '解答题',
      status: '错误',
      difficulty: 5,
      tags: ['不等式', '证明题']
    },
    {
      id: 19,
      title: '椭圆的标准方程',
      type: '选择题',
      status: '暂无',
      difficulty: 3,
      tags: ['解析几何', '圆锥曲线']
    },
    {
      id: 20,
      title: '复数的三角形式',
      type: '填空题',
      status: '正确',
      difficulty: 4,
      tags: ['复数', '运算']
    },
    {
      id: 21,
      title: '数学归纳法证明',
      type: '解答题',
      status: '暂无',
      difficulty: 4,
      tags: ['归纳法', '证明题']
    },
    {
      id: 22,
      title: '函数图像变换',
      type: '选择题',
      status: '正确',
      difficulty: 3,
      tags: ['函数', '图像']
    },
    {
      id: 23,
      title: '三角恒等变换',
      type: '填空题',
      status: '错误',
      difficulty: 3,
      tags: ['三角函数', '变换']
    },
    {
      id: 24,
      title: '空间向量应用',
      type: '解答题',
      status: '暂无',
      difficulty: 4,
      tags: ['向量', '立体几何']
    }
  ];

  // 筛选状态
  const [filters, setFilters] = useState({
    type: '全部',
    difficulty: '全部',
    status: '全部',
    searchText: ''
  });

  // 添加选中的知识点状态
  const [selectedTopics, setSelectedTopics] = useState([]);
  
  // 修改 topics 的点击处理
  const handleTopicClick = (topicName) => {
    setSelectedTopics(prev => {
      if (prev.includes(topicName)) {
        // 如果已选中，则取消选中
        return prev.filter(t => t !== topicName);
      } else {
        // 如果未选中，则添加到选中列表
        return [...prev, topicName];
      }
    });
  };

  // 根据筛选条件过滤题目
  const filteredProblems = problems.filter(problem => {
    // 知识点筛选
    const topicMatch = selectedTopics.length === 0 || 
      problem.tags.some(tag => selectedTopics.includes(tag));

    // 题型筛选
    const typeMatch = filters.type === '全部' || 
      problem.type === filters.type;

    // 难度筛选
    const difficultyMatch = filters.difficulty === '全部' || 
      problem.difficulty === Number(filters.difficulty);

    // 状态筛选
    const statusMatch = filters.status === '全部' || 
      problem.status === filters.status;

    // 搜索文本筛选
    const searchMatch = filters.searchText === '' || 
      problem.title.toLowerCase().includes(filters.searchText.toLowerCase()) ||
      problem.tags.some(tag => 
        tag.toLowerCase().includes(filters.searchText.toLowerCase())
      ) ||
      problem.type.toLowerCase().includes(filters.searchText.toLowerCase());

    return topicMatch && typeMatch && difficultyMatch && statusMatch && searchMatch;
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

  // 处理搜索按钮点击
  const handleSearch = () => {
    // 触发搜索，实际上由于我们使用的是受控组件，这里可以留空
    // 或者可以添加一些额外的搜索相关逻辑
  };

  // 添加点击处理函数
  const handleProblemClick = (problemId) => {
    navigate(`/problem/${problemId}`);
  };

  return (
    <div className="problem-bank">
      {/* 知识点标签区域 */}
      <div className="topics-container">
        {topics.map(topic => (
          <div 
            key={topic.name} 
            className={`topic-tag ${selectedTopics.includes(topic.name) ? 'selected' : ''}`}
            onClick={() => handleTopicClick(topic.name)}
          >
            <span className="topic-name">{topic.name}</span>
            <span className="topic-count">{topic.count}</span>
          </div>
        ))}
      </div>

      {/* 筛选区域 */}
      <div className="filter-bar">
        <select 
          value={filters.type}
          onChange={(e) => setFilters({...filters, type: e.target.value})}
        >
          <option value="全部">全部题型</option>
          <option value="选择题">选择题</option>
          <option value="填空题">填空题</option>
          <option value="解答题">解答题</option>
        </select>

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
          value={filters.status}
          onChange={(e) => setFilters({...filters, status: e.target.value})}
          className="status-select"
        >
          <option value="全部">全部状态</option>
          <option value="正确">已做对</option>
          <option value="错误">已做错</option>
          <option value="暂无">暂未做</option>
        </select>

        <div className="search-box">
          <input
            type="text"
            placeholder="输入搜索题目..."
            value={filters.searchText}
            onChange={(e) => setFilters({...filters, searchText: e.target.value})}
          />
          <button className="search-button" onClick={handleSearch}>
            <FaSearch />
          </button>
        </div>
      </div>

      {/* 题目列表 */}
      <div className="problems-table-container">
        <table className="problems-table">
          <thead>
            <tr>
              <th>题号</th>
              <th>题目</th>
              <th>难度</th>
              <th>题目类型</th>
              <th>标签</th>
              <th>状态</th>
            </tr>
          </thead>
          <tbody>
            {filteredProblems.map(problem => (
              <tr key={problem.id} onClick={() => handleProblemClick(problem.id)}>
                <td>{problem.id}</td>
                <td>{problem.title}</td>
                <td>{renderStars(problem.difficulty)}</td>
                <td>{problem.type}</td>
                <td>
                  {problem.tags.map(tag => (
                    <span key={tag} className="problem-tag">{tag}</span>
                  ))}
                </td>
                <td>
                  <span className={`status-badge ${problem.status}`}>
                    {problem.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProblemBank; 