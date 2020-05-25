export const startDemo = (sentence) => {
  return {
    type: 'START_DEMO',
    sentence: sentence.trim(),
  };
};

export const resetDemo = () => {
  return {
    type: 'RESET_DEMO',
  };
};
