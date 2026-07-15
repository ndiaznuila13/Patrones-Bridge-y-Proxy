import { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { PatternCard } from './components/PatternCard';
import { CodeBlock } from './components/CodeBlock';

const bridgeCode = `from abc import ABC, abstractmethod

class Color(ABC):
    @abstractmethod
    def apply(self): pass

class Red(Color):
    def apply(self): print("Rojo")

class Blue(Color):
    def apply(self): print("Azul")

class Shape(ABC):
    def __init__(self, color: Color): self.color = color
    @abstractmethod
    def draw(self): pass

class Circle(Shape):
    def draw(self): print("Círculo de", end=" "); self.color.apply()

class Square(Shape):
    def draw(self): print("Cuadrado de", end=" "); self.color.apply()`;

const proxyCode = `<?php

// 1. INTERFAZ COMÚN: Ambos (el objeto real y el proxy) deben implementarla
interface ImageDisplay {
    public function display(): string;
}

// 2. EL SUJETO REAL: El objeto pesado o complejo que queremos proteger/retrasar
class HighResImage implements ImageDisplay {
    public function __construct() {
        // Simula una inicialización muy pesada (ej: descargar la imagen)
        echo "Cargando imagen 4K desde el disco...\\n";
    }
    
    public function display(): string {
        return "Renderizando imagen de alta resolución";
    }
}

// 3. EL PROXY: Actúa como intermediario controlando el acceso
class ImageProxy implements ImageDisplay {
    // Guarda la referencia al objeto real, inicializada en null
    private ?HighResImage $realImage = null;
    
    public function display(): string {
        // Lazy Loading (Carga Perezosa): Instancia el objeto real SOLO si es necesario
        if ($this->realImage === null) {
            $this->realImage = new HighResImage();
        }
        
        echo "Proxy: Registrando acceso a la visualización de la imagen.\\n";
        
        // Delega la petición final al objeto real
        return $this->realImage->display();
    }
}

// Uso
$proxy = new ImageProxy();
// La carga pesada ocurre SOLO aquí (al llamar a display), no al crear el proxy
echo $proxy->display();
?>`;

function BridgePattern() {
  return (
    <div id="overview" className="animate-fade-in">
      <div className="grid grid-cols-2 gap-xl">
        <PatternCard 
          id="problem"
          type="problem"
          title="📌 El problema"
          description={
            <>
              Imagina que tienes una jerarquía de clases para formas geométricas (Círculo, Cuadrado) y otra para colores (Rojo, Azul). Si intentas combinarlas directamente, terminas con clases como CírculoRojo, CírculoAzul, CuadradoRojo, CuadradoAzul… y así sucesivamente.<br/><br/>
              <b>El dolor:</b> la explosión de clases cuando quieres añadir nuevas formas o nuevos colores.
            </>
          }
        />
        <PatternCard 
          type="solution"
          title="🛠️ La solución"
          description={
            <>
              El patrón Bridge separa la abstracción (Forma) de su implementación (Color). En vez de heredar todas las combinaciones, se crea un puente entre ambas jerarquías.
            </>
          }
          diagram={
            <div id="diagram">
              <div className="diagram-node primary">Forma<br/><small>(Abstracción)</small></div>
              <span className="material-symbols-outlined diagram-arrow">arrow_forward</span>
              <div className="diagram-node secondary">Color<br/><small>(Implementación)</small></div>
            </div>
          }
        />
      </div>
      
      <div id="cases" className="grid grid-cols-2 gap-xl mt-xl">
        <PatternCard 
          type="info"
          title="✅ Cuándo SÍ / ❌ Cuándo NO"
          description={
            <>
              <b>Cuándo SÍ:</b>
              <ul style={{ paddingLeft: '1.2rem', marginBottom: '1rem', listStyleType: 'disc' }}>
                <li>Cuando tienes dos dimensiones de variación (ej. formas y colores).</li>
                <li>Cuando quieres evitar explosión de clases combinadas.</li>
                <li>Cuando necesitas cambiar la implementación en tiempo de ejecución.</li>
              </ul>
              <b>Cuándo NO:</b>
              <ul style={{ paddingLeft: '1.2rem', listStyleType: 'disc' }}>
                <li>Si solo hay una dimensión de variación (ej. solo formas).</li>
                <li>Si la jerarquía es pequeña y estable.</li>
                <li>Si la abstracción y la implementación están fuertemente acopladas y no se prevé cambio.</li>
              </ul>
            </>
          }
        />
        <PatternCard 
          type="info"
          title="🌍 Ejemplo real"
          description={
            <>
              En <b>Laravel</b>, el sistema de Log usa el patrón Bridge:
              <ul style={{ paddingLeft: '1.2rem', marginTop: '0.5rem', marginBottom: '0.5rem', listStyleType: 'disc' }}>
                <li>La abstracción es el <b>Logger</b> (interfaz común).</li>
                <li>La implementación son los distintos drivers (<b>Monolog</b>, <b>StackDriver</b>, etc.).</li>
              </ul>
              Esto permite cambiar el backend de logging sin modificar el código que usa el logger.
            </>
          }
        />
      </div>
      <div className="mt-xl">
        <CodeBlock id="implementation" language="Python" code={bridgeCode} />
      </div>
    </div>
  );
}

function ProxyPattern() {
  return (
    <div id="overview" className="animate-fade-in">
      <div className="grid grid-cols-2 gap-xl">
        <PatternCard 
          id="problem"
          type="problem"
          title="El Problema"
          description="Tienes un objeto masivo que consume recursos significativos del sistema (por ejemplo, una imagen pesada en 4K o un modelo 3D grande). Lo necesitas ocasionalmente, pero instanciarlo por adelantado degrada el tiempo de inicio de la aplicación o el uso de memoria."
        />
        <PatternCard 
          type="solution"
          title="La Solución"
          description="Crea un sustituto (Proxy) que implemente la misma interfaz que el objeto real. El Proxy controla el acceso, instanciando el objeto real solo cuando es estrictamente necesario (Carga Diferida o Lazy Loading)."
          diagram={
            <div id="diagram">
              <div className="diagram-node primary" style={{borderStyle: 'dashed'}}>Cliente</div>
              <span className="material-symbols-outlined diagram-arrow">arrow_forward</span>
              <div className="diagram-node secondary">Proxy</div>
              <span className="material-symbols-outlined diagram-arrow">arrow_forward</span>
              <div className="diagram-node tertiary">SujetoReal</div>
            </div>
          }
        />
      </div>
      <div id="cases"></div>
      <CodeBlock id="implementation" language="PHP" code={proxyCode} />
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState<'bridge' | 'proxy'>('bridge');

  return (
    <>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="main-layout container">
        <Sidebar />
        
        <main className="main-content">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>
            <h1 className="title-heavy" style={{ fontSize: '3.5rem', marginBottom: 'var(--space-sm)' }}>
              Patrones Estructurales
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem' }}>
              Dominando la composición de objetos y sus relaciones.
            </p>
          </div>
          
          {activeTab === 'bridge' ? <BridgePattern /> : <ProxyPattern />}
          
          <Footer />
        </main>
      </div>
    </>
  );
}

export default App;
