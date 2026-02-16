import { NavLink } from "react-router-dom";
import { User, FileText, BookOpen, FolderOpen, Mail, Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeContext";
import "./Navbar.css";

const navItems = [
  { path: "/", label: "About", icon: User },
  { path: "/resume", label: "Resume", icon: FileText },
  { path: "/blog", label: "Blog", icon: BookOpen },
  { path: "/projects", label: "Projects", icon: FolderOpen },
  { path: "/contact", label: "Contact", icon: Mail },
];

export default function Navbar() {
  const { dark, toggle } = useTheme();

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="navbar-right">
          <ul className="navbar-links">
            {navItems.map(({ path, label, icon: Icon }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                  end={path === "/"}
                >
                  <Icon size={16} />
                  <span>{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
          <button
            className="theme-toggle"
            onClick={toggle}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            title={dark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
