import doctorsImage from "../../assets/images/doctors.png";

export default function Content() {
  return (
    <main className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8 md:flex">
      <div className="w-2/3 pr-10 mb-6  md:mb-0">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          We care.
        </h2>
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
        <h3 className="text-xl font-bold pt-8 text-gray-900">
          We have a solution for you.
        </h3>
      </div>
      <div>
        <img src={doctorsImage} alt="doctors" />
      </div>
    </main>
  );
}
