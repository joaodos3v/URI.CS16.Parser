export const startDemo = (sentence, stepByStep) => {
  return {
    type: 'START_DEMO',
    sentence: sentence.trim(),
    stepByStep,
  };
};

export const resetDemo = () => {
  return {
    type: 'RESET_DEMO',
  };
};
