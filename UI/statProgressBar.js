const showProgressBar = (num, el) => {
  let intervalId;
  let width = 1;
  function updateBar() {
    if (width >= num) {
      clearInterval(intervalId);
    } else {
      width += 1;
      el.style.width = `${width}%`;
      if (num >= 50 && num <= 99) {
        el.style.backgroundColor = 'rgb(153, 214, 111)';
      } else if (num >= 100) {
        el.style.backgroundColor = 'rgb(56, 235, 42)';
      } else {
        el.style.backgroundColor = 'rgb(255, 54, 78)';
      }
    }
  }
  intervalId = setInterval(updateBar, 10);
};

export default showProgressBar;
