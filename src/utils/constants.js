export const grammar = [
  ['S', '::=', 'aAd', '', '', '', ''],
  ['A', '::=', 'aCb', '|', 'cCB', '', ''],
  ['B', '::=', 'dBa', '|', 'bcS', '|', 'c'],
  ['C', '::=', 'aSb', '|', 'ε', '', ''],
];

export const first = [
  ['(S)', '=', '{a}'],
  ['(A)', '=', '{a, c}'],
  ['(B)', '=', '{d, b, c}'],
  ['(C)', '=', '{a, ε}'],
];

export const follow = [
  ['(S)', '=', '{$, b, a, d}'],
  ['(A)', '=', '{d}'],
  ['(B)', '=', '{a, d}'],
  ['(C)', '=', '{b, d, c}'],
];

export const parsingTable = {
  header: [
    { key: 1, value: '' },
    { key: 2, value: 'a' },
    { key: 3, value: 'b' },
    { key: 4, value: 'c' },
    { key: 5, value: 'd' },
    { key: 6, value: '$' },
  ],
  body: [
    { key: 'S', values: ['S', 'S→aAd', '-', '-', '-', '-'] },
    { key: 'A', values: ['A', 'A→aCb', '-', 'A→cCB', '-', '-'] },
    { key: 'B', values: ['B', '-', 'B→bcS', 'B→c', 'B→dBa', '-'] },
    { key: 'C', values: ['C', 'C→aSb', 'C→ε', 'C→ε', 'C→ε', '-'] },
  ],
};

export const finiteAutomaton = {
  header: [
    { key: 1, value: 'PILHA' },
    { key: 2, value: 'ENTRADA' },
    { key: 3, value: 'AÇÃO' },
  ],
  // body: [
  //   { key: 1, values: ['', 'abcdef', '-'] },
  //   { key: 2, values: ['', 'abcdef', '-'] },
  //   { key: 3, values: ['', 'abcdef', 'OK em 15 iterações'] },
  // ],
};

/**
 * Extras
 */
export const myGithub = 'https://github.com/joao-vieira';

export const myLinkedin = 'https://www.linkedin.com/in/jo%C3%A3o-vitor-veronese-vieira/';

export const appDownload = 'https://github.com/joao-vieira/URI.CS16.Parser/archive/master.zip';
