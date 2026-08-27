let isLoop = false;

document.addEventListener("click", (e) =>{
    
    //ループボタン
    if(e.target.id === "loopButton" && !isLoop)
    {
        audio.loop = true;
        isLoop = true;

        e.target.classList.add("Onfunction");
    }
    else if(e.target.id === "loopButton" && isLoop)
    {
        audio.loop = false;
        isLoop = false;

        e.target.classList.remove("Onfunction");
    }
});