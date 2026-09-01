# Agent Log

Append-only record of automated and agent-assisted changes to this repository.

Purpose: this work happens from more than one machine, so local notes are not a
reliable history. Anything an agent should know about a past change belongs
here, in the repository, not in a local file.

## Conventions

- Newest entry first. Never rewrite or delete an existing entry; correct it with
  a new one that says what it supersedes.
- Record what was verified and how, not just what was edited. "Fixed" without a
  check is not a result.
- Record open items and known-failing things explicitly, so the next agent does
  not rediscover them or assume they are already handled.
- No participant data, transcripts, consent records, committee or faculty names,
  credentials, or tokens.

---

## 2026-09-01 - Fix overlapping quadrant cells below 900px

**Reported from a screenshot**, showing the four-quadrant matrix rendering as two piles of
superimposed text: "Productive success" printed on top of "Unproductive success", and the
two failure cells likewise.

**Cause, and it is not the token adoption.** The four cells carry inline grid placement
from the wide layout:

```html
<div class="cell" style="grid-row:2;grid-column:2;">
<div class="cell danger" style="grid-row:2;grid-column:4;">
```

The 900px media query collapses the grid to `40px 1fr` and re-places the cells with
`.cell { grid-column: 2 !important; }`. That overrides the inline **column** but says
nothing about the **row**, so all four kept `grid-row: 2` and `grid-row: 3` and collided in
pairs. The bug is width-dependent and predates this week's colour work; verified by
measuring cell positions at three widths.

**Fix.** Reset the row as well at that breakpoint and let the cells auto-place into a
single stacked column, and let the left axis label span whatever rows they occupy:

```css
.cell { grid-column: 2 !important; grid-row: auto !important; }
.matrix-axis.left { grid-row: 1 / -1; }
```

**Verified by measuring the rendered geometry, not by eye.**

| viewport | distinct cell positions | overlapping |
| --- | --- | --- |
| 1440px | 4 | 0 - the 2x2 is preserved |
| 874px | 4 | 0 |
| 375px | 4 | 0, and no page-level horizontal scroll |

**Worth carrying forward.** Inline `style="grid-row:...;grid-column:..."` on grid children
is invisible to responsive CSS unless every property is overridden. A media query that
re-places such children must reset **both** axes, or the cells silently stack. Worth
grepping other repos for the same pattern before trusting their narrow layouts.


---

## 2026-08-31 - Adopt the shared ground only, and lift two failing ink tokens

**Ground adopted, surfaces deliberately not.** Mapping this page's surfaces to the shared
(lighter) ones measurably broke AA: `--ink-mute`, which is used on **76 elements**, fell
from 4.84 to **4.31**, and `--teal` fell from 4.51 to **4.02**. This page's text palette is
tuned to darker surfaces with very little headroom. So `--bg` takes the shared ground and
`--bg-2` and `--surface` stay local, which keeps every token passing on both.

**Two pre-existing failures lifted while here.**

- `--ink-dim` was `#5e5b53`: **2.74** on the ground and **2.57** on surfaces, a clear
  barrier. Now `#8d8a7f` at 5.37 / 5.04, still the dimmest ink in the ramp.
- `--gold-dim` was `#8e7444`: **4.19 / 3.93**, failing on both. Now `#a4884f` at 5.50 / 5.16.

**Verified.** Every text token checked against all three backdrops it can sit on. Worst
pair on the page is now **4.51** against a 4.5 threshold, and nothing fails.

**Worth knowing.** An automated probe reported the same failure count before and after
adoption, which suggested the token change was neutral here. It was not - the probe was
mis-resolving backdrops through gradients. The regression was only visible by computing the
layer stack directly. Do that before trusting a probe on a page with gradient grounds.

---

## 2026-08-31 - Honour prefers-reduced-motion

Found during an accessibility sweep across the dissertation ecosystem.

**Problem.** This page animates (2 animation or keyframes declarations) and did not
honour `prefers-reduced-motion`, so a visitor who has asked their operating system to
reduce motion still received the full effect. WCAG 2.1 AA and the project's own
guidance both expect that preference to be respected.

**Changed.** `index.html` (the inline `<style>` block) only: appended a `@media (prefers-reduced-motion: reduce)` block that
collapses animation and transition durations and disables smooth scrolling. Nothing else
was touched; no markup, no behaviour, no layout.

**Verified.** Tag balance parses clean and the file still has exactly one `<style>` block. With reduced motion active, durations collapse to `1e-05s`.

**Scope note.** The sweep deliberately fixed only real failures. Pages with no animation
were left alone rather than given a block they do not need, and pages that already
provided a visible focus style were not given a second one.
