import "./App.css";
import Navbar from "./components/Navbar";
import AuthContextProvider from "./contexts/AuthContext";
function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Navbar />
        <main>
          <div className="row justify-content-center mb-2">
            <textarea
              className="full-size p-3"
              wrap="off"
              spellCheck="false"
            ></textarea>
          </div>
        </main>
      </AuthContextProvider>
    </div>
  );
}

export default App;
