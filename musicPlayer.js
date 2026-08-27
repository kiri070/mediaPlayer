//プレイリスト
const musicList = [];
const playList = document.getElementById("musicPlayList");
const addPlayList = document.getElementById("addPlayList");
let isPlayList = false; //プレイリストが流れているか
let listNum; //プレイリストの番号を保存
let currentMusic = null;
let musicName;

const fileInput = document.getElementById("musicFile");
const audio = document.getElementById("audio");

//曲が再生されたとき
audio.addEventListener("play", function(){

    ShowName(musicName);
});
//再生中の曲の名前を表示する関数
function ShowName(file)
{
    const musicName = document.getElementById("musicName");
    musicName.textContent = file;
}

//曲が終了した時
audio.addEventListener("ended", function(){

    //プレイリストのものを再生中なら
    if(isPlayList)
    {
        //リストにまだ曲がある場合
        if(listNum < musicList.length - 1)
        {
            audio.src = URL.createObjectURL(musicList[listNum + 1]);
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

fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];

    if (file) {
        //ファイルパスを渡す
        audio.src = URL.createObjectURL(file);
        isPlayList = false;
        musicName = file.name;
    }
});

//ドラック判定
fileInput.addEventListener("dragover", (e) => {
    e.preventDefault();
});
fileInput.addEventListener("drop", (e) => {
    e.preventDefault();
    const data = e.dataTransfer.files[0];
    audio.src = URL.createObjectURL(data);
    isPlayList = false;
    musicName = data.name;
});


// === プレイリスト ===
addPlayList.addEventListener("change", () => {
    for (const file of addPlayList.files) 
    {
        addList(file);
        musicName = file.name;
    }
});

//ドラック判定
addPlayList.addEventListener("dragover", (e) => {
    e.preventDefault();
});
addPlayList.addEventListener("drop", (e) => {
    e.preventDefault();

    for (const file of e.dataTransfer.files)
    {
        addList(file);
        musicName = file.name;
    }
});

//プレイリストに追加する関数
function addList(musicFile)
{
    musicList.push(musicFile);

    const item = document.createElement("div");
    item.textContent = musicFile.name;
    item.classList.add("music_item");

    //クリックされたら現在の曲として流す
    item.addEventListener("click", function(e){
        audio.src = URL.createObjectURL(musicFile);
        isPlayList = true;

        const list = Array.from(playList.children); //普通の配列に変換
        listNum = list.indexOf(e.target); //要素が何番目にあるか

        //再生中の曲をハイライト
        if(currentMusic !== null)
        {
            currentMusic.classList.remove("playing");
        }
        currentMusic = item;
        currentMusic.classList.add("playing");

        musicName = musicFile.name;
        audio.play();
    });

    playList.appendChild(item);
}