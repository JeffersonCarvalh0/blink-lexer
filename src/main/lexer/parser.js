import { TokenType } from './tokentype';
import { Token } from './token';

function errorMsg(line, column, message) {
    let text = "";
    text += line + ':' + column + ': ' + message;
    return text;
}

export class Parser {
    constructor(tokens) {
        this.tokens = tokens;
        this.cur = new Token(TokenType.Unrecognized, undefined, 0, 0);
        this.errors = [];
        this.id = -1;
    }

    nextToken() {
        ++this.id;
        if (this.id < this.tokens.length) {
            this.cur = this.tokens[this.id];
        } else {
            throw new Error("Finished");
        }
    }

    isNextOfType(type) {
        if (this.id + 1 < this.tokens.length)
            return this.tokens[this.id + 1].type === type;
        else return false;
    }

    parse() {
        try {
            let curId = this.id
            while(this.id < this.tokens.length - 1) {
                this.parseStmt();
                if (this.id == curId) {
                    this.errors.push(errorMsg(
                        this.cur.line,
                        this.cur.column,
                        `Unexpected token '${this.cur.value}'`
                    ));
                    break;
                }
                curId = this.id;
            }
        } catch (except) {}
    }

    // Statement := [ Attribution ] Expression ";"
    parseStmt() {
        let isAtrib = false;
        if (this.isNextOfType(TokenType.Identifier)) {
            isAtrib = true;
            this.parseAtrib();
        }

        if (!isAtrib) this.parseExp();

        if (!this.isNextOfType(TokenType.delimiters.Semicolon)) {
            this.errors.push(errorMsg(
                this.cur.line,
                this.cur.column,
                `expected a semicolon after '${this.cur.value}'`
            ));
        } else this.nextToken();
    }

    // Attribution := Identifier "=" Expression
    parseAtrib() {
        if (this.isNextOfType(TokenType.Identifier)) {
            this.nextToken();
            if (this.isNextOfType(TokenType.assignment.Equal)) {
                this.nextToken();
                this.parseExp();
            } else {
                this.errors.push(errorMsg(
                    this.cur.line,
                    this.cur.column,
                    `expected an expression or attribution after '${this.cur.value}'`
                ));
                return false;
            }
        } else {
            this.errors.push(errorMsg(
                this.cur.line,
                this.cur.column,
                `expected an identifier`
            ));
            return false;
        }
        return true;
    }

    // Expression := [ "-" ] Term { ("+" | "-") Term }
    parseExp() {
        if (this.isNextOfType(TokenType.arithmetic.Minus))
            this.nextToken();

        this.parseTerm();

        while (this.isNextOfType(TokenType.arithmetic.Plus) ||
        this.isNextOfType(TokenType.arithmetic.Minus)) {
            this.nextToken();
            this.parseTerm();
        }
    }

    // Term := Factor { ( "*" | "/" | "%" ) Factor }
    parseTerm() {
        this.parseFactor();

        while (this.isNextOfType(TokenType.arithmetic.Times) ||
        this.isNextOfType(TokenType.arithmetic.Div) ||
        this.isNextOfType(TokenType.arithmetic.Modulo)) {
            this.nextToken();
            this.parseFactor();
        }
    }

    // Factor := Number | Identifier | "(" Expression ")"
    parseFactor() {
        if (this.isNextOfType(TokenType.Integer) || this.isNextOfType(TokenType.Decimal) ||
        this.isNextOfType(TokenType.Identifier)) {
            this.nextToken();
            return true;
        }

        if (this.isNextOfType(TokenType.delimiters.LeftParen)) {
            this.nextToken();
            this.parseExp();
            if (!this.isNextOfType(TokenType.delimiters.RightParen)) {
                this.errors.push(errorMsg(
                    this.cur.line,
                    this.cur.column,
                    `')' expected after '${this.cur.value}'`
                ));
                return false;
            }
            this.nextToken();
            return true;
        }

        console.log("Oops");
        this.errors.push(errorMsg(
            this.cur.line,
            this.cur.column,
            `expected a number or an expression between parenthesis after '${this.cur.value}'`
        ));
    }
}
