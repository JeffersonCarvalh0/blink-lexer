import { Lexer } from './lexer'

const lexer = new Lexer("if (n % 2 == 1) return false; else return true;", 1);

console.log(lexer.tokenize());
