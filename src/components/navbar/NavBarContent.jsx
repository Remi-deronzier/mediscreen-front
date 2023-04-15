import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import ProfileDropdown from "./ProfileDropdown";
import MobileMenuButton from "./mobile/MobileMenuButton";

export default function NavBarContent({ navigation, user, open }) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex h-16 items-center justify-between">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <NavLink to="/">
              <img className="h-8 w-8" src={logo} alt="Mediscreen" />
            </NavLink>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item) => (
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    isActive
                      ? "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  }
                  key={item.name}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
        <div className="hidden md:block">
          <div className="ml-4 flex items-center md:ml-6">
            <ProfileDropdown user={user} />
          </div>
        </div>

        <MobileMenuButton open={open} />
      </div>
    </div>
  );
}
