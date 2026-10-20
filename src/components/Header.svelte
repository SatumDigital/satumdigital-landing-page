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
            <img src="/logo-mark.svg" alt="" class="logo-mark" width="24" height="24" />
            <span class="logo-word">Satum Digital</span>
        </a>
        <nav class="nav-desktop" aria-label="Primary">
            <a href="#ibelo">ibelo</a>
            <a href="#about">About</a>
            <a href="#services">Client work</a>
            <a href="#faqs">FAQs</a>
        </nav>
        <a href="#contact" class="btn btn-outline btn-header">Get in touch</a>
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
        <a href="#ibelo" onclick={closeMenu}>ibelo</a>
        <a href="#about" onclick={closeMenu}>About</a>
        <a href="#services" onclick={closeMenu}>Client work</a>
        <a href="#faqs" onclick={closeMenu}>FAQs</a>
        <a href="#contact" class="btn btn-primary btn-block" onclick={closeMenu}>Get in touch</a>
    </div>
</header>
