import { Disclosure } from "@headlessui/react";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import NavBarContent from "./NavBarContent";
import MobileMenuContent from "./mobile/MobileMenuContent";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Patients", href: "/patients" },
];

export default function NavBar() {
  const user = useContext(UserContext);

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <NavBarContent navigation={navigation} user={user} open={open} />
          <MobileMenuContent navigation={navigation} user={user} />
        </>
      )}
    </Disclosure>
  );
}
