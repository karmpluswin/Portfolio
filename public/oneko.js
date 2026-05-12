// oneko.js: https://github.com/adryd325/oneko.js

(function oneko() {
  const nekoEl = document.createElement("div");
  let persistPosition = false;
  let isSleeping = true;
  let wasRolexTextPresent = false;

  let nekoPosX = 150;
  let nekoPosY = 180;

  let mousePosX = 150;
  let mousePosY = 180;

  let frameCount = 0;
  let idleTime = 0;
  let idleAnimation = null;
  let idleAnimationFrame = 0;

  // Audio helpers
  let meowAudio = null;
  let audioCtx = null;

  function ensureAudio() {
    if (typeof window === "undefined") return null;
    if (!audioCtx) {
      const C = window.AudioContext || window.webkitAudioContext;
      if (!C) return null;
      audioCtx = new C();
    }
    return audioCtx;
  }

  function ensureMeowAudio() {
    if (typeof window === "undefined") return null;
    if (!meowAudio) {
      meowAudio = new Audio("/meow.mp3");
      meowAudio.preload = "auto";
      meowAudio.volume = 1;
    }
    return meowAudio;
  }

  function playMeow() {
    const audio = ensureMeowAudio();
    if (!audio) return;

    try {
      audio.pause();
      audio.currentTime = 0;
      audio.volume = 1;
      void audio.play().catch(() => {});
    } catch (e) {
      // ignore audio errors
    }
  }

  const nekoSpeed = 10;
  const spriteSets = {
    idle: [[-3, -3]],
    alert: [[-7, -3]],
    scratchSelf: [
      [-5, 0],
      [-6, 0],
      [-7, 0],
    ],
    scratchWallN: [
      [0, 0],
      [0, -1],
    ],
    scratchWallS: [
      [-7, -1],
      [-6, -2],
    ],
    scratchWallE: [
      [-2, -2],
      [-2, -3],
    ],
    scratchWallW: [
      [-4, 0],
      [-4, -1],
    ],
    tired: [[-3, -2]],
    sleeping: [
      [-2, 0],
      [-2, -1],
    ],
    N: [
      [-1, -2],
      [-1, -3],
    ],
    NE: [
      [0, -2],
      [0, -3],
    ],
    E: [
      [-3, 0],
      [-3, -1],
    ],
    SE: [
      [-5, -1],
      [-5, -2],
    ],
    S: [
      [-6, -3],
      [-7, -2],
    ],
    SW: [
      [-5, -3],
      [-6, -1],
    ],
    W: [
      [-4, -2],
      [-4, -3],
    ],
    NW: [
      [-1, 0],
      [-1, -1],
    ],
  };

  function init() {
    let nekoFile = "./oneko.gif";
    const curScript = document.currentScript;
    if (curScript && curScript.dataset.cat) {
      nekoFile = curScript.dataset.cat;
    }
    if (curScript && curScript.dataset.persistPosition) {
      if (curScript.dataset.persistPosition === "") {
        persistPosition = true;
      } else {
        persistPosition = JSON.parse(
          curScript.dataset.persistPosition.toLowerCase(),
        );
      }
    }

    if (persistPosition) {
      let storedNeko = JSON.parse(window.localStorage.getItem("oneko"));
      if (storedNeko !== null) {
        nekoPosX = storedNeko.nekoPosX;
        nekoPosY = storedNeko.nekoPosY;
        mousePosX = storedNeko.mousePosX;
        mousePosY = storedNeko.mousePosY;
        frameCount = storedNeko.frameCount;
        idleTime = storedNeko.idleTime;
        idleAnimation = storedNeko.idleAnimation;
        idleAnimationFrame = storedNeko.idleAnimationFrame;
        nekoEl.style.backgroundPosition = storedNeko.bgPos;
      }
    }

    nekoEl.id = "oneko";
    nekoEl.ariaHidden = true;
    nekoEl.style.width = "32px";
    nekoEl.style.height = "32px";
    nekoEl.style.position = "fixed";
    nekoEl.style.pointerEvents = "none";
    nekoEl.style.imageRendering = "pixelated";
    nekoEl.style.left = `${nekoPosX - 16}px`;
    nekoEl.style.top = `${nekoPosY - 16}px`;
    nekoEl.style.zIndex = 2147483647;

    nekoEl.style.backgroundImage = `url(${nekoFile})`;

    document.body.appendChild(nekoEl);

    // We will dynamically position it in frame() while sleeping
    const rolexText = document.getElementById("rolex-text");
    if (rolexText) {
      const rect = rolexText.getBoundingClientRect();
      nekoPosX = rect.right + 16;
      nekoPosY = rect.bottom - 22;
      mousePosX = nekoPosX;
      mousePosY = nekoPosY;
      nekoEl.style.left = `${nekoPosX - 16}px`;
      nekoEl.style.top = `${nekoPosY - 16}px`;
    }

    nekoEl.style.pointerEvents = "auto"; // allow hover/click
    nekoEl.style.cursor = "pointer";

    function wakeUp() {
      if (isSleeping) {
        isSleeping = false;
        idleTime = 0; // Reset idle time
        idleAnimation = null; // Clear sleeping animation
        idleAnimationFrame = 0;
        nekoEl.style.pointerEvents = "none"; // switch back to ignore cursor so it doesn't block
      }
    }

    // Handle any user interaction with the cat: always attempt to resume audio
    // and play a meow so touching the cat makes a sound even if it's already awake.
    function handleInteraction() {
      const ac = ensureAudio();
      if (ac && ac.state === "suspended") {
        void ac
          .resume()
          .catch(() => {})
          .finally(() => {
            // Wake up if sleeping, then always play a meow as feedback to the user.
            wakeUp();
            playMeow();
          });
        return;
      }

      // Wake up if sleeping, then always play a meow as feedback to the user.
      wakeUp();
      playMeow();
    }

    nekoEl.addEventListener("click", handleInteraction);
    nekoEl.addEventListener("touchstart", handleInteraction, { passive: true });

    // One-time page-level audio unlock: run early on first pointerdown (capture)
    // so other UI elements (theme toggle) can play on their first click.
    function unlockAudioOnFirstGesture() {
      const ac = ensureAudio();
      if (ac && ac.state === "suspended") {
        // resume our audio context; this handler runs in capture phase so it
        // will run before other handlers on the same gesture.
        ac.resume().catch(() => {});
      }
      document.removeEventListener(
        "pointerdown",
        unlockAudioOnFirstGesture,
        true,
      );
    }
    document.addEventListener("pointerdown", unlockAudioOnFirstGesture, true);

    document.addEventListener("mousemove", function (event) {
      mousePosX = event.clientX;
      mousePosY = event.clientY;
    });

    if (persistPosition) {
      window.addEventListener("beforeunload", function (event) {
        window.localStorage.setItem(
          "oneko",
          JSON.stringify({
            nekoPosX: nekoPosX,
            nekoPosY: nekoPosY,
            mousePosX: mousePosX,
            mousePosY: mousePosY,
            frameCount: frameCount,
            idleTime: idleTime,
            idleAnimation: idleAnimation,
            idleAnimationFrame: idleAnimationFrame,
            bgPos: nekoEl.style.backgroundPosition,
          }),
        );
      });
    }

    window.requestAnimationFrame(onAnimationFrame);
  }

  let lastFrameTimestamp;

  function onAnimationFrame(timestamp) {
    // Stops execution if the neko element is removed from DOM
    if (!nekoEl.isConnected) {
      return;
    }
    if (!lastFrameTimestamp) {
      lastFrameTimestamp = timestamp;
    }
    if (timestamp - lastFrameTimestamp > 100) {
      lastFrameTimestamp = timestamp;
      frame();
    }
    window.requestAnimationFrame(onAnimationFrame);
  }

  function setSprite(name, frame) {
    const sprite = spriteSets[name][frame % spriteSets[name].length];
    nekoEl.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
  }

  function resetIdleAnimation() {
    idleAnimation = null;
    idleAnimationFrame = 0;
  }

  function idle() {
    idleTime += 1;

    // every ~ 20 seconds
    if (
      idleTime > 10 &&
      Math.floor(Math.random() * 200) == 0 &&
      idleAnimation == null
    ) {
      let avalibleIdleAnimations = ["sleeping", "scratchSelf"];
      if (nekoPosX < 32) {
        avalibleIdleAnimations.push("scratchWallW");
      }
      if (nekoPosY < 32) {
        avalibleIdleAnimations.push("scratchWallN");
      }
      if (nekoPosX > window.innerWidth - 32) {
        avalibleIdleAnimations.push("scratchWallE");
      }
      if (nekoPosY > window.innerHeight - 32) {
        avalibleIdleAnimations.push("scratchWallS");
      }
      idleAnimation =
        avalibleIdleAnimations[
          Math.floor(Math.random() * avalibleIdleAnimations.length)
        ];
    }

    if (isSleeping) {
      idleAnimation = "sleeping";
    }

    switch (idleAnimation) {
      case "sleeping":
        if (idleAnimationFrame < 8) {
          setSprite("tired", 0);
          break;
        }
        setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
        if (idleAnimationFrame > 192) {
          if (isSleeping) {
            idleAnimationFrame = 8; // loop sleep
          } else {
            resetIdleAnimation();
          }
        }
        break;
      case "scratchWallN":
      case "scratchWallS":
      case "scratchWallE":
      case "scratchWallW":
      case "scratchSelf":
        setSprite(idleAnimation, idleAnimationFrame);
        if (idleAnimationFrame > 9) {
          resetIdleAnimation();
        }
        break;
      default:
        setSprite("idle", 0);
        return;
    }
    idleAnimationFrame += 1;
  }

  function frame() {
    frameCount += 1;

    const rolexText = document.getElementById("rolex-text");
    const isRolexTextPresent = !!rolexText;

    // If Rolex text just appeared (e.g. navigated back to Home page), reset the cat
    if (isRolexTextPresent && !wasRolexTextPresent) {
      isSleeping = true;
      nekoEl.style.pointerEvents = "auto";
    }
    wasRolexTextPresent = isRolexTextPresent;

    if (isSleeping) {
      if (rolexText) {
        const rect = rolexText.getBoundingClientRect();
        nekoPosX = rect.right + 16;
        nekoPosY = rect.bottom - 22;
      }
      mousePosX = nekoPosX;
      mousePosY = nekoPosY;
    }
    const diffX = nekoPosX - mousePosX;
    const diffY = nekoPosY - mousePosY;
    const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

    if (distance < nekoSpeed || distance < 48) {
      idle();
      return;
    }

    idleAnimation = null;
    idleAnimationFrame = 0;

    if (idleTime > 1) {
      setSprite("alert", 0);
      // count down after being alerted before moving
      idleTime = Math.min(idleTime, 7);
      idleTime -= 1;
      return;
    }

    let direction;
    direction = diffY / distance > 0.5 ? "N" : "";
    direction += diffY / distance < -0.5 ? "S" : "";
    direction += diffX / distance > 0.5 ? "W" : "";
    direction += diffX / distance < -0.5 ? "E" : "";
    setSprite(direction, frameCount);

    nekoPosX -= (diffX / distance) * nekoSpeed;
    nekoPosY -= (diffY / distance) * nekoSpeed;

    nekoPosX = Math.min(Math.max(16, nekoPosX), window.innerWidth - 16);
    nekoPosY = Math.min(Math.max(16, nekoPosY), window.innerHeight - 16);

    nekoEl.style.left = `${nekoPosX - 16}px`;
    nekoEl.style.top = `${nekoPosY - 16}px`;
  }

  init();
})();
