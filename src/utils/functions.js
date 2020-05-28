import {
  grammar,
  parsingTable,
  ACTION_READ,
  ACTION_ACCEPT,
  ACTION_ERROR,
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

const getRulesByLine = (localGrammar, line) => {
  return localGrammar.find((currentLine) => currentLine.key === line);
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
    const currentProductionRules = getRulesByLine(cleanGrammar, currentLine);

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

const getErrorMessage = (iterations) => `${ACTION_ERROR} em ${iterations} iterações`;

const getAcceptMessage = (iterations) => `${ACTION_ACCEPT} em ${iterations} iterações`;

const getAction = (stackTop, leftmostDigit) => {
  const { header, body } = parsingTable;

  const columnIndex = header.findIndex((column) => column.value === leftmostDigit);
  const rowIndex = body.findIndex((row) => row.key === stackTop);

  return columnIndex >= 0 && rowIndex >= 0 ? body[rowIndex].values[columnIndex] : null;
};

const updateStack = (currentStack, action) => {
  const stackTop = getStackTop(currentStack);

  let newStackTop = '';
  if (action !== ACTION_READ && !action.includes(EPSILON)) {
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
    const action = getAction(stackTop, leftmostDigit);

    if (stackTop === leftmostDigit) {
      if (stackTop === DOLLAR) {
        newBody = addRow(stack, localSentence, getAcceptMessage(iterations), iterations, newBody);
        tabularTopDownPredictiveStack = newBody;
        break;
      } else {
        newBody = addRow(stack, localSentence, `Ler ${leftmostDigit}`, iterations, newBody);
        stack = updateStack(stack, ACTION_READ);
        localSentence = localSentence.substr(1);
      }
    } else if (action && action !== '-') {
      newBody = addRow(stack, localSentence, action, iterations, newBody);
      stack = updateStack(stack, action);
    } else {
      newBody = addRow(stack, localSentence, getErrorMessage(iterations), iterations, newBody);
      tabularTopDownPredictiveStack = newBody;
      break;
    }
  }

  return tabularTopDownPredictiveStack;
};
