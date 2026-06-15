import React, { useState } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  Terminal, 
  Server, 
  Sparkles, 
  Rocket, 
  User,
  FolderGit2,
  Code2,
  ExternalLink
} from 'lucide-react';
import { useProfileImage, useProjectImages } from './hooks/useImages';
import { ImageGallery } from './components/ImageGallery';

export default function App() {
  const [formData, setFormData] = useState({ nombre: '', email: '', mensaje: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const profileImage = useProfileImage();
  const project1Images = useProjectImages('nicopets');
  const project2Images = useProjectImages('gridfall');
  const project3Images = useProjectImages('design3d');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulación de envío
    setTimeout(() => {
      alert("¡Mensaje enviado con éxito!");
      setFormData({ nombre: '', email: '', mensaje: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="h-screen overflow-y-auto scroll-smooth bg-[#0f172a] text-[#e2e8f0] font-sans antialiased">
      
      {/* Navegación */}
      <nav className="flex items-center justify-between p-6 bg-[#0f172a]/95 backdrop-blur border-b border-slate-800 sticky top-0 z-50">
        <div className="text-xl font-bold text-purple-500 flex items-center gap-2">
          <Terminal size={24} />
          <span>Mi Portafolio</span>
        </div>
        <div className="hidden md:flex space-x-6 text-sm font-medium">
          <a href="#inicio" className="hover:text-purple-400 transition-colors">Inicio</a>
          <a href="#sobre-mi" className="hover:text-purple-400 transition-colors">Sobre mí</a>
          <a href="#habilidades" className="hover:text-purple-400 transition-colors">Habilidades</a>
          <a href="#proyectos" className="hover:text-purple-400 transition-colors">Proyectos</a>
          <a href="#contacto" className="hover:text-purple-400 transition-colors">Contacto</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="min-h-[85vh] flex flex-col items-center justify-center text-center px-4 bg-gradient-to-b from-[#0f172a] to-[#111827] pt-20 pb-10">
        <div className="mb-8 relative group">
          <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.3)] mx-auto bg-slate-800 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            {profileImage ? (
              <img src={profileImage} alt="Matias Brunaga" className="w-full h-full object-cover" />
            ) : (
              <User size={64} className="text-slate-400" />
            )}
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight">
          Hola, soy <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Matias Brunaga</span>
        </h1>
        <h2 className="text-2xl md:text-3xl text-slate-300 mb-8 font-semibold flex items-center justify-center gap-3">
          <Code2 className="text-teal-400" />
          Desarrollador Full Stack
          <Code2 className="text-teal-400" />
        </h2>
        
        <p className="text-slate-400 max-w-2xl mb-10 text-lg leading-relaxed">
          Estudiante avanzado de Ingeniería Informática. Me especializo en traducir lógicas de negocio complejas en arquitecturas de software eficientes y escalables, priorizando la mantenibilidad del código y la resolución efectiva de problemas.
        </p>
        
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
          <a href="#proyectos" className="bg-[#0d9488] hover:bg-[#0f766e] text-white px-8 py-3 rounded-lg font-medium transition-all shadow-lg hover:shadow-teal-500/25 flex items-center justify-center gap-2">
            <FolderGit2 size={20} />
            Ver Proyectos
          </a>
          <a href="#contacto" className="border border-slate-600 hover:border-slate-400 bg-slate-800/40 px-8 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2">
            <Mail size={20} />
            Contactar
          </a>
        </div>
      </section>

      {/* Sobre Mí & Habilidades */}
      <section id="sobre-mi" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Sobre Mí</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-teal-500 mx-auto rounded-full"></div>
        </div>
        
        <div className="bg-[#1e293b] p-8 md:p-12 rounded-2xl border border-slate-700 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-16">
            <div className="p-6 bg-[#0f172a] rounded-xl border border-slate-800 shadow-inner">
              <h3 className="text-4xl font-black text-purple-400 mb-2">2+</h3>
              <p className="text-sm text-slate-400 font-medium uppercase tracking-wider">Años de Experiencia</p>
            </div>
            <div className="p-6 bg-[#0f172a] rounded-xl border border-slate-800 shadow-inner">
              <h3 className="text-4xl font-black text-teal-400 mb-2">3+</h3>
              <p className="text-sm text-slate-400 font-medium uppercase tracking-wider">Proyectos Destacados</p>
            </div>
            <div className="p-6 bg-[#0f172a] rounded-xl border border-slate-800 shadow-inner">
              <h3 className="text-4xl font-black text-yellow-500 mb-2">10+</h3>
              <p className="text-sm text-slate-400 font-medium uppercase tracking-wider">Tecnologías Dominadas</p>
            </div>
          </div>

          <div id="habilidades" className="pt-4">
            <h3 className="text-3xl font-bold text-center mb-10">Habilidades & Tecnologías</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Frontend */}
              <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-700 hover:border-purple-500/50 transition-colors">
                <div className="flex items-center justify-center mb-4 text-purple-400">
                  <Terminal size={32} />
                </div>
                <h4 className="text-center font-bold text-slate-200 mb-4 border-b border-slate-800 pb-3">Frontend</h4>
                <ul className="space-y-3 text-sm text-slate-400 text-center">
                  <li className="hover:text-purple-300 transition-colors">React</li>
                  <li className="hover:text-purple-300 transition-colors">Next.js</li>
                  <li className="hover:text-purple-300 transition-colors">JavaScript y TypeScript</li>
                  <li className="hover:text-purple-300 transition-colors">Vue</li>
                </ul>
              </div>

              {/* Backend */}
              <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-700 hover:border-teal-500/50 transition-colors">
                <div className="flex items-center justify-center mb-4 text-teal-400">
                  <Server size={32} />
                </div>
                <h4 className="text-center font-bold text-slate-200 mb-4 border-b border-slate-800 pb-3">Backend & APIs</h4>
                <ul className="space-y-3 text-sm text-slate-400 text-center">
                  <li className="hover:text-teal-300 transition-colors">Java</li>
                  <li className="hover:text-teal-300 transition-colors">Node.js</li>
                  <li className="hover:text-teal-300 transition-colors">Python</li>
                </ul>
              </div>

              {/* IA & Agentes */}
              <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-700 hover:border-yellow-500/50 transition-colors">
                <div className="flex items-center justify-center mb-4 text-yellow-500">
                  <Sparkles size={32} />
                </div>
                <h4 className="text-center font-bold text-slate-200 mb-4 border-b border-slate-800 pb-3">IA & Agentes</h4>
                <ul className="space-y-3 text-sm text-slate-400 text-center">
                  <li className="hover:text-yellow-300 transition-colors">Prog. Agéntica</li>
                  <li className="hover:text-yellow-300 transition-colors">OpenCode</li>
                  <li className="hover:text-yellow-300 transition-colors">Claude Code</li>
                  <li className="hover:text-yellow-300 transition-colors">Hermes</li>
                </ul>
              </div>

              {/* Despliegue & Diseño */}
              <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-700 hover:border-blue-500/50 transition-colors">
                <div className="flex items-center justify-center mb-4 text-blue-400">
                  <Rocket size={32} />
                </div>
                <h4 className="text-center font-bold text-slate-200 mb-4 border-b border-slate-800 pb-3">Despliegue</h4>
                <ul className="space-y-3 text-sm text-slate-400 text-center">
                  <li className="hover:text-blue-300 transition-colors">Spring Boot</li>
                  <li className="hover:text-blue-300 transition-colors">Vercel</li>
                  <li className="hover:text-blue-300 transition-colors">Git / GitHub</li>
                  <li className="hover:text-blue-300 transition-colors">Canva</li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Proyectos */}
      <section id="proyectos" className="py-24 px-6 bg-[#0b0f19]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Mis Proyectos</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-purple-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* NicoPets */}
            <div className="bg-[#1e293b] rounded-2xl overflow-hidden border border-slate-800 hover:border-purple-500 transition-all flex flex-col justify-between shadow-lg group">
              <div>
                <div className="h-56 bg-slate-800 border-b border-slate-700 relative overflow-hidden">
                  <ImageGallery images={project1Images} className="absolute inset-0" placeholder={<span className="text-slate-500 font-medium z-10">[ Imagen NicoPets ]</span>} />
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold group-hover:text-purple-400 transition-colors">NicoPets</h3>
                    <span className="text-xs font-bold bg-slate-800 px-3 py-1.5 rounded-full text-purple-400 border border-purple-500/30">Contribuidor</span>
                  </div>
                  <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                    Software de gestión integral de una veterinaria. Incluye funcionalidades avanzadas para el control de citas, historias clínicas y el módulo integrado de venta de productos.
                  </p>
                </div>
              </div>
              <div className="p-8 pt-0 mt-auto">
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="text-xs font-medium bg-[#0f172a] px-3 py-1.5 rounded text-slate-300 border border-slate-700">Next.js</span>
                  <span className="text-xs font-medium bg-[#0f172a] px-3 py-1.5 rounded text-slate-300 border border-slate-700">Node.js</span>
                  <span className="text-xs font-medium bg-[#0f172a] px-3 py-1.5 rounded text-slate-300 border border-slate-700">TypeScript</span>
                </div>
                <a href="https://github.com/belencita12/IISS2" target="_blank" rel="noreferrer" className="text-teal-400 hover:text-teal-300 text-sm font-semibold flex items-center gap-2 group-hover:underline">
                  <Github size={18} />
                  Ver Código
                </a>
              </div>
            </div>

            {/* Gridfall */}
            <div className="bg-[#1e293b] rounded-2xl overflow-hidden border border-slate-800 hover:border-yellow-500 transition-all flex flex-col justify-between shadow-lg group">
              <div>
                <div className="h-56 bg-slate-800 border-b border-slate-700 relative overflow-hidden">
                  <ImageGallery images={project2Images} className="absolute inset-0" placeholder={<span className="text-slate-500 font-medium z-10">[ Imagen Gridfall ]</span>} />
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold group-hover:text-yellow-400 transition-colors">Gridfall</h3>
                    <span className="text-xs font-bold bg-slate-800 px-3 py-1.5 rounded-full text-yellow-500 border border-yellow-500/30">Propietario</span>
                  </div>
                  <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                    Juego de estrategia por turnos inspirado en las mecánicas tácticas del ajedrez, integrado bajo un robusto sistema lógico de turnos tipo AGI.
                  </p>
                </div>
              </div>
              <div className="p-8 pt-0 mt-auto">
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="text-xs font-medium bg-[#0f172a] px-3 py-1.5 rounded text-slate-300 border border-slate-700">Python</span>
                  <span className="text-xs font-medium bg-[#0f172a] px-3 py-1.5 rounded text-slate-300 border border-slate-700">Pygame</span>
                </div>
                <a href="https://github.com/DarkRonier/Gridfall" target="_blank" rel="noreferrer" className="text-teal-400 hover:text-teal-300 text-sm font-semibold flex items-center gap-2 group-hover:underline">
                  <Github size={18} />
                  Ver Código
                </a>
              </div>
            </div>

            {/* Design3D */}
            <div className="bg-[#1e293b] rounded-2xl overflow-hidden border border-slate-800 hover:border-teal-500 transition-all flex flex-col justify-between shadow-lg group">
              <div>
                <div className="h-56 bg-slate-800 border-b border-slate-700 relative overflow-hidden">
                  <ImageGallery images={project3Images} className="absolute inset-0" placeholder={<span className="text-slate-500 font-medium z-10">[ Imagen Design3D ]</span>} />
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold group-hover:text-teal-400 transition-colors">Design3D</h3>
                    <span className="text-xs font-bold bg-slate-800 px-3 py-1.5 rounded-full text-yellow-500 border border-yellow-500/30">Propietario</span>
                  </div>
                  <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                    Aplicación interactiva y ligera orientada al diseño en 3D a partir de la manipulación de figuras geométricas simples, optimizada para ofrecer rapidez.
                  </p>
                </div>
              </div>
              <div className="p-8 pt-0 mt-auto">
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="text-xs font-medium bg-[#0f172a] px-3 py-1.5 rounded text-slate-300 border border-slate-700">React</span>
                </div>
                <span className="text-slate-500 text-sm font-medium flex items-center gap-2">
                  <ExternalLink size={18} />
                  Link pendiente de despliegue
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="py-24 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Contacto</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-teal-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="flex flex-col justify-center">
            <h3 className="text-3xl font-bold mb-6 text-white">¡Hablemos!</h3>
            <p className="text-slate-400 mb-10 leading-relaxed text-lg">
              ¿Tienes un proyecto en mente, una oportunidad de colaboración o simplemente quieres conversar sobre ingeniería de software? ¡Escríbeme!
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-teal-400 border border-slate-700">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">Email</p>
                  <p className="font-medium text-slate-200 text-lg">matibru4@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-purple-400 border border-slate-700">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">Ubicación</p>
                  <p className="font-medium text-slate-200 text-lg">Encarnación / Coronel Bogado, PY</p>
                </div>
              </div>
            </div>

            <div className="pt-10 flex space-x-4">
              <a href="https://www.linkedin.com/in/genaro-nieto-matias-brunaga-karajallo-b79a17412/" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm bg-[#1e293b] hover:bg-[#2dd4bf] hover:text-slate-900 border border-slate-700 px-6 py-3 rounded-lg transition-all font-bold">
                <Linkedin size={18} />
                LinkedIn
              </a>
              <a href="https://github.com/DarkRonier" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm bg-[#1e293b] hover:bg-[#c084fc] hover:text-slate-900 border border-slate-700 px-6 py-3 rounded-lg transition-all font-bold">
                <Github size={18} />
                GitHub
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-[#1e293b] p-8 md:p-10 rounded-2xl border border-slate-700 shadow-2xl">
            <div className="mb-6">
              <label className="block text-sm font-bold mb-2 text-slate-300">Nombre Completo</label>
              <input 
                type="text" 
                required
                placeholder="Ej. Juan Pérez"
                value={formData.nombre}
                onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                className="w-full bg-[#0f172a] border border-slate-600 rounded-lg p-4 text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-bold mb-2 text-slate-300">Correo Electrónico</label>
              <input 
                type="email" 
                required
                placeholder="tu@email.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-[#0f172a] border border-slate-600 rounded-lg p-4 text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
              />
            </div>
            <div className="mb-8">
              <label className="block text-sm font-bold mb-2 text-slate-300">Mensaje</label>
              <textarea 
                rows={4} 
                required
                placeholder="¿En qué te puedo ayudar?"
                value={formData.mensaje}
                onChange={(e) => setFormData({...formData, mensaje: e.target.value})}
                className="w-full bg-[#0f172a] border border-slate-600 rounded-lg p-4 text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none"
              ></textarea>
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`w-full font-bold py-4 rounded-lg transition-all shadow-lg flex justify-center items-center gap-2 ${
                isSubmitting 
                  ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white hover:shadow-teal-500/25'
              }`}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-[#070b14] text-center p-8 text-sm text-slate-500">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Terminal size={20} className="text-purple-500" />
          <span className="font-bold text-slate-300">Matias Brunaga</span>
        </div>
        <p>&copy; {new Date().getFullYear()} Desarrollado con React y Tailwind CSS. Todos los derechos reservados.</p>
      </footer>

    </div>
  );
}
