import { ExternalLink } from 'lucide-react';

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

const footerLinks = [
  { href: 'https://github.com', label: 'GitHub', isGithub: true },
  { href: '#roadmap', label: 'Roadmap' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-navy-900 text-cream-100 border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <a href="/" className="inline-flex items-center space-x-2 group mb-3">
              <div className="w-7 h-7 rounded-lg bg-forest-500/30 border border-forest-500/40 flex items-center justify-center group-hover:bg-forest-500/50 transition-colors duration-300">
                <div className="w-3.5 h-3.5 rounded-full bg-cream-100" />
              </div>
              <span className="font-display text-base font-semibold text-cream-50">
                RabbitHole
              </span>
            </a>
            <p className="text-sm text-cream-100/70">
              Explore ideas. Not webpages.
            </p>
          </div>

          <div className="flex items-center space-x-8">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.isGithub ? '_blank' : undefined}
                rel={link.isGithub ? 'noopener noreferrer' : undefined}
                className="text-sm text-cream-100/70 hover:text-cream-50 transition-colors duration-200 flex items-center space-x-1.5"
              >
                {link.isGithub ? (
                  <GithubIcon className="w-3.5 h-3.5" />
                ) : (
                  <ExternalLink className="w-3.5 h-3.5" />
                )}
                <span>{link.label}</span>
              </a>
            ))}
          </div>

          <div className="text-sm text-cream-100/70">
            © {currentYear} RabbitHole
          </div>
        </div>
      </div>
    </footer>
  );
}