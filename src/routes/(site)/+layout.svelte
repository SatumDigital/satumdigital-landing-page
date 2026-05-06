<script>
    import Header from "../../components/Header.svelte";
    import Footer from "../../components/Footer.svelte";
    import BackToTop from "../../components/BackToTop.svelte";

    let { children } = $props();
</script>

<a href="#main" class="skip-link">Skip to content</a>
<Header />
<main id="main">
    {@render children()}
</main>
<Footer />
<BackToTop />
