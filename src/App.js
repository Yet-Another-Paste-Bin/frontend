import "./App.css";
import Navbar from "./components/Navbar";
import AuthContextProvider from "./contexts/AuthContext";
function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Navbar />
        <main>
          <textarea
            className="full-size mt-2"
            wrap="off"
            spellCheck="false"
          ></textarea>
        </main>
      </AuthContextProvider>
    </div>
  );
}

export default App;
