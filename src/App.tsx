import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import { PortfolioProvider } from './context/PortfolioContext';
import { usePortfolio } from './hooks/usePortfolio';

// Componente principal que usa o contexto
const PortfolioContent = () => {
  const { loading } = usePortfolio();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Header />
      <main>
        <section id="home">
          <Hero />
        </section>
        <section id="skills" className="section-padding bg-white">
          <Skills />
        </section>
        <section id="experience" className="section-padding bg-gray-50">
          <Experience />
        </section>
        <section id="projects" className="section-padding bg-white">
          <Projects />
        </section>
        <section id="education" className="section-padding bg-gray-50">
          <Education />
        </section>
        <section id="contact" className="section-padding bg-white">
          <Contact />
        </section>
      </main>
      <Footer />
    </>
  );
};

function App() {
  return (
    <PortfolioProvider>
      <Router>
        <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
          <PortfolioContent />
        </div>
      </Router>
    </PortfolioProvider>
  );
}

export default App;