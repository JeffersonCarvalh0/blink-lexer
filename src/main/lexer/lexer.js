import { Token } from './token'
import { TokenType } from './tokentype'

export class Lexer {
    constructor(input) {
        this.input = input;
    }

    tokenize() {
        let tokens = [];
        let token = this.nextToken();

        while (token.type !== TokenType.EndOfInput) {
            tokens.push(token);
            token = this.nextToken();
        }

        return tokens;
    }

    nextToken() {
        for( something in TokenType){
            console.log(something);
        }
    }
}
