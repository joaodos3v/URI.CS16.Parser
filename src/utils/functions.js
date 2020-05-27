import {
  grammar,
  parsingTable,
  PRODUCTION_RULE_SEPARATOR,
  EQUAL_SYMBOL,
  INITIAL_SYMBOL,
  EPSILON,
  DOLLAR,
} from './constants';

/**
 * ==========================
 * Generate Sentence
 * ==========================
 */
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

/**
 * ==========================
 * Recognize Sentence
 * ==========================
 */
const getLeftmostDigit = (input) => input[0];

const getStackTop = (stack) => stack[stack.length - 1];

const getAction = (stackTop, leftmostDigit) => {
  const { header, body } = parsingTable;

  const columnIndex = header.findIndex((column) => column.value === leftmostDigit);
  const rowIndex = body.findIndex((row) => row.key === stackTop);

  return columnIndex >= 0 && rowIndex >= 0 ? body[rowIndex].values[columnIndex] : null;
};

const updateStack = (currentStack, action) => {
  const stackTop = getStackTop(currentStack);

  let newStackTop = '';
  if (action !== 'Read' && !action.includes('ε')) {
    const cutoff = action.indexOf('→') + 1;
    const newPiece = action.substr(cutoff);
    newStackTop = newPiece.split('').reverse().join('');
  }

  // Ps: can't use replace because it will remove the first occurrence!
  return currentStack.substr(0, currentStack.lastIndexOf(stackTop)) + newStackTop;
};

const addRow = (currentStack, currentSentence, currentAction, currentIteration, newBody) => {
  const currentBody = [
    ...newBody,
    {
      key: currentIteration,
      values: [currentStack, currentSentence, currentAction],
    },
  ];

  return currentBody;
};

export const recognizeSentence = (sentence) => {
  let stack = '$S';
  let localSentence = `${sentence}$`;
  let iterations = 0;
  let newBody = [];
  let tabularTopDownPredictiveStack = [];

  while (localSentence.length > 0) {
    iterations += 1;
    const stackTop = getStackTop(stack);
    const leftmostDigit = getLeftmostDigit(localSentence);
    let action = null;

    if (stackTop === leftmostDigit) {
      if (stackTop === DOLLAR) {
        newBody = addRow(
          stack,
          localSentence,
          `OK em ${iterations} iterações`,
          iterations,
          newBody
        );
        tabularTopDownPredictiveStack = newBody;
        break;
      } else {
        newBody = addRow(stack, localSentence, `Ler ${leftmostDigit}`, iterations, newBody);
        stack = updateStack(stack, 'Read');
        localSentence = localSentence.substr(1);
      }
    } else {
      action = getAction(stackTop, leftmostDigit);
      if (action && action !== '-') {
        newBody = addRow(stack, localSentence, action, iterations, newBody);
        stack = updateStack(stack, action);
      } else {
        newBody = addRow(
          stack,
          localSentence,
          `ERRO em ${iterations} iterações`,
          iterations,
          newBody
        );
        tabularTopDownPredictiveStack = newBody;
        break;
      }
    }
  }

  return tabularTopDownPredictiveStack;
};
