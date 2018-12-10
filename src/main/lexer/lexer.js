import { Token } from './token'
import { TokenType } from './tokentype'

const exps = [
    /^[_a-zA-Z][_a-zA-Z0-9]*/,  // identifiers, keywords
    /^(=|\/=|-=|%=|\+=|\*=)/,   // assignment operators
    /^(\/|%|-|\+|\*)/,          // arithmetic operators
    /^(==|>|>=|<|<=|!=)/,       // comparisson operators
    /^(&&|!|\|\|)/,             // boolean operators
    /^(,|{|}|\[|\]|\(|\)|;)/,   // delimiters
    /^\d+/,                     // integer
    /^[+-]?\d+(\.\d+)?/,        // decimal
    /^"[\w ]+"/                 // string literal
]

export class Lexer {
    constructor(input, line) {
        this.input = input;
        this.line = line;
        this.column = 0;
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
        if (this.column == this.input.length)
            return new Token(TokenType.EndOfInput, undefined, this.line, this.column);
        else {
            let substr = this.input.slice(this.column);
            let spaces = substr.match(/^\s+/);
            if (spaces) this.column += spaces.length, substr = this.input.slice(this.column);

            for (let i = 0; i < exps.length; ++i) {
                let lexeme = substr.match(exps[i]);
                if (lexeme) {
                    lexeme = lexeme[0];
                    let token = this.createToken(lexeme, i);
                    this.column += lexeme.length;
                    return token;
                }
            }
            return new Token(TokenType.Unrecognized, undefined, this.line, this.column);
        }
    }

    createToken(lexeme, expId) {
        if (expId == 0) {
            for (let type in TokenType.keywords) {
                if (lexeme == TokenType.keywords[type])
                    return new Token(TokenType.keywords[type], lexeme, this.line, this.column);
            }
            return new Token(TokenType.Identifier, lexeme, this.line, this.column);
        }

        if (expId == 1) {
            for (let type in TokenType.assignment) {
                if (lexeme == TokenType.assignment[type])
                    return new Token(TokenType.assignment[type], lexeme, this.line, this.column);
            }
        }

        if (expId == 2) {
            for (let type in TokenType.arithmetic) {
                if (lexeme == TokenType.arithmetic[type])
                    return new Token(TokenType.arithmetic[type], lexeme, this.line, this.column);
            }
        }

        if (expId == 3) {
            for (let type in TokenType.comparisson) {
                if (lexeme == TokenType.comparisson[type])
                    return new Token(TokenType.comparisson[type], lexeme, this.line, this.column);
            }
        }

        if (expId == 4) {
            for (let type in TokenType.boolean) {
                if (lexeme == TokenType.boolean[type])
                    return new Token(TokenType.boolean[type], lexeme, this.line, this.column);
            }
        }

        if (expId == 5) {
            for (let type in TokenType.delimiters) {
                if (lexeme == TokenType.delimiters[type])
                    return new Token(TokenType.delimiters[type], lexeme, this.line, this.column);
            }
        }

        if (expId == 6) return new Token(TokenType.Integer, lexeme, this.line, this.column);
        if (expId == 7) return new Token(TokenType.Decimal, lexeme, this.line, this.column);
        if (expId == 8) return new Token(TokenType.String, lexeme, this.line, this.column);
    }
}
