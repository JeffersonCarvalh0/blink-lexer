import { Lexer } from './lexer'
import { Parser } from './parser'

let source = `
int x;
int y;

x = read();
y = read();

if x > y {
writeln(x);
} else {
writeln(y);
}
`

let lines = source.split('\n');
let tokens = [];
for (let i = 1; i < lines.length; ++i) {
    let lexer = new Lexer(lines[i], i);
    if (lines[i]) tokens.push(lexer.tokenize());
}

console.log(tokens);
