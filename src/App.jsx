import { Outlet } from "react-router-dom";
import Footer from "./components/footer/Footer";
import NavBar from "./components/navbar/NavBar";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen justify-between bg-slate-100">
      <NavBar />
      <main className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8 md:flex">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
