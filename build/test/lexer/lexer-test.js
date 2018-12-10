'use strict';

var _assert = require('assert');

var assert = _interopRequireWildcard(_assert);

var _tokentype = require('../../main/lexer/tokentype');

var _lexer = require('../../main/lexer/lexer');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

describe('Lexer', function () {

    describe('#nextToken', function () {

        it('should recognize a newline character as a single token', function () {
            var lexer = new _lexer.Lexer('\n');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.Newline);
            assert.equal(token.value, '\n');
        });

        it('should recognize the number 0', function () {
            var lexer = new _lexer.Lexer('0');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.Integer);
            assert.equal(token.value, '0');
        });

        it('should recognize a simple integer literal', function () {
            var lexer = new _lexer.Lexer('42');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.Integer);
            assert.equal(token.value, '42');
        });

        it('should recognize a simple decimal literal', function () {
            var lexer = new _lexer.Lexer('3.14');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.Decimal);
            assert.equal(token.value, '3.14');
        });

        it('should recognize a decimal starting with dot (.)', function () {
            var lexer = new _lexer.Lexer('.25');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.Decimal);
            assert.equal(token.value, '.25');
        });

        it('should recognize a decimal in scientific notation', function () {
            var lexer = new _lexer.Lexer('2e65');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.Decimal);
            assert.equal(token.value, '2e65');
        });

        it('should recognize a decimal in scientific notation with negative exponent part', function () {
            var lexer = new _lexer.Lexer('42e-65');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.Decimal);
            assert.equal(token.value, '42e-65');
        });

        it('should recognize a simple string literal', function () {
            var lexer = new _lexer.Lexer('"Hello, World!"');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.String);
            assert.equal(token.value, '"Hello, World!"');
        });

        it('should recognize a string containing a newline character', function () {
            var lexer = new _lexer.Lexer('"a string containing a \\n newline character."');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.String);
            assert.equal(token.value, '"a string containing a \\n newline character."');
        });

        it('should recognize a string containing an espaced backslash', function () {
            var lexer = new _lexer.Lexer('"a string with a \\\\ backslash"');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.String);
            assert.equal(token.value, '"a string with a \\\\ backslash"');
        });

        it('should recognize a string containing escaped double quotes', function () {
            var lexer = new _lexer.Lexer('"a string containing an \\" escaped double quote"');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.String);
            assert.equal(token.value, '"a string containing an \\" escaped double quote"');
        });

        it('should recognize a string containing escape sequences', function () {
            var lexer = new _lexer.Lexer('"a string containing \\t\\b\\r\\f\\v\\0 escape sequences"');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.String);
            assert.equal(token.value, '"a string containing \\t\\b\\r\\f\\v\\0 escape sequences"');
        });

        it('should recognize the boolean true literal', function () {
            var lexer = new _lexer.Lexer('true');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.True);
            assert.equal(token.value, 'true');
        });

        it('should recognize the boolean false literal', function () {
            var lexer = new _lexer.Lexer('false');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.False);
            assert.equal(token.value, 'false');
        });

        it('should recognize an identifier of a single letter', function () {
            var lexer = new _lexer.Lexer('i');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.Identifier);
            assert.equal(token.value, 'i');
        });

        it('should recognize an identifier made of letters', function () {
            var lexer = new _lexer.Lexer('anIdentifier');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.Identifier);
            assert.equal(token.value, 'anIdentifier');
        });

        it('should recognize an identifier starting with underscore (_)', function () {
            var lexer = new _lexer.Lexer('_identifier');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.Identifier);
            assert.equal(token.value, '_identifier');
        });

        it('should recognize an identifier containing an underscore (_)', function () {
            var lexer = new _lexer.Lexer('an_identifier');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.Identifier);
            assert.equal(token.value, 'an_identifier');
        });

        it('should recognize an identifier containing a $ character', function () {
            var lexer = new _lexer.Lexer('an$identifier');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.Identifier);
            assert.equal(token.value, 'an$identifier');
        });

        it('should recognize an identifier containing a digit', function () {
            var lexer = new _lexer.Lexer('identifier1');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.Identifier);
            assert.equal(token.value, 'identifier1');
        });

        it('should recognize the abstract keyword', function () {
            var lexer = new _lexer.Lexer('abstract');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.Abstract);
            assert.equal(token.value, 'abstract');
        });

        it('should recognize the class keyword', function () {
            var lexer = new _lexer.Lexer('class');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.Class);
            assert.equal(token.value, 'class');
        });

        it('should recognize the func keyword', function () {
            var lexer = new _lexer.Lexer('func');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.Func);
            assert.equal(token.value, 'func');
        });

        it('should recognize the else keyword', function () {
            var lexer = new _lexer.Lexer('else');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.Else);
            assert.equal(token.value, 'else');
        });

        it('should recognize the extends keyword', function () {
            var lexer = new _lexer.Lexer('extends');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.Extends);
            assert.equal(token.value, 'extends');
        });

        it('should recognize the false keyword', function () {
            var lexer = new _lexer.Lexer('false');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.False);
            assert.equal(token.value, 'false');
        });

        it('should recognize the final keyword', function () {
            var lexer = new _lexer.Lexer('final');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.Final);
            assert.equal(token.value, 'final');
        });

        it('should recognize the for keyword', function () {
            var lexer = new _lexer.Lexer('for');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.For);
            assert.equal(token.value, 'for');
        });

        it('should recognize the in keyword', function () {
            var lexer = new _lexer.Lexer('in');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.In);
            assert.equal(token.value, 'in');
        });

        it('should recognize the if keyword', function () {
            var lexer = new _lexer.Lexer('if');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.If);
            assert.equal(token.value, 'if');
        });

        it('should recognize the let keyword', function () {
            var lexer = new _lexer.Lexer('let');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.Let);
            assert.equal(token.value, 'let');
        });

        it('should recognize the new keyword', function () {
            var lexer = new _lexer.Lexer('new');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.New);
            assert.equal(token.value, 'new');
        });

        it('should recognize the null keyword', function () {
            var lexer = new _lexer.Lexer('null');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.Null);
            assert.equal(token.value, 'null');
        });

        it('should recognize the override keyword', function () {
            var lexer = new _lexer.Lexer('override');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.Override);
            assert.equal(token.value, 'override');
        });

        it('should recognize the private keyword', function () {
            var lexer = new _lexer.Lexer('private');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.Private);
            assert.equal(token.value, 'private');
        });

        it('should recognize the protected keyword', function () {
            var lexer = new _lexer.Lexer('protected');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.Protected);
            assert.equal(token.value, 'protected');
        });

        it('should recognize the return keyword', function () {
            var lexer = new _lexer.Lexer('return');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.Return);
            assert.equal(token.value, 'return');
        });

        it('should recognize the super keyword', function () {
            var lexer = new _lexer.Lexer('super');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.Super);
            assert.equal(token.value, 'super');
        });

        it('should recognize the to keyword', function () {
            var lexer = new _lexer.Lexer('to');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.To);
            assert.equal(token.value, 'to');
        });

        it('should recognize the this keyword', function () {
            var lexer = new _lexer.Lexer('this');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.This);
            assert.equal(token.value, 'this');
        });

        it('should recognize the true keyword', function () {
            var lexer = new _lexer.Lexer('true');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.True);
            assert.equal(token.value, 'true');
        });

        it('should recognize the var keyword', function () {
            var lexer = new _lexer.Lexer('var');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.Var);
            assert.equal(token.value, 'var');
        });

        it('should recognize the while keyword', function () {
            var lexer = new _lexer.Lexer('while');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.While);
            assert.equal(token.value, 'while');
        });

        it('should recognize an identifier starting with a reserved keyword', function () {
            var lexer = new _lexer.Lexer('toString');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.Identifier);
            assert.equal(token.value, 'toString');
        });

        it('should recognize the dispatch (.) operator', function () {
            var lexer = new _lexer.Lexer('.');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.Dot);
            assert.equal(token.value, '.');
        });

        it('should recognize the left arrow (<-) operator', function () {
            var lexer = new _lexer.Lexer('<-');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.LeftArrow);
            assert.equal(token.value, '<-');
        });

        it('should recognize the div-equal (/=) operator', function () {
            var lexer = new _lexer.Lexer('/=');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.DivEqual);
            assert.equal(token.value, '/=');
        });

        it('should recognize the equal (=) operator', function () {
            var lexer = new _lexer.Lexer('=');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.Equal);
            assert.equal(token.value, '=');
        });

        it('should recognize the minus-equal (-=) operator', function () {
            var lexer = new _lexer.Lexer('-=');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.MinusEqual);
            assert.equal(token.value, '-=');
        });

        it('should recognize the modulo-equal (%=) operator', function () {
            var lexer = new _lexer.Lexer('%=');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.ModuloEqual);
            assert.equal(token.value, '%=');
        });

        it('should recognize the plus-equal (+=) operator', function () {
            var lexer = new _lexer.Lexer('+=');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.PlusEqual);
            assert.equal(token.value, '+=');
        });

        it('should recognize the right arrow (->) operator', function () {
            var lexer = new _lexer.Lexer('->');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.RightArrow);
            assert.equal(token.value, '->');
        });

        it('should recognize the times-equal operator', function () {
            var lexer = new _lexer.Lexer('*=');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.TimesEqual);
            assert.equal(token.value, '*=');
        });

        it('should recognize the div (/) operator', function () {
            var lexer = new _lexer.Lexer('/');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.Div);
            assert.equal(token.value, '/');
        });

        it('should recognize the modulo (%) operator', function () {
            var lexer = new _lexer.Lexer('%');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.Modulo);
            assert.equal(token.value, '%');
        });

        it('should recognize the minus (-) operator', function () {
            var lexer = new _lexer.Lexer('-');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.Minus);
            assert.equal(token.value, '-');
        });

        it('should recognize the plus (+) operator', function () {
            var lexer = new _lexer.Lexer('+');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.Plus);
            assert.equal(token.value, '+');
        });

        it('should recognize the times (*) operator', function () {
            var lexer = new _lexer.Lexer('*');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.Times);
            assert.equal(token.value, '*');
        });

        it('should recognize the double-equal (==) operator', function () {
            var lexer = new _lexer.Lexer('==');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.DoubleEqual);
            assert.equal(token.value, '==');
        });

        it('should recognize the greater (>) operator', function () {
            var lexer = new _lexer.Lexer('>');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.Greater);
            assert.equal(token.value, '>');
        });

        it('should recognize the greater-or-equal (>=) operator', function () {
            var lexer = new _lexer.Lexer('>=');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.GreaterOrEqual);
            assert.equal(token.value, '>=');
        });

        it('should recognize the less (<) operator', function () {
            var lexer = new _lexer.Lexer('<');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.Less);
            assert.equal(token.value, '<');
        });

        it('should recognize the less-or-equal operator', function () {
            var lexer = new _lexer.Lexer('<=');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.LessOrEqual);
            assert.equal(token.value, '<=');
        });

        it('should recognize the not-equal (!=) operator', function () {
            var lexer = new _lexer.Lexer('!=');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.NotEqual);
            assert.equal(token.value, '!=');
        });

        it('should recognize the and (&&) operator', function () {
            var lexer = new _lexer.Lexer('&&');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.And);
            assert.equal(token.value, '&&');
        });

        it('should recognize the not (!) operator', function () {
            var lexer = new _lexer.Lexer('!');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.Not);
            assert.equal(token.value, '!');
        });

        it('should recognize the or (||) operator', function () {
            var lexer = new _lexer.Lexer('||');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.Or);
            assert.equal(token.value, '||');
        });

        it('should recognize a colon (:)', function () {
            var lexer = new _lexer.Lexer(':');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.Colon);
            assert.equal(token.value, ':');
        });

        it('should recognize a comma (,)', function () {
            var lexer = new _lexer.Lexer(',');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.Comma);
            assert.equal(token.value, ',');
        });

        it('should recognize a left brace ({)', function () {
            var lexer = new _lexer.Lexer('{');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.LeftBrace);
            assert.equal(token.value, '{');
        });

        it('should recognize a right brace (})', function () {
            var lexer = new _lexer.Lexer('}');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.RightBrace);
            assert.equal(token.value, '}');
        });

        it('should recognize a left bracket ([)', function () {
            var lexer = new _lexer.Lexer('[');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.LeftBracket);
            assert.equal(token.value, '[');
        });

        it('should recognize a right bracket (])', function () {
            var lexer = new _lexer.Lexer(']');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.RightBracket);
            assert.equal(token.value, ']');
        });

        it('should recognize a left parenthesis (()', function () {
            var lexer = new _lexer.Lexer('(');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.LeftParen);
            assert.equal(token.value, '(');
        });

        it('should recognize a right parenthesis ())', function () {
            var lexer = new _lexer.Lexer(')');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.RightParen);
            assert.equal(token.value, ')');
        });

        it('should recognize a colon (:)', function () {
            var lexer = new _lexer.Lexer(':');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.Colon);
            assert.equal(token.value, ':');
        });

        it('should recognize a comma (,)', function () {
            var lexer = new _lexer.Lexer(',');

            var token = lexer.nextToken();

            assert.equal(token.type, _tokentype.TokenType.Comma);
            assert.equal(token.value, ',');
        });
    });

    describe('#tokenize', function () {

        it('should properly tokenize a full method definition', function () {
            var lexer = new _lexer.Lexer('func add(a: Int, b: Int): Int = {\n' + '   a + b\n' + '}');

            var tokens = lexer.tokenize();

            assert.equal(21, tokens.length);

            assert.equal(tokens[0].type, _tokentype.TokenType.Func);

            assert.equal(tokens[1].type, _tokentype.TokenType.Identifier);
            assert.equal(tokens[1].value, 'add');

            assert.equal(tokens[2].type, _tokentype.TokenType.LeftParen);

            assert.equal(tokens[3].type, _tokentype.TokenType.Identifier);
            assert.equal(tokens[3].value, 'a');

            assert.equal(tokens[4].type, _tokentype.TokenType.Colon);

            assert.equal(tokens[5].type, _tokentype.TokenType.Identifier);
            assert.equal(tokens[5].value, 'Int');

            assert.equal(tokens[6].type, _tokentype.TokenType.Comma);

            assert.equal(tokens[7].type, _tokentype.TokenType.Identifier);
            assert.equal(tokens[7].value, 'b');

            assert.equal(tokens[8].type, _tokentype.TokenType.Colon);

            assert.equal(tokens[9].type, _tokentype.TokenType.Identifier);
            assert.equal(tokens[9].value, 'Int');

            assert.equal(tokens[10].type, _tokentype.TokenType.RightParen);

            assert.equal(tokens[11].type, _tokentype.TokenType.Colon);

            assert.equal(tokens[12].type, _tokentype.TokenType.Identifier);
            assert.equal(tokens[12].value, 'Int');

            assert.equal(tokens[13].type, _tokentype.TokenType.Equal);

            assert.equal(tokens[14].type, _tokentype.TokenType.LeftBrace);

            assert.equal(tokens[15].type, _tokentype.TokenType.Newline);

            assert.equal(tokens[16].type, _tokentype.TokenType.Identifier);
            assert.equal(tokens[16].value, 'a');

            assert.equal(tokens[17].type, _tokentype.TokenType.Plus);

            assert.equal(tokens[18].type, _tokentype.TokenType.Identifier);
            assert.equal(tokens[18].value, 'b');

            assert.equal(tokens[19].type, _tokentype.TokenType.Newline);

            assert.equal(tokens[20].type, _tokentype.TokenType.RightBrace);
        });

        it('should assign the correct line and column numbers', function () {
            var lexer = new _lexer.Lexer('func equals(a: Int, b: Int): Boolean = {\n' + '   a == b\n' + '}');

            var tokens = lexer.tokenize();

            assert.equal(0, tokens[0].line);
            assert.equal(0, tokens[0].column);

            assert.equal(0, tokens[1].line);
            assert.equal(5, tokens[1].column);

            assert.equal(0, tokens[2].line);
            assert.equal(11, tokens[2].column);

            assert.equal(0, tokens[3].line);
            assert.equal(12, tokens[3].column);

            assert.equal(0, tokens[4].line);
            assert.equal(13, tokens[4].column);

            assert.equal(0, tokens[5].line);
            assert.equal(15, tokens[5].column);

            assert.equal(0, tokens[6].line);
            assert.equal(18, tokens[6].column);

            assert.equal(0, tokens[7].line);
            assert.equal(20, tokens[7].column);

            assert.equal(0, tokens[8].line);
            assert.equal(21, tokens[8].column);

            assert.equal(0, tokens[9].line);
            assert.equal(23, tokens[9].column);

            assert.equal(0, tokens[10].line);
            assert.equal(26, tokens[10].column);

            assert.equal(0, tokens[11].line);
            assert.equal(27, tokens[11].column);

            assert.equal(0, tokens[12].line);
            assert.equal(29, tokens[12].column);

            assert.equal(0, tokens[13].line);
            assert.equal(37, tokens[13].column);

            assert.equal(0, tokens[14].line);
            assert.equal(39, tokens[14].column);

            assert.equal(0, tokens[15].line);
            assert.equal(40, tokens[15].column);

            assert.equal(1, tokens[16].line);
            assert.equal(3, tokens[16].column);

            assert.equal(1, tokens[17].line);
            assert.equal(5, tokens[17].column);

            assert.equal(1, tokens[18].line);
            assert.equal(8, tokens[18].column);

            assert.equal(1, tokens[19].line);
            assert.equal(9, tokens[19].column);

            assert.equal(2, tokens[20].line);
            assert.equal(0, tokens[20].column);
        });

        it('should tokenize a simple expression', function () {
            var lexer = new _lexer.Lexer('42 + 21');

            var tokens = lexer.tokenize();

            assert.equal(3, tokens.length);

            assert.equal(tokens[0].type, _tokentype.TokenType.Integer);
            assert.equal(tokens[0].value, '42');

            assert.equal(tokens[1].type, _tokentype.TokenType.Plus);
            assert.equal(tokens[1].value, '+');

            assert.equal(tokens[2].type, _tokentype.TokenType.Integer);
            assert.equal(tokens[2].value, '21');
        });
    });
});
//# sourceMappingURL=lexer-test.js.map