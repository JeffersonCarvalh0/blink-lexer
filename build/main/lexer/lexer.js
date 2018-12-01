'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Lexer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _token = require('./token');

var _tokentype = require('./tokentype');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Lexer = exports.Lexer = function () {
    function Lexer(input) {
        _classCallCheck(this, Lexer);

        this.input = input;
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
            for (something in _tokentype.TokenType) {
                console.log(something);
            }
        }
    }]);

    return Lexer;
}();
//# sourceMappingURL=lexer.js.map