export function Sidebar() {
  return (
    <aside className="sidebar">
      <div style={{ marginBottom: 'var(--space-lg)' }}>
        <h2 className="title-heavy" style={{ fontSize: '1.75rem' }}>Secciones</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.25rem' }}>Arquitectura de Software</p>
      </div>
      
      <nav className="sidebar-nav">
        <a href="#problem" className="sidebar-link active">
          <span className="material-symbols-outlined">error_outline</span>
          El Problema
        </a>
        <a href="#solution" className="sidebar-link">
          <span className="material-symbols-outlined">lightbulb</span>
          La Solución
        </a>
        <a href="#code" className="sidebar-link">
          <span className="material-symbols-outlined">code</span>
          Código Mínimo
        </a>
        <a href="#when-to-use" className="sidebar-link">
          <span className="material-symbols-outlined">rule</span>
          Cuándo sí y cuándo no
        </a>
        <a href="#real-example" className="sidebar-link">
          <span className="material-symbols-outlined">business_center</span>
          Ejemplo Real
        </a>
        <a href="#video" className="sidebar-link">
          <span className="material-symbols-outlined">play_circle</span>
          Video Explicativo
        </a>
      </nav>
    </aside>
  );
}
