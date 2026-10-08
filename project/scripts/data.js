// Shared list of repair services. The services page and the booking form both read from this.
export const services = [
  {
    id: "screen-replacement",
    name: "Laptop screen replacement",
    category: "hardware",
    price: 60,
    days: "1 to 2 days",
    image: "images/laptop.svg",
    imageAlt: "Laptop with a cracked screen",
    summary: "Cracked, flickering or dead screens swapped for a matching panel."
  },
  {
    id: "battery-replacement",
    name: "Battery replacement",
    category: "hardware",
    price: 45,
    days: "Same day",
    image: "images/laptop.svg",
    imageAlt: "Laptop with a worn-out battery",
    summary: "Laptop only lasts a few minutes off the charger? We fit a fresh battery."
  },
  {
    id: "fan-cleaning",
    name: "Fan cleaning and thermal paste",
    category: "hardware",
    price: 30,
    days: "Same day",
    image: "images/desktop.svg",
    imageAlt: "Desktop computer with a cooling fan",
    summary: "Dust removed and new paste applied so your computer stops overheating."
  },
  {
    id: "ssd-upgrade",
    name: "Solid state drive upgrade",
    category: "hardware",
    price: 70,
    days: "1 day",
    image: "images/drive.svg",
    imageAlt: "Storage drive with an upload arrow",
    summary: "Swap a slow hard drive for an SSD and keep all your files and programs."
  },
  {
    id: "virus-removal",
    name: "Virus and malware removal",
    category: "software",
    price: 35,
    days: "Same day",
    image: "images/shield.svg",
    imageAlt: "Shield with a check mark",
    summary: "Pop-ups, hijacked browsers and strange programs cleaned out and blocked."
  },
  {
    id: "windows-reinstall",
    name: "Windows reinstall and tune-up",
    category: "software",
    price: 40,
    days: "1 day",
    image: "images/desktop.svg",
    imageAlt: "Desktop computer ready for a fresh install",
    summary: "A clean system with updates, drivers and your key programs installed."
  },
  {
    id: "data-recovery",
    name: "Data recovery",
    category: "data",
    price: 80,
    days: "2 to 5 days",
    image: "images/drive.svg",
    imageAlt: "Hard drive with a recovery arrow",
    summary: "We try to get photos and documents back from failing or damaged drives."
  },
  {
    id: "backup-setup",
    name: "Backup setup",
    category: "data",
    price: 25,
    days: "Same day",
    image: "images/shield.svg",
    imageAlt: "Shield protecting saved files",
    summary: "Automatic backups to an external drive or the cloud, so you never lose files again."
  }
];
