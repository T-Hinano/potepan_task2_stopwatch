$(document).ready(function() {
  //UTC時刻との差
  const TimeDifference = 9;
  
  let setTimeoutId = undefined;
  let startTime = 0;
  let currentTime = 0;
  let elapsedTime = 0;
  
  function runTimer(){
    currentTime = Date.now();
    showTime();
    setTimeoutId = setTimeout(() => {
      runTimer();
    },10)
  }
  
  function showTime(){
   let Time = new Date(currentTime - startTime + elapsedTime);
    
    //時間はUTC時差が生まれるので時差分引く
    let Hour = Math.floor(Time.getHours()-TimeDifference);
    let Min = Time.getMinutes();
    let Sec =Time.getSeconds();
    let Millisec = Math.floor(Time.getMilliseconds() / 100);
    $("#timer").text(`${String(Hour).padStart(1,'0')}:${String(Min).padStart(1,'0')}:${String(Sec).padStart(1,'0')}:${String(Millisec).padStart(1,'0')}`);
  }

  //入力制御
  function classReplacementRun()  {
    $("#start").addClass("disabled");
    $("#stop").removeClass("disabled");
    $("#reset").addClass("disabled");
  }

  function classReplacementStop()  {
    $("#start").removeClass("disabled");
    $("#stop").addClass("disabled");
    $("#reset").removeClass("disabled");
  }

  function classReplacementInitial()  {
    $("#start").removeClass("disabled");
    $("#stop").addClass("disabled");
    $("#reset").addClass("disabled");
  }

  //ボタン押下処理
  $("#start").click(function() {
    if($(this).hasClass('disabled')){
      return;
    }
    classReplacementRun()
    startTime = Date.now();
    runTimer();
  });

  $("#stop").click(function() {
    if($(this).hasClass('disabled')){
      return;
    }
    classReplacementStop()
    //ストップ後再スタートした時継続記録のため保存
    elapsedTime += currentTime - startTime;
    clearTimeout(setTimeoutId);
  });

  $("#reset").click(function() {
    if($(this).hasClass('disabled')){
      return;
    }
    classReplacementInitial()
    clearTimeout(setTimeoutId);
    elapsedTime = 0
    $("#timer").text("0:0:0:0");
  });
});