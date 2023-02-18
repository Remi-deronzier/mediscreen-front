import Content from "./components/content/Content";
import Header from "./components/header/Header";
import NavBar from "./components/navbar/NavBar";

export default function Example() {
  return (
    <div className="min-h-full">
      <NavBar />
      <Header title={"Dashboard"} />
      <Content />
    </div>
  );
}
