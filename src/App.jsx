import { Outlet } from "react-router-dom";
import Footer from "./components/footer/Footer";
import NavBar from "./components/navbar/NavBar";

export default function App() {
  return (
    <div className="flex flex-col h-screen justify-between">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}
