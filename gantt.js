function createChart(e) {
  const years = document.querySelectorAll(".chart-values li");
  const devices = document.querySelectorAll(".chart-bars li");
  const yearsArray = [...years];

  // https://stackoverflow.com/a/51564734/473467
  const hex2rgba = (hex, alpha = 1) => {
    const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
    return `rgba(${r},${g},${b},${alpha})`;
  };

  devices.forEach(el => {
    const duration = el.dataset.duration.split("-");
    const startYear = duration[0];
    const endYear = duration[1];
    const eol = el.dataset.eol;
    let left = 0,
      width = 0;

    if (startYear.endsWith("½")) {
      const filteredArray = yearsArray.filter(day => day.textContent == startYear.slice(0, -1));
      left = filteredArray[0].offsetLeft + filteredArray[0].offsetWidth / 2;
    } else {
      const filteredArray = yearsArray.filter(day => day.textContent == startYear);
      left = filteredArray[0].offsetLeft;
    }

    if (endYear.endsWith("½")) {
      const filteredArray = yearsArray.filter(day => day.textContent == endYear.slice(0, -1));
      width = filteredArray[0].offsetLeft + filteredArray[0].offsetWidth / 2 - left;
    } else {
      const filteredArray = yearsArray.filter(day => day.textContent == endYear);
      width = filteredArray[0].offsetLeft + filteredArray[0].offsetWidth - left;
    }

    if (eol) {
      if (eol.endsWith("½")) {
        const filteredArray = yearsArray.filter(day => day.textContent == eol.slice(0, -1));
        shadowOffset = filteredArray[0].offsetLeft + filteredArray[0].offsetWidth / 2 - width - left;
      } else {
        const filteredArray = yearsArray.filter(day => day.textContent == eol);
        shadowOffset = filteredArray[0].offsetLeft - width - left;
      }
    }

    // apply css
    el.style.left = `${left}px`;
    el.style.width = `${width}px`;
    if (eol) {
      el.style.boxShadow = `${shadowOffset}px 0 0 ${hex2rgba(el.dataset.color, 0.3)}`
    }
    if (e.type == "load") {
      el.style.backgroundColor = el.dataset.color;
      el.style.opacity = 1;
    }
  });
}

window.addEventListener("load", createChart);
window.addEventListener("resize", createChart);
