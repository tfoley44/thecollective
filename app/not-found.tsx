import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export default function NotFound() {
  return (
    <section className="shell not-found">
      <p className="eyebrow">404 / A SMALL DETOUR</p>
      <h1>This page isn’t here.</h1>
      <p>Let’s get you back to good ideas and great apps.</p>
      <Link href="/" className="button button-primary">
        Back to the collective <ArrowUpRight size={17} />
      </Link>
    </section>
  );
}
