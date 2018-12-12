export var TokenType = {
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
