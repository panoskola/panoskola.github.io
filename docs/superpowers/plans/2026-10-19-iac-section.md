# IaC Feature Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an interactive `#iac` feature section, placed before `#lab`, that showcases the `site-analytics-iac` repository.

**Architecture:** Same pattern as `#lab`: static markup in `index.html`, all text in `assets/js/content.js` (EN and EL), rendering and handlers in the single IIFE in `assets/js/main.js`, styles in `assets/css/style.css` reusing existing tokens and `.t-*` SVG classes. No new dependencies.

**Tech Stack:** Static HTML, CSS, vanilla JS (ES5 style, `var` and `function`, as in the existing files).

**Spec:** `docs/superpowers/specs/2026-10-19-iac-section-design.md`

## Global Constraints

- Repo URL: `https://github.com/panoskola/site-analytics-iac`
- Nav order: About, Stack, Experience, **IaC**, Home Lab, Projects, Credentials, Contact; nav key `nav.iac`.
- Section title: "Infrastructure as Code: self-hosted analytics" (EN) with a natural Greek equivalent in the tone of the existing EL strings.
- All new text lives in `content.js` as `{en, el}`; ui keys are prefixed `iac.`.
- Code style: ES5 (`var`, `function`), helpers `$`, `$$`, `t(key)`, `L(obj)`, `esc(s)`, `reduceMotion` already in scope in `main.js`.
- Interactive SVG groups: `role="button"`, `tabindex="0"`, Enter and Space activate (copy the `.t-click` keydown handler pattern near `main.js:745`).
- With `reduceMotion`, skip animation and show the final state plus caption immediately.
- No horizontal scroll at 360px; SVGs use `viewBox` and `width:100%`.
- Works after a language switch (`renderAll()` re-renders everything) and in both themes.
- No new network requests; do not touch the analytics `<script>` tag.
- Out of scope: hero, theme, colours, Home Lab section, a second project card.

## Review Focus

- Language switch while the pipeline is mid-animation or paused at Approval: no stale text, no stuck disabled button.
- Clicking "Run pipeline" again, or toggling the drill rapidly, must not stack timers (clear the previous timers first, as `flowTimers` does).
- `renderAll()` re-runs `renderIac()`; handlers attached once at init must keep working because they are delegated on stable containers.
- Search overlay and tool highlighting (`toolTargets`) must not throw if `#iac` content is empty.
- Print stylesheet: the new buttons are hidden like `.break-bar`.

---

### Task 1: Content, markup scaffold and static rendering

**Files:**
- Modify: `assets/js/content.js` (ui strings in both `en` and `el` blocks; new top-level `iac` and `iacIncidents`)
- Modify: `index.html` (nav link after `#experience`; new `<section id="iac">` before the `<!-- ============ LAB` comment)
- Modify: `assets/js/main.js` (new `renderIac()`, called from `renderAll()` after `renderLab()`)
- Modify: `assets/css/style.css` (rules for `.iac-grid`, `.iac-sec`, `.sec-card`)

**Interfaces:**
- Produces in `content.js`:
  - ui keys: `nav.iac`, `iac.title`, `iac.intro`, `iac.repo`, `iac.pipe` (card heading), `iac.arch` (card heading), `iac.sec` (heading), `iac.broke` (incidents heading), `iac.why` (label on expanded security card).
  - `SITE.iac.security`: array of 7 `{ title: {en,el}, why: {en,el} }` in the spec's order (Vault, instance principal, deploy key, approval gate, hardened host, pinned versions, weekly restore test).
  - `SITE.iacIncidents`: array of 3 `{ cmd: string, title, body, lesson }` (same shape as `SITE.incidents`): `sshd -T`, `git update-index --chmod=+x`, `changed_when`.
- Produces in `index.html`: ids `iac`, `iac-pipe` (pipeline card container), `iac-arch` (architecture card container), `iac-sec` (security grid), `iac-incidents`.
- Produces in `main.js`: `function renderIac()` that fills `#iac-sec` and `#iac-incidents`; a delegated click/keydown handler on `#iac-sec` toggling `aria-expanded` on `.sec-card` (the `why` text is hidden when collapsed).

