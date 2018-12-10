'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Lexer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _token = require('./token');

var _tokentype = require('./tokentype');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var exps = [/^[_a-zA-Z][_a-zA-Z0-9]*/, // identifiers, keywords
/^(=|\/=|-=|%=|\+=|\*=)/, // assignment operators
/^(\/|%|-|\+|\*)/, // arithmetic operators
/^(==|>|>=|<|<=|!=)/, // comparisson operators
/^(&&|!|\|\|)/, // boolean operators
/^(,|{|}|\[|\]|\(|\)|;)/, // delimiters
/^[+-]?\d+(\.\d+)?/, // number
/^["|'][\w ]+["|']/ // string literal
];

var Lexer = exports.Lexer = function () {
    function Lexer(input, line) {
        _classCallCheck(this, Lexer);

        this.input = input;
        this.line = line;
        this.column = 0;
    }

    _createClass(Lexer, [{
        key: 'tokenize',
        value: function tokenize() {
            var tokens = [];
            var token = this.nextToken();

            while (token.type !== _tokentype.TokenType.EndOfInput) {
                tokens.push(token);
                token = this.nextToken();
            }

            return tokens;
        }
    }, {
        key: 'nextToken',
        value: function nextToken() {
            if (this.column == this.input.length) return new _token.Token(_tokentype.TokenType.EndOfInput, undefined, this.line, this.column);else {
                var substr = this.input.slice(this.column);
                var spaces = substr.match(/^\s+/);
                if (spaces) this.column += spaces.length, substr = this.input.slice(this.column);

                for (var i = 0; i < exps.length; ++i) {
                    var lexeme = substr.match(exps[i]);
                    if (lexeme) {
                        lexeme = lexeme[0];
                        var token = this.createToken(lexeme, i);
                        this.column += lexeme.length;
                        return token;
                    }
                }

                ++this.column;
                return new _token.Token(_tokentype.TokenType.Unrecognized, this.input[this.column - 1], this.line, this.column);
            }
        }
    }, {
        key: 'createToken',
        value: function createToken(lexeme, expId) {
            if (expId == 0) {
                for (var type in _tokentype.TokenType.keywords) {
                    if (lexeme == _tokentype.TokenType.keywords[type]) return new _token.Token(_tokentype.TokenType.keywords[type], lexeme, this.line, this.column);
                }
                return new _token.Token(_tokentype.TokenType.Identifier, lexeme, this.line, this.column);
            }

            if (expId == 1) {
                for (var _type in _tokentype.TokenType.assignment) {
                    if (lexeme == _tokentype.TokenType.assignment[_type]) return new _token.Token(_tokentype.TokenType.assignment[_type], lexeme, this.line, this.column);
                }
            }

            if (expId == 2) {
                for (var _type2 in _tokentype.TokenType.arithmetic) {
                    if (lexeme == _tokentype.TokenType.arithmetic[_type2]) return new _token.Token(_tokentype.TokenType.arithmetic[_type2], lexeme, this.line, this.column);
                }
            }

            if (expId == 3) {
                for (var _type3 in _tokentype.TokenType.comparisson) {
                    if (lexeme == _tokentype.TokenType.comparisson[_type3]) return new _token.Token(_tokentype.TokenType.comparisson[_type3], lexeme, this.line, this.column);
                }
            }

            if (expId == 4) {
                for (var _type4 in _tokentype.TokenType.boolean) {
                    if (lexeme == _tokentype.TokenType.boolean[_type4]) return new _token.Token(_tokentype.TokenType.boolean[_type4], lexeme, this.line, this.column);
                }
            }

            if (expId == 5) {
                for (var _type5 in _tokentype.TokenType.delimiters) {
                    if (lexeme == _tokentype.TokenType.delimiters[_type5]) return new _token.Token(_tokentype.TokenType.delimiters[_type5], lexeme, this.line, this.column);
                }
            }

            if (expId == 6) {
                if (lexeme.match(/^\d+$/)) return new _token.Token(_tokentype.TokenType.Integer, lexeme, this.line, this.column);else return new _token.Token(_tokentype.TokenType.Decimal, lexeme, this.line, this.column);
            }

            if (expId == 7) return new _token.Token(_tokentype.TokenType.StringLiteral, lexeme, this.line, this.column);
        }
    }]);

    return Lexer;
}();
//# sourceMappingURL=lexer.js.map