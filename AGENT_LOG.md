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
