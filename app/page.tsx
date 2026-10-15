import Link from "next/link";
import {
  Play,
  ArrowRight,
  ArrowUpRight,
  Code2,
  Compass,
  PenTool,
  Rocket,
  Check,
  Layers,
  Smartphone,
  Globe2,
} from "lucide-react";
import { BrandFilm } from "../components/brand-film";
import { ProductShowcase } from "../components/product-showcase";
import { faqs, process, services } from "../lib/content";

const serviceIcons = {
  compass: Compass,
  pen: PenTool,
  code: Code2,
  rocket: Rocket,
};

export default function HomePage() {
  return (
    <>
      <section className="hero shell">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="status-dot" /> AN INDEPENDENT APP DEVELOPMENT
            STUDIO
          </div>
          <h1>
            Good ideas.
            <br />
            Great <span className="serif-word">apps.</span>
          </h1>
          <p className="hero-description">
            We turn your what-if into what’s next.
            <br className="desktop-break" /> Thoughtful strategy, considered
            design, and apps
            <br className="desktop-break" /> built for the people who use them.
          </p>
          <div className="hero-actions">
            <Link href="/contact" className="button button-primary">
              Let’s build your app <ArrowUpRight size={17} />
            </Link>
            <Link href="#film" className="hero-secondary">
              Watch the film (0:30) <Play size={15} />
            </Link>
          </div>
          <div className="hero-footnote">
            <span className="tiny-line" /> From the first conversation to your
            next chapter.
          </div>
        </div>
        <ProductShowcase />
      </section>
      <div className="capability-strip shell">
        <span>
          BIG PICTURE THINKING.
          <br />
          <strong>EVERY DETAIL CONSIDERED.</strong>
        </span>
        <div>
          <Smartphone size={19} /> Mobile applications
        </div>
        <div>
          <Globe2 size={19} /> Web platforms
        </div>
        <div>
          <Layers size={19} /> MVPs & new ventures
        </div>
      </div>
      <BrandFilm />
      <section id="services" className="services-section shell section-space">
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 / WHAT WE DO</p>
            <h2>
              Your idea. Our craft.
              <br />
              <span className="muted-heading">A product with purpose.</span>
            </h2>
          </div>
          <p className="section-intro">
            One connected journey from the big question to the smallest
            interaction. We meet you where you are and help you move forward.
          </p>
        </div>
        <div className="services-list">
          {services.map((service) => {
            const Icon = serviceIcons[service.icon];
            return (
              <article className="service-item" key={service.number}>
                <div className="service-icon">
                  <Icon size={22} strokeWidth={1.5} />
                </div>
                <span className="service-number">{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <div className="service-tags">
                  {service.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
        <div className="services-bottom">
          <p>Not sure where to start? That’s a good place to begin.</p>
          <Link href="/contact" className="text-link">
            Talk through your idea <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
      <section id="approach" className="approach-section">
        <div className="shell section-space">
          <div className="section-heading">
            <div>
              <p className="eyebrow">02 / OUR APPROACH</p>
              <h2>
                A clear path.
                <br />
                <span className="serif-word">Built together.</span>
              </h2>
            </div>
            <p className="section-intro">
              No disappearing acts. No unnecessary complexity. Just an open,
              collaborative process that turns an ambitious idea into a useful
              product.
            </p>
          </div>
          <div className="process-list">
            {process.map((step, i) => (
              <article key={step.title}>
                <div className="process-number">
                  <span>0{i + 1}</span>
                  {i < 3 && <ArrowRight size={18} />}
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                <div className="process-output">
                  <Check size={13} />
                  {step.output}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section
        id="collective"
        className="collective-section shell section-space"
      >
        <div className="collective-art">
          <div className="collective-art-label">
            <span className="status-dot" /> DIFFERENT PERSPECTIVES. ONE PURPOSE.
          </div>
          <div className="collective-shapes" aria-hidden="true">
            <div className="shape-circle" />
            <div className="shape-arch" />
            <div className="shape-square" />
            <div className="shape-line" />
          </div>
          <p>
            Better things happen
            <br />
            when we build <em>together.</em>
          </p>
          <span className="art-index">
            THE FOLEY COLLECTIVE / A NEW CHAPTER
          </span>
        </div>
        <div className="collective-copy">
          <p className="eyebrow">03 / THE COLLECTIVE</p>
          <h2>
            Small by intention.
            <br />
            Collective by nature.
          </h2>
          <p>
            We’re The Foley Collective, an independent studio focused on
            building apps that make things better. For the people using them.
            And the people behind them.
          </p>
          <p>
            Our next chapter is about bringing strategy, design, and development
            into the same conversation. We listen closely, question
            thoughtfully, and treat your product like something worth getting
            right.
          </p>
          <div className="collective-values">
            <span>
              <Check size={15} /> People before features
            </span>
            <span>
              <Check size={15} /> Clarity over complexity
            </span>
            <span>
              <Check size={15} /> Partnership, not handoffs
            </span>
          </div>
          <Link className="text-link" href="/contact">
            Meet your next product partner <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
      <section className="faq-section shell">
        <div>
          <p className="eyebrow">A FEW GOOD QUESTIONS</p>
          <h2>
            Let’s clear
            <br />
            things up.
          </h2>
        </div>
        <div className="faq-list">
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary>
                {faq.question}
                <span className="faq-plus" aria-hidden="true">
                  +
                </span>
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="contact-banner shell">
        <div>
          <p className="eyebrow">
            <span className="status-dot" /> YOUR NEXT CHAPTER STARTS HERE
          </p>
          <h2>
            Have a what-if?
            <br />
            Let’s make it <span className="serif-word">real.</span>
          </h2>
        </div>
        <div>
          <p>
            A new idea. A better version. A problem worth solving.
            <br />
            We’d love to hear what’s on your mind.
          </p>
          <Link className="button button-primary" href="/contact">
            Start a conversation <ArrowUpRight size={17} />
          </Link>
          <small>No perfect brief needed. Just bring your idea.</small>
        </div>
      </section>
    </>
  );
}
