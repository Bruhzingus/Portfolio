import { useState, useCallback, useEffect, useRef } from 'react';
import Badge from './Badge';
import SpecSheet from './SpecSheet';

const COVER_W     = 390;   // normal cover width
const COVER_W_EXP = 720;   // expanded (video playing) width
const GAP         = 28;
const STEP        = COVER_W + GAP;

function Cover({ project, index, total, distance, active, playing, onSelect, onPlay, onClose }) {
  const videoRef = useRef(null);
  const isDemo    = project.type === 'software' && !!project.video;
  const isExpanded = active && playing;

  // Start / stop video when expanded state changes
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isExpanded) {
      v.currentTime = 0;
      v.play().catch(() => {});
    } else {
      v.pause();
      v.currentTime = 0;
    }
  }, [isExpanded]);

  const abs = Math.abs(distance);
  const style = {
    transform: `scale(${active ? 1 : 1 - Math.min(abs, 2) * 0.12})`,
    opacity:   active ? 1 : abs === 1 ? 0.66 : 0.34,
  };

  const handleClick = () => {
    if (!active) { onSelect(index); return; }
    if (isDemo)  isExpanded ? onClose() : onPlay();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  const label = !active
    ? `View ${project.title}`
    : isDemo
      ? isExpanded ? `Stop demo of ${project.title}` : `Play demo of ${project.title}`
      : project.title;

  return (
    <article
      className={
        'cover' +
        (active      ? ' is-active'   : '') +
        (isDemo      ? ' is-demo'     : '') +
        (isExpanded  ? ' is-expanded' : '')
      }
      style={style}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={label}
    >
      <div className="cover-media">
        {project.image && (
          <img src={project.image} alt={project.title} loading="lazy" />
        )}
        {isDemo && (
          <video
            ref={videoRef}
            src={project.video}
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

      {isDemo && !isExpanded && (
        <div className="cover-demo-hint" aria-hidden="true">
          <svg viewBox="0 0 48 48" fill="none" width="52" height="52">
            <circle cx="24" cy="24" r="23" fill="rgba(0,0,0,0.55)" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" />
            <path d="M19 15l16 9-16 9V15z" fill="#fff" />
          </svg>
          <span>Click to watch demo</span>
        </div>
      )}

      {isExpanded && (
        <button
          className="cover-stop"
          onClick={e => { e.stopPropagation(); onClose(); }}
          aria-label="Stop video"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round" width="12" height="12">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </article>
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

const isDemo = (item) => item.type === 'software' && !!item.video;

const Chev = ({ dir }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
    {dir === 'left' ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 6l6 6-6 6" />}
  </svg>
);

export default function Viewer({ id, kicker, title, items, autoplay = false }) {
  const [center,  setCenter]  = useState(0);
  // autoplay viewers start expanded on the first demo item
  const [playing, setPlaying] = useState(() => autoplay && isDemo(items[0]));
  const n      = items.length;
  const touchX = useRef(null);

  const go = useCallback((dir) => {
    const next = (center + dir + n) % n;
    setPlaying(autoplay ? isDemo(items[next]) : false);
    setCenter(next);
  }, [n, center, autoplay, items]);

  const select = useCallback((i) => {
    setPlaying(autoplay ? isDemo(items[i]) : false);
    setCenter(i);
  }, [autoplay, items]);

  const active     = items[center];
  const handlePlay  = useCallback(() => setPlaying(true),  []);
  const handleClose = useCallback(() => setPlaying(false), []);

  const handleTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const handleTouchEnd   = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    touchX.current = null;
  };

  // Shift the track left by the extra half-width when a cover expands
  const offset     = playing ? COVER_W_EXP / 2 : COVER_W / 2;
  const trackStyle = { transform: `translateX(calc(-${offset}px - ${center * STEP}px))` };

  return (
    <section className="viewer" id={id}>

      <div className="viewer-head">
        <div className="titles">
          <span className="viewer-kicker">{kicker}</span>
          <h2 className="viewer-title">{title}</h2>
        </div>
        <span className="counter">
          <b>{String(center + 1).padStart(2, '0')}</b> / {String(n).padStart(2, '0')}
        </span>
      </div>

      {/* flow-wrap sits outside .flow so arrows are never clipped by the edge mask */}
      <div className="flow-wrap">
        <button className="flow-arrow flow-arrow--prev" aria-label="Previous" onClick={() => go(-1)}>
          <Chev dir="left" />
        </button>

        <div className="flow" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          <div className="flow-track" style={trackStyle}>
            {items.map((p, i) => (
              <Cover
                key={p.id}
                project={p}
                index={i}
                total={n}
                distance={i - center}
                active={i === center}
                playing={playing && i === center}
                onSelect={select}
                onPlay={handlePlay}
                onClose={handleClose}
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

      <Spread key={active.id} project={active} />
    </section>
  );
}
