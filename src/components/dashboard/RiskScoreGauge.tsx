import React from 'react';

interface RiskScoreGaugeProps {
  score: number;
}

const RiskScoreGauge: React.FC<RiskScoreGaugeProps> = ({ score }) => {
  // Normalize score to a 0-100 range if it's not already
  const normalizedScore = Math.min(Math.max(score, 0), 100);
  
  // Calculate the rotation angle (0 is good, 180 is bad)
  const angle = (normalizedScore / 100) * 180;
  
  // Determine color based on score
  const getColor = () => {
    if (normalizedScore <= 30) return '#10B981'; // Green - low risk
    if (normalizedScore <= 70) return '#FBBF24'; // Yellow - medium risk
    return '#EF4444'; // Red - high risk
  };

  return (
    <div className="relative w-14 h-14">
      {/* Gauge background */}
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <path
          d="M10,60 A50,50 0 1,1 110,60"
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="10"
          strokeLinecap="round"
        />
        
        {/* Colored arc based on score */}
        <path
          d="M10,60 A50,50 0 1,1 110,60"
          fill="none"
          stroke={getColor()}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray="157"
          strokeDashoffset={157 - (157 * normalizedScore / 100)}
        />
        
        {/* Needle */}
        <line
          x1="60"
          y1="60"
          x2="60"
          y2="20"
          stroke="#374151"
          strokeWidth="2"
          transform={`rotate(${angle}, 60, 60)`}
          strokeLinecap="round"
        />
        
        {/* Center point */}
        <circle cx="60" cy="60" r="5" fill="#374151" />
      </svg>
    </div>
  );
};

export default RiskScoreGauge;