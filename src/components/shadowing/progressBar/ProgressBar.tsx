import React from 'react'
import './ProgressBar.css'

interface ProgressBarProps {
  endPercentage?: number
  currentPercentage: number
}

export function ProgressBar({ endPercentage = 1, currentPercentage }: ProgressBarProps) {
  const width = (Math.min(currentPercentage, endPercentage) * 100) / endPercentage

  return (
    <div className="border">
      <div className="line" style={{ width: +endPercentage * 100 + '%' }}>
        <div className="highlight" style={{ width: +width + '%' }}/>
      </div>
    </div>
  )
}
