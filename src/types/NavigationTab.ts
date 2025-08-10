type DropdownItem = {
  name: string;
  href: string;
  description?: string;
};

export type NavigationTab = {
  name: string;
  items: DropdownItem[];
};
