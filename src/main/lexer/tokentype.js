export var TokenType = {

    // Keywords
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
    Void: 'void',

    // Assignment operators
    DivEqual: '/=',
    Equal: '=',
    MinusEqual: '-=',
    ModuloEqual: '%=',
    PlusEqual: '+=',
    TimesEqual: '*=',

    // Arithmetic operators
    Div: '/',
    Modulo: '%',
    Minus: '-',
    Plus: '+',
    Times: '*',

    // Comparison operators
    DoubleEqual: '==',
    Greater: '>',
    GreaterOrEqual: '>=',
    Less: '<',
    LessOrEqual: '<=',
    NotEqual: '!=',

    // Boolean operators
    And: '&&',
    Not: '!',
    Or: '||',

    // Delimiters
    Colon: ':',
    Comma: ',',
    LeftBrace: '{',
    LeftBracket: '[',
    LeftParen: '(',
    Newline: '\n',
    RightBrace: '}',
    RightBracket: ']',
    RightParen: ')',

    // Identifier and Literals
    Identifier: 'identifier',
    Integer: 'integer',
    Decimal: 'decimal',
    String: 'string',

    // Special token types
    EndOfInput: 'EndOfInput',
    Unrecognized: 'Unrecognized'
};
