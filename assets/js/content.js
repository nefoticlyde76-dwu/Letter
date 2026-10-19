/**
 * All reader-facing copy lives in this file.
 * Edit the letter, riddles, hints, and button labels here.
 * app.js reads window.LETTER_CONTENT. One global is used so the
 * page still opens when someone double-clicks index.html.
 */
window.LETTER_CONTENT = {
  welcome: {
    heading: "Hey, Beautiful ❤️",
    message:
      "So... I've written you something special. But there's just one tiny problem. You cannot read it until you pass a very serious examination. 😂",
    extra:
      "Don't worry, baby. The questions are easy. Probably. Maybe. No promises. 🤣",
    button: "Open My Letter 💌",
    warning: "Warning: Excessive smiling may occur."
  },

  ui: {
    submit: "Submit Answer",
    hint: "Hint",
    answerLabel: "Your answer",
    answerPlaceholder: "Type your answer here",
    progress: "Challenge {current} of {total}",
    restart: "Start over",
    emptyAnswer: "Write an answer first, beautiful. Even a wild guess counts. 😂",
    continueLetter: "Continue"
  },

  skip: {
    label: "Skip Riddle",
    note: "Skipping is allowed, but I'll pretend to be dramatically wounded. 😂",
    confirm: "Are you sure, baby? The prize is a love letter, not a trophy. 🤭",
    yes: "Skip anyway",
    no: "I'll try again"
  },

  /*
   * Answers are matched generously: capitalisation, extra spaces,
   * punctuation, and leading words such as "a", "an", "the", "my",
   * and "your" are ignored. Add any extra accepted phrases here.
   */
  riddles: [
    {
      question: "What has a face and two hands but cannot hug you?",
      answers: ["clock", "wall clock", "clocks"],
      hint: "You probably look at one when you're late. 😂",
      incorrect: "Baby, think again. Even my wall clock is judging that answer. 😭😂",
      correct: "Correct! Look at you being all intelligent. Who gave you permission to be this smart? 😭❤️"
    },
    {
      question: "What gets wetter the more it dries?",
      answers: ["towel", "towels", "bath towel", "hand towel"],
      hint: "You probably use it after taking a shower.",
      incorrect: "Eiii! 😂 How did you manage to make this question harder than it is?",
      correct: "YESSS! One point for my favourite human. 🥳❤️"
    },
    {
      question: "What has many keys but cannot open a single door?",
      answers: [
        "piano",
        "pianos",
        "keyboard",
        "keyboards",
        "computer keyboard",
        "musical keyboard",
        "music keyboard",
        "piano keyboard"
      ],
      hint: "You can make music with one.",
      incorrect: "Not the house keys, baby! 😂 Try again.",
      correct: "Look at that brain working! I might have to marry a genius. Wait... 🤭❤️"
    },
    {
      question: "What belongs to you but other people use it more than you do?",
      answers: ["name", "names"],
      hint: "I probably say it when I want your attention.",
      incorrect: "Nooo! 😂 It's something people use whenever they're talking about you.",
      correct: "Correct! And honestly, your name is one of my favourite words. 🥹❤️"
    },
    {
      question: "What has to be broken before you can use it?",
      answers: ["egg", "eggs"],
      hint: "You might eat it for breakfast.",
      incorrect: "Baby, please don't break my heart while trying to solve this one. 😭😂",
      correct: "YOU DID IT! 🎉❤️ Your certificate of being my favourite person is officially approved. No refunds!"
    }
  ],

  /*
   * The letter, in reading order. The question block is not repeated
   * inside the paragraphs, so it appears once on the choice screen.
   * Wrap a phrase in **double asterisks** to render it in bold.
   */
  letter: {
    greeting: "Hey, Baby❤️🥹",
    paragraphs: [
      "Before you start reading this letter, I need you to understand that this is not an ordinary text message. So please, answer those riddles properly.",
      "But seriously, my love… ❤️",
      "Sometimes I wonder how one person can become such a beautiful part of another person's life. How a simple conversation can brighten a day, how one smile can change a mood, and how someone can cross your mind even when you're busy doing absolutely nothing. 😂❤️",
      "And somehow, you've become that person for me.",
      "I may not always find the perfect words to explain what I feel, and I might not always know how to express everything in my heart. But I want you to know that you mean so much to me. You're not just someone I love; you're someone I want to keep choosing, someone I want to grow with, and someone I want beside me as we journey through life. 🥹❤️",
      "I love the little things about you, the things that might seem ordinary to you but somehow make you special to me. The way you talk, the way you make me smile, and the way even the smallest moments with you can become memories I want to keep.",
      "And yes, sometimes you stress me out. Sometimes you make me wonder what goes on inside that beautiful head of yours. 😂🤦🏽‍♂️ But even then, you remain someone I care about deeply.",
      "My love, I know our journey won't always be easy. There may be days when we misunderstand each other, moments when we disagree, times when life puts pressure on us, and seasons when things between us feel difficult. We may face challenges that test our patience, our understanding, and even our love for each other.",
      "But I want you to know that no matter how difficult things become, I don't want those difficulties to be the reason I stop choosing you. ❤️🥹",
      "I want to keep choosing you on the happy days and the difficult ones. When we're laughing together and when we're trying to understand each other. When everything feels right and when we have to work through things that hurt. I don't expect us to be perfect; I just hope we never stop trying to understand each other, communicate honestly, and find our way back to one another when things get hard.",
      "And baby, I know I'm not perfect. I know there are times when I hurt you, when my words, my actions, or even the things I fail to do might leave you feeling disappointed or make you question how much you mean to me. And honestly, that is something I never want to take lightly.",
      "I'm sorry for the times I've hurt you, even when I didn't fully understand how deeply my actions affected you. I don't want to be someone who keeps saying \"I'm sorry\" but never makes an effort to do better. I want my actions to show you that your heart matters to me. I want to learn from my mistakes, listen when you're hurt, take responsibility when I'm wrong, and become a better man, not just for myself, but also for the love we're building together. ❤️🥺",
      "I can't promise I'll never make mistakes, but I can promise that I want to keep learning, growing, and putting genuine effort into loving you better.",
      "Because loving you isn't just about choosing you when everything is beautiful, it's also about being willing to work through the difficult moments with you. I know love alone doesn't solve every problem, but I believe that with honesty, patience, forgiveness, respect, and effort from both of us, we can keep building something meaningful.",
      "I don't want to promise you a perfect love story because I'm human, and I know real love takes work. What I want is something genuine. Something we can nurture, something that makes us better people, and something we choose to protect even when life isn't always easy.",
      "I want to be someone you can laugh with, talk to, trust, and feel comfortable being yourself around. Someone who listens when you need to talk, celebrates your little victories, encourages you when you're struggling, and stands beside you when things get difficult.",
      "I want us to look back someday and smile at how far we've come, not because we never faced problems, but because we learned how to face them with maturity, love, and understanding. 🥹❤️",
      "And if I ever make you smile while reading this, just know that somewhere out here, there's a man smiling too because he got to make his favourite woman happy. I spent 4 hours creating this for you😭😭❤️",
      "You might not always understand how much you mean to me, and I might not always express it perfectly, but please never think that the difficult moments automatically erase the love I have for you. I want to keep showing you, through my words and actions, that you're someone worth making an effort for.",
      "I may not know everything our future holds, but I know that, as long as we both want this and are willing to work for it, I want to keep choosing you. Not because our relationship will always be easy, but because what we're building means something to me. ❤️🫶🏽"
    ],
    closing: "",
    signature: ""
  },

  final: {
    heading: "Now, I have one last question for you…",
    preface: "After all those riddles...",
    question: "Will you continue being my favourite person, my beautiful distraction, my partner in crime, and one of the sweetest parts of my life? ❤️🥹",
    note: "",
    accept: "Of course, silly! ❤️",
    delay: "Let me think... 🤭",
    acceptResponse: "You just made Your Man smile like an idiot. 😭❤️ Thank you for being part of my life, baby. Here's to continuing to choose each other, growing together, and making more beautiful memories. 🥹🫶🏽",
    delayResponse: "just, take your time Baby",
    continueLabel: "Continue"
  },

  closing: {
    remember: "And remember, Baby your man may make mistakes sometimes, and may not always get everything right, but my heart genuinely wants to keep Loving You. 🥹❤️",
    signOff: "With all my love,",
    signature: "Your Man. ❤️🫶🏽",
    title: "End of letter. Beginning of another beautiful chapter? ❤️🥹",
    note: "Made with love, 4 hours of coding, a little JavaScript, and an unreasonable amount of affection. 😂❤️",
    replay: "Replay"
  }
};
