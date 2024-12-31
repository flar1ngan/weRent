type NavLink = {
  href: string;
  label: string;
  description: string;
};

export const rentLinks: NavLink[] = [
  { href: "/rent/create", label: "Izveidot slūdinājumu", description: "Veido jaunu sludinājumu ātri un vienkārši." },
  { href: "/favorites", label: "Favorīti", description: "Skati un pārvaldi savus favorītus." },
  { href: "/reservations", label: "Rezervācijas", description: "Pārvaldi veiktās rezervācijas ērti." },
  { href: "/rent", label: "Mani sludinājumi", description: "Skati, rediģē un pārvaldi visus savus sludinājumus." },
];

export const profileLinks: NavLink[] = [
  { href: "/profile ", label: "Mans profils", description: "Skati un pārvaldi sava profila informāciju." },
  { href: "/admin", label: "Admin panelis", description: "Piekļūsti administratora iestatījumiem un pārvaldībai." },
];
