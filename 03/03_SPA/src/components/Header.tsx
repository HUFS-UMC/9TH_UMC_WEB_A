import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex gap-5">
      <NavLink to="/min">MIN</NavLink>
      <NavLink to="/matthew">MATTHEW</NavLink>
      <NavLink to="/joy">JOY</NavLink>
      <NavLink to="/notfound">NOT FOUND</NavLink>
    </header>
  );
}
