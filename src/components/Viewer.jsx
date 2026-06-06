import { useEffect, useRef } from 'react';
import Badge from './Badge';
import SpecSheet from './SpecSheet';
import useCoverflow from '../hooks/useCoverflow';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';

function Cover({ project, index, total, distance, active, inView, reduced, onSelect }) {
  const videoRef = useRef(null);
  const isDemo     = project.type === 'software' && !!project.video;
  const isPortrait = !!project.portrait;
  // A focused video cover auto-expands to a landscape frame and plays, no clicks needed.
  const isExpanded = active && isDemo;

  // Play only while focused AND scrolled into view AND motion is allowed. Combined
  // with preload="none" this also defers the video download until it's reached.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isExpanded && inView && !reduced) {
      v.play().catch(() => {});
    } else {
      v.pause();
      if (!isExpanded) v.currentTime = 0;
    }
  }, [isExpanded, inView, reduced]);

  const abs = Math.abs(distance);
  const style = {
    transform: `scale(${active ? 1 : 1 - Math.min(abs, 2) * 0.12})`,
    opacity:   active ? 1 : abs === 1 ? 0.66 : 0.34,
  };

  // Side covers are tappable to bring them into focus; the active cover is inert.
  const selectable = !active;
  const handleKeyDown = (e) => {
    if (selectable && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onSelect(index);
    }
  };

  return (
    <div
      className={
        'cover' +
        (active      ? ' is-active'   : '') +
        (isDemo      ? ' is-demo'     : '') +
        (isExpanded  ? ' is-expanded' : '') +
        (isPortrait  ? ' is-portrait' : '')
      }
      style={style}
      onClick={selectable ? () => onSelect(index) : undefined}
      onKeyDown={handleKeyDown}
      role={selectable ? 'button' : undefined}
      tabIndex={selectable ? 0 : undefined}
      aria-label={selectable ? `View ${project.title}` : undefined}
    >
      <div className="cover-media">
        {project.image && (
          <img src={project.image} alt={project.title} loading="lazy" />
        )}
        {isDemo && (
          <video
            ref={videoRef}
            src={project.video}
            poster={project.image}
            preload="none"
            loop muted playsInline
            className={'cover-video' + (isExpanded ? ' is-playing' : '')}
          />
        )}
      </div>

      <div className="scrim" />

      <div className="cover-top">
        <Badge type={project.type} />
        <span className="badge badge--ghost">
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </div>

      <div className="cover-foot">
        <span className="cover-num">{project.tag}</span>
        <h3 className="cover-title">{project.title}</h3>
      </div>
    </div>
  );
}

function Spread({ project }) {
  const isSw = project.type === 'software';
  return (
    <div className="spread spread-anim">
      <div className="spread-l">
        <span className="spread-kicker">
          {isSw ? 'Software' : 'Hardware'} &middot; {project.tag}
        </span>
        <h3 className="spread-title">{project.title}</h3>
        <p className="spread-desc">{project.desc}</p>
        {isSw && (
          <div className="spread-tags">
            {project.stack.map((t) => (
              <span className="tag" key={t}>{t}</span>
            ))}
          </div>
        )}
      </div>
      <div className="spread-r">
        <h4>{isSw ? 'What it does' : 'Spec sheet'}</h4>
        <SpecSheet project={project} />
      </div>
    </div>
  );
}

const Chev = ({ dir }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
    {dir === 'left' ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 6l6 6-6 6" />}
  </svg>
);

export default function Viewer({ id, kicker, title, items }) {
  const n = items.length;
  const { center, go, select, inView, flowRef, trackRef, handleTouchStart, handleTouchEnd } =
    useCoverflow(n);
  const reduced = usePrefersReducedMotion();
  const active = items[center];

  return (
    <section className="viewer" id={id}>

      <div className="viewer-head" data-reveal>
        <div className="titles">
          <span className="viewer-kicker">{kicker}</span>
          <h2 className="viewer-title">{title}</h2>
        </div>
        <span className="counter">
          <b>{String(center + 1).padStart(2, '0')}</b> / {String(n).padStart(2, '0')}
        </span>
      </div>

      {/* flow-wrap sits outside .flow so arrows are never clipped by the edge mask */}
      <div className="flow-wrap" data-reveal>
        <button className="flow-arrow flow-arrow--prev" aria-label="Previous" onClick={() => go(-1)}>
          <Chev dir="left" />
        </button>

        <div
          className="flow"
          ref={flowRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          role="group"
          aria-roledescription="carousel"
          aria-label={title}
        >
          <div className="flow-track" ref={trackRef}>
            {items.map((p, i) => (
              <Cover
                key={p.id}
                project={p}
                index={i}
                total={n}
                distance={i - center}
                active={i === center}
                inView={inView}
                reduced={reduced}
                onSelect={select}
              />
            ))}
          </div>
        </div>

        <button className="flow-arrow flow-arrow--next" aria-label="Next" onClick={() => go(1)}>
          <Chev dir="right" />
        </button>
      </div>

      <div className="dots">
        {items.map((p, i) => (
          <button
            key={p.id}
            className={'dot' + (i === center ? ' on' : '')}
            aria-label={'Go to ' + p.title}
            onClick={() => select(i)}
          />
        ))}
      </div>

      {/* Announce the focused project to screen readers as it changes */}
      <p className="sr-only" aria-live="polite">
        {`Showing ${center + 1} of ${n}: ${active.title}`}
      </p>

      <Spread key={active.id} project={active} />
    </section>
  );
}
