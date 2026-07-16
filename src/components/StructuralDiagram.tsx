type Pattern = 'bridge' | 'proxy';

interface StructuralDiagramProps {
  pattern: Pattern;
}

function UmlClass({
  x,
  y,
  width,
  title,
  stereotype,
  attributes = [],
  methods,
  tone,
}: {
  x: number;
  y: number;
  width: number;
  title: string;
  stereotype?: string;
  attributes?: string[];
  methods: string[];
  tone: 'blue' | 'cyan' | 'purple';
}) {
  const headerHeight = stereotype ? 54 : 42;
  const attributeHeight = attributes.length ? Math.max(34, 18 + attributes.length * 18) : 0;
  const methodHeight = 18 + methods.length * 18;
  const height = headerHeight + attributeHeight + methodHeight;

  return (
    <g className={`uml-class uml-${tone}`}>
      <rect x={x} y={y} width={width} height={height} rx="8" className="uml-class-bg" />
      <path d={`M ${x} ${y + headerHeight} H ${x + width}`} className="uml-divider" />
      {attributes.length > 0 && (
        <path d={`M ${x} ${y + headerHeight + attributeHeight} H ${x + width}`} className="uml-divider" />
      )}
      {stereotype && (
        <text x={x + width / 2} y={y + 18} textAnchor="middle" className="uml-stereotype">
          {stereotype}
        </text>
      )}
      <text
        x={x + width / 2}
        y={y + (stereotype ? 39 : 27)}
        textAnchor="middle"
        className="uml-class-title"
      >
        {title}
      </text>
      {attributes.map((attribute, index) => (
        <text key={attribute} x={x + 12} y={y + headerHeight + 22 + index * 18} className="uml-member">
          {attribute}
        </text>
      ))}
      {methods.map((method, index) => (
        <text
          key={method}
          x={x + 12}
          y={y + headerHeight + attributeHeight + 22 + index * 18}
          className="uml-member"
        >
          {method}
        </text>
      ))}
    </g>
  );
}

function BridgeDiagram() {
  return (
    <svg className="uml-canvas" viewBox="0 0 920 510" role="img" aria-labelledby="bridge-diagram-title bridge-diagram-desc">
      <title id="bridge-diagram-title">Diagrama de clases del patrón Bridge</title>
      <desc id="bridge-diagram-desc">
        Shape mantiene una referencia a Color. Circle y Square extienden Shape; Red y Blue implementan Color.
      </desc>
      <defs>
        <marker id="bridge-inheritance" viewBox="0 0 12 12" refX="11" refY="6" markerWidth="12" markerHeight="12" orient="auto-start-reverse">
          <path d="M 1 1 L 11 6 L 1 11 Z" className="uml-hollow-arrow" />
        </marker>
        <marker id="bridge-association" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="9" markerHeight="9" orient="auto-start-reverse">
          <path d="M 1 1 L 9 5 L 1 9" className="uml-open-arrow" />
        </marker>
        <marker id="bridge-composition" viewBox="0 0 14 10" refX="1" refY="5" markerWidth="14" markerHeight="10" orient="auto">
          <path d="M 1 5 L 7 1 L 13 5 L 7 9 Z" className="uml-composition-diamond" />
        </marker>
      </defs>

      <text x="34" y="34" className="uml-group-label">ABSTRACCIÓN</text>
      <text x="554" y="34" className="uml-group-label">IMPLEMENTACIÓN</text>
      <rect x="18" y="48" width="420" height="442" rx="16" className="uml-group-box uml-group-blue" />
      <rect x="538" y="48" width="364" height="442" rx="16" className="uml-group-box uml-group-cyan" />

      <UmlClass x={112} y={78} width={230} title="Shape" stereotype="«abstract»" attributes={['# color: Color']} methods={['+ Shape(color: Color)', '+ draw(): void']} tone="blue" />
      <UmlClass x={42} y={340} width={170} title="Circle" methods={['+ draw(): void']} tone="purple" />
      <UmlClass x={244} y={340} width={170} title="Square" methods={['+ draw(): void']} tone="purple" />

      <UmlClass x={605} y={78} width={230} title="Color" stereotype="«interface»" methods={['+ apply(): void']} tone="cyan" />
      <UmlClass x={562} y={340} width={145} title="Red" methods={['+ apply(): void']} tone="purple" />
      <UmlClass x={736} y={340} width={145} title="Blue" methods={['+ apply(): void']} tone="purple" />

      <path d="M 127 340 V 283 H 227 V 218" className="uml-relation" markerEnd="url(#bridge-inheritance)" />
      <path d="M 329 340 V 283 H 227" className="uml-relation" />
      <text x="236" y="270" className="uml-relation-label">extiende</text>

      <path d="M 635 340 V 276 H 720 V 194" className="uml-relation uml-dashed" markerEnd="url(#bridge-inheritance)" />
      <path d="M 808 340 V 276 H 720" className="uml-relation uml-dashed" />
      <text x="732" y="263" className="uml-relation-label">implementa</text>

      <path d="M 342 132 H 605" className="uml-relation uml-association" markerStart="url(#bridge-composition)" markerEnd="url(#bridge-association)" />
      <text x="405" y="118" className="uml-relation-label">delegación</text>
      <text x="355" y="151" className="uml-multiplicity">1</text>
      <text x="581" y="151" className="uml-multiplicity">1</text>
    </svg>
  );
}

