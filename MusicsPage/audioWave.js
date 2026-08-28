const canvas = document.getElementById("waveform");
const ctx = canvas.getContext("2d");

// AudioContextを作る
const audioContext = new AudioContext();

// audioをWeb Audio APIにつなぐ
const source = audioContext.createMediaElementSource(audio);

// 波形を取得するためのAnalyserNode
const analyser = audioContext.createAnalyser();

analyser.fftSize = 2048;

// audio → analyser → スピーカー
source.connect(analyser);
analyser.connect(audioContext.destination);

// 波形データを入れる配列
const dataArray = new Uint8Array(analyser.fftSize);


//audioが再生されたらAudioContextを再開
audio.addEventListener("play", () => {
    if (audioContext.state === "suspended")
    {
        audioContext.resume();
    }
});


// 波形を描画
function drawWaveform()
{
    requestAnimationFrame(drawWaveform);

    analyser.getByteFrequencyData(dataArray);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 棒の太さ
    const barWidth = 8;

    // 棒と棒の間隔
    const barGap = 3;

    // データを何個おきに使うか
    const step = 10;

    let x = 0;

    for(let i = 0; i < dataArray.length; i += step)
    {
        const barHeight =
            dataArray[i] / 255 * canvas.height;

        const hue =
            i / dataArray.length * 360;

        ctx.shadowColor =
            `hsl(${hue}, 100%, 60%)`;

        ctx.shadowBlur = 10;

        ctx.fillStyle =
            `hsl(${hue}, 100%, 60%)`;

        ctx.fillRect(
            x,
            canvas.height - barHeight,
            barWidth,
            barHeight
        );

        x += barWidth + barGap;
    }

    ctx.shadowBlur = 0;
}

drawWaveform();