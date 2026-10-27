"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  ArrowUpRight,
  Facebook,
  Instagram,
  Linkedin,
  Menu,
  X,
  Youtube,
} from "lucide-react";
import { navigation } from "../lib/content";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link
          href="/"
          aria-label="The Foley Collective home"
          className="brand-link"
          onClick={() => setOpen(false)}
        >
          <img
            src="/brand/foley-logo.png"
            width="176"
            height="69"
            alt="The Foley Collective"
          />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link key={item.label} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/contact"
          className="header-cta"
          aria-current={
            pathname === "/contact/" || pathname === "/contact"
              ? "page"
              : undefined
          }
        >
          Let’s build something <ArrowUpRight size={16} />
        </Link>
        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav
          id="mobile-navigation"
          className="mobile-nav"
          aria-label="Mobile navigation"
        >
          {navigation.map((item) => (
            <Link
              onClick={() => setOpen(false)}
              key={item.label}
              href={item.href}
            >
              {item.label}
              <ArrowUpRight size={18} />
            </Link>
          ))}
          <Link onClick={() => setOpen(false)} href="/contact">
            Start a project <ArrowUpRight size={18} />
          </Link>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  const socialLinks = [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/the-foley-collective/home/?viewAsMember=true",
      icon: <Linkedin size={18} aria-hidden="true" />,
    },
    {
      label: "YouTube",
      href: "https://www.youtube.com/channel/UCgz4XTVWiQpt-aeBA6nLDwQ",
      icon: <Youtube size={18} aria-hidden="true" />,
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/thefoleycollective/",
      icon: <Instagram size={18} aria-hidden="true" />,
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/thefoleycollective",
      icon: <Facebook size={18} aria-hidden="true" />,
    },
  ];
  return (
    <footer className="site-footer shell">
      <div className="footer-top">
        <Link href="/" aria-label="The Foley Collective home">
          <img
            src="/brand/foley-logo.png"
            width="168"
            height="66"
            alt="The Foley Collective"
          />
        </Link>
        <p>
          Thoughtful apps.
          <br />
          Meaningful possibilities.
        </p>
        <Link className="text-link" href="/contact">
          Let’s talk <ArrowUpRight size={17} />
        </Link>
      </div>
      <nav className="footer-social" aria-label="Social media">
        <p>Connect with us</p>
        <ul>
          {socialLinks.map(({ label, href, icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`The Foley Collective on ${label} (opens in a new tab)`}
              >
                {icon}
                <span>{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} The Foley Collective. All rights
          reserved.
        </p>
        <span>Independent thinking. Built together.</span>
        <Link href="/privacy">Privacy</Link>
      </div>
    </footer>
  );
}
