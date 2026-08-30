// プレイリストがないヘルプ
const notPlayList = document.getElementById("notPlayList");
const wherePlayList = document.getElementById("wherePlayList");

notPlayList.addEventListener("click", (e) => {
    ShowHelp(wherePlayList, e.clientX, e.clientY);
});

// 曲の削除の仕方のヘルプ
const deleteHelp = document.getElementById("deleteHelp");
const delete_help = document.getElementById("delete_help");

deleteHelp.addEventListener("click", (e) => {
    ShowHelp(delete_help, e.clientX, e.clientY);
});

// 曲追加の仕方のヘルプ
const addHelp = document.getElementById("addHelp");
const add_helpText = document.getElementById("add_helpText");

addHelp.addEventListener("click", (e) => {
    ShowHelp(add_helpText, e.clientX, e.clientY);
});

//非表示にする
document.addEventListener("click", function(e){

    if(e.target.closest("#wherePlayList") === null &&
       e.target.closest("#notPlayList") === null &&
       e.target.closest("#deleteHelp") === null &&
       e.target.closest("#addHelp") === null)
    {
        wherePlayList.style.display = "none";
        delete_help.style.display = "none";
        add_helpText.style.display = "none";
    }

});

//ヘルプを表示する関数
function ShowHelp(id, x, y)
{
    wherePlayList.style.display = "none";
    delete_help.style.display = "none";
    add_helpText.style.display = "none";
    
    id.style.left = x + "px";

    id.style.top = y + "px";

    id.style.display = "block";
}