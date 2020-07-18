console.clear();

let tl = gsap.timeline({ repeat: -1, repeatDelay: 5 });

// mobing dot 1
tl.to("#dot_1", {
  motionPath: {
    path: "#line_1",
    align: "#line_1",
    alignOrigin: [0.5, 0.5],
  },
  duration: 10,
  ease: Power0.easeNone
});

// moving dot 2
tl.to("#dot_2", {
  motionPath: {
    path: "#line_2",
    align: "#line_2",
    alignOrigin: [0.5, 0.5],
  },
  duration: 10,
  ease: Power0.easeNone
}, '-=10');

// colour change of moving dots
tl.to("#dot_1_outer_circle", 2, {
  fill: '#D32F2F'
}, '+=1');
tl.to("#dot_1_inner_circle", 2, {
  fill: '#D32F2F'
}, '-=2');

tl.to("#dot_2_outer_circle", 2, {
  fill: '#D32F2F'
}, '-=2');
tl.to("#dot_2_inner_circle", 2, {
  fill: '#D32F2F'
}, '-=2');

tl.fromTo("#alert_left", 0.3, {
  opacity: 0,
  scaleX: 0.5,
  scaleY: 0.5
}, {
  opacity: 1,
  scaleX: 1,
  scaleY: 1,
}, '+=2');
tl.fromTo("#alert_right", 0.3, {
  opacity: 0,
  scaleX: 0.5,
  scaleY: 0.5
}, {
  opacity: 1,
  scaleX: 1,
  scaleY: 1
}, '-=0.1');


let tl2 = gsap.timeline({ repeat: -1, repeatDelay: 0, yoyo: true });
// other dots
tl2.to("#dot_3", {
  motionPath: {
    path: "#path_3",
    align: "#path_3",
    alignOrigin: [0.5, 0.5],
  },
  duration: 2,
  ease: "Power0.easeNone"
});

tl2.to("#dot_4", {
  motionPath: {
    path: "#path_4",
    align: "#path_4",
    alignOrigin: [0.5, 0.5],
  },
  duration: 2,
  ease: "Power0.easeNone"
}, '-=3');
tl2.to("#dot_5", {
  motionPath: {
    path: "#path_5",
    align: "#path_5",
    alignOrigin: [0.5, 0.5],
  },
  duration: 2,
  ease: "power0.easeNone"
}, '-=3');

tl2.to("#dot_6", {
  motionPath: {
    path: "#path_6",
    align: "#path_6",
    alignOrigin: [0.5, 0.5],
  },
  duration: 2,
  ease: "power0.easeNone"
}, '-=3');

tl2.to("#dot_7", {
  motionPath: {
    path: "#path_7",
    align: "#path_7",
    alignOrigin: [0.5, 0.5],
  },
  duration: 2,
  ease: "power0.easeNone"
}, '-=3');

tl2.to("#dot_9", {
  motionPath: {
    path: "#path_9",
    align: "#path_9",
    alignOrigin: [0.5, 0.5],
  },
  duration: 2,
  ease: "power0.easeNone"
}, '-=3');

tl2.to("#dot_12", {
  motionPath: {
    path: "#path_12",
    align: "#path_12",
    alignOrigin: [0.5, 0.5],
  },
  duration: 2,
  ease: "power0.easeNone"
}, '-=3');

tl2.to("#dot_13", {
  motionPath: {
    path: "#path_13",
    align: "#path_13",
    alignOrigin: [0.5, 0.5],
  },
  duration: 2,
  ease: "power0.easeNone"
}, '-=3');

tl2.to("#dot_14", {
  motionPath: {
    path: "#path_14",
    align: "#path_14",
    alignOrigin: [0.5, 0.5],
  },
  duration: 2,
  ease: "power0.easeNone"
}, '-=3');

tl2.to("#dot_15", {
  motionPath: {
    path: "#path_15",
    align: "#path_15",
    alignOrigin: [0.5, 0.5],
  },
  duration: 2,
  ease: "power0.easeNone"
}, '-=6');

tl2.to("#dot_16", {
  motionPath: {
    path: "#path_16",
    align: "#path_16",
    alignOrigin: [0.5, 0.5],
  },
  duration: 2,
  ease: "power0.easeNone"
}, '-=4');

tl2.to("#dot_17", {
  motionPath: {
    path: "#path_17",
    align: "#path_17",
    alignOrigin: [0.5, 0.5],
  },
  duration: 2,
  ease: "power0.easeNone"
}, '-=3');

tl2.to("#dot_19", {
  motionPath: {
    path: "#path_19",
    align: "#path_19",
    alignOrigin: [0.5, 0.5],
  },
  duration: 2,
  ease: "power0.easeNone"
}, '-=8');

tl2.to("#dot_20", {
  motionPath: {
    path: "#path_20",
    align: "#path_20",
    alignOrigin: [0.5, 0.5],
  },
  duration: 2,
  ease: "power0.easeNone"
}, '-=3');