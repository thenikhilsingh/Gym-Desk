import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Header from "./components/members/Header";
import Footer from "./components/members/Footer";

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen w-full flex flex-col">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500;600&display=swap');`}</style>

      <Header />

      <div className="flex-1">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}

export default App;
