import {
  grammar,
  PRODUCTION_RULE_SEPARATOR,
  EQUAL_SYMBOL,
  INITIAL_SYMBOL,
  EPSILON,
} from './constants';

const getRandomFromArray = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const clearGrammar = (localGrammar) => {
  const cleanGrammar = localGrammar.map((productionRule) => {
    const [key] = productionRule;
    const useless = ['', key, PRODUCTION_RULE_SEPARATOR, EQUAL_SYMBOL];

    return {
      key,
      values: productionRule.filter((production) => !useless.includes(production)),
    };
  });

  return cleanGrammar;
};

export const generateSentence = () => {
  const cleanGrammar = clearGrammar(grammar);

  let sentence = '';
  const toVisit = [];
  let currentLine = INITIAL_SYMBOL;
  let notFinishGeneration = true;
  while (notFinishGeneration) {
    const currentProductionRules = cleanGrammar.find((line) => line.key === currentLine);

    const currentRule = getRandomFromArray(currentProductionRules.values);
    if (!sentence) {
      sentence = currentRule;
    }

    const nonTerminals = currentRule.split('').filter((char) => char === char.toUpperCase());
    toVisit.push(...nonTerminals);

    const toReplace = currentRule === EPSILON ? '' : currentRule;
    sentence = sentence.replace(currentLine, toReplace);

    if (toVisit.length > 0) {
      const nextLine = toVisit.shift();
      currentLine = nextLine;
    } else {
      notFinishGeneration = false;
    }
  }

  return sentence;
};
