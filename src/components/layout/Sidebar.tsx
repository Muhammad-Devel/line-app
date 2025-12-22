import { NavLink } from "react-router-dom";

const menu = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Queue", path: "/queue" },
  { name: "Orders", path: "/orders" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow">
      <h1 className="text-xl font-bold p-4">LINE</h1>
      <nav className="space-y-1">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block px-4 py-2 ${
                isActive ? "bg-blue-600 text-white" : "text-gray-600"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
