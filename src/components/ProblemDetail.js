import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProblemDetail.css';
import { FaArrowLeft, FaCheck, FaTimes } from 'react-icons/fa';

function ProblemDetail() {
  const { problemId } = useParams();
  const navigate = useNavigate();
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);

  // 示例题目数据（这里以第一题为例）
  const problem = {
    id: 1,
    title: '抛物线焦点问题',
    type: '选择题',
    content: '已知抛物线y²=2px(p>0)的焦点为F(2,0)，则该抛物线的准线方程为？',
    options: [
      'x=-2',
      'x=2',
      'x=-1',
      'x=1'
    ],
    correctAnswer: 'x=-2',
    explanation: '解析：对于抛物线y²=2px，其焦点坐标为F(p/2,0)，准线方程为x=-p/2。\n已知F(2,0)，则p=4，所以准线方程为x=-2。'
  };

  // 添加知识点掌握情况数据
  const knowledgePoints = [
    { name: '解析几何', mastery: 85 },
    { name: '抛物线', mastery: 72 },
    { name: '焦点', mastery: 68 }
  ];

  // 添加推荐习题数据
  const recommendedProblems = [
    { id: 11, title: '圆的标准方程应用' },
    { id: 19, title: '椭圆的标准方程' },
    { id: 5, title: '函数的极值问题' }
  ];

  const handleSubmit = () => {
    setShowResult(true);
  };

  const handleTryAgain = () => {
    setShowResult(false);
    setUserAnswer('');
  };

  return (
    <div className="problem-detail">
      <div className="problem-header">
        <button className="back-btn" onClick={() => navigate('/')}>
          <FaArrowLeft /> 返回题库
        </button>
        <span className="problem-type">{problem.type}</span>
      </div>

      <div className="problem-content-wrapper">
        <div className="problem-content">
          <h2>{problem.title}</h2>
          <div className="problem-text">{problem.content}</div>

          {!showResult ? (
            <div className="answer-section">
              <div className="options-container">
                {problem.options.map((option, index) => (
                  <label key={index} className="option-item">
                    <input
                      type="radio"
                      name="answer"
                      value={option}
                      checked={userAnswer === option}
                      onChange={(e) => setUserAnswer(e.target.value)}
                    />
                    <span className="option-text">{option}</span>
                  </label>
                ))}
              </div>
              <button 
                className="submit-btn"
                onClick={handleSubmit}
                disabled={!userAnswer}
              >
                提交答案
              </button>
            </div>
          ) : (
            <div className="result-section">
              <div className={`result ${userAnswer === problem.correctAnswer ? 'correct' : 'incorrect'}`}>
                {userAnswer === problem.correctAnswer ? (
                  <><FaCheck /> 回答正确！</>
                ) : (
                  <><FaTimes /> 回答错误，正确答案是：{problem.correctAnswer}</>
                )}
              </div>
              <div className="explanation">
                <h3>解析</h3>
                <p>{problem.explanation}</p>
              </div>
              <button className="try-again-btn" onClick={handleTryAgain}>
                再做一次
              </button>
            </div>
          )}
        </div>

        {/* 右侧知识点信息栏 */}
        <div className="knowledge-sidebar">
          <div className="knowledge-points">
            <h3>相关知识点</h3>
            {knowledgePoints.map((point, index) => (
              <div key={index} className="knowledge-item">
                <div className="knowledge-header">
                  <span className="knowledge-tag">{point.name}</span>
                  <span className="mastery-score">{point.mastery}分</span>
                </div>
                <div className="mastery-bar">
                  <div 
                    className="mastery-progress" 
                    style={{ width: `${point.mastery}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* 推荐习题部分，仅在显示结果时显示 */}
          {showResult && (
            <div className="recommended-problems">
              <h3>推荐习题</h3>
              <p className="recommend-tip">
                {userAnswer === problem.correctAnswer 
                  ? '巩固练习，建议尝试以下题目：' 
                  : '针对性练习，建议先做以下题目：'}
              </p>
              <div className="problem-list">
                {recommendedProblems.map(prob => (
                  <div 
                    key={prob.id} 
                    className="recommended-item"
                    onClick={() => navigate(`/problem/${prob.id}`)}
                  >
                    <span className="problem-id">#{prob.id}</span>
                    <span className="problem-title">{prob.title}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProblemDetail; 