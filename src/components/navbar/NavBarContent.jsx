import { BellIcon } from "@heroicons/react/24/outline";
import logo from "../../assets/images/logo.png";
import MobileMenuButton from "./mobile/MobileMenuButton";
import ProfileDropdown from "./ProfileDropdown";

export default function NavBarContent({
  navigation,
  classNames,
  user,
  userNavigation,
  open,
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex h-16 items-center justify-between">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <img className="h-8 w-8" src={logo} alt="Mediscreen" />
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "px-3 py-2 rounded-md text-sm font-medium"
                  )}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="hidden md:block">
          <div className="ml-4 flex items-center md:ml-6">
            <button
              type="button"
              className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Profile dropdown */}
            <ProfileDropdown user={user} userNavigation={userNavigation} />
          </div>
        </div>

        {/* Mobile menu button */}
        <MobileMenuButton open={open} />
      </div>
    </div>
  );
}
