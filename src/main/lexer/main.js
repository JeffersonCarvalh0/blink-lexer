import { Lexer } from './lexer'
import { Parser } from './parser'

let source = `z = ((x + y) - ((x + y) / (x - y))) + ((x + y) / (x - y))`;

let lines = source.split('\n');
let tokens = [];
for (let i = 0; i < lines.length; ++i) {
    let lexer = new Lexer(lines[i], i + 1);
    let curTokens = lexer.tokenize();
    if (lines[i]) {
        for (let j = 0; j < curTokens.length; ++j) tokens.push(curTokens[j]);
    }
}

let parser = new Parser(tokens);
parser.parse();
console.log(parser.errors);
