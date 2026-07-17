import { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { PatternCard } from './components/PatternCard';
import { CodeBlock } from './components/CodeBlock';
import { StructuralDiagram } from './components/StructuralDiagram';

const bridgeCodeTS = `interface Color {
    apply(): void; // Contrato común para las implementaciones de color
}

class Red implements Color {
    apply(): void { console.log("Rojo"); }
}

class Blue implements Color {
    apply(): void { console.log("Azul"); }
}

abstract class Shape {
    // Se agrega esta referencia para conectar la abstracción con su implementación.
    // Esto es lo que forma el "Puente", evitando la herencia múltiple.
    protected color: Color;
    
    constructor(color: Color) {
        this.color = color; // Se inyecta la implementación dinámicamente
    }
    
    abstract draw(): void;
}

class Circle extends Shape {
    draw(): void {
        console.log("Círculo de ");
        // Se delega el trabajo de colorear al objeto inyectado
        this.color.apply();
    }
}

class Square extends Shape {
    draw(): void {
        console.log("Cuadrado de ");
        // Se delega el trabajo de colorear al objeto inyectado
        this.color.apply();
    }
}

// Se combinan ambas piezas en tiempo de ejecución. 
// Evitamos crear clases como "RedCircle" o "BlueSquare".
const redCircle = new Circle(new Red());
redCircle.draw();`;

const bridgeCodePHP = `<?php

interface Color {
    public function apply(): void; // Contrato común para las implementaciones de color
}

class Red implements Color {
    public function apply(): void {
        echo "Rojo\\n";
    }
}

class Blue implements Color {
    public function apply(): void {
        echo "Azul\\n";
    }
}

abstract class Shape {
    // Se agrega esta referencia para conectar la abstracción con su implementación.
    // Esto es lo que forma el "Puente", evitando la herencia múltiple.
    protected Color $color;
    
    public function __construct(Color $color) {
        $this->color = $color; // Se inyecta la implementación dinámicamente
    }
    
    abstract public function draw(): void;
}

class Circle extends Shape {
    public function draw(): void {
        echo "Círculo de ";
        // Se delega el trabajo de colorear al objeto inyectado
        $this->color->apply();
    }
}

class Square extends Shape {
    public function draw(): void {
        echo "Cuadrado de ";
        // Se delega el trabajo de colorear al objeto inyectado
        $this->color->apply();
    }
}

// Se combinan ambas piezas en tiempo de ejecución. 
// Evitamos crear clases como "RedCircle" o "BlueSquare".
$redCircle = new Circle(new Red());
$redCircle->draw();
?>`;

const bridgeCodePY = `from abc import ABC, abstractmethod

class Color(ABC):
    @abstractmethod
    def apply(self): pass # Contrato común para las implementaciones de color

class Red(Color):
    def apply(self): print("Rojo")

class Blue(Color):
    def apply(self): print("Azul")

class Shape(ABC):
    def __init__(self, color: Color): 
        # Se agrega esta referencia para conectar la abstracción con su implementación.
        # Esto es lo que forma el "Puente", evitando la herencia múltiple.
        self.color = color # Se inyecta la implementación dinámicamente
        
    @abstractmethod
    def draw(self): pass

class Circle(Shape):
    def draw(self): 
        print("Círculo de", end=" ")
        # Se delega el trabajo de colorear al objeto inyectado
        self.color.apply()

class Square(Shape):
    def draw(self): 
        print("Cuadrado de", end=" ")
        # Se delega el trabajo de colorear al objeto inyectado
        self.color.apply()

# Se combinan ambas piezas en tiempo de ejecución. 
# Evitamos crear clases como "RedCircle" o "BlueSquare".
red_circle = Circle(Red())
red_circle.draw()`;

const proxyCodeTS = `interface ImageDisplay {
    display(): string; // Interfaz común para que el cliente no distinga entre Real y Proxy
}

class HighResImage implements ImageDisplay {
    constructor() {
        // Se simula un proceso muy costoso (ej. leer disco o base de datos)
        // Se busca evitar que este código se ejecute si no es necesario.
        console.log("Cargando imagen 4K desde el disco...");
    }
    display(): string {
        return "Renderizando imagen de alta resolución";
    }
}

class ImageProxy implements ImageDisplay {
    // Se inicializa en null para no consumir memoria al crear el proxy
    private realImage: HighResImage | null = null;
    
    display(): string {
        // Lazy Loading: Se comprueba si el objeto ya existe. 
        // Si no, se instancia justo en el momento exacto en que se necesita.
        if (this.realImage === null) {
            this.realImage = new HighResImage();
        }
        console.log("Proxy: Registrando acceso a la visualización de la imagen.");
        return this.realImage.display();
    }
}

const proxy = new ImageProxy();
// El proceso costoso del constructor de HighResImage solo se ejecuta en esta línea.
console.log(proxy.display());`;

const proxyCodePHP = `<?php

interface ImageDisplay {
    public function display(): string; // Interfaz común para que el cliente no distinga entre Real y Proxy
}

class HighResImage implements ImageDisplay {
    public function __construct() {
        // Se simula un proceso muy costoso (ej. leer disco o base de datos)
        // Se busca evitar que este código se ejecute si no es necesario.
        echo "Cargando imagen 4K desde el disco...\\n";
    }
    
    public function display(): string {
        return "Renderizando imagen de alta resolución";
    }
}

class ImageProxy implements ImageDisplay {
    // Se inicializa en null para no consumir memoria al crear el proxy
    private ?HighResImage $realImage = null;
    
    public function display(): string {
        // Lazy Loading: Se comprueba si el objeto ya existe. 
        // Si no, se instancia justo en el momento exacto en que se necesita.
        if ($this->realImage === null) {
            $this->realImage = new HighResImage();
        }
        echo "Proxy: Registrando acceso a la visualización de la imagen.\\n";
        return $this->realImage->display();
    }
}

$proxy = new ImageProxy();
// El proceso costoso del constructor de HighResImage solo se ejecuta en esta línea.
echo $proxy->display();
?>`;

const proxyCodePY = `from abc import ABC, abstractmethod

class ImageDisplay(ABC):
    @abstractmethod
    def display(self) -> str: pass # Interfaz común para que el cliente no distinga entre Real y Proxy

class HighResImage(ImageDisplay):
    def __init__(self):
        # Se simula un proceso muy costoso (ej. leer disco o base de datos)
        # Se busca evitar que este código se ejecute si no es necesario.
        print("Cargando imagen 4K desde el disco...")
        
    def display(self) -> str:
        return "Renderizando imagen de alta resolución"

class ImageProxy(ImageDisplay):
    def __init__(self):
        # Se inicializa en None para no consumir memoria al crear el proxy
        self._real_image = None
        
    def display(self) -> str:
        # Lazy Loading: Se comprueba si el objeto ya existe. 
        # Si no, se instancia justo en el momento exacto en que se necesita.
        if self._real_image is None:
            self._real_image = HighResImage()
        print("Proxy: Registrando acceso a la visualización de la imagen.")
        return self._real_image.display()

proxy = ImageProxy()
# El proceso costoso de inicializar HighResImage solo se ejecuta en esta línea.
print(proxy.display())`;

function BridgePattern() {
  return (
    <div className="animate-fade-in flex flex-col gap-xl">
      <PatternCard 
        id="problem"
        type="problem"
        title="El problema"
        description={
          <>
            Imagina que tienes una jerarquía de clases para formas geométricas (Círculo, Cuadrado) y otra para colores (Rojo, Azul). Si intentas combinarlas directamente, terminas con clases como CírculoRojo, CírculoAzul, CuadradoRojo, CuadradoAzul… y así sucesivamente.<br/><br/>
            <b>El dolor:</b> la explosión de clases cuando quieres añadir nuevas formas o nuevos colores.
          </>
        }
      />
      <PatternCard 
        id="solution"
        type="solution"
        title="La solución"
        description={
          <>
            El patrón Bridge separa la abstracción (Forma) de su implementación (Color). En vez de heredar todas las combinaciones, se crea un puente entre ambas jerarquías.
          </>
        }
      />
      
      <StructuralDiagram pattern="bridge" />
      
      <div id="code" className="flex flex-col gap-md">
        <PatternCard 
          type="info"
          title="Anatomía del Código"
          description={
            <>
              El código de implementación demuestra la esencia del patrón Bridge utilizando tres componentes clave:
              <ul style={{ paddingLeft: '1.2rem', marginTop: '0.5rem', listStyleType: 'disc' }}>
                <li><b>La Implementación (Color):</b> Una interfaz independiente que define las variaciones. Es esencial porque separa esta dimensión del objeto principal.</li>
                <li><b>La Abstracción (Shape):</b> Contiene una referencia hacia la implementación (este es "el puente"). Es vital porque usa <i>composición</i> en lugar de herencia, delegando la tarea de color en lugar de definirla internamente.</li>
                <li><b>Composición dinámica:</b> Al instanciar <code>new Circle(new Red())</code> unimos ambas piezas en tiempo de ejecución. Esto permite crear 100 formas y 100 colores sin programar 10,000 clases combinadas, solo 200.</li>
              </ul>
            </>
          }
        />
        <CodeBlock 
          tabs={[
            { language: 'TypeScript', code: bridgeCodeTS },
            { language: 'PHP', code: bridgeCodePHP },
            { language: 'Python', code: bridgeCodePY }
          ]} 
        />
      </div>

      <PatternCard 
        id="when-to-use"
        type="info"
        title="Cuándo sí y cuándo no"
        description={
          <>
            <b>Cuándo SÍ:</b>
            <ul style={{ paddingLeft: '1.2rem', marginBottom: '1rem', listStyleType: 'disc' }}>
              <li>Cuando tienes dos dimensiones de variación (ej. formas y colores).</li>
              <li>Cuando quieres evitar la explosión de subclases combinadas.</li>
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
        id="real-example"
        type="info"
        title="Ejemplo real"
        description={
          <>
            En <b>Laravel</b>, el sistema de Log usa el patrón Bridge:
            <ul style={{ paddingLeft: '1.2rem', marginTop: '0.5rem', marginBottom: '0.5rem', listStyleType: 'disc' }}>
              <li>La abstracción es el <b>Logger</b> (interfaz común).</li>
              <li>La implementación son los distintos drivers (<b>Monolog</b>, <b>StackDriver</b>, etc.).</li>
            </ul>
            Esto permite cambiar el backend de logging sin modificar el código que usa el logger en la aplicación.
          </>
        }
      />
    </div>
  );
}

function ProxyPattern() {
  return (
    <div className="animate-fade-in flex flex-col gap-xl">
      <PatternCard 
        id="problem"
        type="problem"
        title="El problema"
        description={
          <>
            Imagina que tienes un objeto muy pesado de crear: una imagen en 4K, un modelo 3D, una conexión a una base de datos. Solo lo usas de vez en cuando, pero si lo creas al arrancar la aplicación, pagas todo su costo desde el inicio: la app tarda más en abrir y la memoria queda ocupada por algo que quizá nunca se use.<br/><br/>
            <b>El dolor:</b> pagar por adelantado el costo de un objeto caro que tal vez ni siquiera vas a necesitar.
          </>
        }
      />
      <PatternCard 
        id="solution"
        type="solution"
        title="La solución"
        description="La idea es simple: en vez de darle al cliente el objeto real, le das un sustituto que se ve idéntico por fuera — el Proxy. Como ambos implementan la misma interfaz, el cliente no nota la diferencia. Por dentro, el Proxy es el portero: recibe las llamadas y solo crea el objeto real en el momento exacto en que de verdad se necesita. A eso se le llama carga diferida (Lazy Loading)."
      />
      
      <StructuralDiagram pattern="proxy" />
      
      <div id="code" className="flex flex-col gap-md">
        <PatternCard 
          type="info"
          title="Anatomía del Código"
          description={
            <>
              El ejemplo se arma con tres piezas, y cada una tiene su porqué:
              <ul style={{ paddingLeft: '1.2rem', marginTop: '0.5rem', listStyleType: 'disc' }}>
                <li><b>La interfaz <code>ImageDisplay</code> es el disfraz:</b> como el Proxy y el objeto real la comparten, el cliente puede usar cualquiera de los dos sin enterarse de cuál le tocó. Sin ella no serían intercambiables y el truco no funciona.</li>
                <li><b><code>HighResImage</code> es el objeto pesado de verdad.</b> Todo su costo vive en el constructor (aquí simula leer una imagen 4K del disco), y justo ese costo es el que no queremos pagar antes de tiempo.</li>
                <li><b><code>ImageProxy</code> es el portero.</b> Arranca con la referencia en <code>null</code> —o sea, sin gastar nada— y recién crea la <code>HighResImage</code> la primera vez que alguien llama a <code>display()</code>. De paso registra cada acceso en el log: código extra que no obligó a tocar ni al cliente ni al objeto real.</li>
              </ul>
            </>
          }
        />
        <CodeBlock 
          tabs={[
            { language: 'TypeScript', code: proxyCodeTS },
            { language: 'PHP', code: proxyCodePHP },
            { language: 'Python', code: proxyCodePY }
          ]} 
        />
      </div>

      <PatternCard 
        id="when-to-use"
        type="info"
        title="Cuándo sí y cuándo no"
        description={
          <>
            <b>Cuándo SÍ:</b>
            <ul style={{ paddingLeft: '1.2rem', marginBottom: '1rem', listStyleType: 'disc' }}>
              <li>Cuando crear el objeto es caro y no siempre se usa: el Proxy lo crea solo si de verdad hace falta. A esta variante se le llama <i>Virtual Proxy</i>.</li>
              <li>Cuando no cualquiera debería tocar el objeto: el Proxy revisa quién llama antes de dejar pasar la petición. Esa variante es el <i>Protection Proxy</i>.</li>
              <li>Cuando quieres meter código extra —registrar accesos, guardar resultados en caché— antes o después de cada llamada, sin ensuciar el objeto original.</li>
            </ul>
            <b>Cuándo NO:</b>
            <ul style={{ paddingLeft: '1.2rem', listStyleType: 'disc' }}>
              <li>Si el objeto es liviano y se crea al instante, no hay costo que ahorrar: el Proxy sobra.</li>
              <li>Si a nadie le duele ni la espera ni la memoria, estás resolviendo un problema que no existe.</li>
              <li>Si tu problema es simple, agregar un intermediario solo lo complica: es una pieza más que escribir, mantener y depurar.</li>
            </ul>
          </>
        }
      />
      
      <PatternCard 
        id="real-example"
        type="info"
        title="Ejemplo real"
        description={
          <>
            En las aplicaciones web modernas como <b>React</b> o <b>Vue</b>, un buen ejemplo es el uso de Proxy en la arquitectura del framework:
            <ul style={{ paddingLeft: '1.2rem', marginTop: '0.5rem', marginBottom: '0.5rem', listStyleType: 'disc' }}>
              <li><b>Vue 3</b> utiliza el objeto nativo <code>Proxy</code> de JavaScript para interceptar las lecturas y escrituras a las variables de estado.</li>
              <li>Esto permite que el framework "se entere" de que una variable cambió y automáticamente dispare la actualización de la interfaz visual sin que el desarrollador tenga que llamar a funciones de actualización.</li>
            </ul>
            Otro ejemplo común en el mundo real es una <b>tarjeta de crédito</b>, que funciona como un Proxy (un sustituto temporal y seguro) para tu cuenta bancaria real.
          </>
        }
      />
    </div>
  );
}

function Home() {
  return (
    <div className="animate-fade-in flex flex-col gap-xl">
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-xl)', padding: 'var(--space-xl) 0' }}>
        <h1 className="title-heavy" style={{ fontSize: '4rem', marginBottom: 'var(--space-md)', background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-blue))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Bridge y Proxy
        </h1>
      </div>

      <div className="flex flex-col gap-xl">
        <PatternCard 
          type="info"
          title="Integrantes y Aportes"
          description={
            <ul style={{ paddingLeft: '0', marginTop: '0.5rem', listStyleType: 'none', lineHeight: '1.6' }}>
              <li style={{ marginBottom: '1.5rem' }}>
                <b style={{ fontSize: '1.1rem', color: 'var(--accent-cyan)' }}>José Napoleón Díaz Nuila Cerritos</b> — <span style={{ color: 'var(--text-secondary)' }}>Carnet: [20245231]</span>
                <div style={{ marginTop: '0.25rem' }}><b>Aporte:</b> Creación de la pagina web y explicación de ambos patrones</div>
              </li>
              <li style={{ marginBottom: '1.5rem' }}>
                <b style={{ fontSize: '1.1rem', color: 'var(--accent-cyan)' }}>[Nombre del Integrante 2]</b> — <span style={{ color: 'var(--text-secondary)' }}>Carnet: [000000]</span>
                <div style={{ marginTop: '0.25rem' }}><b>Aporte:</b> [Describe aquí lo que hizo esta persona en el trabajo]</div>
              </li>
              <li style={{ marginBottom: '1.5rem' }}>
                <b style={{ fontSize: '1.1rem', color: 'var(--accent-cyan)' }}>[Nombre del Integrante 3]</b> — <span style={{ color: 'var(--text-secondary)' }}>Carnet: [000000]</span>
                <div style={{ marginTop: '0.25rem' }}><b>Aporte:</b> [Describe aquí lo que hizo esta persona en el trabajo]</div>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <b style={{ fontSize: '1.1rem', color: 'var(--accent-cyan)' }}>[Nombre del Integrante 4]</b> — <span style={{ color: 'var(--text-secondary)' }}>Carnet: [000000]</span>
                <div style={{ marginTop: '0.25rem' }}><b>Aporte:</b> [Describe aquí lo que hizo esta persona en el trabajo]</div>
              </li>
            </ul>
          }
        />

        <PatternCard 
          type="info"
          title="Referencias y Fuentes"
          description={
            <>
              La teoría, conceptos principales y los diagramas estructurales presentados en este sitio web fueron estudiados y adaptados de <b>Refactoring.Guru</b>, una excelente fuente de conocimiento arquitectónico de software.
              <ul style={{ paddingLeft: '1.2rem', marginTop: '1.5rem', listStyleType: 'disc', lineHeight: '2' }}>
                <li><a href="https://refactoring.guru/es/design-patterns/bridge" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-cyan)', textDecoration: 'none', fontWeight: 'bold' }}>Refactoring.Guru: Patrón Bridge</a></li>
                <li><a href="https://refactoring.guru/es/design-patterns/proxy" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-cyan)', textDecoration: 'none', fontWeight: 'bold' }}>Refactoring.Guru: Patrón Proxy</a></li>
              </ul>
            </>
          }
        />
      </div>
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'bridge' | 'proxy'>('home');

  return (
    <>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="main-layout container" style={{ display: activeTab === 'home' ? 'block' : 'flex' }}>
        {activeTab !== 'home' && <Sidebar />}
        
        <main className="main-content" style={{ paddingTop: activeTab === 'home' ? 'var(--space-xl)' : undefined }}>
          {activeTab !== 'home' && (
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>
              <h1 className="title-heavy" style={{ fontSize: '3.5rem', marginBottom: 'var(--space-sm)' }}>
                Patrones Estructurales
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem' }}>
                Dominando la composición de objetos y sus relaciones.
              </p>
            </div>
          )}
          
          {activeTab === 'home' && <Home />}
          {activeTab === 'bridge' && <BridgePattern />}
          {activeTab === 'proxy' && <ProxyPattern />}
          
          <Footer />
        </main>
      </div>
    </>
  );
}

export default App;
