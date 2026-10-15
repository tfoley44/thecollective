"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import Link from "next/link";
import { ArrowUpRight, Play, RotateCcw } from "lucide-react";
import styles from "./brand-film.module.css";

const VIDEO = {
  loop: "/video/foley-film-loop.mp4",
  film1080: "/video/foley-film-1080.mp4",
  film720: "/video/foley-film-720.mp4",
  poster: "/video/foley-film-poster.webp",
  captions: "/video/foley-film-captions.vtt",
};
const CHAPTERS = [
  { t: 0, label: "The sketch" },
  { t: 9.5, label: "The conversation" },
  { t: 15.3, label: "The build" },
  { t: 24.8, label: "The launch" },
];
type Mode = "preview" | "film" | "ended";

// Local integration hook only: no analytics listener or transmission is installed here.
// Position milestones describe the playhead, not time actually watched.
function track(event: string, detail: Record<string, unknown> = {}) {
  window.dispatchEvent(
    new CustomEvent("foley:film", { detail: { event, ...detail } }),
  );
}

export function BrandFilm() {
  const [mode, setMode] = useState<Mode>("preview");
  const [reducedMotion, setReducedMotion] = useState<boolean | null>(null);
  const [previewPaused, setPreviewPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [error, setError] = useState("");
  const stageRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLVideoElement>(null);
  const filmRef = useRef<HTMLVideoElement>(null);
  const replayRef = useRef<HTMLButtonElement>(null);
  const pendingSeek = useRef<number | null>(null);
  const milestones = useRef(new Set<number>());
  const sourceSelected = useRef(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setReducedMotion(media.matches);
      if (media.matches) {
        previewRef.current?.pause();
        setPreviewPaused(true);
      }
    };
    update();
    media.addEventListener("change", update);
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    if (stageRef.current) observer.observe(stageRef.current);
    return () => {
      media.removeEventListener("change", update);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const preview = previewRef.current;
    if (!preview) return;
    if (
      mode === "preview" &&
      reducedMotion === false &&
      visible &&
      !previewPaused
    ) {
      // Do not request any preview video before motion preference and visibility resolve.
      if (!preview.getAttribute("src")) preview.src = VIDEO.loop;
      void preview.play().catch((error: DOMException) => {
        if (error.name !== "AbortError") setPreviewPaused(true);
      });
    } else preview.pause();
  }, [mode, reducedMotion, visible, previewPaused]);

  const play = (from = 0, source = "button") => {
    const film = filmRef.current;
    if (!film) return;
    previewRef.current?.pause();
    milestones.current.clear();
    setError("");
    flushSync(() => setMode("film"));
    pendingSeek.current = from;
    if (!sourceSelected.current) {
      film.src = window.matchMedia("(max-width: 900px)").matches
        ? VIDEO.film720
        : VIDEO.film1080;
      sourceSelected.current = true;
      film.load();
    }
    if (film.readyState >= 1) {
      try {
        film.currentTime = from;
        pendingSeek.current = null;
      } catch {
        setError(
          "The chapter could not be selected. Use the video controls to choose a position.",
        );
      }
    }
    // Keep play() in the user gesture to preserve mobile sound playback permission.
    void film
      .play()
      .catch(() =>
        setError(
          "Playback did not start. Press Play in the video controls to try again.",
        ),
      );
    requestAnimationFrame(() => film.focus());
    track("film_play_click", { from, source });
  };

  return (
    <section
      id="film"
      className={`${styles.section} shell`}
      aria-labelledby="film-heading"
    >
      <div className={styles.header}>
        <div className="eyebrow">
          <span className="status-dot" /> THE FILM · 0:30
        </div>
        <h2 id="film-heading" className={styles.heading}>
          Every great app starts as a{" "}
          <span className="serif-word">what-if.</span>
        </h2>
        <p className={styles.intro}>
          Thirty seconds, one idea — from the first sketch to the moment it all
          clicks.
        </p>
      </div>
      <div ref={stageRef} className={styles.stage}>
        {mode === "preview" && (
          <>
            <video
              ref={previewRef}
              className={styles.video}
              poster={VIDEO.poster}
              muted
              loop
              playsInline
              preload="none"
              aria-hidden="true"
              tabIndex={-1}
            />
            {reducedMotion === false && (
              <button
                type="button"
                className={styles.previewControl}
                onClick={() => setPreviewPaused((value) => !value)}
                aria-label={
                  previewPaused
                    ? "Resume silent preview"
                    : "Pause silent preview"
                }
              >
                {previewPaused ? "Resume preview" : "Pause preview"}
              </button>
            )}
            <button
              type="button"
              className={styles.playButton}
              onClick={() => play(0, "stage")}
              aria-label="Play The Foley Collective brand film with sound"
            >
              <span className={styles.playIcon}>
                <Play size={22} fill="currentColor" aria-hidden="true" />
              </span>
              <span>Play the film</span>
              <span className={styles.duration}>0:30 · sound on</span>
            </button>
          </>
        )}
        <video
          ref={filmRef}
          className={`${styles.video} ${mode !== "film" ? styles.hidden : ""}`}
          poster={VIDEO.poster}
          controls
          playsInline
          preload="none"
          tabIndex={0}
          aria-label="The Foley Collective brand film"
          aria-describedby={error ? "film-error" : undefined}
          onLoadedMetadata={() => {
            if (pendingSeek.current === null || !filmRef.current) return;
            try {
              filmRef.current.currentTime = pendingSeek.current;
              pendingSeek.current = null;
            } catch {
              setError(
                "The chapter could not be selected. Use the video controls to choose a position.",
              );
            }
          }}
          onError={() =>
            setError(
              "The film could not be loaded. Please try again, or read the transcript below.",
            )
          }
          onTimeUpdate={() => {
            const film = filmRef.current;
            if (!film || !Number.isFinite(film.duration) || film.duration <= 0)
              return;
            for (const position of [25, 50, 75]) {
              if (
                (film.currentTime / film.duration) * 100 >= position &&
                !milestones.current.has(position)
              ) {
                milestones.current.add(position);
                track("film_position_milestone", { position });
              }
            }
          }}
          onEnded={() => {
            const restoreFocus = document.activeElement === filmRef.current;
            setMode("ended");
            track("film_ended");
            if (restoreFocus) {
              requestAnimationFrame(() => replayRef.current?.focus());
            }
          }}
        >
          {mode !== "preview" && (
            <track
              kind="captions"
              src={VIDEO.captions}
              srcLang="en"
              label="English"
              default
            />
          )}
        </video>
        {mode === "ended" && (
          <div className={styles.endCard}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={VIDEO.poster} alt="" className={styles.video} />
            <div className={styles.endActions}>
              <Link
                href="/contact"
                className={`button button-primary ${styles.endPrimary}`}
                onClick={() => track("cta_click", { location: "film_end" })}
              >
                Let’s build your app{" "}
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
              <button
                ref={replayRef}
                type="button"
                className={styles.replay}
                onClick={() => play(0, "replay")}
              >
                <RotateCcw size={15} aria-hidden="true" /> Watch again
              </button>
            </div>
          </div>
        )}
      </div>
      {error && (
        <p id="film-error" className={styles.error} role="status">
          {error}
        </p>
      )}
      <div className={styles.below}>
        <nav className={styles.chapters} aria-label="Film chapters">
          {CHAPTERS.map((chapter) => (
            <button
              key={chapter.label}
              type="button"
              className={styles.chapter}
              onClick={() => {
                track("film_chapter_click", { chapter: chapter.label });
                play(chapter.t, "chapter");
              }}
            >
              <span
                className={styles.timecode}
              >{`0:${String(Math.floor(chapter.t)).padStart(2, "0")}`}</span>
              {chapter.label}
            </button>
          ))}
        </nav>
        <div className={styles.cta}>
          <Link
            href="/contact"
            className="button button-primary"
            onClick={() => track("cta_click", { location: "film_section" })}
          >
            Let’s build your app <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
          <button
            type="button"
            className={styles.transcriptToggle}
            aria-expanded={showTranscript}
            aria-controls="film-transcript"
            onClick={() => setShowTranscript((value) => !value)}
          >
            {showTranscript ? "Hide transcript" : "Read transcript"}
          </button>
        </div>
      </div>
      <div
        id="film-transcript"
        className={styles.transcript}
        hidden={!showTranscript}
      >
        <p>[Soft piano. A pencil sketches an app screen.]</p>
        <p>
          <strong>Man:</strong> What if it worked like this?
        </p>
        <p>
          <strong>Woman:</strong> That’s it. Simple and clear.
        </p>
        <p>
          [A phone shows The Foley Collective services. A gold coin spins and
          lands.]
        </p>
        <p>On screen: The Foley Collective. Good ideas deserve great apps.</p>
      </div>
    </section>
  );
}
