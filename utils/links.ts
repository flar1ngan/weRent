type NavLink = {
  href: string;
  label: string;
};

export const links: NavLink[] = [
  { href: "/", label: "sākums" },
  { href: "/profile ", label: "profils" },
  { href: "/rent/create", label: "izveidot slūdinājumu" },
  { href: "/favorites", label: "favorīti" },
  { href: "/reservations", label: "Rezervācijas" },
  { href: "/rent", label: "Mani sludinājumi" },
];
