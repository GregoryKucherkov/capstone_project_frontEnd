import { NavLink } from "react-router";
import clx from "clsx";
import css from "./Logo.module.css";

export const Logo = () => {
  return (
    <NavLink
      className={clx(css.navLink, css.logo, css.logoWhite)}
      to="/"
      aria-label="Logo Foodies"
    >
      Record
    </NavLink>
  );
};