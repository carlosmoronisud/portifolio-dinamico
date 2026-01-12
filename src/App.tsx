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

const PortfolioContent = () => {
  const { loading } = usePortfolio();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Header />
      <main className="pt-16 bg-dark">
        <section id="home" className="section-padding">
          <Hero />
        </section>
        <section id="skills" className="section-padding bg-dark-card">
          <Skills />
        </section>
        <section id="experience" className="section-padding">
          <Experience />
        </section>
        <section id="projects" className="section-padding bg-dark-card">
          <Projects />
        </section>
        <section id="education" className="section-padding">
          <Education />
        </section>
        <section id="contact" className="section-padding bg-dark-card">
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
        <div className="min-h-screen bg-dark text-light">
          <PortfolioContent />
        </div>
      </Router>
    </PortfolioProvider>
  );
}

export default App;