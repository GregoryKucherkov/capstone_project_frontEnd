import css from "./BottomNav.module.css";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

import {
  FiHome,
  FiBarChart2,
  FiPlus,
  FiUsers,
  FiActivity,
} from "react-icons/fi";

export const BottomNav = () => {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    clsx(css.link, isActive && css.active);

  const navItems = [
    { path: "/", label: "Home", icon: <FiHome size={24} /> },
    { path: "/workouts", label: "Workouts", icon: <FiBarChart2 size={24} /> },
    { path: "/add-workout", label: "Add", icon: <FiPlus size={24} /> },
    { path: "/community", label: "Community", icon: <FiUsers size={24} /> },
    { path: "/exercises", label: "Exercises", icon: <FiActivity size={24} /> },
  ];

  return (
    <nav className={css.bottomNav} aria-label="Main Navigation">
      <ul className={css.ulBottomMenu}>
        {navItems.map((item) => (
          <li key={item.path} className={css.liMenuItem}>
            <NavLink
              to={item.path}
              className={navLinkClass}
              end={item.path === "/"}
            >
              <span className={css.icon}>{item.icon}</span>
              <span className={css.label}>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
