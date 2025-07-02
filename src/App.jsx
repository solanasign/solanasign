import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import WalletAuth from "./pages/WalletAuth";
import Features from "./pages/Features";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/wallet" element={<WalletAuth />} />
      <Route path="/features" element={<Features />} />
      {/* Fallback Routes */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
