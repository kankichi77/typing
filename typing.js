// CONSTANTS
var WORD_LIMIT = 10;

var TIME_HIGH = 1;
var TIME_MEDIUM = 3;
var TIME_LOW = 5;
var SCORE_HIGH = 100;
var SCORE_MEDIUM = 10;
var SCORE_LOW = 1;
var MIN_CHAR = 4;
var MAX_CHAR = 100;
var COUNTDOWN_STARTNUMBER = 3;
var COUNTDOWN_INTERVAL = 1000;
var ID_QUESTION = "question";
var ID_KEYENTRYRESULT = "keyEntryResultMessage";
var ID_STATSMESSAGE = "statsMessage";
var ID_RESULTSMESSAGE = "resultMessage";

var correctLetterCount = 0;
var totalLetterCount = 0;
var totalWordCount = 0;
var startTime = 0;
var answerTime = 0;
var score = 0;
var currentChar = 0;
var questionLength = 0;
var active = 1;

//var msgObj = document.getElementById(ID_KEYENTRYRESULT );
var statsMsgObj = document.getElementById("statsMessage");
//var qObj = document.getElementById(ID_QUESTION);

document.onkeydown = function(e) {
  if (active == 0) {
    return;
  }
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    var c = e.key;
    var q = getQuestionLetter();
    var m = document.getElementById(ID_KEYENTRYRESULT);
    totalLetterCount++;

    var timeSpent = 0;
    if (c == q) {
      answerTime = new Date().getTime();
      timeSpent = (answerTime - startTime) / 1000;
      score += getScore(timeSpent);
      setStartTime();

      m.style.color = "#00dd00";
      m.innerHTML = "Yeah!" + " " + getScore(timeSpent) + " points!";
      correctLetterCount++;
      document.getElementById(ID_QUESTION+currentChar).style.color = "#ff0000";
      setTimeout(clearKeyEntryMessage,300);

      currentChar++;
      if (currentChar == questionLength) {
        totalWordCount++;
        currentChar = 0;
        if (totalWordCount >= WORD_LIMIT) {
          active = 0;
          setResultMessage();
        } else {
          setTimeout(clearQuestion,300);
          setTimeout(setNewQuestion,400);
          setStatsMessage();
        }
      } else {
        setStatsMessage();
      }
    } else {
      m.style.color = "#aa88aa";
      m.innerHTML = "Boo!";
      setTimeout(clearKeyEntryMessage, 200);
      setStatsMessage();
    }
  }
};

function init(){
  //document.getElementById("inputForm").focus();
  correctLetterCount = 0;
  totalLetterCount = 0;
  totalWordCount = 0;
  startTime = 0;
  answerTime = 0;
  score = 0;
  currentChar = 0;
  questionLength = 0;
  active = 1;
}
function start() {
  init();
  clearResultMessage();
  setCountDown(COUNTDOWN_STARTNUMBER);
  window.setTimeout(setCountDown,COUNTDOWN_INTERVAL*1,COUNTDOWN_STARTNUMBER-1);
  window.setTimeout(setCountDown,COUNTDOWN_INTERVAL*2,COUNTDOWN_STARTNUMBER-2);
  window.setTimeout(setNewQuestion, COUNTDOWN_STARTNUMBER*COUNTDOWN_INTERVAL);
  window.setTimeout(setStatsMessage, COUNTDOWN_STARTNUMBER*COUNTDOWN_INTERVAL);
}
function setCountDown(n) {
  document.getElementById(ID_QUESTION).innerHTML = n;
}
function getQuestionLetter() {
  var q = document.getElementById(ID_QUESTION + currentChar).innerHTML;
  return q;
}
function setNewQuestion() {
  //setNewLetter();
  setNewWord();
}
//function setNewLetter() {
//  var q = document.getElementById("question");
//  var arr = createAlphaArray('a','z'); 
//  q.innerHTML = arr[Math.floor(Math.random() * arr.length)];
//  setStartTime();
//  clearMessage();
//}
function setNewWord() {
  //var q = document.getElementById("question");
  var w = getRandomItem(words,MIN_CHAR,MAX_CHAR);
  setQuestionHTML(w);
  questionLength = w.length;
  setStartTime();
  clearMessage();
}
function clearQuestion() {
  document.getElementById(ID_QUESTION).innerHTML = "";;
}
function clearKeyEntryMessage() {
  document.getElementById(ID_KEYENTRYRESULT).innerHTML = "";
}
function clearStatsMessage() {
  document.getElementById(ID_STATSMESSAGE).innerHTML = "";
}
function clearResultMessage() {
  document.getElementById(ID_RESULTSMESSAGE).innerHTML = "";
}
//function createAlphaArray(a,b) {
//  var o = [];
//  var i = a.charCodeAt(0);
//  var j = b.charCodeAt(0);
//  for (; i <= j; ++i) {
//    o.push(String.fromCharCode(i));
//  }
//  return o;
//}
function setStatsMessage() {
  var msg = "";
  msg += Number(correctLetterCount).toLocaleString() + " letters / ";
  msg += Number(totalWordCount).toLocaleString() + " words";
  if (totalLetterCount > 0)
    msg += " / " + Math.floor(correctLetterCount / totalLetterCount * 100) + "%";
  msg += "<BR>";
  msg += Number(score).toLocaleString() + " points";
  document.getElementById(ID_STATSMESSAGE).innerHTML = msg;
}
function getScore(t) {
  if (t <= TIME_HIGH) return SCORE_HIGH;
  if (t <= TIME_MEDIUM) return SCORE_MEDIUM;
  if (t <= TIME_LOW) return SCORE_LOW;
  return 0;
}
function getRandomItem(a, min, max) {
  if (a == null) return "";
  if (a.length < 1) return "";
  var w;
  do {
    w = a[Math.floor(Math.random() * a.length)];
  } while (w.length < min || w.length > max);
  return w;
}
function setQuestionHTML(w) {
  if (w.length < 1) return "";
  var m = "";
  var q = document.getElementById(ID_QUESTION);
  clearQuestion();
  for (i=0; i<w.length; i++) {
    var e = document.createElement("span");
    e.id = ID_QUESTION + i;
    e.innerHTML = w.charAt(i);
    q.appendChild(e);
  }
}
function setStartTime() {
  startTime = new Date().getTime();
}
function putLog(m) {
  document.getElementById("log").innerHTML = m;
}
function setResultMessage() {
  clearQuestion();
  clearStatsMessage();
  var o = document.getElementById(ID_RESULTSMESSAGE);
  var msg = "";

  msg += "Congratulations!";
  msg += "<BR>";
  msg += Number(correctLetterCount).toLocaleString() + " letters";
  msg += "<BR>";
  msg += Number(totalWordCount).toLocaleString() + " words";
  msg += "<BR>";
  if (totalLetterCount > 0)
    msg += Math.floor(correctLetterCount / totalLetterCount * 100) + "%<BR>";
  msg += Number(score).toLocaleString() + " points";
  msg += "<BR>";
  msg += "<a href='javascript:start()'>Start Again</a>";

  o.innerHTML = msg;
}
