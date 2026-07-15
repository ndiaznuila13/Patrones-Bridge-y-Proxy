import type { ReactNode } from 'react';

interface PatternCardProps {
  id?: string;
  type: 'problem' | 'solution' | 'info';
  title: string;
  description: ReactNode;
  diagram?: ReactNode;
}

export function PatternCard({ id, type, title, description, diagram }: PatternCardProps) {
  let iconClass = 'info';
  let iconName = 'info';
  
  if (type === 'problem') {
    iconClass = 'error';
    iconName = 'error_outline';
  } else if (type === 'solution') {
    iconClass = 'success';
    iconName = 'lightbulb';
  } else {
    iconClass = 'info-icon';
    iconName = 'info';
  }
  
  return (
    <div id={id} className="card glass-panel">
      <div className="card-header">
        <div className={`card-icon ${iconClass}`}>
          <span className="material-symbols-outlined">
            {iconName}
          </span>
        </div>
        <h3 className="card-title">{title}</h3>
      </div>
      <div className="card-body" style={{ lineHeight: '1.7' }}>{description}</div>
      
      {diagram && (
        <div className="diagram-box">
          {diagram}
        </div>
      )}
    </div>
  );
}