function ProxyDiagram() {
  return (
    <svg className="uml-canvas" viewBox="0 0 920 500" role="img" aria-labelledby="proxy-diagram-title proxy-diagram-desc">
      <title id="proxy-diagram-title">Diagrama de clases del patrón Proxy</title>
      <desc id="proxy-diagram-desc">
        ImageProxy y HighResImage implementan ImageDisplay. El cliente usa la interfaz y el proxy conserva una referencia al objeto real.
      </desc>
      <defs>
        <marker id="proxy-inheritance" viewBox="0 0 12 12" refX="11" refY="6" markerWidth="12" markerHeight="12" orient="auto-start-reverse">
          <path d="M 1 1 L 11 6 L 1 11 Z" className="uml-hollow-arrow" />
        </marker>
        <marker id="proxy-dependency" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="9" markerHeight="9" orient="auto-start-reverse">
          <path d="M 1 1 L 9 5 L 1 9" className="uml-open-arrow" />
        </marker>
      </defs>

      <text x="34" y="34" className="uml-group-label">ACCESO CONTROLADO</text>
      <rect x="18" y="48" width="884" height="432" rx="16" className="uml-group-box uml-group-purple" />

      <UmlClass x={345} y={74} width={230} title="ImageDisplay" stereotype="«interface»" methods={['+ display(): string']} tone="cyan" />
      <UmlClass x={72} y={310} width={230} title="ImageProxy" attributes={['- realImage: HighResImage?']} methods={['+ display(): string']} tone="blue" />
      <UmlClass x={618} y={310} width={230} title="HighResImage" methods={['+ HighResImage()', '+ display(): string']} tone="purple" />

      <rect x="72" y="95" width="168" height="72" rx="8" className="uml-client-box" />
      <text x="156" y="124" textAnchor="middle" className="uml-stereotype">«actor»</text>
      <text x="156" y="148" textAnchor="middle" className="uml-class-title">Client</text>

      <path d="M 240 131 H 345" className="uml-relation uml-dashed" markerEnd="url(#proxy-dependency)" />
      <text x="258" y="116" className="uml-relation-label">usa</text>

      <path d="M 187 310 V 252 H 460 V 190" className="uml-relation uml-dashed" markerEnd="url(#proxy-inheritance)" />
      <path d="M 733 310 V 252 H 460" className="uml-relation uml-dashed" />
      <text x="475" y="239" className="uml-relation-label">implementa</text>

      <path d="M 302 358 H 618" className="uml-relation uml-association" markerEnd="url(#proxy-dependency)" />
      <text x="405" y="342" className="uml-relation-label">crea / delega</text>
      <text x="315" y="380" className="uml-multiplicity">1</text>
      <text x="584" y="380" className="uml-multiplicity">0..1</text>
    </svg>
  );
}

export function StructuralDiagram({ pattern }: StructuralDiagramProps) {
  const isBridge = pattern === 'bridge';

  return (
    <section id="diagram" className="structural-diagram glass-panel" aria-labelledby={`${pattern}-diagram-heading`}>
      <div className="diagram-section-header">
        <div className="diagram-section-icon" aria-hidden="true">
          <span className="material-symbols-outlined">account_tree</span>
        </div>
        <div>
          <p className="diagram-eyebrow">UML · DIAGRAMA DE CLASES</p>
          <h2 id={`${pattern}-diagram-heading`} className="diagram-section-title">
            Estructura de {isBridge ? 'Bridge' : 'Proxy'}
          </h2>
          <p className="diagram-section-description">
            {isBridge
              ? 'La abstracción y la implementación evolucionan de forma independiente, conectadas mediante composición.'
              : 'El proxy comparte el contrato del sujeto real y administra su creación y acceso de forma transparente.'}
          </p>
        </div>
      </div>

      <div className="diagram-scroll" tabIndex={0} aria-label="Diagrama desplazable horizontalmente">
        {isBridge ? <BridgeDiagram /> : <ProxyDiagram />}
      </div>

      <div className="diagram-legend" aria-label="Leyenda del diagrama">
        <span><i className="legend-diamond" /> Composición / asociación</span>
        <span><i className="legend-line dashed" /> Realización / dependencia</span>
        <span><i className="legend-triangle" /> Herencia o implementación</span>
      </div>
    </section>
  );
}
