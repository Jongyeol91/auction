const countDownTimer = function (id, date) {
  //console.log(date)
  const _vDate = new Date(date); // 전달 받은 일자
  //console.log(_vDate)
  const _second = 1000;
  const _minute = _second * 60;
  const _hour = _minute * 60;
  const _day = _hour * 24;
  let timer;

  function showRemaining() {
    const now = new Date();
    const distDt = _vDate - now;
    // if (distDt < 0) {
    //     clearInterval(timer);
    //     //document.getElementById(id).textContent = '해당 이벤트가 종료 되었습니다!';
    //     return;
    // }
    const days = Math.floor(distDt / _day).toString();

    const hours = Math.floor((distDt % _day) / _hour).toString();
    const zeroBaseHours = makeZeroBaseNum(hours);
    const minutes = Math.floor((distDt % _hour) / _minute).toString();
    const zeroBaseMinutes = makeZeroBaseNum(minutes);
    const seconds = Math.floor((distDt % _minute) / _second).toString();
    const zeroBaseSeconds = makeZeroBaseNum(seconds);

    //document.getElementById(id).textContent = date.toLocaleString() + "까지 : ";
    // document.getElementById(id).textContent = days + '일 ';
    // document.getElementById(id).textContent += hours + '시간 ';
    // document.getElementById(id).textContent += minutes + '분 ';
    // document.getElementById(id).textContent += seconds + '초';
  }

  function makeZeroBaseNum(strNum) {
    if (strNum.length === 1) {
      const zeroBaseNum = '0' + strNum;
      return zeroBaseNum;
    } else {
      return strNum;
    }
  }

  timer = setInterval(showRemaining, 1000);
};
