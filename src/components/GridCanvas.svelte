<script>
    // The page's background grid, drawn on a canvas so it can react: a click (or a tap) on the empty background
    // sends a gentle wave out from that point, bending the grid lines, tinting the lines at the wave front blue
    // and spreading a faint blue glow. Clicks on anything in the foreground (header, text, cards, buttons,
    // links, footer) don't. Without JavaScript, or with reduced motion, the plain CSS grid in app.css stays.
    import { onMount } from 'svelte';

    let canvas;

    onMount(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const CELL = 80;                          // grid size, same as the CSS grid
        const LINE = 'rgba(0, 0, 0, 0.045)';      // --grid
        const BLUE = '37, 99, 235';               // --accent
        const STEP = 8;                           // px between points on a bent line
        const SPEED = 0.7;                        // wave speed, px per ms
        const LIFE = 1500;                        // ms until a wave is gone
        const BAND = 40;                          // width of the wave front, px
        const PUSH = 7;                           // how far the front pushes the lines, px
        const TINT = [0.015, 0.025, 0.06];        // glow: centre, inside, at the front
        const FRONT_LINES = 0.25;                 // opacity of the blue lines at the front
        const MAX_WAVES = 4;
        // Anything that reads as foreground. A click inside one of these doesn't start a wave.
        const FOREGROUND = 'header, footer, nav, a, button, input, textarea, select, label, summary, details, img, svg, figure, '
            + 'h1, h2, h3, h4, p, li, .kicker, .eyebrow, .product-card, .about-stats, .cta-inner, .engage-grid > div, .back-to-top';

        let w = 0, h = 0, frame = 0;
        const waves = [];
        document.documentElement.classList.add('js-grid');

        function resize() {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            w = window.innerWidth;
            h = window.innerHeight;
            canvas.width = Math.round(w * dpr);
            canvas.height = Math.round(h * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            draw(performance.now());
        }

        // How far every live wave pushes the point (x, y) outward from where it started.
        function offset(x, y, now) {
            let dx = 0, dy = 0;
            for (const wave of waves) {
                const age = now - wave.t0;
                const ex = x - wave.x, ey = y - wave.y;
                const d = Math.hypot(ex, ey) || 1;
                const k = (d - age * SPEED) / BAND;
                if (k < -3 || k > 3) continue;
                const push = PUSH * (1 - age / LIFE) ** 1.5 * Math.exp(-k * k) * Math.cos(k * 1.2);
                dx += (ex / d) * push;
                dy += (ey / d) * push;
            }
            return [dx, dy];
        }

        function gridPath(now) {
            ctx.beginPath();
            const bent = waves.length > 0;
            for (let x = 0; x <= w; x += CELL) {
                if (!bent) { ctx.moveTo(x + 0.5, 0); ctx.lineTo(x + 0.5, h); continue; }
                for (let y = 0; y <= h + STEP; y += STEP) {
                    const [ox, oy] = offset(x, y, now);
                    if (y === 0) ctx.moveTo(x + 0.5 + ox, y + oy);
                    else ctx.lineTo(x + 0.5 + ox, y + oy);
                }
            }
            for (let y = 0; y <= h; y += CELL) {
                if (!bent) { ctx.moveTo(0, y + 0.5); ctx.lineTo(w, y + 0.5); continue; }
                for (let x = 0; x <= w + STEP; x += STEP) {
                    const [ox, oy] = offset(x, y, now);
                    if (x === 0) ctx.moveTo(x + ox, y + 0.5 + oy);
                    else ctx.lineTo(x + ox, y + 0.5 + oy);
                }
            }
        }

        function draw(now) {
            for (let i = waves.length - 1; i >= 0; i--) if (now - waves[i].t0 > LIFE) waves.splice(i, 1);
            ctx.clearRect(0, 0, w, h);

            // the tint: faint inside the wave, strongest at its front
            for (const wave of waves) {
                const age = now - wave.t0, fade = 1 - age / LIFE;
                const r = Math.max(1, age * SPEED), outer = r + BAND;
                const g = ctx.createRadialGradient(wave.x, wave.y, 0, wave.x, wave.y, outer);
                g.addColorStop(0, `rgba(${BLUE}, ${TINT[0] * fade})`);
                g.addColorStop(Math.max(0, (r - BAND) / outer), `rgba(${BLUE}, ${TINT[1] * fade})`);
                g.addColorStop(r / outer, `rgba(${BLUE}, ${TINT[2] * fade})`);
                g.addColorStop(1, `rgba(${BLUE}, 0)`);
                ctx.fillStyle = g;
                ctx.beginPath();
                ctx.arc(wave.x, wave.y, outer, 0, Math.PI * 2);
                ctx.fill();
            }

            gridPath(now);
            ctx.lineWidth = 1;
            ctx.strokeStyle = LINE;
            ctx.stroke();

            // the grid lines inside each wave front, in blue
            for (const wave of waves) {
                const age = now - wave.t0, fade = 1 - age / LIFE, r = age * SPEED;
                ctx.save();
                ctx.beginPath();
                ctx.arc(wave.x, wave.y, r + BAND, 0, Math.PI * 2);
                ctx.arc(wave.x, wave.y, Math.max(0, r - BAND), 0, Math.PI * 2, true);
                ctx.clip();
                gridPath(now);
                ctx.strokeStyle = `rgba(${BLUE}, ${FRONT_LINES * fade})`;
                ctx.stroke();
                ctx.restore();
            }

            frame = waves.length ? requestAnimationFrame(draw) : 0;
        }

        function start(x, y) {
            if (waves.length >= MAX_WAVES) waves.shift();
            waves.push({ x, y, t0: performance.now() });
            if (!frame) frame = requestAnimationFrame(draw);
        }

        // Mouse: a wave on a press on the background. Touch and pen: only on a tap, so scrolling doesn't set one off.
        const onBackground = (e) => e.target instanceof Element && !e.target.closest(FOREGROUND);
        let touch = null;
        const onDown = (e) => {
            if (!onBackground(e)) { touch = null; return; }
            if (e.pointerType === 'mouse') { if (e.button === 0) start(e.clientX, e.clientY); }
            else touch = { x: e.clientX, y: e.clientY, t: performance.now() };
        };
        const onUp = (e) => {
            if (!touch || e.pointerType === 'mouse') return;
            if (Math.hypot(e.clientX - touch.x, e.clientY - touch.y) < 10 && performance.now() - touch.t < 600) start(e.clientX, e.clientY);
            touch = null;
        };

        window.addEventListener('pointerdown', onDown, { passive: true });
        window.addEventListener('pointerup', onUp, { passive: true });
        window.addEventListener('resize', resize);
        resize();

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('pointerdown', onDown);
            window.removeEventListener('pointerup', onUp);
            window.removeEventListener('resize', resize);
            document.documentElement.classList.remove('js-grid');
        };
    });
</script>

<canvas bind:this={canvas} class="grid-canvas" aria-hidden="true"></canvas>
