/* ==========================================================================
   Naveen Kumar, Portfolio
   script.js, rendering, navigation & interactions (vanilla JS, no libraries)
   --------------------------------------------------------------------------
   Page behaviour is chosen by <body data-page="home|case-study|sidequests">.

   Contents
   01. Helpers (safe DOM builders, rich text, formatters)
   02. Shared chrome (nav, mobile menu, resume link, footer year, reveals)
   03. Hero (connectors + draggable sticky notes)
   04. Home renderers (work, about facts, process, experience, sidequests)
   05. Case-study template renderer
   06. Sidequests gallery, filters & lightbox
   07. Boot
   ========================================================================== */
(function () {
  "use strict";

  /* ------------------------------------------------------------------
     01. Helpers
     All content is rendered with createElement / textContent, no raw
     HTML injection anywhere, so data.js can never inject markup.
     ------------------------------------------------------------------ */
  var d = document;
  var REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function qs(sel, root) { return (root || d).querySelector(sel); }
  function qsa(sel, root) { return Array.prototype.slice.call((root || d).querySelectorAll(sel)); }

  /* Create an element, optionally with a class and text content */
  function el(tag, className, text) {
    var node = d.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  }

  /* Create an SVG element in the SVG namespace */
  function svgEl(tag, attrs) {
    var node = d.createElementNS("http://www.w3.org/2000/svg", tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { node.setAttribute(k, attrs[k]); });
    return node;
  }

  /* Minimal safe rich text: converts **bold** spans into <strong> nodes.
     Everything else stays a plain text node. */
  function richText(text) {
    var frag = d.createDocumentFragment();
    if (!text) return frag;
    var parts = String(text).split(/\*\*(.+?)\*\*/g);
    for (var i = 0; i < parts.length; i++) {
      if (i % 2 === 1) frag.appendChild(el("strong", null, parts[i]));
      else if (parts[i]) frag.appendChild(d.createTextNode(parts[i]));
    }
    return frag;
  }

  function pad2(n) { return (n < 9 ? "0" : "") + (n + 1); }

  var COLOR_KEYS = ["yellow", "blue", "lilac", "mint", "coral"];
  var TYPE_CHIP = {
    "Concept": "chip--coral",
    "Shipped product": "chip--mint",
    "Internal initiative": "chip--blue"
  };
  function colorVar(color) {
    return COLOR_KEYS.indexOf(color) !== -1 ? "var(--" + color + ")" : "var(--card)";
  }

  /* Placeholder media block used whenever an image is missing */
  function placeholderFrame(kind, noteText) {
    var box = el("div", "ph-frame");
    box.setAttribute("role", "img");
    box.setAttribute("aria-label", "Placeholder frame, media to be added");
    var icon = svgEl("svg", { viewBox: "0 0 48 48", "aria-hidden": "true", width: "44", height: "44" });
    icon.appendChild(svgEl("circle", { cx: "24", cy: "24", r: "19", fill: "none", stroke: "currentColor", "stroke-width": "1.6" }));
    icon.appendChild(svgEl("circle", { cx: "24", cy: "24", r: "7", fill: "none", stroke: "currentColor", "stroke-width": "1.6" }));
    for (var i = 0; i < 6; i++) {
      var a = (Math.PI / 3) * i;
      icon.appendChild(svgEl("line", {
        x1: String(24 + Math.cos(a) * 8.5), y1: String(24 + Math.sin(a) * 8.5),
        x2: String(24 + Math.cos(a) * 18.5), y2: String(24 + Math.sin(a) * 18.5),
        stroke: "currentColor", "stroke-width": "1.6"
      }));
    }
    box.appendChild(icon);
    box.appendChild(el("span", "ph-label", kind || "Media placeholder"));
    if (noteText) box.appendChild(el("span", "ph-note", noteText));
    return box;
  }

  /* Hand-drawn looking arrow (inline SVG) */
  function doodleArrow(className) {
    var icon = svgEl("svg", {
      class: "doodle " + (className || ""),
      viewBox: "0 0 46 26",
      width: "42", height: "24",
      "aria-hidden": "true", fill: "none"
    });
    icon.appendChild(svgEl("path", { d: "M3 16 C 13 3, 27 24, 41 9", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round" }));
    icon.appendChild(svgEl("path", { d: "M33 4 L 42 8 L 33 14", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }));
    return icon;
  }

  /* ------------------------------------------------------------------
     02. Shared chrome
     ------------------------------------------------------------------ */
  function initNav() {
    var data = portfolioData;
    var toggle = qs(".menu-toggle");
    var menu = qs(".mobile-menu");
    if (toggle && menu) {
      toggle.addEventListener("click", function () {
        var open = menu.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      });
      qsa("a", menu).forEach(function (a) {
        a.addEventListener("click", function () {
          menu.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
        });
      });
    }

    /* Resume link appears only when a resume file is configured in data.js */
    if (data.profile && data.profile.resume) {
      qsa(".nav-links, .mobile-menu").forEach(function (holder) {
        var a = el("a", null, "Resume");
        a.href = data.profile.resume;
        a.target = "_blank";
        a.rel = "noopener";
        if (holder.classList.contains("nav-links")) {
          a.className = "nav-resume";
          holder.appendChild(a);
        } else {
          holder.appendChild(a);
        }
      });
      qsa("[data-resume-only]").forEach(function (node) {
        node.href = data.profile.resume;
        node.hidden = false;
      });
    }
  }

  function initYear() {
    qsa("[data-year]").forEach(function (node) {
      node.textContent = String(new Date().getFullYear());
    });
  }

  /* Scroll reveals, opt-in via .reveal; disabled for reduced motion */
  function initReveals() {
    var items = qsa(".reveal");
    if (!items.length) return;
    if (REDUCED_MOTION || !("IntersectionObserver" in window)) {
      items.forEach(function (item) { item.classList.add("is-visible"); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -6% 0px" });
    items.forEach(function (item) { observer.observe(item); });
  }

  /* Stagger work cards so they don't all animate at once */
  function stagger(container, step) {
    if (!container) return;
    qsa(".reveal", container).forEach(function (item, i) {
      item.style.setProperty("--reveal-delay", (i % 6) * (step || 70) + "ms");
    });
  }

  /* ------------------------------------------------------------------
     03. Hero, connectors + draggable notes
     Desktop only (pointer:fine, width > 1080px), never when reduced
     motion is requested. Notes are static HTML, so the page stays
     fully readable with JavaScript disabled.
     ------------------------------------------------------------------ */
  function initHero() {
    var canvas = qs("#heroCanvas");
    if (!canvas) return;
    var svg = qs(".hero-links", canvas);
    var headline = qs(".hero-title", canvas);
    var notes = qsa("[data-drag]", canvas);
    if (!svg || !headline || !notes.length) return;

    var dragEnabled = false;
    /* Desktop-class pointer + wide viewport + motion allowed.
       Touch-primary devices (phones/tablets) never get drag, the notes
       collapse into a static grid below 1081px anyway. */
    function computeDrag() {
      var coarseOnly = window.matchMedia("(pointer: coarse)").matches &&
                       !window.matchMedia("(any-pointer: fine)").matches;
      dragEnabled = window.innerWidth > 1080 && !coarseOnly && !REDUCED_MOTION;
      canvas.classList.toggle("drag-ready", dragEnabled);
    }
    computeDrag();
    var paths = {};   /* note id -> svg path */

    /* --- connectors ------------------------------------------------ */
    function rectPoint(rect, towardX, towardY) {
      /* point where the line from rect centre toward (x,y) crosses the rect edge */
      var cx = rect.left + rect.width / 2;
      var cy = rect.top + rect.height / 2;
      var dx = towardX - cx, dy = towardY - cy;
      var sx = dx !== 0 ? (rect.width / 2 + 6) / Math.abs(dx) : Infinity;
      var sy = dy !== 0 ? (rect.height / 2 + 6) / Math.abs(dy) : Infinity;
      var s = Math.min(sx, sy);
      return { x: cx + dx * s, y: cy + dy * s };
    }

    function drawPath(path, note) {
      var canvasRect = canvas.getBoundingClientRect();
      var noteRect = note.getBoundingClientRect();
      var headRect = headline.getBoundingClientRect();
      var nx = noteRect.left + noteRect.width / 2 - canvasRect.left;
      var ny = noteRect.top + noteRect.height / 2 - canvasRect.top;
      var start = rectPoint(noteRect, headRect.left + headRect.width / 2, headRect.top + headRect.height / 2);
      var end = rectPoint(headRect, start.x + canvasRect.left, start.y + canvasRect.top);
      var x1 = start.x - canvasRect.left, y1 = start.y - canvasRect.top;
      var x2 = end.x - canvasRect.left, y2 = end.y - canvasRect.top;
      var dx = x2 - x1, dy = y2 - y1;
      var len = Math.sqrt(dx * dx + dy * dy) || 1;
      /* gentle S-curve, perpendicular offset bounded in pixels, sign alternates */
      var px = -dy / len, py = dx / len;
      var off = Math.min(34, len * 0.12) * (note._connectorSign || 1);
      var cx1 = x1 + dx * 0.35 + px * off;
      var cy1 = y1 + dy * 0.35 + py * off;
      var cx2 = x1 + dx * 0.68 - px * off * 0.55;
      var cy2 = y1 + dy * 0.68 - py * off * 0.55;
      path.setAttribute("d", "M" + x1.toFixed(1) + " " + y1.toFixed(1) +
        " C " + cx1.toFixed(1) + " " + cy1.toFixed(1) + ", " +
        cx2.toFixed(1) + " " + cy2.toFixed(1) + ", " +
        x2.toFixed(1) + " " + y2.toFixed(1));
      path.setAttribute("vector-effect", "non-scaling-stroke");
    }

    notes.forEach(function (note, i) {
      var path = svgEl("path", { "aria-hidden": "true" });
      svg.appendChild(path);
      paths[note.getAttribute("data-drag") || i] = path;
      note._connector = path;
      note._connectorSign = (i % 2 === 0) ? 1 : -1;   /* alternate curve direction */
      drawPath(path, note);
    });

    var resizeTimer = null;
    window.addEventListener("resize", function () {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        computeDrag();
        if (dragEnabled) {
          notes.forEach(function (note) { if (note._connector) drawPath(note._connector, note); });
        }
      }, 120);
    });

    notes.forEach(function (note) {
      if (!note._connector) return;
      var activate = function () { note._connector.classList.add("is-active"); };
      var deactivate = function () { note._connector.classList.remove("is-active"); };
      note.addEventListener("mouseenter", activate);
      note.addEventListener("mouseleave", deactivate);
      note.addEventListener("focusin", activate);
      note.addEventListener("focusout", deactivate);
    });

    /* --- dragging -------------------------------------------------- */
    notes.forEach(function (note) {
      var dragging = false, wasDragged = false;
      var startX = 0, startY = 0, origLeft = 0, origTop = 0;
      var suppressClick = false;

      function onMove(e) {
        var dx = e.clientX - startX, dy = e.clientY - startY;
        if (!dragging) {
          if (Math.abs(dx) < 5 && Math.abs(dy) < 5) return;
          dragging = true;
          wasDragged = true;
          note.classList.add("is-dragging");
          d.body.classList.add("is-dragging");
          if (note._connector) note._connector.style.opacity = "0.9";
        }
        var canvasRect = canvas.getBoundingClientRect();
        var noteRect = note.getBoundingClientRect();
        var left = origLeft + dx, top = origTop + dy;
        /* keep the note inside the canvas */
        left = Math.max(-noteRect.width * 0.25, Math.min(left, canvasRect.width - noteRect.width * 0.75));
        top = Math.max(-8, Math.min(top, canvasRect.height - noteRect.height - 8));
        note.style.left = left + "px";
        note.style.top = top + "px";
        if (note._connector) drawPath(note._connector, note);
        e.preventDefault();
      }

      function onUp(e) {
        note.removeEventListener("pointermove", onMove);
        note.removeEventListener("pointerup", onUp);
        note.removeEventListener("pointercancel", onUp);
        if (dragging) {
          suppressClick = true;
          setTimeout(function () { suppressClick = false; }, 60);
        }
        dragging = false;
        note.classList.remove("is-dragging");
        d.body.classList.remove("is-dragging");
        if (note._connector) note._connector.style.opacity = "";
      }

      note.addEventListener("click", function (e) {
        if (suppressClick) { e.preventDefault(); e.stopPropagation(); }
      }, true);

      note.addEventListener("pointerdown", function (e) {
        if (!dragEnabled || e.button !== 0 || e.pointerType === "touch") return;
        var rect = note.getBoundingClientRect();
        var canvasRect = canvas.getBoundingClientRect();
        startX = e.clientX;
        startY = e.clientY;
        origLeft = rect.left - canvasRect.left;
        origTop = rect.top - canvasRect.top;
        wasDragged = false;
        note.setPointerCapture(e.pointerId);
        note.addEventListener("pointermove", onMove);
        note.addEventListener("pointerup", onUp);
        note.addEventListener("pointercancel", onUp);
      });
    });
  }

  /* ------------------------------------------------------------------
     04. Home renderers
     ------------------------------------------------------------------ */

  /* Project media (image or designed placeholder) */
  function projectMedia(project, eager) {
    var holder = el("div", "project-media");
    var imageSrc = project.cardImage || project.heroImage;
    if (imageSrc) {
      var img = el("img");
      img.src = imageSrc;
      img.alt = project.cardAlt || project.heroAlt || (project.title + ", project visual");
      img.loading = eager ? "eager" : "lazy";
      img.decoding = "async";
      holder.appendChild(img);
    } else {
      holder.appendChild(placeholderFrame("Project visual", "add assets/" + project.slug + "/cover, see README"));
    }
    var cta = el("span", "project-cta");
    var arrow = el("span", "btn-arrow", "↗");
    arrow.setAttribute("aria-hidden", "true");
    cta.appendChild(arrow);
    holder.appendChild(cta);
    return holder;
  }

  /* Project cards share one consistent size in the three-column work grid. */
  function projectCard(project, index, sizeClass) {
    var card = el("article", "project-card " + sizeClass + " reveal");
    card.appendChild(projectMedia(project, index === 0));

    var body = el("div", "project-body");
    var h3 = el("h3", "project-title");
    var link = el("a", null, project.title);
    link.href = "case-study.html?slug=" + encodeURIComponent(project.slug);
    h3.appendChild(link);
    body.appendChild(h3);

    body.appendChild(el("p", "project-summary", project.summary || ""));

    card.appendChild(body);
    return card;
  }

  function renderWork() {
    var grid = qs("#workGrid");
    if (!grid || !portfolioData.projects) return;
    var visibleProjects = portfolioData.projects.filter(function (project) {
      return project.slug !== "revenue-optimization";
    });
    visibleProjects.forEach(function (project, i) {
      grid.appendChild(projectCard(project, i, "project-card--compact"));
    });
    stagger(grid, 60);
  }

  function renderAboutFacts() {
    var holder = qs("#aboutFacts");
    if (!holder || !portfolioData.about) return;
    portfolioData.about.facts.forEach(function (fact) {
      var note = el("div", "fact-note");
      note.style.background = colorVar(fact.color);
      note.style.setProperty("--rot", (fact.rot || 0) + "deg");
      note.appendChild(el("span", "fact-hand", fact.hand || ""));
      note.appendChild(d.createTextNode(fact.text || ""));
      holder.appendChild(note);
    });
  }

  function renderProcess() {
    var holder = qs("#processFlow");
    var data = portfolioData.process;
    if (!holder || !data) return;
    data.steps.forEach(function (step, i) {
      if (i > 0) holder.appendChild(doodleArrow("process-arrow"));
      var node = el("article", "process-node reveal");
      node.style.setProperty("--note-bg", colorVar(step.color));
      node.appendChild(el("span", "process-index", step.index));
      node.appendChild(el("h3", null, step.title));
      node.appendChild(el("p", null, step.text));
      holder.appendChild(node);
    });
    var foot = qs("#processFootnote");
    if (foot && data.footnote) {
      foot.appendChild(doodleArrow(""));
      foot.appendChild(el("span", "label--hand", data.footnote));
    }
  }

  function renderExperience() {
    var holder = qs("#timeline");
    if (!holder || !portfolioData.experience) return;
    portfolioData.experience.forEach(function (job) {
      var item = el("article", "timeline-item reveal");
      item.style.setProperty("--node-color", colorVar(job.color));

      var when = el("div", "timeline-when");
      when.appendChild(el("span", null, job.period));
      if (job.location) when.appendChild(el("span", null, job.location));
      when.style.display = "grid";
      when.style.gap = "4px";
      item.appendChild(when);

      var what = el("div", "timeline-what");
      what.appendChild(el("h3", null, job.company));
      what.appendChild(el("span", "timeline-role", job.role));
      what.appendChild(el("p", null, job.description));
      item.appendChild(what);
      holder.appendChild(item);
    });
  }

  function renderSidequestsPreview() {
    var holder = qs("#sqStrip");
    var conf = portfolioData.sidequestsPreview;
    if (!holder || !conf || !portfolioData.sidequests) return;
    var items = portfolioData.sidequests.slice(0, conf.count || 4);
    items.forEach(function (item) {
      var card = el("a", "sq-item sq-preview-card reveal" + (item.mediaType === "video" ? " sq-item--video" : ""));
      card.href = "sidequests.html";
      card.setAttribute("aria-label", item.title + ", view all sidequests");
      var figure = el("figure");
      figure.appendChild(sqMedia(item));

      var caption = el("figcaption");
      var titleRow = el("div", "sq-item-title");
      titleRow.appendChild(el("span", null, item.title));
      titleRow.appendChild(el("span", "chip", item.category || "Sidequest"));
      caption.appendChild(titleRow);
      if (item.caption) caption.appendChild(el("p", "sq-item-caption", item.caption));

      figure.appendChild(caption);
      card.appendChild(figure);
      holder.appendChild(card);
    });
  }

  /* ------------------------------------------------------------------
     05. Case-study template
     ------------------------------------------------------------------ */
  function updateMeta(project, slug) {
    var site = portfolioData.meta.siteUrl;
    d.title = project.title + " | Naveen Kumar";
    function setMeta(selector, attr, value) {
      var node = qs(selector);
      if (node) node.setAttribute(attr, value);
    }
    setMeta('meta[name="description"]', "content", project.summary || portfolioData.meta.description);
    setMeta('meta[property="og:title"]', "content", project.title + " | Naveen Kumar");
    setMeta('meta[property="og:description"]', "content", project.summary || "");
    setMeta('meta[property="og:url"]', "content", site + "/case-study.html?slug=" + slug);
    setMeta('meta[property="og:image"]', "content", site + "/" + (project.heroImage || portfolioData.meta.ogImage));
    setMeta('link[rel="canonical"]', "href", site + "/case-study.html?slug=" + slug);
  }

  function notFound(root) {
    d.title = "Project not found | Naveen Kumar";
    var wrap = el("div", "cs-notfound");
    var note = el("p", "note note--yellow", "Hmm, empty board.");
    note.style.setProperty("--rot", "-2deg");
    wrap.appendChild(note);
    wrap.appendChild(el("h1", null, "This project doesn't exist (yet)."));
    wrap.appendChild(el("p", null, "The link may be old, or the slug may be mistyped. Here is everything that is on the board right now:"));

    var list = el("div", "cs-notfound-list");
    portfolioData.projects.forEach(function (p) {
      var chip = el("a", "chip", p.title);
      chip.href = "case-study.html?slug=" + encodeURIComponent(p.slug);
      list.appendChild(chip);
    });
    wrap.appendChild(list);

    var back = el("a", "btn btn--primary", "Back to all work");
    back.href = "index.html#work";
    wrap.appendChild(back);
    root.appendChild(wrap);
  }

  function metaItem(label, value) {
    var holder = el("div");
    var dt = el("dt", null, label);
    var dd = el("dd", null, value);
    holder.appendChild(dt);
    holder.appendChild(dd);
    return holder;
  }

  function imageFigure(src, alt, caption, eager) {
    var fig = el("figure", "cs-figure");
    var frame = el("div", "frame");
    if (src) {
      var img = el("img");
      img.src = src;
      img.alt = alt || "";
      img.loading = eager ? "eager" : "lazy";
      img.decoding = "async";
      frame.appendChild(img);
    } else {
      frame.appendChild(placeholderFrame("Media placeholder", "add the file, see README"));
    }
    fig.appendChild(frame);
    if (caption) fig.appendChild(el("figcaption", null, caption));
    return fig;
  }

  function deviceFigure(item, eager) {
    var fig = el("figure", "cs-device-figure");
    var link = el("a", "cs-device-link");
    link.href = item.src;
    link.target = "_blank";
    link.rel = "noopener";
    link.setAttribute("aria-label", "Open full screen: " + (item.title || item.alt || "app screen"));
    var frame = el("span", "cs-device-frame");
    var img = el("img");
    img.src = item.src;
    img.alt = item.alt || item.title || "Mobile app screen";
    if (item.width) img.width = item.width;
    if (item.height) img.height = item.height;
    img.loading = eager ? "eager" : "lazy";
    img.decoding = "async";
    frame.appendChild(img);
    link.appendChild(frame);
    fig.appendChild(link);
    if (item.captionTitle || item.captionText) {
      var caption = el("figcaption", "cs-device-caption");
      if (item.captionTitle) caption.appendChild(el("strong", null, item.captionTitle));
      if (item.captionText) caption.appendChild(el("p", null, item.captionText));
      fig.appendChild(caption);
    } else if (item.caption) fig.appendChild(el("figcaption", null, item.caption));
    return fig;
  }

  function flowDiagram(block) {
    var figure = el("figure", "cs-flow-diagram" + (block.variant ? " cs-flow-diagram--" + block.variant : ""));
    if (block.label) figure.appendChild(el("p", "cs-flow-label", block.label));
    var nodes = el("div", "cs-flow-nodes");
    (block.items || []).forEach(function (item, i) {
      if (i) {
        var arrow = el("span", "cs-flow-arrow", "→");
        arrow.setAttribute("aria-hidden", "true");
        nodes.appendChild(arrow);
      }
      nodes.appendChild(el("div", "cs-flow-node", item));
    });
    figure.appendChild(nodes);
    if (block.caption) figure.appendChild(el("figcaption", null, block.caption));
    return figure;
  }

  function networkDiagram(block) {
    var figure = el("figure", "cs-network-map cs-network-map--doodle");
    if (block.label) figure.appendChild(el("p", "cs-flow-label", block.label));
    var illustration = el("img", "cs-network-doodle");
    illustration.src = block.image;
    illustration.alt = block.alt || "Hand-drawn diagram of a store employee phone connecting through Wi-Fi to cloud services, with an optional store gateway.";
    illustration.loading = "lazy";
    illustration.decoding = "async";
    figure.appendChild(illustration);
    var key = el("div", "cs-network-key");
    (block.nodes || []).forEach(function (item, i) {
      var entry = el("div", "cs-network-key-item cs-network-key-item--" + (item.tone || "neutral"));
      entry.appendChild(el("span", "cs-network-key-index", String(i + 1).padStart(2, "0")));
      var copy = el("div", "cs-network-key-copy");
      if (item.kicker) copy.appendChild(el("span", "cs-network-kicker", item.kicker));
      copy.appendChild(el("strong", null, item.title));
      if (item.text) copy.appendChild(el("p", null, item.text));
      entry.appendChild(copy);
      key.appendChild(entry);
    });
    figure.appendChild(key);
    if (block.optional) {
      var optional = el("div", "cs-network-optional");
      var optionalCopy = el("div", "cs-network-optional-copy");
      optionalCopy.appendChild(el("span", "cs-network-kicker", block.optional.kicker || "Optional idea"));
      optionalCopy.appendChild(el("strong", null, block.optional.title));
      optionalCopy.appendChild(el("p", null, block.optional.text));
      optional.appendChild(optionalCopy);
      figure.appendChild(optional);
    }
    if (block.caption) figure.appendChild(el("figcaption", null, block.caption));
    return figure;
  }

  function videoEmbed(url) {
    /* Returns an iframe for YouTube/Vimeo URLs, or null for local files */
    var yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{6,})/);
    var vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    var embed = el("div", "video-embed");
    var iframe = d.createElement("iframe");
    iframe.setAttribute("allowfullscreen", "true");
    iframe.setAttribute("loading", "lazy");
    iframe.setAttribute("title", "Project video");
    if (yt) iframe.src = "https://www.youtube-nocookie.com/embed/" + yt[1];
    else if (vimeo) iframe.src = "https://player.vimeo.com/video/" + vimeo[1];
    else return null;
    embed.appendChild(iframe);
    return embed;
  }

  /* Renders one content block; returns a node (or null for unknown types) */
  function renderBlock(block) {
    switch (block.type) {
      case "paragraph": {
        var p = el("p");
        p.appendChild(richText(block.text));
        return p;
      }
      case "list": {
        var frag = d.createDocumentFragment();
        if (block.title) frag.appendChild(el("h3", "sub", block.title));
        var ul = el("ul");
        (block.items || []).forEach(function (item) {
          var li = el("li");
          li.appendChild(richText(item));
          ul.appendChild(li);
        });
        frag.appendChild(ul);
        return frag;
      }
      case "quote": {
        var quote = el("blockquote", "cs-quote");
        quote.appendChild(richText(block.text));
        if (block.attribution) quote.appendChild(el("span", "quote-attr", block.attribution));
        return quote;
      }
      case "cards": {
        var grid = el("div", "cs-cards");
        (block.items || []).forEach(function (item) {
          var card = el("article", "cs-card");
          if (item.image) {
            var illustration = el("img", "cs-card-illustration");
            illustration.src = item.image;
            illustration.alt = item.imageAlt || "";
            illustration.loading = "lazy";
            illustration.decoding = "async";
            card.appendChild(illustration);
          }
          if (item.kicker) card.appendChild(el("span", "card-kicker", item.kicker));
          card.appendChild(el("h3", null, item.title));
          card.appendChild(el("p", null, item.text));
          grid.appendChild(card);
        });
        return grid;
      }
      case "swatches": {
        var swatches = el("div", "cs-swatches");
        swatches.setAttribute("role", "list");
        (block.items || []).forEach(function (item) {
          var swatch = el("div", "cs-swatch");
          swatch.setAttribute("role", "listitem");
          var color = el("span", "cs-swatch-color");
          color.style.backgroundColor = item.color;
          color.setAttribute("aria-hidden", "true");
          swatch.appendChild(color);
          swatch.appendChild(el("span", "cs-swatch-name", item.name));
          swatches.appendChild(swatch);
        });
        return swatches;
      }
      case "steps": {
        var flow = el("div", "cs-steps");
        (block.items || []).forEach(function (item, i) {
          var step = el("div", "cs-step");
          step.appendChild(el("span", "step-num", pad2(i)));
          step.appendChild(el("p", "step-title", item.title));
          if (item.text) step.appendChild(el("p", "step-text", item.text));
          flow.appendChild(step);
        });
        return flow;
      }
      case "metrics": {
        var frag2 = d.createDocumentFragment();
        var grid2 = el("div", "cs-metrics" + (block.columns ? " cs-metrics--" + block.columns : ""));
        (block.items || []).forEach(function (item) {
          var m = el("div", "cs-metric" + (item.note ? " cs-metric--note" : ""));
          m.appendChild(el("span", "metric-value", item.value));
          m.appendChild(el("p", "metric-label", item.label));
          grid2.appendChild(m);
        });
        frag2.appendChild(grid2);
        if (block.note) frag2.appendChild(el("p", "metrics-note", block.note));
        return frag2;
      }
      case "image":
        return imageFigure(block.src, block.alt, block.caption, false);
      case "device-gallery": {
        var devices = el("div", "cs-device-gallery");
        (block.images || []).forEach(function (item) { devices.appendChild(deviceFigure(item, false)); });
        return devices;
      }
      case "device-sequence": {
        var sequence = el("div", "cs-device-sequence");
        (block.images || []).forEach(function (item, i, images) {
          sequence.appendChild(deviceFigure(item, false));
          if (i < images.length - 1) {
            var sequenceArrow = el("span", "cs-device-sequence-arrow", "→");
            sequenceArrow.setAttribute("aria-hidden", "true");
            sequence.appendChild(sequenceArrow);
          }
        });
        return sequence;
      }
      case "quantity-strip": {
        var quantityStrip = el("div", "cs-quantity-strip");
        quantityStrip.setAttribute("role", "group");
        quantityStrip.setAttribute("aria-label", block.label || "Quantity calculation");
        quantityStrip.appendChild(el("strong", "cs-quantity-label", block.label || "Quantities"));
        (block.items || []).forEach(function (item) {
          var quantity = el("div", "cs-quantity-item" + (item.emphasis ? " cs-quantity-item--emphasis" : ""));
          quantity.appendChild(el("span", "cs-quantity-name", item.label));
          quantity.appendChild(el("strong", "cs-quantity-value", item.value));
          quantityStrip.appendChild(quantity);
        });
        return quantityStrip;
      }
      case "status-flow": {
        var statusFlow = el("div", "cs-status-flow");
        if (block.label) statusFlow.appendChild(el("p", "cs-flow-label", block.label));
        var statusSteps = el("ol", "cs-status-steps");
        (block.steps || []).forEach(function (item, i) {
          var step = el("li", "cs-status-step cs-status-step--" + (item.tone || "neutral"));
          step.appendChild(el("span", "cs-status-index", String(i + 1).padStart(2, "0")));
          step.appendChild(el("h3", null, item.title));
          step.appendChild(el("p", null, item.text));
          statusSteps.appendChild(step);
        });
        statusFlow.appendChild(statusSteps);
        if (block.outcomes && block.outcomes.length) {
          var outcomes = el("div", "cs-status-outcomes");
          outcomes.appendChild(el("span", "cs-status-outcomes-label", "After sync"));
          block.outcomes.forEach(function (item) {
            var outcome = el("span", "cs-status-outcome cs-status-outcome--" + (item.tone || "neutral"));
            outcome.appendChild(el("span", "cs-status-outcome-dot"));
            outcome.appendChild(el("span", null, item.title));
            outcomes.appendChild(outcome);
          });
          statusFlow.appendChild(outcomes);
        }
        return statusFlow;
      }
      case "flow-diagram":
        return flowDiagram(block);
      case "network-diagram":
        return networkDiagram(block);
      case "gallery": {
        var gal = el("div", "cs-gallery");
        (block.images || []).forEach(function (img2) {
          gal.appendChild(imageFigure(img2.src, img2.alt, img2.caption, false));
        });
        return gal;
      }
      case "video": {
        var vfig = el("figure", "cs-video");
        if (block.src && /^https?:/i.test(block.src) && /youtu\.?be|vimeo/i.test(block.src)) {
          vfig.appendChild(videoEmbed(block.src));
        } else if (block.src) {
          var video = d.createElement("video");
          video.controls = true;
          video.preload = "metadata";
          if (block.poster) video.poster = block.poster;
          video.src = block.src;
          vfig.appendChild(video);
        } else {
          var pf = el("div", "frame");
          pf.appendChild(placeholderFrame("Video placeholder", "add an MP4 or video URL, see README"));
          vfig.appendChild(pf);
        }
        if (block.caption) vfig.appendChild(el("figcaption", null, block.caption));
        return vfig;
      }
      case "link": {
        var a = el("a", "cs-link-banner");
        a.href = block.url || "#";
        a.target = "_blank";
        a.rel = "noopener";
        var copy = el("span", "link-copy");
        copy.appendChild(el("span", "banner-note", block.note || "Link"));
        copy.appendChild(el("strong", null, block.label || block.url));
        a.appendChild(copy);
        a.appendChild(el("span", "banner-arrow", "↗"));
        return a;
      }
      default:
        return null;
    }
  }

  function renderCaseStudy() {
    var root = qs("#csRoot");
    if (!root) return;
    var slug = new URLSearchParams(window.location.search).get("slug");
    var projects = portfolioData.projects || [];
    var index = -1;
    projects.forEach(function (p, i) { if (p.slug === slug) index = i; });

    if (index === -1) { notFound(root); return; }
    var project = projects[index];
    updateMeta(project, project.slug);

    /* --- header -------------------------------------------------- */
    var topline = el("div", "cs-topline");
    var back = el("a", null, "← All work");
    back.href = "index.html#work";
    topline.appendChild(back);
    var brand = el("a", "cs-topline-brand");
    brand.href = "index.html";
    var brandMark = el("span", "brand-mark", "NK");
    brandMark.setAttribute("aria-hidden", "true");
    brand.appendChild(brandMark);
    topline.appendChild(brand);
    root.appendChild(topline);

    var hero = el("header", "cs-hero");
    hero.appendChild(el("h1", null, project.title));
    if (project.summary) hero.appendChild(el("p", "cs-lead", project.summary));
    if (project.intro) hero.appendChild(el("p", "cs-intro", project.intro));

    var metaFields = [
      ["Type", project.projectType],
      ["Company", project.company],
      ["Scope", project.scope],
      ["Role", project.role],
      ["Team", project.team],
      ["Timeline", project.timeline],
      ["Focus", project.focus],
      ["Platform", project.platform],
      ["Domain", project.domain],
      ["Primary workflow", project.primaryWorkflow]
    ].filter(function (pair) { return pair[1]; });
    if (metaFields.length) {
      var dl = el("dl", "cs-meta");
      metaFields.forEach(function (pair) { dl.appendChild(metaItem(pair[0], pair[1])); });
      hero.appendChild(dl);
    }
    root.appendChild(hero);

    if (project.heroImage || project.heroAlt) {
      if (project.heroCallouts && project.heroImage) {
        var board = el("div", "cs-home-board");
        board.appendChild(deviceFigure({
          src: project.heroImage,
          alt: project.heroAlt,
          title: project.title + " Home screen",
          width: project.heroImageWidth,
          height: project.heroImageHeight,
          caption: "Open the screen at full size"
        }, true));
        var callouts = el("ol", "cs-callouts");
        project.heroCallouts.forEach(function (item, i) {
          var entry = el("li");
          entry.appendChild(el("span", "cs-callout-number", String(i + 1).padStart(2, "0")));
          var copy = el("div");
          copy.appendChild(el("h3", null, item.title));
          copy.appendChild(el("p", null, item.text));
          entry.appendChild(copy);
          callouts.appendChild(entry);
        });
        board.appendChild(callouts);
        root.appendChild(board);
      } else {
        root.appendChild(imageFigure(project.heroImage, project.heroAlt, null, true));
      }
    }

    if (project.links && project.links.length) {
      project.links.forEach(function (l) {
        root.appendChild(renderBlock({ type: "link", note: l.note, label: l.label, url: l.url }));
      });
    }

    /* --- metrics -------------------------------------------------- */
    if (project.metrics && project.metrics.length) {
      var metrics = el("div", "cs-metrics");
      project.metrics.forEach(function (m) {
        var card = el("div", "cs-metric");
        card.appendChild(el("span", "metric-value", m.value));
        card.appendChild(el("p", "metric-label", m.label));
        metrics.appendChild(card);
      });
      root.appendChild(metrics);
    }

    /* --- snapshot -------------------------------------------------- */
    var snap = project.snapshot;
    if (snap) {
      var snapGrid = el("div", "cs-snapshot");
      var rots = ["-1deg", "1.2deg", "-0.8deg", "1.4deg"];
      var i2 = 0;
      [["Context", snap.context], ["Problem", snap.problem], ["My contribution", snap.contribution], ["Outcome", snap.outcome]].forEach(function (pair) {
        var data = pair[1];
        if (!data || !data.text) return;
        var card = el("div", "snapshot-card");
        card.style.background = colorVar(data.color);
        card.style.setProperty("--rot", rots[i2 % 4]);
        card.appendChild(el("h3", null, pair[0]));
        card.appendChild(el("p", null, data.text));
        snapGrid.appendChild(card);
        i2++;
      });
      if (snapGrid.children.length) root.appendChild(snapGrid);
    }

    /* --- sections -------------------------------------------------- */
    (project.sections || []).forEach(function (section) {
      var sec = el("section", "cs-section");
      var content = el("div", "cs-body");
      if (section.heading) content.appendChild(el("h2", null, section.heading));

      /* support both rich `blocks` and the simple `body` string */
      if (section.blocks) {
        section.blocks.forEach(function (block) {
          var node = renderBlock(block);
          if (node) content.appendChild(node);
        });
      } else if (section.body) {
        var p = el("div", "cs-copy");
        p.appendChild(richText(section.body));
        content.appendChild(p);
      }
      sec.appendChild(content);
      root.appendChild(sec);
    });

    /* --- related work --------------------------------------------- */
    var prev = projects[(index - 1 + projects.length) % projects.length];
    var next = projects[(index + 1) % projects.length];
    if (projects.length > 1) {
      var rel = el("nav", "cs-related");
      rel.setAttribute("aria-label", "Related projects");
      rel.appendChild(el("h2", null, "Keep exploring."));
      var relGrid = el("div", "cs-related-grid");
      [[prev, "← Previous project"], [next, "Next project →"]].forEach(function (pair) {
        var p = pair[0];
        var card = el("a", "cs-related-card");
        card.href = "case-study.html?slug=" + encodeURIComponent(p.slug);
        card.appendChild(el("span", "rel-direction", pair[1]));
        card.appendChild(el("strong", null, p.title));
        card.appendChild(el("span", null, p.summary || ""));
        relGrid.appendChild(card);
      });
      rel.appendChild(relGrid);
      root.appendChild(rel);
    }
  }

  /* ------------------------------------------------------------------
     06. Sidequests, gallery, filters & lightbox
     ------------------------------------------------------------------ */
  function sqMedia(item) {
    var media = el("div", "sq-media");
    if (item.mediaType === "video") {
      if (item.src && /^https?:/i.test(item.src) && /youtu\.?be|vimeo/i.test(item.src)) {
        media.appendChild(placeholderFrame("Video · " + (item.category || ""), "opens in the viewer"));
      } else if (item.src) {
        var video = d.createElement("video");
        video.controls = true;
        video.preload = "none";
        if (item.poster) video.poster = item.poster;
        video.src = item.src;
        media.appendChild(video);
      } else {
        media.appendChild(placeholderFrame("Videography", "add an MP4 or video URL, see README"));
      }
    } else if (item.src) {
      var img = el("img");
      img.src = item.src;
      img.alt = item.alt || item.title;
      img.loading = "lazy";
      img.decoding = "async";
      media.appendChild(img);
    } else {
      media.appendChild(placeholderFrame(item.category || "Photography", "awaiting the real thing"));
    }
    return media;
  }

  function initSidequests() {
    var gallery = qs("#sqGallery");
    var filterBar = qs("#sqFilters");
    var items = portfolioData.sidequests || [];
    if (!gallery) return;

    var active = "All";
    var visible = items.slice();

    /* --- filters (only categories that actually have content) ------ */
    if (filterBar) {
      var order = ["Photography", "Videography", "Experiments"];
      var counts = {};
      items.forEach(function (item) { counts[item.category] = (counts[item.category] || 0) + 1; });
      var cats = ["All"].concat(order.filter(function (c) { return counts[c]; }));
      Object.keys(counts).forEach(function (c) { if (order.indexOf(c) === -1) cats.push(c); });

      cats.forEach(function (cat) {
        var btn = el("button", "filter-btn", cat);
        btn.type = "button";
        btn.setAttribute("aria-pressed", cat === "All" ? "true" : "false");
        btn.appendChild(el("span", "filter-count", cat === "All" ? String(items.length) : String(counts[cat])));
        btn.addEventListener("click", function () {
          active = cat;
          qsa(".filter-btn", filterBar).forEach(function (b) {
            b.setAttribute("aria-pressed", b.textContent.indexOf(cat) === 0 ? "true" : "false");
          });
          applyFilter();
        });
        filterBar.appendChild(btn);
      });
    }

    function applyFilter() {
      visible = active === "All" ? items.slice() : items.filter(function (item) { return item.category === active; });
      renderGallery();
    }

    function renderGallery() {
      gallery.textContent = "";
      if (!visible.length) {
        var empty = el("div", "sq-empty");
        empty.appendChild(el("p", null, "Nothing in this category yet, things are still being curated."));
        gallery.appendChild(empty);
        return;
      }
      var rots = ["-0.7deg", "0.9deg", "-1.1deg", "0.6deg"];
      visible.forEach(function (item, i) {
        var art = el("article", "sq-item" + (item.mediaType === "video" ? " sq-item--video" : ""));
        art.style.setProperty("--rot", rots[i % 4]);
        var fig = el("figure");
        var mediaWrap = sqMedia(item);
        mediaWrap.setAttribute("tabindex", "0");
        mediaWrap.setAttribute("role", "button");
        mediaWrap.setAttribute("aria-label", "Open " + item.title + " in the viewer");
        mediaWrap.addEventListener("click", function () { openLightbox(i); });
        mediaWrap.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLightbox(i); }
        });
        fig.appendChild(mediaWrap);

        var caption = el("figcaption");
        var titleRow = el("div", "sq-item-title");
        titleRow.appendChild(el("span", null, item.title));
        titleRow.appendChild(el("span", "chip", item.category));
        caption.appendChild(titleRow);
        if (item.caption) caption.appendChild(el("p", "sq-item-caption", item.caption));
        var metaBits = [item.date, item.location].filter(Boolean).join(" · ");
        if (metaBits) caption.appendChild(el("p", "sq-item-meta", metaBits));
        fig.appendChild(caption);

        art.appendChild(fig);
        gallery.appendChild(art);
      });
    }

    /* --- lightbox --------------------------------------------------- */
    var lightbox = qs("#lightbox");
    var lbMedia = qs("#lightboxMedia");
    var lbTitle = qs("#lightboxTitle");
    var lbSub = qs("#lightboxSub");
    var lbCounter = qs("#lightboxCounter");
    var lbPrev = qs("#lightboxPrev");
    var lbNext = qs("#lightboxNext");
    var lbClose = qs("#lightboxClose");
    var current = -1;
    var lastFocus = null;

    function fillLightbox(i) {
      var item = visible[i];
      lbMedia.textContent = "";
      if (item.mediaType === "video") {
        if (item.src && /^https?:/i.test(item.src) && /youtu\.?be|vimeo/i.test(item.src)) {
          var embed = videoEmbed(item.src);
          embed.style.width = "100%";
          lbMedia.appendChild(embed);
        } else if (item.src) {
          var video = d.createElement("video");
          video.controls = true;
          video.preload = "metadata";
          if (item.poster) video.poster = item.poster;
          video.src = item.src;
          lbMedia.appendChild(video);
        } else {
          lbMedia.appendChild(placeholderFrame("Videography", "add an MP4 or video URL, see README"));
        }
      } else if (item.src) {
        var img = el("img");
        img.src = item.src;
        img.alt = item.alt || item.title;
        lbMedia.appendChild(img);
      } else {
        lbMedia.appendChild(placeholderFrame(item.category || "Photography", item.caption || "awaiting the real thing"));
      }
      lbTitle.textContent = item.title;
      var subBits = [item.category, item.date, item.location].filter(Boolean).join(" · ");
      lbSub.textContent = subBits || "";
      lbCounter.textContent = pad2(i) + " / " + pad2(visible.length - 1);
      var single = visible.length < 2;
      lbPrev.hidden = single;
      lbNext.hidden = single;
    }

    function openLightbox(i) {
      if (!lightbox) return;
      current = i;
      lastFocus = d.activeElement;
      fillLightbox(i);
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      d.body.style.overflow = "hidden";
      lbClose.focus();
    }

    function closeLightbox() {
      if (!lightbox) return;
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      lbMedia.textContent = "";   /* stops any video playback */
      d.body.style.overflow = "";
      if (lastFocus && lastFocus.focus) lastFocus.focus();
      current = -1;
    }

    function step(delta) {
      if (current === -1 || !visible.length) return;
      current = (current + delta + visible.length) % visible.length;
      fillLightbox(current);
    }

    if (lightbox) {
      lbClose.addEventListener("click", closeLightbox);
      lbPrev.addEventListener("click", function () { step(-1); });
      lbNext.addEventListener("click", function () { step(1); });
      lightbox.addEventListener("click", function (e) {
        if (e.target === lightbox) closeLightbox();   /* click on the backdrop only */
      });
      d.addEventListener("keydown", function (e) {
        if (!lightbox.classList.contains("is-open")) return;
        if (e.key === "Escape") closeLightbox();
        else if (e.key === "ArrowLeft") step(-1);
        else if (e.key === "ArrowRight") step(1);
      });
    }

    renderGallery();
  }

  /* ------------------------------------------------------------------
     07. Boot
     ------------------------------------------------------------------ */
  function boot() {
    if (typeof portfolioData === "undefined") {
      qsa("[data-requires-data]").forEach(function (node) {
        node.textContent = "Content could not be loaded, is data.js present next to this page?";
      });
      return;
    }
    initNav();
    initYear();

    var page = d.body.getAttribute("data-page");
    if (page === "home") {
      renderWork();
      renderAboutFacts();
      renderProcess();
      renderExperience();
      renderSidequestsPreview();
      initHero();
    } else if (page === "case-study") {
      renderCaseStudy();
    } else if (page === "sidequests") {
      initSidequests();
    }

    initReveals();
  }

  if (d.readyState === "loading") d.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
