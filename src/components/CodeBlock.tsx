
import { useState } from 'react';

interface CodeBlockProps {
  id?: string;
  tabs?: { language: string; code: string }[];
  language?: string;
  code?: string;
}

// A simple naive syntax highlighter just for aesthetics based on keywords
function highlightSyntax(code: string): string {
  const keywords = ['interface', 'class', 'implements', 'abstract', 'protected', 'private', 'public', 'function', 'echo', 'return', 'if', 'new', 'null', 'string', 'void', 'def', 'pass', 'from', 'import', 'print', 'const', 'let', 'console'];
  
  let highlighted = code
    // Escape HTML first
    .replace(/</g, '&lt;').replace(/>/g, '&gt;')
    // Highlight strings
    .replace(/(["'`])(?:(?=(\\?))\2.)*?\1/g, '__STR__$&__END__')
    // Highlight comments
    .replace(/(\/\/.*)/g, '__CM__$1__END__')
    // Python comments
    .replace(/(#.*)/g, '__CM__$1__END__')
    // Highlight PHP tags and variables
    .replace(/(&lt;\?php)/g, '__KW__$1__END__')
    .replace(/(\$[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*)/g, '__TP__$1__END__')
    // Highlight decorators
    .replace(/(@[a-zA-Z_]+)/g, '__TP__$1__END__');

  // Highlight keywords
  keywords.forEach(kw => {
    const regex = new RegExp(`\\b${kw}\\b`, 'g');
    highlighted = highlighted.replace(regex, `__KW__${kw}__END__`);
  });

  // Convert markers back to span tags
  highlighted = highlighted
    .replace(/__STR__/g, '<span class="str">')
    .replace(/__CM__/g, '<span class="cm">')
    .replace(/__KW__/g, '<span class="kw">')
    .replace(/__TP__/g, '<span class="tp">')
    .replace(/__END__/g, '</span>');

  return highlighted;
}

export function CodeBlock({ id, tabs, language, code }: CodeBlockProps) {
  const [activeTab, setActiveTab] = useState(0);

  const displayTabs = tabs || (language && code ? [{ language, code }] : []);
  if (displayTabs.length === 0) return null;

  const currentTab = displayTabs[activeTab];

  return (
    <div id={id} className="code-container glass-panel">
      <div className="code-header" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>code</span>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {displayTabs.map((tab, index) => (
            <button
              key={tab.language}
              onClick={() => setActiveTab(index)}
              style={{
                background: 'transparent',
                border: 'none',
                color: activeTab === index ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: '0.9rem',
                fontWeight: activeTab === index ? 600 : 400,
                padding: '0.2rem 0.5rem',
                borderBottom: activeTab === index ? '2px solid var(--accent-cyan)' : '2px solid transparent'
              }}
            >
              {tab.language}
            </button>
          ))}
        </div>
      </div>
      <button 
        className="code-copy-btn" 
        onClick={() => navigator.clipboard.writeText(currentTab.code)}
        title="Copiar al portapapeles"
      >
        <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>content_copy</span>
        Copiar
      </button>
      <div className="code-content">
        <pre>
          <code dangerouslySetInnerHTML={{ __html: highlightSyntax(currentTab.code) }} />
        </pre>
      </div>
    </div>
  );
}
