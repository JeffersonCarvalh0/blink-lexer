class Token {
    constructor(type, value, line, column) {
        this.type = type;
        this.value = value;
        this.line = line;
        this.column = column;
    }

    toString() {
        return '<' + this.type + ', ' + this.value + ', ' + this.line + ':' + this.column + '>';
    }
}

var TokenType = {
    keywords: {
        Int: 'int',
        Const: 'const',
        Double: 'double',
        Char: 'char',
        String: 'string',
        If: 'if',
        Else: 'else',
        True: 'true',
        False: 'false',
        Null: 'null',
        Return: 'return',
        While: 'while',
        For: 'for',
        Break: 'break',
        Continue: 'continue',
        Void: 'void'
    },

    assignment: {
        DivEqual: '/=',
        Equal: '=',
        MinusEqual: '-=',
        ModuloEqual: '%=',
        PlusEqual: '+=',
        TimesEqual: '*='
    },

    arithmetic: {
        Div: '/',
        Modulo: '%',
        Minus: '-',
        Plus: '+',
        Times: '*'
    },

    comparisson: {
        DoubleEqual: '==',
        Greater: '>',
        GreaterOrEqual: '>=',
        Less: '<',
        LessOrEqual: '<=',
        NotEqual: '!='
    },

    boolean: {
        And: '&&',
        Not: '!',
        Or: '||'
    },

    delimiters: {
        Comma: ',',
        LeftBrace: '{',
        LeftBracket: '[',
        LeftParen: '(',
        RightBrace: '}',
        RightBracket: ']',
        RightParen: ')',
        Semicolon: ';'
    },

    // Identifier and Literals
    Identifier: 'identifier',
    Integer: 'integer',
    Decimal: 'decimal',
    StringLiteral: 'stringLiteral',

    // Special token types
    EndOfInput: 'EndOfInput',
    Unrecognized: 'Unrecognized'
};

const exps = [
    /^[_a-zA-Z][_a-zA-Z0-9]*/,  // identifiers, keywords
    /^(=|\/=|-=|%=|\+=|\*=)/,   // assignment operators
    /^(\/|%|-|\+|\*)/,          // arithmetic operators
    /^(==|>|>=|<|<=|!=)/,       // comparisson operators
    /^(&&|!|\|\|)/,             // boolean operators
    /^(,|{|}|\[|\]|\(|\)|;)/,   // delimiters
    /^[+-]?\d+(\.\d+)?/,        // number
    /^["|'][\w ]+["|']/         // string literal
]

class Lexer {
    constructor(input, line) {
        this.input = input;
        this.line = line;
        this.column = 0;
    }

    tokenize() {
        this.column = 0;
        let tokens = [];
        let token = this.nextToken();

        while (token.type !== TokenType.EndOfInput) {
            tokens.push(token);
            token = this.nextToken();
        }

        return tokens;
    }

    nextToken() {
        if (this.column >= this.input.length)
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

            ++this.column;
            return new Token(TokenType.Unrecognized, this.input[this.column - 1], this.line, this.column);
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

        if (expId == 6) {
            if (lexeme.match(/^\d+$/))
                return new Token(TokenType.Integer, lexeme, this.line, this.column)
            else
                return new Token(TokenType.Decimal, lexeme, this.line, this.column);
        }

        if (expId == 7) return new Token(TokenType.StringLiteral, lexeme, this.line, this.column);
    }
}

function errorMsg(line, column, message) {
    let text = "";
    text += line + ':' + column + ': ' + message;
    return text;
}

class Parser {
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
                `expected a semicolon after '${this.cur.value}''`
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
                    `expected an expression or attribution after '${this.cur.value}''`
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


document.getElementById("button").addEventListener("click", () => {
    let source = document.getElementById("src").value;

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

    let text = "";
    if (parser.errors.length > 0) {
        for (let i = 0; i < parser.errors.length; ++i) text += parser.errors[i] + '\n';
        console.log(text);
    } else text = "No syntax errors detected.";

    document.getElementById("ans").innerText = text;
});
