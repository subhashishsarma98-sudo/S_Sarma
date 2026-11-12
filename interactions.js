const progressBar = document.getElementById("scroll-progress");

window.addEventListener("scroll", () => {
    const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;

    const progress = scrollable > 0
        ? (window.scrollY / scrollable) * 100
        : 0;

    progressBar.style.width = `${progress}%`;
});
