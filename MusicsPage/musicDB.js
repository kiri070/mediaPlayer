let db;

// DBを開く
const request = indexedDB.open("MusicPlayerDB", 1);

request.addEventListener("success", (e) => {
    db = e.target.result;

    loadMusic();

    console.log("データベースを開いた");

    // 全削除
    // deleteAllMusic();
});

request.addEventListener("error", () => {
    console.log("データベースを開けなかった");
});

request.addEventListener("upgradeneeded", (e) => {

    console.log("データベースを新しく作成");

    db = e.target.result;

    // DBの中にmusicというデータを保存する場所を作る
    db.createObjectStore("music", {
        keyPath: "id",
        autoIncrement: true
    });
});


// =========================
// 音楽を保存
// =========================

function SaveMusic(file)
{
    const transaction = db.transaction("music", "readwrite");

    const store = transaction.objectStore("music");

    store.add({
        name: file.name,
        file: file
    });

    transaction.addEventListener("complete", () => {

        console.log("保存完了");

    });
}


// =========================
// 音楽をロード
// =========================

function loadMusic()
{
    const transaction = db.transaction("music", "readonly");

    const store = transaction.objectStore("music");

    const request = store.getAll();

    request.addEventListener("success", () => {

        for(const music of request.result)
        {
            LoadList(music);
        }

        console.log(request.result);

    });
}


// =========================
// プレイリストに追加
// =========================

let clickMusic = null;

function LoadList(musicFile)
{
    musicList.push(musicFile);

    const item = document.createElement("div");

    item.textContent = musicFile.name;

    item.classList.add("music_item");


    // =========================
    // 通常クリック → 曲を再生
    // =========================

    item.addEventListener("click", function(){

        // 長押しだった場合は再生しない
        if(longPress)
        {
            longPress = false;
            return;
        }

        audio.src = URL.createObjectURL(musicFile.file);

        isPlayList = true;

        // musicListから現在の曲の番号を取得
        listNum = musicList.indexOf(musicFile);


        // 再生中の曲をハイライト
        if(currentMusic !== null)
        {
            currentMusic.classList.remove("playing");
        }

        currentMusic = item;

        currentMusic.classList.add("playing");

        musicName = musicFile.name;

        audio.play();

    });


    // =========================
    // PC → 右クリック
    // =========================

    item.addEventListener("contextmenu", function(e){

        e.preventDefault();

        clickMusic = musicFile;

        ShowMusicMenu(
            e.clientX,
            e.clientY
        );

    });


    // =========================
    // スマホ → 長押し
    // =========================

    let pressTimer;

    let longPress = false;


    // 指・マウスを押した
    item.addEventListener("pointerdown", function(e){

        longPress = false;

        pressTimer = setTimeout(() => {

            longPress = true;

            clickMusic = musicFile;

            ShowMusicMenu(
                e.clientX,
                e.clientY
            );

        }, 500);

    });


    // 指・マウスを離した
    item.addEventListener("pointerup", function(){

        clearTimeout(pressTimer);

    });


    // 指・マウスを動かした
    item.addEventListener("pointermove", function(){

        clearTimeout(pressTimer);

    });


    // 要素から離れた
    item.addEventListener("pointerleave", function(){

        clearTimeout(pressTimer);

    });


    // =========================
    // プレイリストに追加
    // =========================

    playList.appendChild(item);


    // 曲数を更新
    const listCount = document.getElementById("listCount");

    listCount.textContent = musicList.length + " 曲";
}


// =========================
// メニューを閉じる
// =========================

document.addEventListener("click", function(e){

    if(e.target.closest("#musicMenu") === null)
    {
        musicMenu.style.display = "none";
    }

});


// =========================
// 削除メニュー
// =========================

const musicMenu = document.getElementById("musicMenu");

function ShowMusicMenu(x, y)
{
    musicMenu.style.left = x + "px";

    musicMenu.style.top = y + "px";

    musicMenu.style.display = "block";
}


// =========================
// 削除ボタン
// =========================

const deleteMusicButton =
    document.getElementById("deleteMusicButton");

deleteMusicButton.addEventListener("click", function(){

    if(clickMusic === null)
    {
        return;
    }

    // musicListの何番目か取得
    const index = musicList.indexOf(clickMusic);

    if(index === -1)
    {
        return;
    }

    // IndexedDBから削除
    deleteMusic(clickMusic.id);

    // musicListから削除
    musicList.splice(index, 1);

    // HTMLから削除
    const list = Array.from(playList.children);

    list[index].remove();

    // =========================
    // listNumを調整
    // =========================

    if(index < listNum)
    {
        listNum--;
    }
    else if(index === listNum)
    {
        // 現在の曲を削除した
        currentMusic = null;

        isPlayList = false;
    }

    // =========================
    // 曲数更新
    // =========================

    const listCount = document.getElementById("listCount");

    listCount.textContent =
        musicList.length + " 曲";

    // メニューを閉じる
    musicMenu.style.display = "none";


    // 選択状態をリセット
    clickMusic = null;
});


// =========================
// IndexedDBから1曲削除
// =========================

function deleteMusic(id)
{
    const transaction =
        db.transaction("music", "readwrite");

    const store =
        transaction.objectStore("music");

    const request =
        store.delete(id);

    request.addEventListener("success", () => {

        console.log("削除完了");

    });
}


// =========================
// IndexedDBを全削除
// =========================

function deleteAllMusic()
{
    const transaction =
        db.transaction("music", "readwrite");

    const store =
        transaction.objectStore("music");

    const request =
        store.clear();

    request.addEventListener("success", () => {

        console.log("全削除完了");

    });

    request.addEventListener("error", () => {

        console.log("全削除に失敗");

    });
}