const INITIAL_STATE = {
  sentence: '',
  showFiniteAutomaton: false,
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'START_DEMO':
      return { sentence: action.sentence, showFiniteAutomaton: true };

    case 'RESET_DEMO':
      return INITIAL_STATE;

    default:
      return state;
  }
}
