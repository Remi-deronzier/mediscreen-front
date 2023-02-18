export default function Footer() {
  return (
    <footer class="p-4 bg-white  shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
      <span class="text-sm text-white sm:text-center font-medium">
        © 2023
        <a
          href="https://www.linkedin.com/in/remi-deronzier/"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:underline mx-4"
        >
          Rémi DERONZIER
        </a>
        All Rights Reserved.
      </span>
      <ul class="flex flex-wrap items-center mt-3 text-sm text-white sm:mt-0 font-medium">
        <li>
          <a href="#" class="mr-4 hover:underline md:mr-6 ">
            About
          </a>
        </li>
        <li>
          <a href="#" class="mr-4 hover:underline md:mr-6">
            Privacy Policy
          </a>
        </li>
        <li>
          <a href="#" class="mr-4 hover:underline md:mr-6">
            Licensing
          </a>
        </li>
        <li>
          <a href="#" class="hover:underline">
            Contact
          </a>
        </li>
      </ul>
    </footer>
  );
}
