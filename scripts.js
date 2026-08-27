const fileInput = document.getElementById("videoFile");
const video = document.getElementById("video");

fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];

    if (file) {
        //ファイルパスを渡す
        video.src = URL.createObjectURL(file);
    }
});

//ドラック判定
fileInput.addEventListener("dragover", (e) => {
    e.preventDefault();
});
fileInput.addEventListener("drop", (e) => {
    e.preventDefault();
    const data = e.dataTransfer.files[0];
    video.src = URL.createObjectURL(data);
});