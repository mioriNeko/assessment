'use strict';
const userNameInput = document.getElementById("user-name");
const assessmentButton = document.getElementById("assessment");
const resultDevided = document.getElementById("result-area");
const tweetDevided = document.getElementById("tweet-area");

/**
 * エンターボタンが押されたら
 */
userNameInput.onkeydown = (event) => {
  if (event.key === "Enter") {
    assessmentButton.onclick();
  }
}
/**
 * 診断するボタンを押したら動く処理
 */
assessmentButton.onclick = ()　=> {
  const userName = userNameInput.value;
  if (userName.length === 0) {  // 名前の入力がない場合は処理を終了する
    return;
  }
  //診断結果の子要素をすべて削除
  while (resultDevided.firstChild){
    resultDevided.removeChild(resultDevided.firstChild);
  }
  while (tweetDevided.firstChild){
    tweetDevided.removeChild(tweetDevided.firstChild);
    }
  
  userNameInput.value = "";
  const result = assessment(userName);
  // todo 診断結果エリアの作成
  const header = document.createElement("h3");
  header.innerText = "診断結果"
  resultDevided.appendChild(header);

  const paragraph = document.createElement("P");
  paragraph.innerText = result;
  resultDevided.appendChild(paragraph);

  // Tweetエリアの作成

  const anchor = document.createElement("a");
  const hrefValue = "https://twitter.com/intent/tweet?button_hashtag=" 
    + encodeURIComponent("あなたのいいところ") 
    + "&ref_src=twsrc%5Etfw";

  anchor.setAttribute("href", hrefValue);
  anchor.className = "twitter-hashtag-button";
  anchor.setAttribute("data-text",result);
  anchor.innerText = "Tweet #あなたのいいところ";

  tweetDevided.appendChild(anchor);

  const script = document.createElement("script");
  script.setAttribute("src","https://platform.twitter.com/widgets.js");
  tweetDevided.appendChild(script);
}
const answers = [
  '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
  '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
  '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
  '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
  '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
  '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
  '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
  '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
  '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
  '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
  '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
  '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
  '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
  '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
  '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
  '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
  '{userName}のいいところは優しさです。{userName}の優しい雰囲気や立ち振る舞いに多くの人が癒やされています。',
  '{userName}のいいところは気高さです。{userName}の貴族のように気高く誇り高いふるまいに多くの人が付き従うことでしょうk。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果 
 */
function assessment(userName) {
  // 全文字のコードを足し合わせる
  let sumOfCharCode = 0;
  for (let i = 0; i < userName.length; i++){
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
  }

  // 合計を診断結果の数で割り余りを取得
  const index = sumOfCharCode % answers.length;

  // あまりを配列のIndexとして診断結果の文字列を取得
  let result = answers[index];

  // 文字列のuserNameを名前に置き換える
  result = result.replace(/\{userName\}/g,userName);
  return result;
}

