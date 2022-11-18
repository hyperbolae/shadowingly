import React from 'react'
import "./ProgressBar.css"

interface ProgressBarProps {
  endPercentage: number;
  currentPercentage: number;
}

export function ProgressBar(props: ProgressBarProps) {
  const width = (Math.min(props.currentPercentage, props.endPercentage) * 100) / props.endPercentage;

  return (
    <div className="border">
      <div className="line" style={{width:+ props.endPercentage*100+'%'}}>
        <div className="highlight" style={{width:+ width+'%'}}>
          <div className="point"></div>
        </div>
      </div>
    </div>
  )
}
