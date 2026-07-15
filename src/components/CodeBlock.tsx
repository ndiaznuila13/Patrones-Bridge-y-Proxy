


interface CodeBlockProps {
  id?: string;
  language: string;
  code: string;
}

export function CodeBlock({ id, language, code }: CodeBlockProps) {
  return (
    <div id={id} className="code-container glass-panel">
      <div className="code-header">
        <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>code</span>
        Implementación en {language}
      </div>
      <button 
        className="code-copy-btn" 
        onClick={() => navigator.clipboard.writeText(code)}
        title="Copiar al portapapeles"
      >
        <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>content_copy</span>
        Copiar
      </button>
      <div className="code-content">
        <pre>
          <code dangerouslySetInnerHTML={{ __html: highlightSyntax(code) }} />
        </pre>
      </div>
    </div>
  );
}

// A simple naive syntax highlighter just for aesthetics based on keywords
function highlightSyntax(code: string): string {
  const keywords = ['interface', 'class', 'implements', 'abstract', 'protected', 'private', 'public', 'function', 'echo', 'return', 'if', 'new', 'null', 'string', 'void', 'def', 'pass', 'from', 'import', 'print'];
  
  let highlighted = code
    // Escape HTML first
    .replace(/</g, '&lt;').replace(/>/g, '&gt;')
    // Highlight strings
    .replace(/(["'`])(?:(?=(\\?))\2.)*?\1/g, '@@@str@@@$&@@@end@@@')
    // Highlight comments
    .replace(/(\/\/.*)/g, '@@@cm@@@$1@@@end@@@')
    // Highlight PHP tags and variables
    .replace(/(&lt;\?php)/g, '@@@kw@@@$1@@@end@@@')
    .replace(/(\$[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*)/g, '@@@tp@@@$1@@@end@@@');

  // Highlight keywords
  keywords.forEach(kw => {
    const regex = new RegExp(`\\b${kw}\\b`, 'g');
    highlighted = highlighted.replace(regex, `@@@kw@@@${kw}@@@end@@@`);
  });

  // Convert markers back to span tags
  highlighted = highlighted
    .replace(/@@@str@@@/g, '<span class="str">')
    .replace(/@@@cm@@@/g, '<span class="cm">')
    .replace(/@@@kw@@@/g, '<span class="kw">')
    .replace(/@@@tp@@@/g, '<span class="tp">')
    .replace(/@@@end@@@/g, '</span>');

  return highlighted;
}
