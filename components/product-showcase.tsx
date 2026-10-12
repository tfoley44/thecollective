"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  Bell,
  Check,
  Circle,
  Code2,
  Home,
  LayoutGrid,
  MoreHorizontal,
  Plus,
  Signal,
  Sparkles,
  TrendingUp,
  Wifi,
} from "lucide-react";

const modes = ["Mobile apps", "Web platforms", "MVPs"] as const;
export function ProductShowcase() {
  const [active, setActive] = useState<(typeof modes)[number]>("Mobile apps");
  const [selectedDay, setSelectedDay] = useState(3);
  const [done, setDone] = useState(false);
  return (
    <figure className="showcase-wrap" aria-describedby="concept-disclosure">
      <div
        className="showcase-scene"
        role="group"
        aria-label={`${active} illustrative product concept`}
      >
        <div className="scene-dot-grid" aria-hidden="true" />
        <div className="floating-label">
          <span className="small-status" /> From possibility to product
        </div>
        <div
          aria-hidden="true"
          className={`dashboard-card ${active === "Web platforms" ? "dashboard-highlight" : ""}`}
        >
          <div className="dashboard-top">
            <span>
              <span className="mini-brand">n</span> nook
              <span className="dashboard-muted"> / Workspace</span>
            </span>
            <MoreHorizontal size={17} />
          </div>
          <div className="dashboard-body">
            <div className="dashboard-sidebar">
              <LayoutGrid size={16} />
              <TrendingUp size={16} />
              <Circle size={16} />
              <div className="sidebar-end">N</div>
            </div>
            <div className="dashboard-content">
              <div className="dashboard-heading">
                <div>
                  <span className="micro-label">YOUR WORKSPACE, IN FOCUS</span>
                  <h3>
                    {active === "MVPs"
                      ? "An idea taking shape."
                      : "A little clarity goes a long way."}
                  </h3>
                </div>
                <span className="dashboard-plus">
                  <Plus size={14} />
                </span>
              </div>
              <div className="dashboard-stat-row">
                <div>
                  <small>Projects in motion</small>
                  <strong>
                    {active === "MVPs" ? "01" : "12"}
                    <span>↗ On track</span>
                  </strong>
                </div>
                <div>
                  <small>Tasks completed</small>
                  <strong>
                    84<span>This month</span>
                  </strong>
                </div>
              </div>
              <div className="mini-chart">
                <div className="chart-title">
                  Steady progress <span>Last 7 days⌄</span>
                </div>
                <div className="chart-bars">
                  {[28, 42, 35, 62, 55, 79, 90, 74, 98, 83, 115, 104].map(
                    (height, i) => (
                      <i key={i} style={{ height }} />
                    ),
                  )}
                </div>
                <div className="chart-axis">
                  <span>Mon</span>
                  <span>Wed</span>
                  <span>Fri</span>
                  <span>Sun</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`phone ${active === "Web platforms" ? "phone-behind" : ""}`}
        >
          <div className="phone-status">
            <span>9:41</span>
            <i className="phone-island" />
            <span>
              <Signal size={11} />
              <Wifi size={11} />
              <span className="battery" />
            </span>
          </div>
          <div className="phone-content">
            <div className="phone-top">
              <span className="phone-brand">
                <span>✳</span> bloom
              </span>
              <Bell size={17} />
            </div>
            <span className="phone-greeting">A LITTLE BETTER, EVERY DAY</span>
            <h3>
              Make room
              <br />
              for yourself.
            </h3>
            <div className="phone-days">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                <button
                  type="button"
                  aria-label={`Select ${["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"][i]}`}
                  aria-pressed={selectedDay === i}
                  key={i}
                  className={selectedDay === i ? "selected" : ""}
                  onClick={() => setSelectedDay(i)}
                >
                  <span>{d}</span>
                  <b>{12 + i}</b>
                </button>
              ))}
            </div>
            <div className="habit-card">
              <div className="habit-top">
                <span className="habit-icon">
                  <Sparkles size={17} />
                </span>
                <small>YOUR DAILY MOMENT</small>
              </div>
              <h4>
                {done
                  ? "A moment, well spent."
                  : selectedDay === 3
                    ? "A slower start."
                    : "A fresh perspective."}
              </h4>
              <p>
                {done
                  ? "Small steps make a difference."
                  : "A little pause. A clearer mind."}
              </p>
              <button type="button" onClick={() => setDone(!done)}>
                {done ? "Completed" : "Take a moment"}
                {done ? <Check size={13} /> : <ArrowUpRight size={13} />}
              </button>
              <div className="habit-art" aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
            </div>
            <div className="phone-progress">
              <div>
                <h4>Your small wins</h4>
                <span>This week</span>
              </div>
              <div className="phone-progress-row">
                <span className="progress-ring">
                  {done ? "5" : "4"}
                  <small>/ 7</small>
                </span>
                <p>
                  Showing up counts.
                  <br />
                  <strong>You’re making progress.</strong>
                </p>
              </div>
            </div>
            <div className="phone-bottom">
              <Home size={17} />
              <LayoutGrid size={17} />
              <Circle size={17} />
              <span className="phone-avatar">J</span>
            </div>
          </div>
          <span className="phone-home-bar" />
        </div>
        <div className="built-card">
          <span className="built-icon">
            <Code2 size={18} />
          </span>
          <span>
            Thoughtfully designed.
            <br />
            <strong>Purposefully built.</strong>
          </span>
          <span className="built-check">
            <Check size={12} />
          </span>
        </div>
        {active === "MVPs" && (
          <div className="mvp-note">
            <Check size={14} /> Core idea. Clear first release.
          </div>
        )}
      </div>
      <figcaption id="concept-disclosure" className="showcase-disclosure">
        Illustrative concepts — not client work or product results.
      </figcaption>
      <div
        className="showcase-tabs"
        role="group"
        aria-label="Explore product types"
      >
        {modes.map((mode) => (
          <button
            type="button"
            key={mode}
            aria-pressed={active === mode}
            className={active === mode ? "active" : ""}
            onClick={() => setActive(mode)}
          >
            {mode}
            {active === mode && <ArrowUpRight size={13} />}
          </button>
        ))}
      </div>
    </figure>
  );
}
