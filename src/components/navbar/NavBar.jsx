import { Disclosure } from "@headlessui/react";
import MobileMenuContent from "./mobile/MobileMenuContent";
import NavBarContent from "./NavBarContent";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];
const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
  { name: "Reports", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar() {
  return (
    <div className="min-h-full">
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <NavBarContent
              navigation={navigation}
              classNames={classNames}
              user={user}
              userNavigation={userNavigation}
              open={open}
            />
            <MobileMenuContent
              navigation={navigation}
              classNames={classNames}
              user={user}
              userNavigation={userNavigation}
            />
          </>
        )}
      </Disclosure>
    </div>
  );
}
