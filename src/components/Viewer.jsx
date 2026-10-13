import { useEffect, useRef, useState } from 'react';
import Badge from './Badge';
import SpecSheet from './SpecSheet';
import useCoverflow from '../hooks/useCoverflow';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';

function Cover({ project, index, total, distance, active, inView, reduced, onSelect, onVideoElement, onPlayingChange }) {
  const videoRef = useRef(null);
  const automaticPause = useRef(false);
  const [playback, setPlayback] = useState('auto');
  const isDemo     = project.type === 'software' && !!project.video;
  const isPortrait = !!project.portrait;
  // A focused video cover auto-expands to a landscape frame and plays, no clicks needed.
  const isExpanded = active && isDemo;

  // Autoplay requires focus, viewport visibility, and motion permission. A manual
  // play request can still run with reduced motion; an explicit pause persists.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const shouldPlay = isExpanded && inView &&
      (playback === 'play' || (playback === 'auto' && !reduced));
    if (shouldPlay) {
      v.play().catch(() => {});
    } else {
      if (!v.paused) {
        automaticPause.current = true;
        v.pause();
      }
      if (!isExpanded) v.currentTime = 0;
    }
  }, [isExpanded, inView, reduced, playback]);

  const handlePlay = () => {
    onPlayingChange(index, true);
    // Native controls can restart a paused demo, including with reduced motion.
    setPlayback((current) => current === 'paused' || reduced ? 'play' : current);
  };
  const handlePause = () => {
    onPlayingChange(index, false);
    if (!automaticPause.current && active && inView) setPlayback('paused');
    automaticPause.current = false;
  };

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
          <img src={project.image} alt={project.title} loading="lazy" decoding="async" />
        )}
        {isDemo && (
          <video
            ref={(element) => {
              videoRef.current = element;
              onVideoElement(index, element);
            }}
            id={`${project.id}-demo`}
            src={project.video}
            poster={project.image}
            preload={isExpanded ? 'metadata' : 'none'}
            loop muted playsInline
            controls={active}
            aria-label={`${project.title} demonstration`}
            onPlay={handlePlay}
            onPause={handlePause}
            className={'cover-video' + (isExpanded ? ' is-playing' : '')}
          />
        )}
      </div>

      <div className="scrim" aria-hidden="true" />

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
    <div className="spread">
      <div className="spread-l">
        <span className="spread-kicker">
          {isSw ? 'Software' : 'Hardware'} &middot; {project.tag}
        </span>
        <h3 className="spread-title">{project.title}</h3>
        <p className="spread-desc">{project.desc}</p>
        {isSw && (
          <div className="spread-tags">
            {project.stack?.map((t) => (
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
    strokeLinecap="round" strokeLinejoin="round" width="20" height="20" aria-hidden="true">
    {dir === 'left' ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 6l6 6-6 6" />}
  </svg>
);

export default function Viewer({ id, title, description, items }) {
  const videoElements = useRef({});
  const [playingVideos, setPlayingVideos] = useState({});
  const n = items.length;
  const { center, go, select, inView, flowRef, trackRef, handleTouchStart, handleTouchEnd, handleTouchCancel } =
    useCoverflow(n);
  const reduced = usePrefersReducedMotion();
  const active = items[center];
  const isPlaying = !!playingVideos[center];
  const registerVideo = (index, element) => { videoElements.current[index] = element; };
  const updatePlaying = (index, playing) => setPlayingVideos((current) =>
    current[index] === playing ? current : { ...current, [index]: playing }
  );
  const toggleDemo = () => {
    const video = videoElements.current[center];
    if (!video) return;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  };

  const handleCarouselKeyDown = (event) => {
    if (event.target.closest('video, button, input, textarea, select, a, [contenteditable="true"]')) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      go(event.key === 'ArrowLeft' ? -1 : 1);
    }
  };

  if (!active) return null;

  return (
    <section className="viewer" id={id} aria-labelledby={`${id}-title`}>

      <div className="viewer-head">
        <div className="titles">
          <h2 className="viewer-title" id={`${id}-title`}>{title}</h2>
          {description && <p>{description}</p>}
        </div>
        <span className="counter">
          <b>{String(center + 1).padStart(2, '0')}</b> / {String(n).padStart(2, '0')}
        </span>
      </div>

      {/* flow-wrap sits outside .flow so arrows are never clipped by the edge mask */}
      <div className="flow-wrap">
        <button type="button" className="flow-arrow flow-arrow--prev" aria-label={`Previous project in ${title}`} onClick={() => go(-1)}>
          <Chev dir="left" />
        </button>

        <div
          className="flow"
          ref={flowRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchCancel}
          onKeyDown={handleCarouselKeyDown}
          tabIndex={0}
          role="group"
          aria-roledescription="carousel"
          aria-label={title}
          aria-describedby={`${id}-carousel-help`}
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
                onVideoElement={registerVideo}
                onPlayingChange={updatePlaying}
              />
            ))}
          </div>
        </div>

        <button type="button" className="flow-arrow flow-arrow--next" aria-label={`Next project in ${title}`} onClick={() => go(1)}>
          <Chev dir="right" />
        </button>
      </div>

      {active.type === 'software' && active.video && (
        <div className="demo-controls">
          <button type="button" className="demo-toggle" onClick={toggleDemo}
            aria-controls={`${active.id}-demo`}
            aria-label={`${isPlaying ? 'Pause' : 'Play'} ${active.title} demonstration`}>
            {isPlaying ? 'Pause demo' : 'Play demo'}
          </button>
        </div>
      )}

      <div className="dots">
        {items.map((p, i) => (
          <button
            key={p.id}
            className={'dot' + (i === center ? ' on' : '')}
            type="button"
            aria-label={'Go to ' + p.title}
            aria-pressed={i === center}
            onClick={() => select(i)}
          />
        ))}
      </div>

      <p className="sr-only" id={`${id}-carousel-help`}>Use the left and right arrow keys, the navigation buttons, or swipe to choose a project.</p>

      {/* Announce the focused project to screen readers as it changes */}
      <p className="sr-only" aria-live="polite">
        {`Showing ${center + 1} of ${n}: ${active.title}`}
      </p>

      <Spread key={active.id} project={active} />
    </section>
  );
}
