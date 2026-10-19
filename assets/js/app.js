/**
 * Interactive letter: screens, riddle checking, and the ending.
 * Reader-facing copy lives in content.js.
 */
(function () {
  "use strict";

  var content = window.LETTER_CONTENT;

  if (!content) {
    var missing = document.createElement("p");
    missing.className = "noscript-note";
    missing.textContent = "The letter could not be opened. Please refresh the page.";
    document.body.appendChild(missing);
    return;
  }

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var READ_PAUSE_MS = 2200;

  var els = {
    restartBtn: document.getElementById("restart-btn"),
    welcome: document.getElementById("screen-welcome"),
    welcomeHeading: document.getElementById("welcome-heading"),
    welcomeMessage: document.getElementById("welcome-message"),
    welcomeExtra: document.getElementById("welcome-extra"),
    welcomeWarning: document.getElementById("welcome-warning"),
    openBtn: document.getElementById("open-btn"),
    riddle: document.getElementById("screen-riddle"),
    progressLabel: document.getElementById("progress-label"),
    progressbar: document.getElementById("progressbar"),
    riddleHeading: document.getElementById("riddle-heading"),
    form: document.getElementById("riddle-form"),
    answerLabel: document.getElementById("answer-label"),
    answer: document.getElementById("answer-input"),
    submitBtn: document.getElementById("submit-btn"),
    hintBtn: document.getElementById("hint-btn"),
    hintText: document.getElementById("hint-text"),
    feedback: document.getElementById("feedback"),
    skipNote: document.getElementById("skip-note"),
    skipBtn: document.getElementById("skip-btn"),
    skipConfirm: document.getElementById("skip-confirm"),
    skipCopy: document.getElementById("skip-copy"),
    skipYes: document.getElementById("skip-yes"),
    skipNo: document.getElementById("skip-no"),
    letter: document.getElementById("screen-letter"),
    letterHeading: document.getElementById("letter-heading"),
    letterBody: document.getElementById("letter-body"),
    letterClosing: document.getElementById("letter-closing"),
    letterSignature: document.getElementById("letter-signature"),
    letterContinue: document.getElementById("letter-continue"),
    finalScreen: document.getElementById("screen-final"),
    finalHeading: document.getElementById("final-heading"),
    finalPreface: document.getElementById("final-preface"),
    finalQuestion: document.getElementById("final-question"),
    finalNote: document.getElementById("final-note"),
    acceptBtn: document.getElementById("accept-btn"),
    delayBtn: document.getElementById("delay-btn"),
    celebrationBand: document.getElementById("celebration-band"),
    choiceFeedback: document.getElementById("choice-feedback"),
    toClosing: document.getElementById("to-closing"),
    closing: document.getElementById("screen-closing"),
    closingRemember: document.getElementById("closing-remember"),
    closingSignOff: document.getElementById("closing-signoff"),
    closingSignature: document.getElementById("closing-signature"),
    closingTitle: document.getElementById("closing-title"),
    closingNote: document.getElementById("closing-note"),
    replayBtn: document.getElementById("replay-btn")
  };

  var screens = {
    welcome: els.welcome,
    riddle: els.riddle,
    letter: els.letter,
    final: els.finalScreen,
    closing: els.closing
  };

  var state = {
    screen: "welcome",
    index: 0,
    locked: false,
    celebrated: false,
    advanceTimer: null,
    leaveTimer: null
  };

  function normalise(value) {
    var text = String(value || "").toLowerCase();
    text = text.replace(/[’‘]/g, "'");
    text = text.replace(/[^a-z0-9\s]/g, " ");
    text = text.replace(/\s+/g, " ").trim();

    var fillers = { a: true, an: true, the: true, my: true, your: true, our: true };
    var parts = text.split(" ");
    while (parts.length > 1 && fillers[parts[0]]) {
      parts.shift();
    }
    return parts.join(" ");
  }

  function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  /* Small typos count. Adjacent swapped letters count as one change. */
  function editDistance(a, b) {
    var rows = a.length + 1;
    var cols = b.length + 1;
    var dp = [];
    var i;
    var j;
    var cost;

    for (i = 0; i < rows; i += 1) {
      dp[i] = [];
      for (j = 0; j < cols; j += 1) {
        dp[i][j] = 0;
      }
      dp[i][0] = i;
    }
    for (j = 0; j < cols; j += 1) {
      dp[0][j] = j;
    }

    for (i = 1; i < rows; i += 1) {
      for (j = 1; j < cols; j += 1) {
        cost = a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1;
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,
          dp[i][j - 1] + 1,
          dp[i - 1][j - 1] + cost
        );
        if (
          i > 1 &&
          j > 1 &&
          a.charAt(i - 1) === b.charAt(j - 2) &&
          a.charAt(i - 2) === b.charAt(j - 1)
        ) {
          dp[i][j] = Math.min(dp[i][j], dp[i - 2][j - 2] + 1);
        }
      }
    }

    return dp[a.length][b.length];
  }

  function isAccepted(rawInput, answers) {
    var value = normalise(rawInput);
    if (!value) {
      return { empty: true, match: false };
    }

    var match = answers.some(function (answer) {
      var target = normalise(answer);
      var limit;
      var word;

      if (!target) {
        return false;
      }
      if (value === target) {
        return true;
      }

      word = new RegExp("(?:^|\\s)" + escapeRegExp(target) + "(?:\\s|$)");
      if (target.length >= 3 && word.test(value)) {
        return true;
      }

      limit = target.length >= 8 ? 2 : 1;
      if (target.length < 5) {
        return false;
      }
      if (Math.abs(value.length - target.length) > limit) {
        return false;
      }
      return editDistance(value, target) <= limit;
    });

    return { empty: false, match: match };
  }

  function cleanCopy(value) {
    return String(value || "")
      .replace(/&#x20;/gi, " ")
      .replace(/&nbsp;/gi, " ")
      .replace(/\\n/g, "\n")
      .replace(/\\(["'])/g, "$1");
  }

  /* **phrase** becomes bold. The asterisks themselves are never shown. */
  function appendRichText(parent, value) {
    var text = cleanCopy(value);
    var pieces = text.split(/(\*\*[^*]+\*\*)/g);

    pieces.forEach(function (piece) {
      var strong;

      if (!piece) {
        return;
      }

      if (piece.indexOf("**") === 0 && piece.slice(-2) === "**" && piece.length > 4) {
        strong = document.createElement("strong");
        strong.textContent = piece.slice(2, -2);
        parent.appendChild(strong);
        return;
      }

      parent.appendChild(document.createTextNode(piece));
    });
  }

  function setText(element, value) {
    var text = cleanCopy(value);
    element.textContent = text;
    element.hidden = text.length === 0;
  }

  function clearTimer() {
    if (state.advanceTimer) {
      window.clearTimeout(state.advanceTimer);
      state.advanceTimer = null;
    }
    if (state.leaveTimer) {
      window.clearTimeout(state.leaveTimer);
      state.leaveTimer = null;
    }
  }

  function showScreen(name) {
    state.screen = name;
    Object.keys(screens).forEach(function (key) {
      screens[key].hidden = key !== name;
    });
    els.restartBtn.hidden = name === "welcome";
    window.scrollTo(0, 0);
    screens[name].classList.remove("is-entering");
    window.requestAnimationFrame(function () {
      if (state.screen === name) {
        screens[name].classList.add("is-entering");
      }
    });
  }

  function moveFocus(element) {
    if (!element) {
      return;
    }
    window.setTimeout(function () {
      element.focus({ preventScroll: true });
    }, reducedMotion ? 0 : 50);
  }

  function setFeedback(message, type) {
    els.feedback.textContent = message;
    els.feedback.classList.remove("is-correct", "is-incorrect");
    if (type) {
      els.feedback.classList.add(type);
    }
  }

  function setLocked(locked) {
    state.locked = locked;
    els.answer.disabled = locked;
    els.submitBtn.disabled = locked;
    els.hintBtn.disabled = locked;
    els.skipBtn.disabled = locked;
  }

  function hideSkipConfirm() {
    els.skipConfirm.hidden = true;
    els.skipBtn.hidden = false;
  }

  function clearRiddleUi() {
    els.answer.value = "";
    els.hintText.hidden = true;
    els.hintText.textContent = "";
    els.hintBtn.setAttribute("aria-expanded", "false");
    setFeedback("", null);
    hideSkipConfirm();
    setLocked(false);
  }

  function updateProgress() {
    var current = state.index + 1;
    var total = content.riddles.length;
    var label = content.ui.progress
      .replace("{current}", String(current))
      .replace("{total}", String(total));

    els.progressLabel.textContent = label;
    els.progressbar.setAttribute("aria-valuenow", String(current));
    els.progressbar.setAttribute("aria-valuemax", String(total));
    els.progressbar.setAttribute("aria-valuetext", label);

    Array.prototype.forEach.call(els.progressbar.children, function (dot, dotIndex) {
      dot.classList.toggle("is-done", dotIndex < state.index);
      dot.classList.toggle("is-current", dotIndex === state.index);
    });
  }

  function renderRiddle() {
    var riddle = content.riddles[state.index];
    clearRiddleUi();
    els.riddleHeading.textContent = riddle.question;
    updateProgress();
    showScreen("riddle");
    moveFocus(els.answer);
  }

  function advance() {
    setLocked(false);
    if (state.index >= content.riddles.length - 1) {
      showLetter();
      return;
    }
    state.index += 1;
    renderRiddle();
  }

  function onSubmit(event) {
    var riddle;
    var result;

    event.preventDefault();
    if (state.locked) {
      return;
    }

    riddle = content.riddles[state.index];
    result = isAccepted(els.answer.value, riddle.answers);

    if (result.empty) {
      setFeedback(content.ui.emptyAnswer, "is-incorrect");
      moveFocus(els.answer);
      return;
    }

    if (!result.match) {
      setFeedback(riddle.incorrect, "is-incorrect");
      els.answer.select();
      return;
    }

    setFeedback(riddle.correct, "is-correct");
    setLocked(true);
    hideSkipConfirm();
    state.advanceTimer = window.setTimeout(function () {
      state.advanceTimer = null;
      advance();
    }, READ_PAUSE_MS);
  }

  function showHint() {
    var riddle;
    if (state.locked) {
      return;
    }
    riddle = content.riddles[state.index];
    els.hintText.textContent = riddle.hint;
    els.hintText.hidden = false;
    els.hintBtn.setAttribute("aria-expanded", "true");
  }

  function openSkip() {
    if (state.locked) {
      return;
    }
    els.skipBtn.hidden = true;
    els.skipConfirm.hidden = false;
    moveFocus(els.skipCopy);
  }

  function confirmSkip() {
    if (state.locked) {
      return;
    }
    clearTimer();
    advance();
  }

  function cancelSkip() {
    hideSkipConfirm();
    moveFocus(els.answer);
  }

  function showLetter() {
    showScreen("letter");
    els.letterBody.replaceChildren();

    content.letter.paragraphs.forEach(function (text, index) {
      var paragraph = document.createElement("p");
      paragraph.className = "letter-paragraph";
      appendRichText(paragraph, text);
      if (!reducedMotion) {
        paragraph.style.animationDelay = (Math.min(index, 7) * 45) + "ms";
      }
      els.letterBody.appendChild(paragraph);
    });

    moveFocus(els.letterHeading);
  }

  function showFinal() {
    showScreen("final");
    moveFocus(els.finalHeading);
  }

  function showClosing() {
    showScreen("closing");
    moveFocus(els.closingTitle);
  }

  function celebrate() {
    var count = reducedMotion ? 5 : 7;
    var i;
    var heart;

    els.celebrationBand.replaceChildren();
    els.celebrationBand.classList.add("is-on");
    if (reducedMotion) {
      els.celebrationBand.classList.add("is-static");
    }

    for (i = 0; i < count; i += 1) {
      heart = document.createElement("span");
      heart.className = "mini-heart" + (i % 2 === 0 ? " is-wine" : " is-rose");
      heart.textContent = "♥";
      if (!reducedMotion) {
        heart.style.animationDelay = (i * 70) + "ms";
      }
      els.celebrationBand.appendChild(heart);
    }
  }

  function onAccept() {
    els.choiceFeedback.textContent = cleanCopy(content.final.acceptResponse);
    els.toClosing.hidden = false;
    if (!state.celebrated) {
      celebrate();
      state.celebrated = true;
    }
  }

  function onDelay() {
    els.choiceFeedback.textContent = cleanCopy(content.final.delayResponse);
    els.toClosing.hidden = false;
  }

  function clearFinal() {
    els.choiceFeedback.textContent = "";
    els.toClosing.hidden = true;
    els.celebrationBand.replaceChildren();
    els.celebrationBand.classList.remove("is-on", "is-static");
    state.celebrated = false;
  }

  function openLetter() {
    if (state.screen !== "welcome") {
      return;
    }
    els.welcome.classList.add("is-leaving");
    state.leaveTimer = window.setTimeout(function () {
      state.leaveTimer = null;
      state.index = 0;
      renderRiddle();
      els.welcome.classList.remove("is-leaving");
    }, reducedMotion ? 0 : 280);
  }

  function restart() {
    clearTimer();
    state.index = 0;
    state.locked = false;
    els.welcome.classList.remove("is-leaving");
    clearFinal();
    clearRiddleUi();
    showScreen("welcome");
    moveFocus(els.welcomeHeading);
  }

  function fillStaticCopy() {
    els.welcomeHeading.textContent = content.welcome.heading;
    els.welcomeMessage.textContent = content.welcome.message;
    els.welcomeExtra.textContent = content.welcome.extra;
    els.welcomeWarning.textContent = content.welcome.warning;
    els.openBtn.textContent = content.welcome.button;

    els.answerLabel.textContent = content.ui.answerLabel;
    els.answer.placeholder = content.ui.answerPlaceholder;
    els.submitBtn.textContent = content.ui.submit;
    els.hintBtn.textContent = content.ui.hint;
    els.skipNote.textContent = content.skip.note;
    els.skipBtn.textContent = content.skip.label;
    els.skipCopy.textContent = content.skip.confirm;
    els.skipYes.textContent = content.skip.yes;
    els.skipNo.textContent = content.skip.no;
    els.restartBtn.textContent = content.ui.restart;

    els.letterHeading.textContent = cleanCopy(content.letter.greeting);
    setText(els.letterClosing, content.letter.closing);
    setText(els.letterSignature, content.letter.signature);
    els.letterContinue.textContent = content.ui.continueLetter;

    els.finalHeading.textContent = cleanCopy(content.final.heading);
    setText(els.finalPreface, content.final.preface);
    setText(els.finalQuestion, content.final.question);
    setText(els.finalNote, content.final.note);
    els.acceptBtn.textContent = content.final.accept;
    els.delayBtn.textContent = content.final.delay;
    els.toClosing.textContent = content.final.continueLabel;

    els.closingRemember.textContent = cleanCopy(content.closing.remember);
    els.closingSignOff.textContent = cleanCopy(content.closing.signOff);
    els.closingSignature.textContent = cleanCopy(content.closing.signature);
    els.closingTitle.textContent = cleanCopy(content.closing.title);
    els.closingNote.textContent = cleanCopy(content.closing.note);
    els.replayBtn.textContent = content.closing.replay;
  }

  function buildSteps() {
    content.riddles.forEach(function () {
      var dot = document.createElement("span");
      dot.className = "step-dot";
      dot.setAttribute("aria-hidden", "true");
      els.progressbar.appendChild(dot);
    });
  }

  function bindEvents() {
    els.openBtn.addEventListener("click", openLetter);
    els.form.addEventListener("submit", onSubmit);
    els.answer.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        els.form.requestSubmit();
      }
    });
    els.hintBtn.addEventListener("click", showHint);
    els.skipBtn.addEventListener("click", openSkip);
    els.skipYes.addEventListener("click", confirmSkip);
    els.skipNo.addEventListener("click", cancelSkip);
    els.letterContinue.addEventListener("click", showFinal);
    els.acceptBtn.addEventListener("click", onAccept);
    els.delayBtn.addEventListener("click", onDelay);
    els.toClosing.addEventListener("click", showClosing);
    els.replayBtn.addEventListener("click", restart);
    els.restartBtn.addEventListener("click", restart);

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !els.skipConfirm.hidden) {
        cancelSkip();
      }
    });
  }

  function init() {
    fillStaticCopy();
    buildSteps();
    bindEvents();
    showScreen("welcome");
    document.body.classList.add("is-ready");
  }

  init();
})();
