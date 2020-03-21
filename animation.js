var header = document.getElementById('header');
var degree = 0;
function rotateHeader() {
  // 20ミリ秒ごとに6度ずつ回転させる。
  degree = degree + 6;
  degree = degree % 360;
  if (degree >= 90 && degree <= 270){
    header.className = 'back'
  }else{
    header.className = 'face'
  }
  header.style.transform = 'rotatex(' + degree + 'deg)';
}
setInterval(rotateHeader,50);
