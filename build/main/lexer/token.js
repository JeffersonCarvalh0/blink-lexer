'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Token = exports.Token = function () {
    function Token(type, value, line, column) {
        _classCallCheck(this, Token);

        this.type = type;
        this.value = value;
        this.line = line;
        this.column = column;
    }

    _createClass(Token, [{
        key: 'toString',
        value: function toString() {
            return '<' + this.type + ', ' + this.value + ', ' + this.line + ':' + this.column + '>';
        }
    }]);

    return Token;
}();
//# sourceMappingURL=token.js.map