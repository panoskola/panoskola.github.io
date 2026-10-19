# IaC feature section for `site-analytics-iac`

Date: 2026-10-19
Status: draft, awaiting review

## Goal

`site-analytics-iac` is the owner's proudest project. It should be the first feature section a visitor (typically a recruiter) reaches, and it should be explorable the same way the Home Lab section is. Within 30 seconds a visitor should understand that the owner builds, secures and monitors infrastructure through code, and should be able to interact with it.

## Scope

In scope:
- A new `#iac` section placed before `#lab`.
- Three interactive parts and an incidents list (below).
- Nav link, EN/EL strings, terminal commands, search overlay entry, sitemap/README/"Last updated".
- A link from the existing `site-analytics` project card to the new repo.

Out of scope: changing the hero, theme or colours; changing the Home Lab section; a second project card; new dependencies or build tooling (the site stays static HTML, CSS and vanilla JS).

## Page structure

Nav order: About, Stack, Experience, **IaC**, Home Lab, Projects, Credentials, Contact.

`#iac` follows the pattern of `#lab` (`index.html`): `section.feature`, `.wrap`, `.section-head`, an intro paragraph, glass cards with `reveal`, a `sub-head` plus incidents list. All text lives in `assets/js/content.js` under `iac.*` keys with `en` and `el` values and is rendered by a new `renderIac()` called from `renderAll()` in `assets/js/main.js`.

Section title: "Infrastructure as Code: self-hosted analytics" (EL equivalent). Intro: one paragraph taken from the repository README (one `terraform apply`, one `ansible-playbook`, CI/CD with a manual approval gate). Includes a "View code on GitHub" button to `https://github.com/panoskola/site-analytics-iac`.

## Components

### 1. Pipeline diagram (card)
Inline SVG in the style of the lab topology. Nodes: `git push` → `CI` (yamllint, ansible-lint, terraform fmt/validate) → `Approval` → `ansible-playbook over SSH` → `VM`.
- Button "Run pipeline" plays one-shot animated packets along the path, reusing the `t-ping` mechanism used by the lab.
- The packet stops at `Approval`. The button becomes "Approve" and continuing plays the rest. A caption (`aria-live="polite"`) narrates each step, like `.flow-cap`.
- Caption on completion states that an unchanged repo reports `changed=0` (idempotency).
- A note that Terraform is validated in CI but applied by hand, because the credentials never leave the maintainer's machine.

### 2. Architecture and alert drill (card)
Inline SVG: Oracle Cloud (Frankfurt) containing the VM (Ubuntu 24.04, A1 Flex arm64; Docker Compose with Umami, PostgreSQL, Caddy; monitoring stack) and the Object Storage bucket (30-day expiry), plus Discord and the visitor.
- Button "Stop node exporter" (aria-pressed toggle, same pattern as `#break-btn`): the node-exporter node goes red, an alert row appears (`TargetDown`), a Discord node shows "firing"; toggling back shows "resolved". Mirrors the end-to-end alert test described in the repo README.
- Clicking the bucket plays the nightly backup path and the Sunday restore test, with a caption.

### 3. Security and reliability cards
A grid of six cards, each expanding on click or Enter to show the reason:
Secrets in Ansible Vault; instance principal (no cloud credentials on the server); dedicated deploy key; approval gate with environment secrets; hardened host (keys only, no root, fail2ban, `sshd -t`); pinned versions. A seventh card: weekly automated restore test ("a backup that has never been restored is not a backup").

### 4. Incidents list
Same markup and styles as `#incidents`, three entries from the README: SSH hardening silently ignored (`sshd -T`), Ansible `git` module refusing to update (mode in git), `changed=1` on every run (`changed_when`).

## Supporting changes

- `index.html`: nav link, section markup.
- `content.js`: `nav.iac` and `iac.*` strings in both languages.
- `main.js`: `renderIac()`, pipeline and alert-drill handlers, card expand handler, entry in the search overlay list near `main.js:787`, new terminal commands (`iac`, `terraform plan`, `ansible-playbook`) alongside the existing lab commands.
- `style.css`: styles for the new components, reusing existing tokens (`--accent`, `--accent-2`, `.glass`, `.t-*` classes) in both themes.
- Project card `site-analytics`: add a second link to the IaC repo (new `repoIac` field or equivalent) without adding another card.
- `sitemap.xml` untouched unless a new URL appears (it does not, since this is an anchor); `README.md` updated to mention the section; "Last updated" refreshed the way the site already does it.

## Behaviour requirements

- Works in light and dark theme and in EN and EL, including re-render on language switch.
- All interactive SVG groups are keyboard reachable (`role="button"`, `tabindex="0"`, Enter and Space), like `.t-click`.
- With `prefers-reduced-motion`, animations are skipped and the final state with its caption is shown immediately.
- No horizontal scroll at 360px width; the SVGs scale with `viewBox`.
- No new network requests; no changes to the analytics script.

## Verification

The site has no test suite. Verify by serving it locally and checking in a browser: light and dark, EN and EL, desktop and mobile width, reduced motion, keyboard-only use of every control, and no errors in the console. Report exactly what was and was not checked.

## Open decisions

None. Wording of the EL strings follows the existing tone of `content.js`.
