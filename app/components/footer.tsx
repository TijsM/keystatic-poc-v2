const navLinks = [
  { label: 'Hoe het werkt', href: '#proces' },
  { label: 'Voordelen', href: '#voordelen' },
  { label: 'Prijzen', href: '#prijzen' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export function Footer({
  brandName,
  email,
  phone,
  city,
  kvkNumber,
}: {
  brandName: string;
  email: string;
  phone: string;
  city: string;
  kvkNumber: string;
}) {
  return (
    <footer className="border-t border-border bg-background py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <p className="font-heading text-2xl font-bold text-foreground">
              {brandName}
            </p>
            <p className="mt-3 text-sm text-muted">
              Professionele websites voor het MKB. Geen opstartkosten, alles
              inbegrepen voor een vast bedrag per maand.
            </p>
          </div>

          <div>
            <p className="font-semibold text-foreground">Navigatie</p>
            <ul className="mt-3 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-semibold text-foreground">Contact</p>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>{email}</li>
              <li>{phone}</li>
              <li>{city}</li>
              <li>KVK: {kvkNumber}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted">
          &copy; {new Date().getFullYear()} {brandName}. Alle rechten
          voorbehouden.
        </div>
      </div>
    </footer>
  );
}
