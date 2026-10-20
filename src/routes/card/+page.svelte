<script>
    let { data } = $props();

    const NAME = 'Michael Botelho';
    const TITLE = 'Founder & Principal Engineer';
    const ORG = 'Satum Digital Inc.';
    const EMAIL = 'michael@satumdigital.ca';
    const PHONE = '+12898931076';
    const PHONE_DISPLAY = '(289) 893-1076';
    const SITE = 'https://www.satumdigital.ca';

    // vCard 3.0 lines longer than 75 characters are folded onto continuation lines that start with a space.
    const fold = (line) => line.match(/.{1,74}/g).join('\r\n ');

    async function downloadVCard() {
        // vCard 3.0 — universally supported by iOS, Android, Outlook, macOS Contacts, etc. Includes the photo,
        // so the contact shows it once saved.
        const lines = [
            'BEGIN:VCARD',
            'VERSION:3.0',
            `FN:${NAME}`,
            'N:Botelho;Michael;;;',
            `ORG:${ORG}`,
            `TITLE:${TITLE}`,
            `EMAIL;TYPE=WORK:${EMAIL}`,
            `TEL;TYPE=WORK,VOICE:${PHONE}`,
            `URL:${SITE}`,
        ];
        try {
            const blob = await fetch('/michael-botelho-192.jpg').then((r) => r.blob());
            const b64 = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = () => resolve(String(reader.result).split(',')[1]);
                reader.readAsDataURL(blob);
            });
            lines.push(fold(`PHOTO;ENCODING=b;TYPE=JPEG:${b64}`));
        } catch {
            // no photo if it can't be loaded; the rest of the card still saves
        }
        lines.push('END:VCARD');
        const url = URL.createObjectURL(new Blob([lines.join('\r\n')], { type: 'text/vcard;charset=utf-8' }));
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
    <title>{NAME} · Satum Digital</title>
    <meta name="description" content="Contact card for {NAME}, {TITLE} at {ORG}." />
    <meta property="og:title" content="{NAME} · Satum Digital" />
    <meta property="og:description" content="{TITLE} at {ORG}. Tap to save my contact details." />
    <meta property="og:image" content="https://www.satumdigital.ca/michael-botelho.jpg" />
    <meta name="twitter:card" content="summary" />
    <meta name="robots" content="noindex" />
</svelte:head>

<div class="card-page">
    <article class="card">
        <a href="/" class="brand" aria-label="Satum Digital home">
            <img src="/logo-mark.svg" alt="" class="brand-mark" />
            <span class="brand-word">Satum Digital</span>
        </a>

        <img class="headshot" src="/michael-botelho.jpg" width="400" height="400" alt="{NAME}" />

        <div class="who">
            <h1 class="name">{NAME}</h1>
            <p class="title">{TITLE}</p>
            <p class="org">{ORG} · Ontario, Canada</p>
        </div>

        <div class="contacts">
            <a href="mailto:{EMAIL}" class="contact-row">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" stroke-width="1.5"/>
                    <path d="M3 7l9 7 9-7" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
                </svg>
                <span>{EMAIL}</span>
            </a>
            <a href="tel:{PHONE}" class="contact-row">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 4h3l2 5-2.5 1.5a11 11 0 005 5L14 13l5 2v3a2 2 0 01-2 2A14 14 0 013 6a2 2 0 012-2z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
                </svg>
                <span>{PHONE_DISPLAY}</span>
            </a>
            <a href={SITE} class="contact-row">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5"/>
                    <path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" stroke="currentColor" stroke-width="1.5"/>
                </svg>
                <span>www.satumdigital.ca</span>
            </a>
        </div>

        <button class="btn btn-primary" type="button" onclick={downloadVCard}>
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Save to contacts
        </button>

        <div class="qr-wrap">
            <div class="qr">{@html data.qrSvg}</div>
            <p class="qr-label">Scan to open this card on your phone</p>
        </div>
    </article>
</div>

<style>
    /* A plain soft background behind the card (this page doesn't use the site's grid). */
    .card-page {
        min-height: 100vh;
        width: 100%;
        background: var(--bg-soft);
        display: flex;
        align-items: flex-start;
        justify-content: center;
        padding: 48px 20px;
    }

    .card {
        width: 100%;
        max-width: 420px;
        background: var(--bg);
        border: 1px solid var(--border);
        border-radius: var(--radius-xl);
        box-shadow: var(--shadow-lg);
        padding: 36px 32px 32px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        text-align: center;
    }

    .brand {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        color: var(--text);
    }
    .brand-mark { width: 20px; height: 20px; }
    .brand-word {
        font-family: var(--serif);
        font-size: 1.2rem;
        letter-spacing: -0.005em;
        line-height: 1;
    }

    .headshot {
        width: 132px;
        height: 132px;
        border-radius: 50%;
        object-fit: cover;
        border: 4px solid var(--bg);
        box-shadow: 0 0 0 1px var(--border), var(--shadow);
        margin-top: 4px;
    }

    .who { display: flex; flex-direction: column; gap: 4px; }
    .name {
        font-family: var(--serif);
        font-size: 1.75rem;
        font-weight: 400;
        letter-spacing: -0.02em;
        margin: 0 0 2px;
        color: var(--text);
    }
    .title {
        color: var(--text);
        font-size: 0.98rem;
        font-weight: 500;
        margin: 0;
    }
    .org {
        color: var(--text-soft);
        font-size: 0.88rem;
        margin: 0;
    }

    .contacts {
        display: flex;
        flex-direction: column;
        width: 100%;
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        overflow: hidden;
    }
    .contact-row {
        display: flex;
        align-items: center;
        gap: 14px;
        padding: 14px 18px;
        color: var(--text);
        font-size: 0.95rem;
        transition: background .2s ease, color .2s ease;
    }
    .contact-row + .contact-row { border-top: 1px solid var(--border-soft); }
    .contact-row:hover {
        background: var(--bg-soft);
        color: var(--accent);
    }
    .contact-row svg {
        width: 18px;
        height: 18px;
        color: var(--text-soft);
        flex-shrink: 0;
    }
    .contact-row:hover svg { color: var(--accent); }
    .contact-row span {
        flex: 1;
        text-align: left;
    }

    .btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        width: 100%;
        padding: 14px 22px;
        border-radius: var(--radius);
        font: 500 0.95rem var(--sans);
        border: 1px solid transparent;
        cursor: pointer;
        transition: background .2s ease, transform .2s ease, box-shadow .2s ease;
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
    .btn-primary svg { width: 16px; height: 16px; }

    .qr-wrap {
        width: 100%;
        padding-top: 22px;
        border-top: 1px solid var(--border-soft);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
    }
    .qr { width: 120px; height: 120px; }
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
