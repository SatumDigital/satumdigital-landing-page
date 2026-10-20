<script>
    import { onMount } from 'svelte';
    import Hero from '../../components/Hero.svelte';
    import Ibelo from '../../components/Ibelo.svelte';
    import About from '../../components/About.svelte';
    import Services from '../../components/Services.svelte';
    import FAQs from '../../components/FAQs.svelte';
    import CTA from '../../components/CTA.svelte';

    // For search engines: the company, its site and its first product, with a link to ibelo.app.
    const structuredData = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Organization',
                '@id': 'https://www.satumdigital.ca/#org',
                name: 'Satum Digital Inc.',
                alternateName: 'Satum Digital',
                url: 'https://www.satumdigital.ca/',
                logo: 'https://www.satumdigital.ca/icon-512.png',
                email: 'sales@satumdigital.ca',
                address: { '@type': 'PostalAddress', addressRegion: 'ON', addressCountry: 'CA' },
                foundingDate: '2026',
                brand: { '@id': 'https://ibelo.app/#app' },
            },
            {
                '@type': 'WebSite',
                '@id': 'https://www.satumdigital.ca/#site',
                name: 'Satum Digital',
                url: 'https://www.satumdigital.ca/',
                publisher: { '@id': 'https://www.satumdigital.ca/#org' },
            },
            {
                '@type': 'SoftwareApplication',
                '@id': 'https://ibelo.app/#app',
                name: 'ibelo',
                url: 'https://ibelo.app/',
                description: 'AI agents that help you plan, build, launch and run a side hustle, and ask before anything goes out.',
                applicationCategory: 'BusinessApplication',
                operatingSystem: 'Web',
                publisher: { '@id': 'https://www.satumdigital.ca/#org' },
            },
        ],
    };
    const structuredDataTag = '<script type="application/ld+json">' + JSON.stringify(structuredData) + '</' + 'script>';

    onMount(() => {
        const revealEls = document.querySelectorAll('.reveal');
        if ('IntersectionObserver' in window && revealEls.length) {
            const io = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in');
                        io.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
            revealEls.forEach((el) => io.observe(el));
            return () => io.disconnect();
        } else {
            revealEls.forEach((el) => el.classList.add('in'));
        }
    });
</script>

<svelte:head>
    <title>Satum Digital Inc. · Canadian software company, maker of ibelo</title>
    <meta name="description" content="Satum Digital Inc. is a software company in Ontario, Canada. We build ibelo, AI agents that help you start and run a side hustle, and we design, build and support software for clients." />
    <link rel="canonical" href="https://www.satumdigital.ca/" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Satum Digital" />
    <meta property="og:url" content="https://www.satumdigital.ca/" />
    <meta property="og:title" content="Satum Digital Inc. · maker of ibelo" />
    <meta property="og:description" content="A Canadian software company. We build ibelo, AI agents for your side hustle, and software for clients." />
    <meta property="og:image" content="https://www.satumdigital.ca/og.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Satum Digital: Build the digital backbone of your business. Maker of ibelo." />
    <meta name="twitter:card" content="summary_large_image" />
    {@html structuredDataTag}
</svelte:head>

<Hero />
<Ibelo />
<About />
<Services />
<FAQs />
<CTA />
