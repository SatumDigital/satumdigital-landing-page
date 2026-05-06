<script>
    let { data } = $props();

    // NOTE: GitHub / X / Calendly URLs below are placeholders — swap for real ones when ready.
    const PLACEHOLDER_GITHUB   = 'https://github.com/satumdigital';
    const PLACEHOLDER_X        = 'https://x.com/satumdigital';
    const PLACEHOLDER_CALENDLY = 'https://calendly.com/satumdigital/intro';

    function downloadVCard() {
        // vCard 3.0 — universally supported by iOS, Android, Outlook, macOS Contacts, etc.
        const lines = [
            'BEGIN:VCARD',
            'VERSION:3.0',
            'FN:Michael Botelho',
            'N:Botelho;Michael;;;',
            'ORG:Satum Digital',
            'TITLE:Founder & Principal Engineer',
            'EMAIL;TYPE=WORK:michael@satumdigital.ca',
            'TEL;TYPE=WORK,VOICE:+12898931076',
            'URL:https://www.satumdigital.ca',
            'URL:https://www.linkedin.com/in/michael-m-botelho/',
            'END:VCARD',
        ];
        const blob = new Blob([lines.join('\r\n')], { type: 'text/vcard;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'michael-botelho.vcf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
</script>

<svelte:head>
    <title>Michael Botelho — Satum Digital</title>
    <meta name="description" content="Digital business card for Michael Botelho, Founder of Satum Digital." />
    <meta property="og:title" content="Michael Botelho — Satum Digital" />
    <meta property="og:description" content="Founder & Principal Engineer at Satum Digital. Tap to save my contact info." />
    <meta name="robots" content="noindex" />
</svelte:head>

<div class="card-page">
    <article class="card">
        <a href="/" class="brand" aria-label="Satum Digital home">
            <img src="/favicon.svg" alt="" class="brand-mark" />
            <span class="brand-word">Satum Digital</span>
        </a>

        <div class="headshot" aria-hidden="true">
            <span>MB</span>
        </div>

        <h1 class="name">Michael Botelho</h1>
        <p class="title">Founder &amp; <span class="accent-soft">Principal Engineer</span></p>

        <div class="contacts">
            <a href="mailto:michael@satumdigital.ca" class="contact-row">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" stroke-width="1.5"/>
                    <path d="M3 7l9 7 9-7" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
                </svg>
                <span>michael@satumdigital.ca</span>
            </a>
            <a href="tel:+12898931076" class="contact-row">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 4h3l2 5-2.5 1.5a11 11 0 005 5L14 13l5 2v3a2 2 0 01-2 2A14 14 0 013 6a2 2 0 012-2z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
                </svg>
                <span>(289) 893-1076</span>
            </a>
            <a href="https://www.satumdigital.ca" class="contact-row" target="_blank" rel="noopener">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5"/>
                    <path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" stroke="currentColor" stroke-width="1.5"/>
                </svg>
                <span>www.satumdigital.ca</span>
            </a>
        </div>

        <div class="socials">
            <a href="https://www.linkedin.com/in/michael-m-botelho/" target="_blank" rel="noopener">LinkedIn</a>
            <a href={PLACEHOLDER_GITHUB} target="_blank" rel="noopener">GitHub</a>
            <a href={PLACEHOLDER_X} target="_blank" rel="noopener">X</a>
            <a href={PLACEHOLDER_CALENDLY} target="_blank" rel="noopener">Calendly</a>
        </div>

        <div class="actions">
            <button class="btn btn-primary" type="button" onclick={downloadVCard}>
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Save to Contacts
            </button>
            <a class="btn btn-outline" href="mailto:michael@satumdigital.ca?subject=Book%20a%2030-min%20call">
                Book a 30-min call <span aria-hidden="true">→</span>
            </a>
        </div>

        <div class="qr-wrap">
            <div class="qr">{@html data.qrSvg}</div>
            <p class="qr-label">Scan to open this card on your phone</p>
        </div>
    </article>
</div>

<style>
    /* The body has a global grid pattern (from app.css). The full-viewport tinted wrapper covers it. */
    .card-page {
        min-height: 100vh;
        width: 100%;
        background: var(--bg-soft);
        display: flex;
        align-items: flex-start;
        justify-content: center;
        padding: 56px 20px;
    }

    .card {
        width: 100%;
        max-width: 440px;
        background: var(--bg);
        border: 1px solid var(--border);
        border-radius: var(--radius-xl);
        box-shadow: var(--shadow-lg);
        padding: 44px 36px 36px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 18px;
        text-align: center;
    }

    .brand {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        color: var(--text);
        margin-bottom: 4px;
    }
    .brand-mark { width: 26px; height: 26px; }
    .brand-word {
        font-family: var(--serif);
        font-size: 1.05rem;
        letter-spacing: -0.005em;
    }

    .headshot {
        width: 128px;
        height: 128px;
        border-radius: 50%;
        background: var(--bg-tint);
        border: 1px solid var(--border);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 8px;
    }
    .headshot span {
        font-family: var(--serif);
        font-size: 2.4rem;
        color: var(--text-soft);
        letter-spacing: -0.02em;
    }

    .name {
        font-family: var(--serif);
        font-size: 1.85rem;
        font-weight: 400;
        letter-spacing: -0.02em;
        margin: 0;
        color: var(--text);
    }
    .title {
        color: var(--text-muted);
        font-size: 1.0rem;
        margin: -6px 0 0;
    }

    .contacts {
        display: flex;
        flex-direction: column;
        gap: 8px;
        width: 100%;
        margin-top: 14px;
    }
    .contact-row {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        border: 1px solid var(--border);
        border-radius: var(--radius);
        color: var(--text);
        font-size: 0.95rem;
        transition: border-color .2s ease, background .2s ease, color .2s ease;
    }
    .contact-row:hover {
        border-color: var(--accent);
        background: var(--accent-soft);
        color: var(--accent);
    }
    .contact-row svg {
        width: 18px;
        height: 18px;
        color: var(--accent);
        flex-shrink: 0;
    }
    .contact-row span {
        flex: 1;
        text-align: left;
    }

    .socials {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 8px;
        margin-top: 4px;
    }
    .socials a {
        font-size: 0.83rem;
        padding: 6px 14px;
        border: 1px solid var(--border);
        border-radius: 999px;
        color: var(--text-muted);
        transition: color .2s ease, border-color .2s ease;
    }
    .socials a:hover {
        color: var(--accent);
        border-color: var(--accent);
    }

    .actions {
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 100%;
        margin-top: 14px;
    }
    .btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 13px 22px;
        border-radius: var(--radius);
        font-weight: 500;
        font-size: 0.95rem;
        font-family: var(--sans);
        border: 1px solid transparent;
        cursor: pointer;
        white-space: nowrap;
        width: 100%;
        transition: background .2s ease, color .2s ease, border-color .2s ease, transform .2s ease, box-shadow .2s ease;
    }
    .btn-primary {
        background: var(--text);
        color: #fff;
        box-shadow: var(--shadow);
    }
    .btn-primary:hover {
        background: var(--accent);
        transform: translateY(-1px);
        box-shadow: 0 8px 24px -10px rgba(37, 99, 235, 0.6);
    }
    .btn-primary svg {
        width: 16px; height: 16px;
    }
    .btn-outline {
        border-color: var(--border);
        background: var(--bg);
        color: var(--text);
    }
    .btn-outline:hover {
        border-color: var(--accent);
        color: var(--accent);
    }

    .qr-wrap {
        width: 100%;
        margin-top: 22px;
        padding-top: 22px;
        border-top: 1px solid var(--border-soft);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
    }
    .qr {
        width: 132px;
        height: 132px;
    }
    .qr :global(svg) {
        width: 100%;
        height: 100%;
        display: block;
    }
    .qr-label {
        font-size: 0.74rem;
        color: var(--text-soft);
        letter-spacing: 0.06em;
        text-transform: uppercase;
        margin: 0;
    }
</style>