- [ ] **Step 1: Add content.** Write the strings and arrays above in both languages using the README of `site-analytics-iac` as the source (security section, "What broke" section). Incident `cmd` values are the commands named in the README.
- [ ] **Step 2: Add markup.** Nav link `<a href="#iac" data-i18n="nav.iac">IaC</a>` between Experience and Home Lab. Section skeleton follows `#lab`: `section.feature`, `.wrap`, `.section-head` with `data-i18n="iac.title"`, intro `<p class="lab-intro" data-i18n="iac.intro">`, a `.btn.btn-ghost.btn-sm` link to the repo (copy the GitHub SVG from the `#lab` button), empty glass cards with the ids above, then `<h3 class="sub-head" data-i18n="iac.broke">` and `<div class="incidents" id="iac-incidents">`.
- [ ] **Step 3: Implement `renderIac()`** in `main.js`; security cards are `<button class="sec-card glass" aria-expanded="false">` containing title and a `<p class="sec-why">`. Incidents reuse the markup built in `renderLab()` (extract a shared helper `incidentHtml(x)` rather than duplicating, and make `renderLab` use it too).
- [ ] **Step 4: CSS.** `.sec-card` collapsed shows only the title; `[aria-expanded="true"]` reveals `.sec-why`. Grid: `repeat(auto-fit, minmax(240px, 1fr))`. Add the `#iac-incidents` mobile rule next to `.incidents` at `style.css:563` if not already covered by the `.incidents` class.
- [ ] **Step 5: Verify.** Run `node --check assets/js/content.js && node --check assets/js/main.js` (expect no output). Serve with `python -m http.server 8080` in the repo root, open `http://localhost:8080/`: the IaC nav link scrolls to the section, 7 security cards expand and collapse by click and by keyboard, 3 incidents render, language switch updates all text, the existing Home Lab incidents still render, console has no errors.
- [ ] **Step 6: Commit.** `git add index.html assets && git commit -m "Add IaC section scaffold with security cards and incidents"`

### Task 2: Pipeline diagram

**Files:**
- Modify: `index.html` (SVG inside `#iac-pipe`, button and caption)
- Modify: `assets/js/content.js` (`SITE.iac.pipeline`, ui keys `iac.run`, `iac.approve`, `iac.replay`, `iac.pipenote`)
- Modify: `assets/js/main.js` (pipeline handler)
- Modify: `assets/css/style.css` (node, state classes)

**Interfaces:**
- Consumes: `#iac-pipe` from Task 1; `.t-ping` and `.go` animation from `style.css:659-664`; caption pattern `.flow-cap`, `.flow-bar`, `.flow-play`.
- Produces: `SITE.iac.pipeline` = array of 6 `{ node: string, text: {en,el} }` in order: `git push`, `CI`, `Approval`, `ansible-playbook`, `VM`, `changed=0`. SVG with nodes `data-n="0".."5"` and connecting paths `id="pipe-link-1".."pipe-link-5"`. Button `#pipe-run`, caption `#pipe-cap` (`aria-live="polite"`). Function `runPipeline()` in the main IIFE and a `pipeTimers` array.

- [ ] **Step 1: Add content and SVG.** Nodes laid out left to right (wrapping to two rows is acceptable on narrow `viewBox` if needed), labels from the spec: CI node sublabel "yamllint · ansible-lint · terraform validate". Note under the card (`iac.pipenote`): Terraform is validated in CI but applied by hand because the credentials never leave the maintainer's machine.
- [ ] **Step 2: Implement `runPipeline()`.** Click `#pipe-run` starts: clear `pipeTimers`, reset node classes (`on`, `done`), step through nodes 0 to 2 every 1100 ms setting caption text and class `on`, animating the link path with the `go` class. At node 2 (Approval) stop; set the button text to `iac.approve`. A second click continues with nodes 3 to 5, then sets the button text to `iac.replay`. Clicking after completion restarts from 0.
- [ ] **Step 3: Reduced motion.** If `reduceMotion`, the first click shows all nodes `done` and the caption lists all six `text` entries joined as numbered steps, like the existing code at `main.js:853-857`.
- [ ] **Step 4: Verify.** Syntax check as in Task 1. In the browser: Run → stops at Approval with the button reading "Approve" → continues to `changed=0`; Replay restarts cleanly; switching language mid-run updates the button and caption without leaving the button disabled; keyboard Enter and Space on the button work; with DevTools "prefers-reduced-motion: reduce" emulated the final state appears at once.
- [ ] **Step 5: Commit.** `git add -A assets index.html && git commit -m "Add interactive CI/CD pipeline diagram to IaC section"`

### Task 3: Architecture diagram and alert drill

**Files:**
- Modify: `index.html` (SVG inside `#iac-arch`, `#drill-btn`, `#drill-note`)
- Modify: `assets/js/content.js` (ui keys `iac.drill`, `iac.drill.undo`, `iac.drill.firing`, `iac.drill.resolved`, `iac.backup.nightly`, `iac.backup.restore`, `iac.arch.hint`)
- Modify: `assets/js/main.js` (`renderDrill()` and handlers)
- Modify: `assets/css/style.css` (`.arch-svg.alerting` state, reusing `.broken` styles as the model at `style.css:754-758`)

**Interfaces:**
- Consumes: `#iac-arch` from Task 1; `labBroken`/`renderBreak()` at `main.js:748-770` as the pattern to copy; `.t-ping` classes.
- Produces: SVG groups with ids `arch-nodeexp` (node exporter), `arch-discord`, `arch-bucket`, paths `arch-backup` and `arch-restore`; module variable `var drilling = false`; `function renderDrill()` that reflects `drilling` in the SVG class `alerting`, the button text/`aria-pressed`, and the note. `renderDrill()` is called from `renderAll()` after `renderBreak()`.

