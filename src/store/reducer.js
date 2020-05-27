const INITIAL_STATE = {
  sentence: '',
  showFiniteAutomaton: false,
  stepByStep: false,
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'START_DEMO':
      return {
        sentence: action.sentence,
        showFiniteAutomaton: true,
        stepByStep: action.stepByStep,
      };

    case 'RESET_DEMO':
      return INITIAL_STATE;

    default:
      return state;
  }
}
