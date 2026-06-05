import { useState, useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import Badge from './Badge';
import SpecSheet from './SpecSheet';

function Cover({ project, index, total, distance, active, inView, onSelect }) {
  const videoRef = useRef(null);
  const isDemo    = project.type === 'software' && !!project.video;
  // A focused video cover auto-expands to a landscape frame and plays, no clicks needed.
  const isExpanded = active && isDemo;

  // Play only while focused AND scrolled into view. Combined with preload="none"
  // this also defers the video download until the section is actually reached.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isExpanded && inView) {
      v.play().catch(() => {});
    } else {
      v.pause();
      if (!isExpanded) v.currentTime = 0;
    }
  }, [isExpanded, inView]);

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
    <article
      className={
        'cover' +
        (active      ? ' is-active'   : '') +
        (isDemo      ? ' is-demo'     : '') +
        (isExpanded  ? ' is-expanded' : '')
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

const Chev = ({ dir }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
    {dir === 'left' ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 6l6 6-6 6" />}
  </svg>
);

export default function Viewer({ id, kicker, title, items }) {
  const [center, setCenter] = useState(0);
  const n      = items.length;
  const touchX = useRef(null);
  const flowRef  = useRef(null);
  const trackRef = useRef(null);
  const trackX   = useRef(0);  // current translateX of the track, in px
  const rafRef   = useRef(0);
  const didInit  = useRef(false);
  // Defaults to true where IntersectionObserver is unavailable so videos still work.
  const [inView, setInView] = useState(() => typeof IntersectionObserver === 'undefined');

  const go = useCallback((dir) => {
    setCenter((c) => (c + dir + n) % n);
  }, [n]);

  const select = useCallback((i) => setCenter(i), []);

  const active = items[center];

  const handleTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const handleTouchEnd   = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    touchX.current = null;
  };

  // Slide the active cover to the centre of the viewport. The software covers
  // expand/collapse (390px <-> 720px) while this runs, which shifts the whole
  // row mid-flight; handing the browser one fixed target and letting CSS
  // interpolate overshoots, because that target keeps moving as widths change.
  // Instead we drive the track each frame, pinning the active cover's *screen*
  // centre onto an eased path from where it sits now to the viewport centre and
  // re-reading its live width every frame. It lands dead-centre, never past it.
  const settle = useCallback((animate) => {
    const flow = flowRef.current;
    const track = trackRef.current;
    if (!flow || !track) return;
    const el = track.children[center];
    if (!el) return;

    cancelAnimationFrame(rafRef.current);
    track.style.transition = 'none';

    const flowCenter  = flow.clientWidth / 2;
    // Live centre of the active cover within the track (grows as it expands).
    const localCenter = () => el.offsetLeft + el.offsetWidth / 2;
    const reduceMotion =
      typeof matchMedia !== 'undefined' &&
      matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!animate || reduceMotion) {
      trackX.current = flowCenter - localCenter();
      track.style.transform = `translateX(${trackX.current}px)`;
      return;
    }

    const fromScreen = trackX.current + localCenter(); // where the cover is now
    const ease = (t) => 1 - Math.pow(1 - t, 3);        // ease-out cubic
    const DURATION = 600;                               // matches cover width transition
    const t0 = performance.now();

    const step = (now) => {
      const f = Math.min(1, (now - t0) / DURATION);
      const screen = fromScreen + (flowCenter - fromScreen) * ease(f);
      trackX.current = screen - localCenter();          // re-reads the live width
      track.style.transform = `translateX(${trackX.current}px)`;
      if (f < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
  }, [center]);

  // Position instantly on first paint; animate the slide on every change after.
  useLayoutEffect(() => {
    settle(didInit.current);
    didInit.current = true;
  }, [settle, n]);

  useEffect(() => {
    const onResize = () => settle(false);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [settle]);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  // Only load/play demo videos once this viewer nears the viewport, keeping the
  // heavy video off the initial page load.
  useEffect(() => {
    const el = flowRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { rootMargin: '200px', threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

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

        <div className="flow" ref={flowRef} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
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

      <Spread key={active.id} project={active} />
    </section>
  );
}
