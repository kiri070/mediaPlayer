//ループボタン
const loopButton = document.getElementById("loopButton");
let isLoop = false;
loopButton.addEventListener("click", (e) =>{
    if(e.target.id === "loopButton" && !isLoop)
    {
        audio.loop = true;
        isLoop = true;

        e.target.src = "../Images/loopOn.png";
    }
    else if(e.target.id === "loopButton" && isLoop)
    {
        audio.loop = false;
        isLoop = false;

        e.target.src = "../Images/loopOff.png";
    }
});

//再生停止
const playButton = document.getElementById("playButton");
playButton.addEventListener("click", (e) =>{
    if(e.target.id === "playButton" && audio.paused)
    {
        audio.play();
    }
    else if(e.target.id === "playButton" && !audio.paused)
    {
        audio.pause();
    }
});

//再生、停止アイコン切り替え
audio.addEventListener("play", () => {
    playButton.src = "../Images/stop.png";
});

audio.addEventListener("pause", () => {
    playButton.src = "../Images/play.png";
});

//戻る、次ボタン
const nextButton = document.getElementById("nextButton");
const backButton = document.getElementById("backButton");

nextButton.addEventListener("click", (e) =>{
    if(e.target.id === "nextButton" && isPlayList)
    {
        //リストにまだ曲がある場合
        if(listNum < musicList.length - 1)
        {
            if(musicList[listNum + 1].file)
            {
                audio.src = URL.createObjectURL(musicList[listNum + 1].file);
            }
            else
            {
                audio.src = URL.createObjectURL(musicList[listNum + 1]);
            }

            listNum++;
            musicName = musicList[listNum].name;

            //再生中の曲をハイライト
            if(currentMusic !== null)
            {
                currentMusic.classList.remove("playing");
            }
            currentMusic = playList.children[listNum];
            currentMusic.classList.add("playing");

            audio.play();
        }
        else
        {
            //ハイライトを削除
            if(currentMusic !== null)
            {
                currentMusic.classList.remove("playing");
            }
        }
    }
});

backButton.addEventListener("click", (e) =>{
    if(e.target.id === "backButton" && isPlayList)
    {
        //リストにまだ曲がある場合
        if(listNum > 0)
        {
            listNum--;

            if(musicList[listNum].file)
            {
                audio.src = URL.createObjectURL(musicList[listNum].file);
            }
            else
            {
                audio.src = URL.createObjectURL(musicList[listNum]);
            }
            
            musicName = musicList[listNum].name;

            //再生中の曲をハイライト
            if(currentMusic !== null)
            {
                currentMusic.classList.remove("playing");
            }
            currentMusic = playList.children[listNum];
            currentMusic.classList.add("playing");

            audio.play();
        }
        else
        {
            //ハイライトを削除
            if(currentMusic !== null)
            {
                currentMusic.classList.remove("playing");
            }
        }
    }
});

//再生リストリピートボタン
const repeatButton = document.getElementById("repeatButton");
repeatButton.addEventListener("click", function(){

    if(!isPlayList_loop)
    {
        isPlayList_loop = true;
        repeatButton.classList.add("buttonIcon_repeat_anim");
    }
    else if(isPlayList_loop)
    {
        isPlayList_loop = false;
        repeatButton.classList.remove("buttonIcon_repeat_anim");
    }
});

//ボリューム
const volumeButton = document.getElementById("volumeButton");
volumeButton.addEventListener("click", function(){

    if(audio.muted)
    {
        audio.muted = false;
    }
    else
    {
        audio.muted = true;
    }
});
audio.addEventListener("volumechange", function() {
    if(audio.muted || audio.volume === 0)
    {
        volumeButton.src = "../Images/volumeOff.png";
    }
    else
    {
        volumeButton.src = "../Images/volumeOn.png";
    }
});

