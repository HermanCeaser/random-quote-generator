import "./style.scss";

function randomColor(max) {
  const r = Math.floor(Math.random() * max);
  const g = Math.floor(Math.random() * max);
  const b = Math.floor(Math.random() * max);
  
  // return an object with rgb an rgba color functions
  return {
    rgb: `rgb(${r}, ${g}, ${b})`,
    rgba: `rgba(${r}, ${g}, ${b}, 0.6)`,
  };
}

function setRandomBackgroundColor(el) {
  const { rgb, rgba } = randomColor(255);

  el.style.backgroundColor = rgba;
  el.style.color = rgb;
}

(function (e) {
  const quote = document.getElementById("new-quote");
  const body = document.body;
  
  quote.addEventListener("click", function(){
    
    setRandomBackgroundColor(body);
  });
})();
