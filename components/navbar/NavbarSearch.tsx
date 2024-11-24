import { Input } from "../ui/input";

function NavbarSearch() {
  return (
    <Input
      type="text"
      placeholder="Mēklēt..."
      className="max-w-lg dark:bg-muted h-10"
    />
  );
}

export default NavbarSearch;
