import { AppProvider } from "./context/AppContext";
import Layout from "./components/Layout";
import Tooltip from "./components/Tooltip";

export default function App() {

  return (
    <AppProvider>
      <Layout  />
      <Tooltip />
    </AppProvider>
  );
}
