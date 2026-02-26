export const STATES = {
  INTRO: -100,
  TITLE: -50,
  CURTAIN: 0,
  HASH: 50,
  BLACKOUT: 100,
  MATRIX_INTRO: 200,
  MATRIX_RUN: 300
};

export const PHASE = {
  current: STATES.INTRO,
  start: performance.now()
};

export function setState(newState) {
  PHASE.current = newState;
  PHASE.start = performance.now();
}

export function elapsedInState() {
  return performance.now() - PHASE.start;
}
