<script>
    import { onMount } from 'svelte';
    import Hero from '../../components/Hero.svelte';
    import Services from '../../components/Services.svelte';
    import About from '../../components/About.svelte';
    import Process from '../../components/Process.svelte';
    import Engagement from '../../components/Engagement.svelte';
    import FAQs from '../../components/FAQs.svelte';
    import CTA from '../../components/CTA.svelte';

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

<Hero />
<About />
<Services />
<Process />
<Engagement />
<FAQs />
<CTA />
