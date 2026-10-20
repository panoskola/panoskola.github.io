/* ==========================================================
   Panayotis Kola — site logic (vanilla JS, no build step)
   ========================================================== */
(function () {
  'use strict';

  var S = window.SITE;
  var root = document.documentElement;
  var reduceMotion = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  function store(key, val) {
    try { if (val === undefined) return localStorage.getItem(key); localStorage.setItem(key, val); } catch (e) { return null; }
  }
  function lang() { return root.getAttribute('lang') === 'el' ? 'el' : 'en'; }
  function t(key) { var d = S.ui[lang()]; return (d && d[key] != null) ? d[key] : (S.ui.en[key] || ''); }
  function L(obj) { return obj && typeof obj === 'object' ? (obj[lang()] || obj.en) : obj; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  /* ---------------- i18n ---------------- */
  function applyI18n() {
    $$('[data-i18n]').forEach(function (el) { el.textContent = t(el.getAttribute('data-i18n')); });
    $$('[data-i18n-html]').forEach(function (el) { el.innerHTML = t(el.getAttribute('data-i18n-html')); });
    $$('[data-i18n-aria]').forEach(function (el) { el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria'))); });
    document.title = lang() === 'el' ? 'Παναγιώτης Κόλα — IT Administrator' : 'Panayotis Kola — IT Administrator';
  }

  /* ---------------- Renderers ---------------- */
  var ICONS = {
    lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    shield: '<path d="M12 2 4 6v6c0 5.5 3.8 8.7 8 10 4.2-1.3 8-4.5 8-10V6l-8-4z"/><path d="m9 12 2 2 4-4"/>',
    device: '<rect x="2" y="4" width="14" height="10" rx="1.5"/><path d="M6 18h6M9 14v4"/><rect x="17" y="8" width="5" height="12" rx="1"/>',
    server: '<rect x="2" y="3" width="20" height="7" rx="1.5"/><rect x="2" y="14" width="20" height="7" rx="1.5"/><path d="M6 6.5h.01M6 17.5h.01"/>'
  };
  function svgIcon(name) {
    return '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + ICONS[name] + '</svg>';
  }

  function renderStack() {
    $('#stack-grid').innerHTML = S.stack.map(function (c) {
      return '<article class="stack-card glass">' +
        '<div class="stack-top"><span class="stack-ico">' + svgIcon(c.icon) + '</span><h3>' + esc(L(c.title)) + '</h3></div>' +
        '<div class="tags">' + c.tags.map(function (tg) { return '<span class="tag" data-tag="' + esc(tg) + '">' + esc(tg) + '</span>'; }).join('') + '</div></article>';
    }).join('');
  }

  var openRoles = { 2: true };
  function renderTimeline() {
    var chevron = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';
    $('#timeline').innerHTML = S.experience.map(function (r, i) {
      var body = r.groups.map(function (g) {
        var head = g.sub ? '<div class="t-role"><span>' + esc(L(g.sub)) + '</span><span>' + esc(L(g.period)) + '</span></div>' : '';
        return head + '<ul>' + g.bullets.map(function (b) { return '<li>' + esc(L(b)) + '</li>'; }).join('') + '</ul>';
      }).join('');
      var open = openRoles[i] ? ' open' : '';
      var muted = i === 0 ? ' muted' : '';
      return '<li class="t-item reveal' + open + muted + '" data-i="' + i + '">' +
        '<div class="t-card glass">' +
          '<button class="t-head" type="button" aria-controls="role-' + i + '" aria-expanded="' + (!!openRoles[i]) + '">' +
            '<span><span class="t-title">' + esc(L(r.title)) + '</span><br><span class="t-org"><b>' + esc(r.org) + '</b> · ' + esc(L(r.place)) + '</span></span>' +
            '<span class="t-period">' + esc(L(r.period)) + '</span>' +
            '<span class="t-scope">' + esc(L(r.scope)) + '</span>' +
            '<span class="t-toggle">' + (lang() === 'el' ? 'λεπτομέρειες' : 'details') + ' ' + chevron + '</span>' +
          '</button>' +
          '<div class="t-body" id="role-' + i + '"><div><div class="t-inner">' + body + '</div></div></div>' +
        '</div></li>';
    }).join('');
    $$('#timeline .t-head').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var item = btn.closest('.t-item');
        var i = +item.getAttribute('data-i');
        openRoles[i] = !item.classList.contains('open');
        item.classList.toggle('open', openRoles[i]);
        btn.setAttribute('aria-expanded', openRoles[i]);
        setTimeout(queueTimeline, 500);
      });
    });
  }

  function renderLab() {
    $('#roadmap').innerHTML = S.roadmap.map(function (r) {
      return '<li class="' + (r.done ? 'is-done' : '') + '"><span class="st ' + (r.done ? 'done' : 'next') + '" title="' +
        esc(t(r.done ? 'lab.done' : 'lab.next')) + '">' + (r.done ? '✓' : '') + '</span><span>' + esc(L(r)) + '</span></li>';
    }).join('');
    $('#incidents').innerHTML = S.incidents.map(function (x, i) { return incidentHtml(x, (S.incidentStates || [])[i]); }).join('');
  }

  function incidentHtml(x, st) {
    var flip = st ?
      '<div class="inc-state is-before" data-before="' + esc(L(st.before)) + '" data-after="' + esc(L(st.after)) + '">' +
        '<span class="inc-badge">' + esc(t('lab.before')) + '</span><code>' + esc(L(st.before)) + '</code></div>' +
      '<button class="inc-flip" type="button" aria-pressed="false">' + esc(t('lab.showfix')) + '</button>' : '';
    return '<article class="incident glass">' +
      '<code class="inc-cmd">' + esc(x.cmd) + '</code>' + flip +
      '<h4>' + esc(L(x.title)) + '</h4><p>' + esc(L(x.body)) + '</p>' +
      '<p class="inc-lesson"><b>' + esc(t('lab.lesson')) + '</b>' + esc(L(x.lesson)) + '</p></article>';
  }

  var openSec = {};
  function renderIac() {
    $('#iac-tags').innerHTML = S.iac.tags.map(function (tg) { return '<span class="tag">' + esc(tg) + '</span>'; }).join('');
    $('#iac-sec').innerHTML = S.iac.security.map(function (c, i) {
      var open = !!openSec[i];
      return '<button class="sec-card glass" type="button" data-i="' + i + '" aria-expanded="' + open + '">' +
        '<span class="sec-title">' + esc(L(c.title)) + '</span>' +
        '<span class="sec-why"><b>' + esc(t('iac.why')) + ':</b> ' + esc(L(c.why)) + '</span></button>';
    }).join('');
    $('#iac-incidents').innerHTML = S.iacIncidents.map(function (x) { return incidentHtml(x); }).join('');
    renderPipeline();
    renderArch();
  }

  /* Architecture diagram: alert drill (stop the node exporter) and the backup / restore paths */
  var archDrill = false, archDisc = '', archNote = '', archBackupNext = 'nightly', archTimer = null;
  function archBox(id, cls, x, y, w, h, name, sub) {
    return '<g' + (id ? ' id="' + id + '"' : '') + ' class="' + cls + '"><rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="9" class="t-node"/>' +
      '<text x="' + (x + w / 2) + '" y="' + (y + (sub ? 19 : 26)) + '" class="a-name" text-anchor="middle">' + name + '</text>' +
      (sub ? '<text x="' + (x + w / 2) + '" y="' + (y + 34) + '" class="a-sub" text-anchor="middle" data-sub="' + id + '">' + sub + '</text>' : '') + '</g>';
  }
  function renderArch() {
    var svg =
      '<rect x="8" y="8" width="544" height="240" rx="16" class="t-host"/>' +
      '<text x="26" y="30" class="t-cap">ORACLE CLOUD · FRANKFURT</text>' +
      '<rect x="24" y="44" width="346" height="190" rx="12" class="t-switch"/>' +
      '<text x="358" y="224" class="t-cap" text-anchor="end">VM · Ubuntu 24.04 · A1 Flex arm64</text>' +
      '<path d="M148 96 H132" class="t-link"/><path d="M244 96 H260" class="t-link arch-scrape"/>' +
      '<path d="M132 162 H148" class="t-link"/><path d="M244 162 H260" class="t-link"/>' +
      '<path id="arch-alertpath" d="M84 74 V56 H466 V74" class="t-link arch-alertlink"/>' +
      '<path id="arch-alertping" d="M84 74 V56 H466 V74" pathLength="100" class="t-ping"/>' +
      '<path d="M84 268 V184" class="t-link"/><path d="M84 268 V184" class="t-packet"/>' +
      '<path d="M356 172 H392" class="t-link"/>' +
      '<path id="arch-backup" d="M356 172 H392" pathLength="100" class="t-ping"/>' +
      '<path id="arch-restore" d="M392 182 H356" pathLength="100" class="t-ping"/>' +
      archBox('', 'arch-n', 36, 74, 96, 44, 'Alertmanager') + archBox('', 'arch-n', 148, 74, 96, 44, 'Prometheus') +
      archBox('arch-nodeexp', 'arch-n arch-exp', 260, 74, 96, 44, 'node_exporter') +
      archBox('', 'arch-n', 36, 140, 96, 44, 'Caddy', 'HTTPS') + archBox('', 'arch-n', 148, 140, 96, 44, 'Umami') +
      archBox('', 'arch-n', 260, 140, 96, 44, 'PostgreSQL', 'v16') +
      archBox('arch-discord', 'arch-n arch-disc', 392, 74, 148, 44, 'Discord', 'alerts') +
      '<g class="arch-alert"><rect x="392" y="126" width="148" height="26" rx="8" class="a-alertbox"/><text x="466" y="143" class="a-alert" text-anchor="middle">● TargetDown</text></g>' +
      '<g id="arch-bucket" class="t-click arch-n" role="button" tabindex="0" aria-label="Object Storage: show the backup path">' +
        '<rect x="392" y="162" width="148" height="68" rx="9" class="t-node"/>' +
        '<text x="466" y="190" class="a-name" text-anchor="middle">Object Storage</text>' +
        '<text x="466" y="206" class="a-sub" text-anchor="middle">backups · 30-day expiry</text>' +
        '<text x="466" y="220" class="a-sub" text-anchor="middle">weekly restore test</text></g>' +
      archBox('', 'arch-n', 24, 268, 120, 40, 'Visitor', 'HTTPS') ;
    $('#arch-body').innerHTML =
      '<div class="diagram-scroll"><svg class="topo-svg arch-svg" viewBox="0 0 560 326" role="img" aria-label="Architecture: a visitor reaches Caddy, Umami and PostgreSQL on an Oracle Cloud VM; Prometheus, Alertmanager and the node exporter alert to Discord; nightly backups go to Object Storage">' + svg + '</svg></div>' +
      '<div class="break-bar"><button class="break-btn" id="drill-btn" type="button" aria-pressed="false"></button>' +
      '<p class="break-note" id="drill-note" aria-live="polite"></p></div>' +
      '<p class="topo-hint">' + esc(t('iac.arch.hint')) + '</p>';
    paintArch();
  }
  function paintArch() {
    var svg = $('.arch-svg'), btn = $('#drill-btn');
    if (!svg || !btn) return;
    svg.classList.toggle('alerting', archDrill);
    btn.textContent = t(archDrill ? 'iac.drill.undo' : 'iac.drill');
    btn.setAttribute('aria-pressed', archDrill ? 'true' : 'false');
    var disc = $('[data-sub="arch-discord"]'), label = archDisc ? t('iac.drill.' + archDisc) : t('iac.alerts');
    disc.textContent = label;
    svg.classList.toggle('disc-firing', archDisc === 'firing');
    svg.classList.toggle('disc-resolved', archDisc === 'resolved');
    $('#drill-note').textContent = archNote ? t('iac.note.' + archNote) : '';
  }
  function archPlay(id) {
    var el = $('#' + id);
    if (!el || reduceMotion) return;
    el.classList.remove('go'); void el.getBoundingClientRect(); el.classList.add('go');
  }
  $('#iac-arch').addEventListener('click', function (e) {
    if (e.target.closest('#drill-btn')) {
      archDrill = !archDrill;
      clearTimeout(archTimer);
      if (archDrill) { archDisc = 'firing'; archNote = 'drill'; archPlay('arch-alertping'); }
      else {
        archDisc = 'resolved'; archNote = 'resolved';
        archTimer = setTimeout(function () { if (!archDrill) { archDisc = ''; if (archNote === 'resolved') archNote = ''; paintArch(); } }, 3500);
      }
      paintArch();
    } else if (e.target.closest('#arch-bucket')) {
      archNote = archBackupNext;
      archPlay(archBackupNext === 'nightly' ? 'arch-backup' : 'arch-restore');
      archBackupNext = archBackupNext === 'nightly' ? 'restore' : 'nightly';
      paintArch();
    }
  });
  $('#iac-arch').addEventListener('keydown', function (e) {
    var g = e.target.closest && e.target.closest('#arch-bucket');
    if (g && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); g.dispatchEvent(new MouseEvent('click', { bubbles: true })); }
  });

  /* CI/CD pipeline diagram: runs to the approval gate, waits, then continues */
  var pipeTimers = [], pipeIdx = -1, pipeState = 'idle';   // idle | running | waiting | done
  var PIPE_Y = function (k) { return 8 + k * 54; };
  function renderPipeline() {
    var P = S.iac.pipeline, svg = '';
    P.forEach(function (n, k) {
      var y = PIPE_Y(k);
      if (k) svg += '<path id="pipe-link-' + k + '" d="M280 ' + (y - 14) + ' V' + y + '" class="t-link pipe-link"/>' +
        '<path id="pipe-ping-' + k + '" d="M280 ' + (y - 14) + ' V' + y + '" pathLength="100" class="t-ping"/>';
      svg += '<g class="pipe-node" data-n="' + k + '"><rect x="110" y="' + y + '" width="340" height="40" rx="10" class="t-node"/>' +
        '<text x="280" y="' + (y + 17) + '" class="t-name" text-anchor="middle">' + esc(n.node) + '</text>' +
        '<text x="280" y="' + (y + 32) + '" class="t-sub" text-anchor="middle">' + esc(n.sub) + '</text></g>';
    });
    $('#pipe-body').innerHTML =
      '<svg class="topo-svg" viewBox="90 0 380 326" role="img" aria-label="Pipeline: git push, CI, manual approval, ansible-playbook over SSH, VM, changed=0">' + svg + '</svg>' +
      '<div class="break-bar"><button class="break-btn pipe-btn" id="pipe-run" type="button"></button>' +
      '<p class="break-note" id="pipe-cap" aria-live="polite"></p></div>' +
      '<p class="topo-hint">' + esc(t('iac.pipenote')) + '</p>';
    paintPipeline();
  }
  function paintPipeline() {
    var P = S.iac.pipeline, btn = $('#pipe-run');
    $$('#pipe-body .pipe-node').forEach(function (g) {
      var k = +g.getAttribute('data-n');
      g.classList.toggle('done', k < pipeIdx || (pipeState === 'done' && k === pipeIdx));
      g.classList.toggle('on', k === pipeIdx && pipeState !== 'done');
      g.classList.toggle('waiting', k === 2 && pipeState === 'waiting');
    });
    $$('#pipe-body .pipe-link').forEach(function (l, i) { l.classList.toggle('lit', i + 1 <= pipeIdx); });
    btn.setAttribute('aria-disabled', pipeState === 'running' ? 'true' : 'false');   // not :disabled, so keyboard focus stays on the button
    btn.textContent = t(pipeState === 'waiting' ? 'iac.approve' : pipeState === 'done' ? 'iac.replay' : 'iac.run');
    btn.classList.toggle('is-approve', pipeState === 'waiting');
    $('#pipe-cap').textContent = pipeIdx < 0 ? '' :
      (reduceMotion && pipeState === 'done' ? P.map(function (n, i) { return (i + 1) + '. ' + L(n.text); }).join(' ') : L(P[pipeIdx].text));
  }
  function pipeRun(from) {
    pipeTimers.forEach(clearTimeout); pipeTimers = [];
    if (reduceMotion) { pipeIdx = S.iac.pipeline.length - 1; pipeState = 'done'; paintPipeline(); return; }
    var stop = from === 0 ? 2 : S.iac.pipeline.length - 1;
    if (from === 0) pipeIdx = -1;
    pipeState = 'running'; paintPipeline();
    for (var k = from; k <= stop; k++) (function (k) {
      pipeTimers.push(setTimeout(function () {
        pipeIdx = k;
        pipeState = k === stop ? (stop === 2 ? 'waiting' : 'done') : 'running';
        var ping = $('#pipe-ping-' + k);
        if (ping) { ping.classList.remove('go'); void ping.getBoundingClientRect(); ping.classList.add('go'); }
        paintPipeline();
      }, (k - from) * 1100));
    })(k);
  }
  $('#iac-pipe').addEventListener('click', function (e) {
    if (!e.target.closest('#pipe-run') || pipeState === 'running') return;
    pipeRun(pipeState === 'waiting' ? 3 : 0);
  });
  $('#iac-sec').addEventListener('click', function (e) {
    var card = e.target.closest('.sec-card');
    if (!card) return;
    var i = card.getAttribute('data-i'), open = card.getAttribute('aria-expanded') !== 'true';
    openSec[i] = open;
    card.setAttribute('aria-expanded', open);
  });

  function renderCerts() {
    $('#cert-list').innerHTML = S.certs.map(function (c) {
      return '<li><span class="cert-name">' + esc(c.name) + '</span><span class="cert-by">' + esc(c.by) + '</span>' +
        '<span class="badge ' + (c.prep ? 'prep' : 'ok') + '">' + esc(t(c.prep ? 'certs.prep' : 'certs.done')) + '</span></li>';
    }).join('');
    var e = S.education;
    $('#edu').innerHTML = '<div class="cert-name">' + esc(L(e.name)) + '</div><div class="edu-meta"><span>' + esc(L(e.school)) + '</span><span>' + esc(e.years) + '</span></div>';
    $('#langs').innerHTML = S.languages[lang()].map(function (l) { return '<span class="chip">' + esc(l) + '</span>'; }).join('');
  }

  function renderProjects() {
    var gh = '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.29-1.69-1.29-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z"/></svg>';
    flowTimers.forEach(clearTimeout); flowTimers = [];
    $('#projects-list').innerHTML = (S.projects || []).map(function (p, pi) {
      var flow = p.flow.map(function (f, i) {
        return (i ? '<span class="pf-link" aria-hidden="true"></span>' : '') + '<span class="pf-node">' + esc(f) + '</span>';
      }).join('');
      return '<article class="proj glass reveal" data-p="' + pi + '">' +
        '<header class="proj-head"><div><h3 class="proj-title">' + esc(L(p.title)) + '</h3><p class="proj-tag">' + esc(L(p.tagline)) + '</p></div>' +
        '<div class="proj-meta"><span class="badge ok proj-live">' + esc(L(p.status)) + '</span><span class="t-period">' + esc(p.period) + '</span></div></header>' +
        '<p class="proj-desc">' + esc(L(p.desc)) + '</p>' +
        '<h4 class="mini-head">' + esc(t(p.flowKey || 'proj.flow')) + '</h4><div class="proj-flow">' + flow + '</div>' +
        (p.steps ? '<div class="flow-bar"><button class="flow-play" type="button">' + esc(t('proj.play')) + '</button>' +
          '<p class="flow-cap" aria-live="polite"></p></div>' : '') +
        '<div class="proj-grid"><div><h4 class="mini-head">' + esc(t('proj.stack')) + '</h4><div class="tags">' +
          p.tags.map(function (tg) { return '<span class="tag">' + esc(tg) + '</span>'; }).join('') + '</div></div>' +
        '<div><h4 class="mini-head">' + esc(t(p.learnedKey || 'proj.learned')) + '</h4><ul class="proj-lessons">' +
          p.lessons.map(function (l) { return '<li>' + esc(L(l)) + '</li>'; }).join('') + '</ul></div></div>' +
        '<a class="btn btn-ghost btn-sm" href="' + esc(p.repo) + '" target="_blank" rel="noopener">' + gh + '<span>' + esc(t(p.repoKey || 'proj.repo')) + '</span></a>' +
        '</article>';
    }).join('');
  }

  function renderAll() {
    applyI18n();
    renderStack();
    renderTimeline();
    renderLab();
    renderIac();
    renderProjects();
    renderCerts();
    renderBreak();
    markTools();
    queueTimeline();
    observeReveals();
    bindGlass();
    bindTilt();
    restartTyped();
  }

  /* ---------------- Theme / language ---------------- */
  /* Cross-fade (language) or circular reveal from the button (theme) where the browser supports it */
  function transition(kind, update, origin) {
    if (!document.startViewTransition || reduceMotion) { update(); return; }
    var x = window.innerWidth / 2, y = 0;
    if (origin) { var b = origin.getBoundingClientRect(); x = b.left + b.width / 2; y = b.top + b.height / 2; }
    var r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    var cls = 'vt-' + kind, done = function () { root.classList.remove(cls); };
    root.classList.add(cls);
    var vt = document.startViewTransition(update);
    if (kind === 'theme') {
      vt.ready.then(function () {
        root.animate(
          { clipPath: ['circle(0px at ' + x + 'px ' + y + 'px)', 'circle(' + r + 'px at ' + x + 'px ' + y + 'px)'] },
          { duration: 600, easing: 'ease-in-out', pseudoElement: '::view-transition-new(root)' });
      }, function () {});
    }
    vt.finished.then(done, done);
  }
  function setTheme(th) {
    root.setAttribute('data-theme', th);
    store('pk-theme', th);
    var m = document.querySelector('meta[name="theme-color"]');
    if (m) m.setAttribute('content', th === 'light' ? '#f4f7fb' : '#070b14');
    net.refreshColors();
  }
  function setLang(l) {
    transition('lang', function () {
      root.setAttribute('lang', l);
      store('pk-lang', l);
      renderAll();
      $$('.reveal').forEach(function (el) { el.classList.add('in'); });
    });
  }
  $('#theme-btn').addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    transition('theme', function () { setTheme(next); }, this);
  });
  $('#lang-btn').addEventListener('click', function () { setLang(lang() === 'el' ? 'en' : 'el'); });

  /* ---------------- Copy email ---------------- */
  var copyBtn = $('#copy-mail'), copyTimer = null;
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise(function (resolve, reject) {
      var ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', ''); ta.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(ta); ta.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) {}
      ta.remove();
      ok ? resolve() : reject();
    });
  }
  copyBtn.addEventListener('click', function () {
    var label = $('#copy-mail-label');
    copyText(copyBtn.getAttribute('data-email')).then(function () {
      var ico = $('#copy-ico');
      if (!copyBtn.dataset.icoHtml) copyBtn.dataset.icoHtml = ico.innerHTML;
      ico.innerHTML = '<polyline points="20 6 9 17 4 12"/>';
      copyBtn.classList.add('copied');
      label.textContent = t('contact.copied');
      clearTimeout(copyTimer);
      copyTimer = setTimeout(function () {
        label.textContent = t('contact.copy');
        ico.innerHTML = copyBtn.dataset.icoHtml;
        copyBtn.classList.remove('copied');
      }, 1800);
    }, function () {
      window.location.href = 'mailto:' + copyBtn.getAttribute('data-email');
    });
  });

  /* ---------------- Nav ---------------- */
  var nav = $('.nav'), menuBtn = $('#menu-btn'), links = $('#nav-links');
  menuBtn.addEventListener('click', function () {
    var open = !links.classList.contains('open');
    links.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', open);
  });
  $$('#nav-links a').forEach(function (a) {
    a.addEventListener('click', function () { links.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); });
  });
  var bar = $('.scroll-progress span');
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    nav.classList.toggle('scrolled', y > 10);
    var max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, y / max) : 0) + ')';
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('load', function () { requestAnimationFrame(onScroll); });

  /* The experience line fills as you scroll past it, and each role's dot lights up once you reach it */
  var tl = $('#timeline'), tlQueued = false;
  function updateTimeline() {
    if (!tl) return;
    var r = tl.getBoundingClientRect(), mid = window.innerHeight * 0.5;
    tl.style.setProperty('--tl', Math.max(0, Math.min(1, (mid - r.top) / r.height)).toFixed(3));
    $$('.t-item', tl).forEach(function (li) { li.classList.toggle('passed', li.getBoundingClientRect().top + 26 < mid); });
  }
  function queueTimeline() {
    if (tlQueued) return;
    tlQueued = true;
    requestAnimationFrame(function () { tlQueued = false; updateTimeline(); });
  }
  window.addEventListener('scroll', queueTimeline, { passive: true });
  window.addEventListener('resize', queueTimeline);

  if ('IntersectionObserver' in window) {
    var secObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          $$('#nav-links a').forEach(function (a) {
            var on = a.getAttribute('href') === '#' + en.target.id;
            a.classList.toggle('active', on);
            if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('main section[id]').forEach(function (s) { secObs.observe(s); });
  }

  /* ---------------- Reveal + counters ---------------- */
  var revObs = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) {
        en.target.classList.add('in');
        revObs.unobserve(en.target);
        $$('[data-count]', en.target).forEach(countUp);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }) : null;
  function observeReveals() {
    $$('.reveal:not(.in)').forEach(function (el) { if (revObs) revObs.observe(el); else el.classList.add('in'); });
  }
  function countUp(el) {
    if (el.dataset.done) return;
    el.dataset.done = '1';
    var end = +el.getAttribute('data-count'), suf = el.getAttribute('data-suffix') || '';
    if (reduceMotion) { el.textContent = end + suf; return; }
    var t0 = performance.now(), dur = 1400;
    (function step(now) {
      var p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(end * e) + (p === 1 ? suf : '');
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  }

  /* ---------------- Glass highlight & tilt ---------------- */
  function bindGlass() {
    $$('.glass').forEach(function (el) {
      if (el.dataset.gl) return;
      el.dataset.gl = '1';
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        el.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
  }
  function bindTilt() {
    if (reduceMotion || !matchMedia('(hover: hover)').matches) return;
    $$('.stack-card').forEach(function (el) {
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = 'perspective(900px) rotateX(' + (-y * 6) + 'deg) rotateY(' + (x * 6) + 'deg) translateY(-3px)';
      });
      el.addEventListener('pointerleave', function () { el.style.transform = ''; });
    });
  }

  /* ---------------- Typed roles ---------------- */
  var typedTimer = null;
  function restartTyped() {
    clearTimeout(typedTimer);
    var el = $('#typed'), words = S.roles[lang()], wi = 0, ci = 0, del = false;
    if (reduceMotion) { el.textContent = words[0]; return; }
    (function tick() {
      var w = words[wi];
      ci += del ? -1 : 1;
      el.textContent = w.slice(0, ci);
      var wait = del ? 35 : 75;
      if (!del && ci === w.length) { del = true; wait = 1900; }
      else if (del && ci === 0) { del = false; wi = (wi + 1) % words.length; wait = 350; }
      typedTimer = setTimeout(tick, wait);
    })();
  }

  /* ---------------- Glitch ---------------- */
  var h1 = $('.glitch');
  if (h1 && !reduceMotion) {
    setInterval(function () {
      h1.classList.add('glitching');
      setTimeout(function () { h1.classList.remove('glitching'); }, 160);
    }, 5200);
  }

  /* ---------------- Hero mini terminal ---------------- */
  var heroScript = [
    ['cmd', 'Get-ADDomain | Select-Object NetBIOSName, Forest'],
    ['out', '\n<span class="c-dim">NetBIOSName Forest</span>\n<span class="c-dim">----------- ------</span>\nLAB         lab.local\n'],
    ['cmd', 'nltest /dsgetdc:lab.local'],
    ['out', '           DC: \\\\DC01.lab.local\n      Address: \\\\192.168.10.10\n  Dom Name: lab.local\n<span class="c-ok">The command completed successfully</span>\n'],
    ['cmd', 'Test-Connection CLIENT01 -Count 1 -Quiet'],
    ['out', '<span class="c-ok">True</span>\n'],
    ['cmd', 'Test-Connection 192.168.10.1 -Count 1 -Quiet'],
    ['out', '<span class="c-warn">False</span>  <span class="c-dim"># gateway intentionally absent</span>\n']
  ];
  (function heroTerm() {
    var pre = $('#hero-term');
    if (!pre) return;
    var html = '', step = 0, ci = 0;
    var ps = '<span class="c-ps">PS C:\\&gt;</span> ';
    var full = heroScript.map(function (s) { return s[0] === 'cmd' ? ps + esc(s[1]) + '\n' : s[1]; }).join('');
    if (reduceMotion) { pre.innerHTML = full; return; }
    /* An invisible copy of the finished text reserves the final height, so the page does not reflow as the lines type in */
    var ghost = document.createElement('div'), live = document.createElement('div');
    ghost.className = 'ht-ghost'; ghost.setAttribute('aria-hidden', 'true'); ghost.innerHTML = full;
    live.className = 'ht-live';
    pre.appendChild(ghost); pre.appendChild(live);
    function run() {
      if (step >= heroScript.length) { setTimeout(function () { html = ''; step = 0; run(); }, 5000); return; }
      var s = heroScript[step];
      if (s[0] === 'cmd') {
        if (ci === 0) html += ps;
        ci++;
        live.innerHTML = html + esc(s[1].slice(0, ci)) + '<span class="caret"></span>';
        if (ci < s[1].length) return setTimeout(run, 28 + Math.random() * 40);
        html += esc(s[1]) + '\n'; ci = 0; step++;
        live.innerHTML = html;
        return setTimeout(run, 420);
      }
      html += s[1]; step++;
      live.innerHTML = html;
      setTimeout(run, 900);
    }
    setTimeout(run, 900);
  })();

  /* ---------------- Network background ---------------- */
  var net = (function () {
    var cv = $('#net-bg'), ctx = cv.getContext('2d');
    var W = 0, H = 0, dpr = 1, nodes = [], pulses = [], mouse = { x: -9999, y: -9999 };
    var c1 = '56,189,248', c2 = '167,139,250', light = false, running = true, raf = 0;

    function refreshColors() {
      var cs = getComputedStyle(root);
      c1 = cs.getPropertyValue('--net-node').trim() || c1;
      c2 = cs.getPropertyValue('--net-node-2').trim() || c2;
      light = root.getAttribute('data-theme') === 'light';
      if (reduceMotion) draw();
    }
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth; H = window.innerHeight;
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var small = W < 640 || (navigator.connection && navigator.connection.saveData);
      var target = small ? Math.min(40, Math.round((W * H) / 24000)) : Math.min(110, Math.round((W * H) / 15000));
      while (nodes.length < target) nodes.push(mk());
      nodes.length = target;
      if (reduceMotion) draw();
    }
    function mk() {
      return { x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35,
               r: Math.random() * 1.6 + .8, alt: Math.random() < .25 };
    }
    var LINK = 140;
    function draw() {
      ctx.clearRect(0, 0, W, H);
      var a = light ? .55 : 1;
      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        for (var j = i + 1; j < nodes.length; j++) {
          var m = nodes[j], dx = n.x - m.x, dy = n.y - m.y, d2 = dx * dx + dy * dy;
          if (d2 < LINK * LINK) {
            var o = (1 - Math.sqrt(d2) / LINK) * .22 * a;
            ctx.strokeStyle = 'rgba(' + c1 + ',' + o + ')';
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(m.x, m.y); ctx.stroke();
          }
        }
        var mdx = n.x - mouse.x, mdy = n.y - mouse.y, md = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < 180) {
          ctx.strokeStyle = 'rgba(' + c2 + ',' + ((1 - md / 180) * .45 * a) + ')';
          ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
      }
      for (var k = 0; k < nodes.length; k++) {
        var p = nodes[k];
        ctx.fillStyle = 'rgba(' + (p.alt ? c2 : c1) + ',' + (.75 * a) + ')';
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
      // data packets travelling along links
      for (var q = pulses.length - 1; q >= 0; q--) {
        var pu = pulses[q];
        pu.t += pu.s;
        if (pu.t >= 1) { pulses.splice(q, 1); continue; }
        var x = pu.a.x + (pu.b.x - pu.a.x) * pu.t, y = pu.a.y + (pu.b.y - pu.a.y) * pu.t;
        var g = ctx.createRadialGradient(x, y, 0, x, y, 7);
        g.addColorStop(0, 'rgba(' + c1 + ',' + (.95 * a) + ')');
        g.addColorStop(1, 'rgba(' + c1 + ',0)');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(x, y, 7, 0, Math.PI * 2); ctx.fill();
      }
    }
    function spawnPulse() {
      if (pulses.length > 6 || nodes.length < 2) return;
      var a = nodes[(Math.random() * nodes.length) | 0], best = null, bd = LINK * LINK;
      for (var i = 0; i < nodes.length; i++) {
        var b = nodes[i]; if (b === a) continue;
        var d = (a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y);
        if (d < bd && d > 900) { bd = d; best = b; }
      }
      if (best) pulses.push({ a: a, b: best, t: 0, s: .012 + Math.random() * .012 });
    }
    function loop() {
      if (!running) return;
      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        n.x += n.vx; n.y += n.vy;
        if (n.x < -20) n.x = W + 20; if (n.x > W + 20) n.x = -20;
        if (n.y < -20) n.y = H + 20; if (n.y > H + 20) n.y = -20;
      }
      if (Math.random() < .05) spawnPulse();
      draw();
      raf = requestAnimationFrame(loop);
    }
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', function (e) { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
    window.addEventListener('pointerleave', function () { mouse.x = mouse.y = -9999; });
    document.addEventListener('visibilitychange', function () {
      if (reduceMotion) return;
      running = !document.hidden;
      cancelAnimationFrame(raf);
      if (running) raf = requestAnimationFrame(loop);
    });
    resize(); refreshColors();
    if (!reduceMotion) raf = requestAnimationFrame(loop); else draw();
    return { refreshColors: refreshColors };
  })();

  /* ---------------- Interactive terminal ---------------- */
  var term = $('#term'), out = $('#term-out'), input = $('#term-input'), tbody = $('#term-body');
  var hist = [], hi = 0, lastFocus = null, greeted = false;
  var C = function (cls, s) { return '<span class="' + cls + '">' + s + '</span>'; };
  var PS = '<span class="term-ps">pkola@lab:~$</span>';

  function print(html, cls) {
    var d = document.createElement('div');
    d.className = 'o' + (cls ? ' ' + cls : '');
    d.innerHTML = html;
    out.appendChild(d);
    tbody.scrollTop = tbody.scrollHeight;
  }
  function openTerm() {
    lastFocus = document.activeElement;
    term.hidden = false;
    document.body.style.overflow = 'hidden';
    if (!greeted) {
      greeted = true;
      print(C('c-acc', 'PKOLA-OS') + ' ' + C('c-dim', '(interactive résumé shell)') + '\n' +
        'Type ' + C('c-ok', 'help') + ' to list commands · ' + C('c-ok', 'Tab') + ' completes · ' + C('c-ok', '↑/↓') + ' history · ' + C('c-ok', 'Esc') + ' closes\n');
    }
    setTimeout(function () { input.focus(); }, 30);
  }
  function closeTerm() {
    term.hidden = true;
    document.body.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  $('#term-btn').addEventListener('click', openTerm);
  $('#term-close').addEventListener('click', closeTerm);
  term.addEventListener('click', function (e) { if (e.target === term) closeTerm(); });
  tbody.addEventListener('click', function () { if (!window.getSelection().toString()) input.focus(); });
  document.addEventListener('keydown', function (e) {
    var tag = (e.target.tagName || '').toLowerCase();
    if (e.key === 'Escape' && !term.hidden) { e.preventDefault(); closeTerm(); return; }
    if ((e.key === '`' || e.key === '~') && term.hidden && tag !== 'input' && tag !== 'textarea') { e.preventDefault(); openTerm(); }
    if (e.key === 'Tab' && !term.hidden) {
      // keep focus inside the dialog
      if (e.target !== input) { e.preventDefault(); input.focus(); }
    }
  });

  function sectionList(title, rows) {
    return C('c-acc', title) + '\n' + rows.map(function (r) { return '  ' + r; }).join('\n');
  }
  function go(id) { closeTerm(); var el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' }); }

  var CMDS = {
    help: { d: 'list commands', f: function () {
      var keys = Object.keys(CMDS).filter(function (k) { return !CMDS[k].hidden; });
      var w = Math.max.apply(null, keys.map(function (k) { return k.length; })) + 2;
      var rows = keys.map(function (k) {
        return C('c-ok', (k + new Array(w + 1).join(' ')).slice(0, w)) + C('c-dim', CMDS[k].d);
      });
      return sectionList('Available commands', rows);
    } },
    whoami: { d: 'who is this', f: function () {
      return C('c-acc', 'Panayotis Kola') + ' — IT Administrator\n' + C('c-dim', 'Athens, Greece · 9+ years in IT support & administration');
    } },
    about: { d: 'short profile', f: function () { return t('about.p1') + '\n\n' + t('about.p2'); } },
    skills: { d: 'technical stack', f: function () {
      return S.stack.map(function (c) { return C('c-acc', '▸ ' + L(c.title)) + '\n  ' + c.tags.join(C('c-dim', ' · ')); }).join('\n');
    } },
    experience: { d: 'work history (alias: exp)', f: function () {
      return S.experience.map(function (r) {
        return C('c-ok', (L(r.period) + '                      ').slice(0, 22)) + C('c-acc', L(r.title)) + ' @ ' + r.org;
      }).join('\n') + '\n' + C('c-dim', 'Tip: "goto experience" for details');
    } },
    projects: { d: 'side projects', f: function () {
      return (S.projects || []).map(function (p) {
        return C('c-acc', L(p.title)) + C('c-dim', '  [' + L(p.status) + ' · ' + p.period + ']') + '\n  ' +
          p.flow.join(C('c-dim', ' → ')) + '\n  <a href="' + p.repo + '" target="_blank" rel="noopener">' + p.repo.replace('https://', '') + '</a>';
      }).join('\n\n');
    } },
    lab: { d: 'home lab topology', f: function () {
      return C('c-acc', 'lab.local') + C('c-dim', '  (Hyper-V · internal switch LAB · 192.168.10.0/24)') + '\n' +
        '  DC01      192.168.10.10  Windows Server 2022 · AD DS · DNS\n' +
        '  CLIENT01  192.168.10.50  Windows 11 Enterprise · domain-joined\n' +
        '  GW        192.168.10.1   ' + C('c-warn', 'intentionally absent') + '\n' +
        C('c-dim', 'Try: ping dc01 · ping 192.168.10.1 · ipconfig · nslookup lab.local');
    } },
    iac: { d: 'infrastructure as code project', f: function () {
      return C('c-acc', 'site-analytics-iac') + C('c-dim', '  (Terraform · Ansible · GitHub Actions · Oracle Cloud Always Free)') + '\n' +
        '  git push → CI → approval → ansible-playbook → VM\n' +
        '  Prometheus + Alertmanager → Discord · nightly pg_dump → Object Storage · weekly restore test\n' +
        '  <a href="https://github.com/panoskola/site-analytics-iac" target="_blank" rel="noopener">github.com/panoskola/site-analytics-iac</a>\n' +
        C('c-dim', 'Try: terraform plan · ansible-playbook · goto iac');
    } },
    terraform: { d: 'terraform plan (simulated)', f: function (args) {
      if ((args[0] || '').toLowerCase() !== 'plan') return C('c-bad', 'usage: terraform plan');
      var res = ['oci_core_vcn.main', 'oci_core_internet_gateway.main', 'oci_core_route_table.public', 'oci_core_security_list.web', 'oci_core_subnet.public',
                 'oci_core_instance.web', 'oci_objectstorage_bucket.backups', 'oci_objectstorage_object_lifecycle_policy.backups_expiry',
                 'oci_identity_dynamic_group.web', 'oci_identity_policy.web_backups', 'oci_identity_policy.object_storage_service'];
      return { delay: 140, seq: [C('c-dim', '# what a fresh apply on an empty account would create')].concat(
        res.map(function (r) { return C('c-ok', '  + ') + r; }),
        [' ', 'Plan: ' + res.length + ' to add, 0 to change, 0 to destroy.']) };
    } },
    'ansible-playbook': { d: 'run the site playbook (simulated)', f: function () {
      var roles = ['base', 'docker', 'firewall', 'hardening', 'app', 'monitoring', 'backup'];
      return { delay: 220, seq: [C('c-dim', '# a deploy of an unchanged repository on an already-converged host'), 'PLAY [web]'].concat(
        roles.map(function (r) { return 'ROLE [' + r + ']' + C('c-ok', ' ok'); }),
        [' ', 'PLAY RECAP', 'site-analytics : ' + C('c-ok', 'changed=0') + ' unreachable=0 failed=0', C('c-dim', '# idempotent roles: nothing changed, so nothing was touched')]) };
    } },
    certs: { d: 'certifications & education', f: function () {
      return S.certs.map(function (c) { return (c.prep ? C('c-warn', '[prep]') : C('c-ok', '[ ok ]')) + ' ' + c.name; }).join('\n') +
        '\n' + C('c-dim', '[edu ]') + ' ' + L(S.education.name) + ' — ' + L(S.education.school);
    } },
    contact: { d: 'how to reach me', f: function () {
      return 'email     ' + '<a href="mailto:kola.panagiotis@gmail.com">kola.panagiotis@gmail.com</a>\n' +
        'linkedin  <a href="https://www.linkedin.com/in/panayotiskola/" target="_blank" rel="noopener">linkedin.com/in/panayotiskola</a>\n' +
        'github    <a href="https://github.com/panoskola" target="_blank" rel="noopener">github.com/panoskola</a>';
    } },
    cv: { d: 'download CV (PDF)', f: function () {
      var a = document.createElement('a');
      a.href = 'assets/cv/Panayotis_Kola_CV.pdf'; a.download = 'Panayotis_Kola_CV.pdf';
      document.body.appendChild(a); a.click(); a.remove();
      return C('c-ok', 'Downloading Panayotis_Kola_CV.pdf …');
    } },
    goto: { d: 'scroll to a section: about|stack|experience|iac|lab|projects|certs|contact', f: function (args) {
      var id = (args[0] || '').toLowerCase();
      if (['about', 'stack', 'experience', 'iac', 'lab', 'projects', 'certs', 'contact'].indexOf(id) < 0) return C('c-bad', 'usage: goto about|stack|experience|iac|lab|projects|certs|contact');
      setTimeout(function () { go(id); }, 150); return C('c-dim', 'cd #' + id);
    } },
    ping: { d: 'ping a lab host', f: function (args) {
      var h = (args[0] || '').toLowerCase();
      var map = { dc01: '192.168.10.10', 'dc01.lab.local': '192.168.10.10', '192.168.10.10': '192.168.10.10',
                  client01: '192.168.10.50', 'client01.lab.local': '192.168.10.50', '192.168.10.50': '192.168.10.50' };
      if (!h) return C('c-bad', 'usage: ping <host>');
      if (labBroken && map[h] === '192.168.10.10') {
        var no = C('c-warn', 'Reply from 192.168.10.50: Destination host unreachable.');
        var who = h === '192.168.10.10' ? '192.168.10.10' : esc(args[0]) + ' [192.168.10.10]';
        return { delay: 450, seq: ['Pinging ' + who + ' with 32 bytes of data:', no, no, no, no, ' ',
          C('c-dim', '# DC01 is on .50, the address CLIENT01 already owns, so nobody answers on .10\n# and the "reply" comes from CLIENT01 itself: unreachable, not timed out')] };
      }
      if (h === '192.168.10.1') {
        var bad = C('c-warn', 'Reply from 192.168.10.50: Destination host unreachable.');
        return { delay: 450, seq: ['Pinging 192.168.10.1 with 32 bytes of data:', bad, bad, bad, bad, ' ',
          C('c-dim', '# expected: nobody owns .1 on this subnet, so ARP gets no answer\n# and the "reply" comes from my own address — unreachable, not timed out')] };
      }
      if (!map[h]) return 'Ping request could not find host ' + esc(args[0]) + '. Please check the name and try again.';
      var ip = map[h], ok = C('c-ok', 'Reply from ' + ip + ': bytes=32 time<1ms TTL=128');
      return { delay: 420, seq: ['Pinging ' + esc(args[0]) + ' [' + ip + '] with 32 bytes of data:', ok, ok, ok, ok, ' ',
        'Packets: Sent = 4, Received = 4, Lost = 0 (0% loss)'] };
    } },
    ipconfig: { d: 'CLIENT01 network config', f: function () {
      return 'Windows IP Configuration\n\nEthernet adapter Ethernet:\n\n' +
        '   Connection-specific DNS Suffix  . : lab.local\n' +
        '   IPv4 Address. . . . . . . . . . . : ' + C('c-acc', '192.168.10.50') + '\n' +
        '   Subnet Mask . . . . . . . . . . . : 255.255.255.0\n' +
        '   Default Gateway . . . . . . . . . : 192.168.10.1\n' +
        '   DNS Servers . . . . . . . . . . . : 192.168.10.10';
    } },
    nslookup: { d: 'resolve a lab name', f: function (args) {
      var n = (args[0] || 'lab.local').toLowerCase();
      var rec = { 'lab.local': '192.168.10.10', 'dc01': '192.168.10.10', 'dc01.lab.local': '192.168.10.10', 'client01': '192.168.10.50', 'client01.lab.local': '192.168.10.50' };
      var head = 'Server:  dc01.lab.local\nAddress:  192.168.10.10\n\n';
      if (!rec[n]) return head + C('c-bad', '*** dc01.lab.local can\'t find ' + esc(n) + ': Non-existent domain');
      var fq = n.indexOf('.') < 0 ? n + '.lab.local' : n;
      return head + 'Name:    ' + fq + '\nAddress:  ' + C('c-acc', rec[n]);
    } },
    lang: { d: 'switch language: lang en|el', f: function (args) {
      var l = (args[0] || '').toLowerCase();
      if (l !== 'en' && l !== 'el') return C('c-bad', 'usage: lang en|el');
      setLang(l); return C('c-ok', 'language → ' + l);
    } },
    theme: { d: 'switch theme: theme dark|light', f: function (args) {
      var th = (args[0] || '').toLowerCase();
      if (th !== 'dark' && th !== 'light') th = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      setTheme(th); return C('c-ok', 'theme → ' + th);
    } },
    history: { d: 'command history', f: function () { return hist.map(function (h, i) { return C('c-dim', (i + 1) + '  ') + esc(h); }).join('\n') || C('c-dim', '(empty)'); } },
    neofetch: { d: 'system summary (alias: fetch)', f: function () {
      var art = [
        '  ┌────────────┐',
        '  │ ▪ ▪ ▪ ▪ ▪▪ │',
        '  ├────────────┤',
        '  │ ▪ ▪ ▪ ▪ ▪▪ │',
        '  ├────────────┤',
        '  │ ▪ ▪ ▪ ▪ ▪▪ │',
        '  └─────┬┬─────┘',
        '        ││      ',
        '    ────┴┴────  ',
        '                '
      ];
      var info = [
        C('c-acc', 'pkola') + '@' + C('c-acc', 'lab'),
        C('c-dim', '-----------'),
        C('c-acc', 'Role       ') + 'IT Administrator',
        C('c-acc', 'Location   ') + 'Athens, Greece',
        C('c-acc', 'Uptime     ') + '9+ years in IT',
        C('c-acc', 'Lab        ') + 'Windows Server 2022 · AD DS · Hyper-V',
        C('c-acc', 'Cloud      ') + 'Oracle Cloud · Docker · Caddy',
        C('c-acc', 'Admin      ') + 'Google Workspace · M365 · JumpCloud',
        C('c-acc', 'Languages  ') + 'Greek · English (B2)',
        C('c-acc', 'Studying   ') + 'CompTIA Network+'
      ];
      var lines = art.map(function (a, i) { return C('c-acc2', a) + '  ' + (info[i] || ''); });
      lines.push('', '                    ' + C('c-acc', '███') + C('c-ok', '███') + C('c-warn', '███') + C('c-bad', '███') + C('c-acc2', '███'));
      return lines.join('\n');
    } },
    date: { d: 'current date/time', f: function () { return new Date().toString(); } },
    clear: { d: 'clear the screen (alias: cls)', f: function () { out.innerHTML = ''; return null; } },
    exit: { d: 'close the terminal', f: function () { setTimeout(closeTerm, 120); return C('c-dim', 'logout'); } },
    sudo: { hidden: true, f: function () { return C('c-bad', 'pkola is not in the sudoers file. This incident will be reported.') + '\n' + C('c-dim', '…just kidding. Least privilege, though.'); } },
    ls: { hidden: true, f: function () { return C('c-acc', 'about/  experience/  lab/  certs/') + '  cv.pdf  contact.txt'; } },
    echo: { hidden: true, f: function (args) { return esc(args.join(' ')); } }
  };
  var ALIAS = { exp: 'experience', cls: 'clear', quit: 'exit', '?': 'help', man: 'help', 'get-help': 'help', 'test-connection': 'ping', resume: 'cv', fetch: 'neofetch' };

  var streaming = false;
  function printSeq(parts, delay) {
    if (reduceMotion) { parts.forEach(function (p) { print(p); }); return; }
    var i = 0;
    streaming = true;
    (function next() {
      if (i >= parts.length) { streaming = false; return; }
      print(parts[i++]);
      setTimeout(next, delay);
    })();
  }

  function run(line) {
    if (streaming) return;
    var raw = line.trim();
    print(PS + ' ' + esc(raw), 'o-cmd');
    if (!raw) return;
    hist.push(raw); hi = hist.length;
    var parts = raw.split(/\s+/), name = parts[0].toLowerCase(), args = parts.slice(1);
    name = ALIAS[name] || name;
    var c = CMDS[name];
    if (!c) { print(C('c-bad', esc(parts[0]) + ': command not found') + C('c-dim', ' — try "help"')); return; }
    var res = c.f(args);
    if (res && res.seq) printSeq(res.seq, res.delay || 400);
    else if (res != null) print(res);
  }
  $('#term-form').addEventListener('submit', function (e) { e.preventDefault(); run(input.value); input.value = ''; });
  input.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowUp') { if (hi > 0) { hi--; input.value = hist[hi]; } e.preventDefault(); }
    else if (e.key === 'ArrowDown') { if (hi < hist.length - 1) { hi++; input.value = hist[hi]; } else { hi = hist.length; input.value = ''; } e.preventDefault(); }
    else if (e.key === 'Tab') {
      e.preventDefault();
      var v = input.value.toLowerCase();
      if (!v) return;
      var m = Object.keys(CMDS).filter(function (k) { return !CMDS[k].hidden && k.indexOf(v) === 0; });
      if (m.length === 1) input.value = m[0] + ' ';
      else if (m.length > 1) print(PS + ' ' + esc(input.value) + '\n' + m.join('  '));
    }
    else if (e.key === 'l' && e.ctrlKey) { e.preventDefault(); out.innerHTML = ''; }
  });

  /* ---------------- Terminal entry points ---------------- */
  $('#term-chips').addEventListener('click', function (e) {
    var b = e.target.closest('button[data-run]');
    if (!b) return;
    run(b.getAttribute('data-run'));
    input.focus();
  });
  $('#term-btn-hero').addEventListener('click', openTerm);
  $$('.t-click').forEach(function (g) {
    function fire() {
      var cmd = g.getAttribute('data-cmd'), pid = g.getAttribute('data-ping');
      if (labBroken && pid === 'ping-dc01') pid = 'ping-dc01-bad';
      var p = document.getElementById(pid);
      if (g.dataset.busy) return;
      if (reduceMotion || !p) { openTerm(); run(cmd); return; }
      g.dataset.busy = '1';
      p.classList.remove('go'); void p.getBoundingClientRect(); p.classList.add('go');
      g.classList.add('pinged');
      var dead = p.classList.contains('t-ping-bad'), ghost = pid === 'ping-dc01-bad' ? $('.dc01 .t-node') : $('.t-ghost');
      if (dead && ghost) setTimeout(function () { ghost.classList.add('flash'); }, 750);
      setTimeout(function () {
        p.classList.remove('go'); g.classList.remove('pinged');
        if (ghost) ghost.classList.remove('flash');
        delete g.dataset.busy;
        openTerm(); run(cmd);
      }, dead ? 1150 : 950);
    }
    g.addEventListener('click', fire);
    g.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fire(); }
    });
  });

  /* ---------------- Break / fix the lab (first incident: the DC had the client's address) ---------------- */
  var labBroken = false, breakTimer = null;
  function renderBreak() {
    var svg = $('.topo-svg'), btn = $('#break-btn'), note = $('#break-note'), ip = $('#dc-ip');
    if (!svg || !btn) return;
    svg.classList.toggle('broken', labBroken);
    ip.textContent = labBroken ? '192.168.10.50' : '192.168.10.10';
    btn.textContent = t(labBroken ? 'lab.fix' : 'lab.break');
    btn.setAttribute('aria-pressed', labBroken ? 'true' : 'false');
    note.textContent = labBroken ? t('lab.broken.note') : '';
  }
  $('#break-btn').addEventListener('click', function () {
    labBroken = !labBroken;
    renderBreak();
    clearTimeout(breakTimer);
    if (!labBroken) {
      $('#break-note').textContent = t('lab.fixed.note');
      breakTimer = setTimeout(function () { if (!labBroken) $('#break-note').textContent = ''; }, 3500);
    }
  });

  /* ---------------- Click a tool, see where it was used ---------------- */
  var activeTool = null;

  function toolKeys(tag) {
    var k = (S.toolKeys || {})[tag];
    return k ? k : [tag.toLowerCase()];
  }
  function toolTargets() {
    var out = [];
    $$('#timeline .t-item').forEach(function (li) {
      out.push({ kind: 'role', item: li, els: [$('.t-card', li)], name: $('.t-org b', li).textContent, text: li.textContent.toLowerCase() });
    });
    $$('#projects-list .proj').forEach(function (a) {
      out.push({ kind: 'proj', els: [a], name: $('.proj-title', a).textContent, text: a.textContent.toLowerCase() });
    });
    var iac = $('#iac');
    if (iac) out.push({ kind: 'lab', els: $$('.topo', iac), name: t('nav.iac'), text: iac.textContent.toLowerCase() });
    var lab = $('#lab');
    if (lab) out.push({ kind: 'lab', els: $$('.topo, .roadmap', lab), name: t('nav.lab'), text: lab.textContent.toLowerCase() });
    return out;
  }
  function toolHits(tag, targets) {
    var keys = toolKeys(tag);
    return targets.filter(function (tg) { return keys.some(function (k) { return k && tg.text.indexOf(k) >= 0; }); });
  }
  function toolHint(html) { var h = $('#tool-hint'); if (h) h.innerHTML = html; }

  function clearTool() {
    activeTool = null;
    $$('.hit, .dim').forEach(function (el) { el.classList.remove('hit', 'dim'); });
    $$('#stack-grid .tag-btn').forEach(function (b) { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
    toolHint(esc(t('tool.hint')));
  }
  function markTools() {
    var targets = toolTargets();
    $$('#stack-grid .tag').forEach(function (el) {
      if (!toolHits(el.getAttribute('data-tag'), targets).length) return;
      el.classList.add('tag-btn');
      el.setAttribute('role', 'button'); el.tabIndex = 0; el.setAttribute('aria-pressed', 'false');
    });
    clearTool();
  }
  function pickTool(el) {
    var tag = el.getAttribute('data-tag');
    if (activeTool === tag) { clearTool(); return; }
    clearTool();
    activeTool = tag;
    var targets = toolTargets(), hits = toolHits(tag, targets);
    targets.forEach(function (tg) {
      var hit = hits.indexOf(tg) >= 0;
      tg.els.forEach(function (e) { e.classList.toggle('hit', hit); if (tg.kind !== 'lab') e.classList.toggle('dim', !hit); });
      if (hit && tg.item) {
        var i = +tg.item.getAttribute('data-i');
        openRoles[i] = true;
        tg.item.classList.add('open');
        $('.t-head', tg.item).setAttribute('aria-expanded', 'true');
      }
    });
    el.classList.add('active'); el.setAttribute('aria-pressed', 'true');
    toolHint('<strong>' + esc(tag) + '</strong> · ' + esc(t('tool.in')) + ': ' + hits.map(function (h) { return esc(h.name); }).join(' · ') +
      ' <button class="tool-clear" type="button">' + esc(t('tool.clear')) + '</button>');
    if (hits.length) setTimeout(function () { hits[0].els[0].scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' }); }, 120);
  }
  $('#stack-grid').addEventListener('click', function (e) {
    var el = e.target.closest('.tag-btn'); if (el) pickTool(el);
  });
  $('#stack-grid').addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    var el = e.target.closest('.tag-btn'); if (!el) return;
    e.preventDefault(); pickTool(el);
  });
  $('#tool-hint').addEventListener('click', function (e) { if (e.target.closest('.tool-clear')) clearTool(); });

  /* ---------------- Play a project's request path ---------------- */
  var flowTimers = [];
  $('#projects-list').addEventListener('click', function (e) {
    var btn = e.target.closest('.flow-play');
    if (!btn || btn.disabled) return;
    var art = btn.closest('.proj'), p = S.projects[+art.getAttribute('data-p')];
    var nodes = $$('.pf-node', art), links = $$('.pf-link', art), cap = $('.flow-cap', art), steps = p.steps || [];
    flowTimers.forEach(clearTimeout); flowTimers = [];
    nodes.forEach(function (n) { n.classList.remove('on', 'done'); });
    links.forEach(function (l) { l.classList.remove('go'); });
    if (reduceMotion) {
      nodes.forEach(function (n) { n.classList.add('done'); });
      links.forEach(function (l) { l.classList.add('go'); });
      cap.textContent = steps.map(function (s, i) { return (i + 1) + '. ' + L(s); }).join(' ');
      return;
    }
    var hop = 1300, travel = 450;
    btn.disabled = true;
    function at(ms, fn) { flowTimers.push(setTimeout(fn, ms)); }
    nodes.forEach(function (n, i) {
      var t0 = i * hop;
      if (i > 0) at(t0 - travel, function () { links[i - 1].classList.add('go'); });
      at(t0, function () {
        if (i > 0) { nodes[i - 1].classList.remove('on'); nodes[i - 1].classList.add('done'); }
        n.classList.add('on');
        cap.textContent = steps[i] ? L(steps[i]) : '';
        cap.classList.remove('swap'); void cap.offsetWidth; cap.classList.add('swap');
      });
    });
    at((nodes.length - 1) * hop + 1600, function () {
      nodes[nodes.length - 1].classList.remove('on'); nodes[nodes.length - 1].classList.add('done');
      btn.disabled = false; btn.textContent = t('proj.replay');
    });
  });

  /* ---------------- Incident before / after ---------------- */
  $('#incidents').addEventListener('click', function (e) {
    var btn = e.target.closest('.inc-flip');
    if (!btn) return;
    var box = btn.previousElementSibling, after = box.classList.contains('is-before');
    box.classList.toggle('is-before', !after);
    box.classList.toggle('is-after', after);
    $('.inc-badge', box).textContent = t(after ? 'lab.after' : 'lab.before');
    var code = $('code', box);
    code.textContent = box.getAttribute(after ? 'data-after' : 'data-before');
    code.classList.remove('swap'); void code.offsetWidth; code.classList.add('swap');
    btn.textContent = t(after ? 'lab.showprob' : 'lab.showfix');
    btn.setAttribute('aria-pressed', after);
  });

  /* ---------------- Init ---------------- */
  $('#year').textContent = new Date().getFullYear();
  (function showUpdated() {
    var d = new Date(document.lastModified);
    if (isNaN(d)) return;
    $('#updated').textContent = d.toLocaleDateString(lang() === 'el' ? 'el-GR' : 'en-GB', { year: 'numeric', month: 'short', day: 'numeric' });
  })();
  renderAll();
})();
