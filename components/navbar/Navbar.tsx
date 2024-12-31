import NavbarSearch from "./NavbarSearch";
import DarkMode from "./DarkMode";
import Logo from "./Logo";
import { NavItems } from "./NavItems";

function Navbar() {
  return <nav className="border-b">
    <div className="container flex flex-col sm:flex-row sm:justify-between sm:items-center flex-wrap gap-4 py-4">
        <Logo/>
        <NavbarSearch/>
        <div className="flex gap-4 items-center">
            <DarkMode/>
            <NavItems/>
        </div>
    </div>
  </nav>
}

export default Navbar