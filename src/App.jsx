import doctorsImage from "./assets/images/doctors.png";
import Header from "./components/header/Header";
import NavBar from "./components/navbar/NavBar";

export default function Example() {
  return (
    <div className="min-h-full">
      <NavBar />
      <Header title={"Dashboard"} />
      <main>
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8 flex">
          <div className="w-2/3 pr-10">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              We care.
            </h1>
            <p className="text-gray-600 py-8">
              Mediscreen specializes in detecting risk factors for disease. Our
              screenings using predictive analysis of patient populations at an
              affordable cost.
            </p>
            <ul className="text-gray-600">
              <li> Are you a small or rural clinic or practice?</li>
              <li>
                Do you need screenings for heart disease or hyper tension
                precursors? We have a solution for you?
              </li>
            </ul>
            <h2 className="text-2xl font-bold pt-8 text-gray-900">
              We have a solution for you.
            </h2>
          </div>
          <div>
            <img src={doctorsImage} alt="doctors" />
          </div>
        </div>
      </main>
    </div>
  );
}
