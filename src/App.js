import React, { Suspense, Component } from "react";
import "./App.css";
import Loading from "./components/Loading";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) return <h1>Something went wrong:( </h1>;
    return this.props.children;
  }
}

const BaseApp = React.lazy(() => import("./BaseApp"));

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <BaseApp />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
