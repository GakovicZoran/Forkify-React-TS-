import { BrowserRouter as Router } from "react-router-dom";
import { ForkifyContainer } from "./components/Body/ForkifyContainer";

const App = () => {
  return (
    <Router>
      <ForkifyContainer />
    </Router>
  );
};

export default App;
