import { NavLink } from "react-router-dom";

const menu = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Queue", path: "/queue" },
  { name: "Orders", path: "/orders" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-blue-950 shadow">

      <h1 className=" h-14 bg-white text-xl font-bold p-4">LINE</h1>
      <nav className="p-4 space-y-1">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block px-4 py-2 ${
                isActive ? "bg-blue-600 bg-opacity-25 text-white" : "text-gray-200 hover:bg-blue-600 hover:bg-opacity-25 text-white"
              } rounded-lg`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
