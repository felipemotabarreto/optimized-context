import CompA from "./CompA";
import CompB from "./CompB";
import { ContextProvider } from "./ContextProvider";

function App() {
  return (
    <ContextProvider>
      <CompA />
      <CompB />
    </ContextProvider>
  );
}

export default App;
