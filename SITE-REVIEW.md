# Portfolio review — October 12, 2026

Reviewed the portfolio, quote page, shared components, project data, page metadata, structured data, no-JavaScript fallback, and crawler summary. The real photos, hardware specifications, budgets, and actual software functions are the strongest material. The final design preserves the original visual identity and revolving project display while simplifying decorative effects and promotional copy.

## Changes made

- Restored the original dark navy and blue palette, bold headings, larger portrait, rounded panels, and blue buttons. The original Hanken Grotesk font is served locally; navigation uses readable sans-serif text at normal size and spacing.
- Increased the PC-services hero video's share of the layout, balanced the adjacent heading, and added a subtle blue border and neutral shadow. The video retains its full uncropped frame and uses the available tablet width.
- Flattened page and panel backgrounds, removed neon résumé/footer traces and glow shadows, and kept gradient treatment limited to image captions and carousel edge masks.
- Restored the full revolving coverflow for all four hardware and three software projects: side previews, arrows, dots, swipe, keyboard navigation, wraparound, and expanding software demos. The selected project's description and specifications are displayed below.
- Active software demos and the PC-services hero video autoplay while visible. Software clips expand into their original large presentation; native controls and a separate demo play/pause button remain available. Videos pause offscreen and in hidden tabs; reduced-motion preferences stop automatic playback, and manual pauses are remembered.
- Focused videos load metadata to display their duration and avoid a persistent loading spinner. Removed the preload hook that downloaded every demo video in the background.
- Replaced the decorative ShiftClocker phone mockup with an actual frame from the supplied app demo.
- Availability now reads: “Currently employed. Available for PC builds and contract work.” PC inquiries go to the quote form; contract inquiries go to email. The résumé remains a quiet footer link.
- Replaced “punch above their weight” and vague biography language with a factual introduction. Shortened titles and project descriptions. Kept real budgets, component lists, software stacks, and functions.
- Restored the original testimonial masonry cards, oversized quotation marks, and attribution layout, with the section count and card numbers removed. Each original quote's first sentence forms the prominent opening text; the remaining sentences follow underneath without invented summaries or repetition.
- Simplified the quote page to services, a request form, questions, and existing terms. Removed “Most popular,” repetitive sales pitches, competitor comparisons, market-share estimates, and unsupported savings claims.
- Updated browser titles, social descriptions, structured data, the no-JavaScript fallback, and `public/llms.txt` to match the revised copy and availability.
- Replaced hidden form chips with labelled native controls and added keyboard navigation, confirmation focus, and an email fallback when submitting fails. An unavailable form endpoint no longer reports a successful submission.
- Fixed navigation from the quote page to portfolio sections: fragment targets now scroll into view after React mounts.
- Navigation emphasizes destination headings with a smooth settling motion and a short accent underline sweep, using only transform and opacity animation. Contact also emphasizes its heading, description, and email together, with a wider heading underline and a delayed sweep below the email. Repeated clicks restart the effect; reduced-motion preferences receive stationary underlines. Temporary animation layers are removed afterward.
- Removed unused reveal, background-video, and preload code. The carousel and its badges remain part of the design.

## Your wording and facts still needed

Rough notes are enough. These details should come from you; the current copy stays factual until you supply them.

| Area | Send me | Why it helps |
| --- | --- | --- |
| Introduction | Two or three sentences about what you like working on, how you got into it, and what you care about in a finished project. Current title/employer only if you want them public. | The current bio is accurate but still generic. Your actual reasons will give it a personal voice. |
| Contract work | What work you accept, examples of a good project, local or remote limits, and the time you can realistically commit alongside your job. | “Contract work” currently has an email route but no invented service list or rates. |
| Client gaming PC | What the client wanted, one part choice you debated, what you tested, and whether the approximately $2,200 total includes labour/taxes. | The budget is useful; a concrete decision or verified result makes it a case study. |
| Gaming/video editing PC | The actual budget, games or editing software, your role in assembly, and one result or upgrade decision. | Distinguishes this project from the other client build. |
| Your desktop and keyboard | A choice you like, one compromise, or what you would change next time. | Personal projects should sound like your own experience. |
| ShelfCast | Supported POS/CSV format, how forecasting works, whether anyone uses it today, and a real result or limitation. | Avoids universal compatibility and accuracy claims. |
| ShiftClocker | Current release status, store/repository link if public, what you learned, and the feature you most wanted for yourself. | Removed the unverified “production-ready” and upcoming Play Store claims. |
| Strength Academy | Whether it was coursework or a live business site, what usability testing found, and what you changed afterward. | Concrete testing findings are more useful than broad accessibility claims. |
| Testimonials | Confirm the quotations are the speakers’ exact words, they permit publication, and affiliations are current. Confirm whether Jeremy should be labelled “Former employer.” | Original quotations were preserved; their authenticity and current attribution need your confirmation. |

A useful project note has four parts: what you were trying to do; the choice you made; what actually happened; what you would do differently. Add dates or public links where available. Measurements should come from actual tests or receipts.

## Existing service policies to check

The published prices and legal terms were preserved, including their June 4, 2026 update date. Confirm the $200 build fee, $25 advice fee, $40/hour on-site rate, three-hour minimum, $40 travel fee, 3% parts fee, $20 setup add-on, free local delivery, and 60-day workmanship warranty still reflect your offer.

The terms still include a 2–5 day build estimate and a 24–48 hour response aim. Check whether those fit your schedule now that you are employed. The payment section says parts payments are non-refundable after purchase, while cancellations refer to retailer return policies; clarify your intended policy. Review the Windows licence wording against what you actually offer. These policies need your business decisions before their wording changes.

## Editing locations

- `src/data/data.js`: introduction, availability, projects, and testimonials.
- `src/data/quote-data.js`: service pricing, service text, FAQs, and terms.
- `src/styles/tokens.css`: shared colours and font stack.
- `src/styles/kit.css` and `src/styles/quote.css`: shared layout and quote layout.
- `index.html`, `quote.html`, and `public/llms.txt`: matching search/social/fallback copy.

## Verification

`npm run build` passed. Browser checks passed on both pages at widths of 1440, 1024, 768, 390, and 320 pixels: no horizontal overflow, broken images, or runtime errors. Gallery arrows, dots, side covers, wrapping, keyboard navigation, swipes, centering after resizing, and matching specifications work. Normal-motion playback, offscreen pause, persistent manual pause, and reduced-motion handling passed for the software demos and quote hero. All four videos decode, play, and pause correctly. Mobile menu links, Escape, focus return, and navigation between pages work.

Form submission success, validation failure, and network failure were tested with intercepted requests. The tests verified request contents, disabled controls while sending, confirmation focus, retained input after failure, and the populated email fallback. No real request was submitted. Existing terms, their introduction, and their update date match the original version exactly.

`node scripts/check.mjs` reruns the browser checks against a running local preview. Set `BASE` to use a different local server. `node scripts/shoot.mjs` saves desktop/mobile screenshots in the ignored `scripts/shots` directory.

Changes are in the local checkout. The résumé PDF and existing project photos/demos have been retained. No deployment was performed.
