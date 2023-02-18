import Content from "./components/content/Content";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import NavBar from "./components/navbar/NavBar";

export default function App() {
  return (
    <div className="flex flex-col h-screen justify-between">
      <NavBar />
      <Header title={"Dashboard"} />
      <Content />
      <Footer />
    </div>
  );
}
