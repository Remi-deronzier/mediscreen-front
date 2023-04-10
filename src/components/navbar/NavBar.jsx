import { Disclosure } from "@headlessui/react";
import NavBarContent from "./NavBarContent";
import MobileMenuContent from "./mobile/MobileMenuContent";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "Patients", href: "/patients", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar() {
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <NavBarContent
            navigation={navigation}
            classNames={classNames}
            user={user}
            open={open}
          />
          <MobileMenuContent
            navigation={navigation}
            classNames={classNames}
            user={user}
          />
        </>
      )}
    </Disclosure>
  );
}
