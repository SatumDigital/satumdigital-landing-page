<script>
    import { onMount } from 'svelte';

    let scrolled = $state(false);
    let menuOpen = $state(false);

    function closeMenu() { menuOpen = false; }

    onMount(() => {
        const onScroll = () => { scrolled = window.scrollY > 8; };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        const onKey = (e) => { if (e.key === 'Escape') closeMenu(); };
        document.addEventListener('keydown', onKey);
        return () => {
            window.removeEventListener('scroll', onScroll);
            document.removeEventListener('keydown', onKey);
        };
    });
</script>

<header class="site-header" class:scrolled>
    <div class="container header-inner">
        <a href="/" class="logo" aria-label="Satum Digital home">
            <img src="favicon.svg" alt="" class="logo-mark" />
            <span class="logo-word">Satum Digital</span>
        </a>
        <nav class="nav-desktop" aria-label="Primary">
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#process">Process</a>
            <a href="#engage">Engage</a>
            <a href="#faqs">FAQs</a>
        </nav>
        <a href="#contact" class="btn btn-outline btn-header">Book a call</a>
        <button
            class="menu-toggle"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onclick={() => (menuOpen = !menuOpen)}
        >
            <span></span><span></span><span></span>
        </button>
    </div>
    <div class="nav-mobile" class:open={menuOpen}>
        <a href="#about" onclick={closeMenu}>About</a>
        <a href="#services" onclick={closeMenu}>Services</a>
        <a href="#process" onclick={closeMenu}>Process</a>
        <a href="#engage" onclick={closeMenu}>Engage</a>
        <a href="#faqs" onclick={closeMenu}>FAQs</a>
        <a href="#contact" class="btn btn-primary btn-block" onclick={closeMenu}>Book a call</a>
    </div>
</header>
