export default function ProfileDropdown({ user }) {
  return (
    <div className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
      <span className="sr-only">Open user menu</span>
      <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
    </div>
  );
}
