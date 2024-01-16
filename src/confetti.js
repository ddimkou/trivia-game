import confetti from "canvas-confetti";

// endgame confetti
function startConfetti() {
  var duration = 15 * 1000;
  var animationEnd = Date.now() + duration;
  var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  var interval = setInterval(function () {
    var timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    var particleCount = 50 * (timeLeft / duration);
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    });
  }, 250);
}

// small confetti
const triggerConfetti = () => {
  confetti({
    angle: 90,
    spread: 360,
    startVelocity: 30,
    elementCount: 100,
    dragFriction: 0.12,
    duration: 1500,
    stagger: 3,
    width: "10px",
    height: "10px",
    colors: ["#bb0000", "#ffffff", "#ff0000", "#00ff00", "#0000ff", "#ffff00"],
  });
};
export { startConfetti, triggerConfetti };
