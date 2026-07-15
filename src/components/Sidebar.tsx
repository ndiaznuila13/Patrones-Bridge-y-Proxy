export function Sidebar() {
  return (
    <aside className="sidebar">
      <div style={{ marginBottom: 'var(--space-lg)' }}>
        <h2 className="title-heavy" style={{ fontSize: '1.75rem' }}>Secciones</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.25rem' }}>Arquitectura de Software</p>
      </div>
      
      <nav className="sidebar-nav">
        <a href="#overview" className="sidebar-link active">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
          Visión General
        </a>
        <a href="#problem" className="sidebar-link">
          <span className="material-symbols-outlined">error_outline</span>
          El Problema
        </a>
        <a href="#solution" className="sidebar-link">
          <span className="material-symbols-outlined">lightbulb</span>
          La Solución
        </a>
        <a href="#diagram" className="sidebar-link">
          <span className="material-symbols-outlined">schema</span>
          Diagrama
        </a>
        <a href="#implementation" className="sidebar-link">
          <span className="material-symbols-outlined">code</span>
          Implementación
        </a>
        <a href="#cases" className="sidebar-link">
          <span className="material-symbols-outlined">business_center</span>
          Casos de Estudio
        </a>
      </nav>
    </aside>
  );
}
