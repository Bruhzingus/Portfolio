const ANIMATION_ID = 'nav-section-attention';
let clearActiveCue;

export default function drawSectionAttention(section) {
  clearActiveCue?.();
  const heading = section.querySelector('h1, h2');
  if (!heading) return;
  const contact = section.id === 'contact';
  const content = contact ? section.querySelector('.foot-contact') || heading : heading;
  const email = contact ? section.querySelector('.contact-email') : null;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const animations = [];
  const lines = [];
  const previousWillChange = content.style.willChange;
  let cleared = false;

  const clear = () => {
    if (cleared) return;
    cleared = true;
    animations.forEach((animation) => animation.cancel());
    lines.forEach((line) => line.remove());
    heading.classList.remove('nav-attention-heading');
    email?.classList.remove('nav-attention-email');
    content.style.willChange = previousWillChange;
    if (clearActiveCue === clear) clearActiveCue = undefined;
  };
  clearActiveCue = clear;

  // Animate only transform and opacity so text does not repaint on each frame.
  if (!reduced) {
    content.style.willChange = 'transform, opacity';
    const settle = content.animate([
      { transform: `translate3d(0, ${contact ? 12 : 7}px, 0)`, opacity: contact ? .7 : .85 },
      { transform: 'translate3d(0, 0, 0)', opacity: 1 },
    ], { duration: 650, easing: 'cubic-bezier(.16, 1, .3, 1)' });
    settle.id = ANIMATION_ID;
    animations.push(settle);
  }

  const addUnderline = (target, className, delay = 0) => {
    const line = document.createElement('span');
    line.className = `nav-attention-line ${className}`;
    line.setAttribute('aria-hidden', 'true');
    target.append(line);
    lines.push(line);
    const animation = line.animate(
      reduced ? [{ opacity: 1 }, { opacity: 1 }] : [
        { transform: 'scaleX(0)', opacity: 0 },
        { transform: 'scaleX(1)', opacity: 1, offset: .35 },
        { transform: 'scaleX(1)', opacity: 1, offset: .65 },
        { transform: 'scaleX(1)', opacity: 0 },
      ],
      { duration: reduced ? 900 : contact ? 1800 : 1400, delay: reduced ? 0 : delay, easing: 'cubic-bezier(.22, 1, .36, 1)' }
    );
    animation.id = `${ANIMATION_ID}-underline`;
    animations.push(animation);
    return animation;
  };

  heading.classList.add('nav-attention-heading');
  let finalAnimation = addUnderline(heading, contact ? 'nav-attention-line--contact' : '');
  if (email) {
    email.classList.add('nav-attention-email');
    finalAnimation = addUnderline(email, 'nav-attention-line--email', 100);
  }
  finalAnimation.finished.then(clear, clear);
}
