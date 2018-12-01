'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _TokenType;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TokenType = exports.TokenType = (_TokenType = {

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
    Decimal: 'decimal'
}, _defineProperty(_TokenType, 'String', 'string'), _defineProperty(_TokenType, 'EndOfInput', 'EndOfInput'), _defineProperty(_TokenType, 'Unrecognized', 'Unrecognized'), _TokenType);
//# sourceMappingURL=tokentype.js.map