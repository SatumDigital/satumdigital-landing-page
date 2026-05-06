<script>
    import { onMount } from 'svelte';

    let visible = $state(false);

    onMount(() => {
        const onScroll = () => { visible = window.scrollY > 600; };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    });

    function toTop() {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    }
</script>

<button
    class="back-to-top"
    class:visible
    aria-label="Back to top"
    type="button"
    onclick={toTop}
>
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
</button>