- [ ] **Step 1: Add SVG.** Frame "Oracle Cloud · Frankfurt" containing the VM (Ubuntu 24.04 · A1 Flex arm64; sub-boxes Caddy, Umami, PostgreSQL, and Prometheus, Alertmanager, node exporter), the Object Storage bucket ("backups · 30-day expiry"), outside the frame Discord and Visitor with HTTPS link. Use `.t-node`, `.t-name`, `.t-sub`, `.t-link`, `.t-host`.
- [ ] **Step 2: Alert drill.** `#drill-btn` toggles `drilling`. On: node exporter node turns red, an alert row `TargetDown` appears, Discord shows `iac.drill.firing`; note text explains it was tested end to end in the repo. Off: Discord shows `iac.drill.resolved`, cleared after 3500 ms (clear the previous timer first, per the pattern in `main.js:763-769`).
- [ ] **Step 3: Backup paths.** Clicking `#arch-bucket` (button semantics, keyboard accessible) plays `arch-backup` using the `t-ping` `go` class and shows `iac.backup.nightly` in the note; a second click within the same note plays `arch-restore` with `iac.backup.restore`. Remove `go` and force reflow before re-adding so it can replay.
- [ ] **Step 4: Verify.** Syntax check. In the browser: Stop → red state, `TargetDown` visible, Discord "firing"; toggle back → "resolved" then clears; rapid double toggling leaves a consistent state; bucket click animates and shows captions; language switch while drilling keeps the drill state and re-translates the text; keyboard works.
- [ ] **Step 5: Commit.** `git add -A assets index.html && git commit -m "Add architecture diagram with alert drill to IaC section"`

### Task 4: Site integration

**Files:**
- Modify: `assets/js/main.js` (`CMDS` at `main.js:538`, `goto` list at `main.js:~581`, `toolTargets()` at `main.js:~778`, `renderProjects()`)
- Modify: `assets/js/content.js` (`site-analytics` project: `repo2`)
- Modify: `assets/css/style.css` (print rules at `style.css:~614`)
- Modify: `README.md`

**Interfaces:**
- Consumes: `CMDS` entry shape `{ d: string, f: function(args) }`, helpers `C(cls, s)`, `sectionList`, `go(id)`.
- Produces: terminal commands `iac`, `terraform` (accepts `plan`), `ansible-playbook`; project field `repo2: { url: string, label: {en,el} }`.

- [ ] **Step 1: Terminal commands.** `iac` prints a summary (what it provisions, the pipeline, the repo link) plus a hint "goto iac". `terraform plan` prints a short plausible plan summary listing the resources named in the README (VCN, subnet, security list, A1 VM, bucket with lifecycle rule, dynamic group and policies) ending "Plan: N to add, 0 to change, 0 to destroy." where N equals the number of resources printed; any other argument prints `usage: terraform plan`. `ansible-playbook` prints a PLAY RECAP line with `changed=0` and the sentence about idempotency. Use the `{ delay, seq }` return form (see `ping`) for multi-line output.
- [ ] **Step 2: `goto iac`.** Add `iac` to the allowed list and the usage text; update the `goto` description string.
- [ ] **Step 3: Tool highlighting.** In `toolTargets()` push `{ kind: 'lab', els: $$('.glass', $('#iac')) ... }` only when `#iac` exists, using `name: t('nav.iac')` and `text: iac.textContent.toLowerCase()`; confirm clicking the "Terraform" or "Ansible" tag in the Stack section highlights the new section (add the tag-to-keys mapping in `SITE.toolKeys` only if those tags exist and are not already matched).
- [ ] **Step 4: Project card link.** In `renderProjects()` render a second `.btn.btn-ghost.btn-sm` when `p.repo2` exists. Add `repo2` to the `site-analytics` project in `content.js`.
- [ ] **Step 5: Print and README.** Hide `#pipe-run`, `#drill-btn` in the print block next to `.break-bar`. Add one line to `README.md` mentioning the IaC section.
- [ ] **Step 6: Verify.** Syntax check. In the terminal overlay (press `` ` ``): `help` lists `iac`, `terraform`, `ansible-playbook`; each runs; `terraform apply` prints the usage line; `goto iac` scrolls; project card shows both links; clicking a Stack tag still works and no console errors.
- [ ] **Step 7: Commit.** `git add -A && git commit -m "Wire IaC section into terminal, search highlight and project card"`

### Task 5: Cross-cutting verification

**Files:** none expected; fix anything found in the files above.

- [ ] **Step 1: Matrix check in a browser.** Light and dark; EN and EL; 360px, 768px and desktop widths (no horizontal scroll); keyboard-only run through every new control; emulated reduced motion; reload mid-scroll on `#iac`; console free of errors and warnings.
- [ ] **Step 2: Regression check.** Home Lab "Break it", ping click on topology, project "Play the path", timeline and hero typing still work.
- [ ] **Step 3: Print preview** of the page shows the new section without buttons and without clipped content.
- [ ] **Step 4: Commit any fixes** with a message naming what was fixed. Report exactly which checks were run and which could not be run.
