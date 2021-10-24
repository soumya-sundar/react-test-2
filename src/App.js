import './App.css';
import DisplayPerformanceData from './DisplayPerformanceData';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Performance Data
      </header>
      <section className="container">
        <DisplayPerformanceData />
      </section>
      <footer>
        <p>Contact: soumya-sundar @GitHub.com</p>
      </footer>
    </div>
  );
}

export default App;
