export default function Footer() {
  return (
    <footer className="p-4 bg-white  shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
      <span className="text-sm text-white sm:text-center font-medium">
        © 2023
        <a
          href="https://www.linkedin.com/in/remi-deronzier/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline mx-4"
        >
          Rémi DERONZIER
        </a>
        All Rights Reserved.
      </span>
      <ul className="flex flex-wrap items-center mt-3 text-sm text-white sm:mt-0 font-medium">
        <li>
          <a
            href="https://github.com/Remi-deronzier"
            target="_blank"
            className="hover:underline"
          >
            Contact
          </a>
        </li>
      </ul>
    </footer>
  );
}
