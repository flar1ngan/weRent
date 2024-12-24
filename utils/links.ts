type NavLink = {
  href: string;
  label: string;
};

export const links: NavLink[] = [
  { href: "/", label: "sākums" },
  { href: "/profile ", label: "profils" },
  { href: "items/create", label: "izveidot slūdinājumu" },
  { href: "/favorites", label: "favorīti" },
];
