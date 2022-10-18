/* eslint-disable new-cap */
import moment from 'moment';
import FormulaRunner from './FormulaRunner';

describe('formula runner', () => {

  describe('template parser', () => {

    it('should parse and return template without a templateParser.', () => {
      const runner = new FormulaRunner();
      expect(runner.run('`Test${1 + \'1\'}Foo ${`embedded`}`').value).toBe('Test11Foo embedded');
    });

    it('should resolve value with simple templateParser', () => {
      const resolver = jest.fn(tag => (tag === 'test' ? 'yes' : 'no'));
      const runner = new FormulaRunner({
        templateParser: resolver,
      });
      expect(runner.run('`test`').value).toBe('yes');
      expect(resolver).toBeCalled();
    });

    it('should resolve complex template', () => {
      const resolver = jest.fn(() => undefined);
      const runner = new FormulaRunner({
        templateParser: resolver,
      });
      expect(runner.run('`${"advanced"}test${"advanced"}`').value).toBe(undefined);
      expect(resolver.mock.calls[0][0]).toEqual(['', 'advanced', 'test', 'advanced', '']);
    });

  });

  describe('default functions', () => {

    it('abs', () => {
      const runner = new FormulaRunner();
      expect(runner.run('abs(-23)').value).toEqual(Math.abs(-23));
    });

    it('ceil', () => {
      const runner = new FormulaRunner();
      expect(runner.run('ceil(7.004)').value).toEqual(8);
    });

    it('floor', () => {
      const runner = new FormulaRunner();
      expect(runner.run('floor(7.004)').value).toEqual(7);
    });

    it('max', () => {
      const runner = new FormulaRunner();
      expect(runner.run('max(10,4,5,6)').value).toEqual(10);
      expect(runner.run('max([10,4,5,6])').value).toEqual(10);
    });

    it('min', () => {
      const runner = new FormulaRunner();
      expect(runner.run('min(10,4,5,6)').value).toEqual(4);
      expect(runner.run('min([10,4,5,6])').value).toEqual(4);
    });

    it('pow', () => {
      const runner = new FormulaRunner();
      expect(runner.run('pow(2,4)').value).toEqual(16);
      expect(runner.run('pow(2,3)').value).toEqual(8);
    });

    it('round', () => {
      const runner = new FormulaRunner();
      expect(runner.run('round(9.999)').value).toEqual(10);
      expect(runner.run('round(2.265, 1)').value).toEqual(2.3);
      expect(runner.run('round(2.265, 2)').value).toEqual(2.27);
      expect(runner.run('round(6.765, 2)').value).toEqual(6.77);
    });

    it('iff', () => {
      const runner = new FormulaRunner();
      expect(runner.run('iff(10>5, "yes", "no")').value).toEqual('yes');
      expect(runner.run('iff(10<5, "yes", "no")').value).toEqual('no');
    });

    it('sum', () => {
      const runner = new FormulaRunner();
      expect(runner.run('sum([1,2,3])').value).toEqual(6);
      expect(runner.run('sum(1,2,3)').value).toEqual(6);
    });

    it('count', () => {
      const runner = new FormulaRunner();
      expect(runner.run('count()').value).toEqual(0);
      expect(runner.run('count([1,2,3])').value).toEqual(3);
    });

    it('first', () => {
      const runner = new FormulaRunner();
      expect(runner.run('first([1,2,3])').value).toEqual(1);
    });

    it('last', () => {
      const runner = new FormulaRunner();
      expect(runner.run('last([1,2,3])').value).toEqual(3);
    });

    it('avg', () => {
      const runner = new FormulaRunner();
      expect(runner.run('avg([3,3,3])').value).toEqual(3);
      expect(runner.run('avg([10,3,23])').value).toEqual(Math.round(11.666666));
      expect(runner.run('avg([])').value).toEqual(0);
    });

    it('num', () => {
      const runner = new FormulaRunner();
      expect(runner.run('num("2")').value).toEqual(2);
      expect(runner.run('num("")').value).toEqual(0);
      expect(runner.run('num("bad-number")').value).toEqual(NaN);
      expect(runner.run('num("2","","bad-number")').value).toEqual(2);
    });

    it('str', () => {
      const runner = new FormulaRunner();
      expect(runner.run('str(200)').value).toEqual('200');
      expect(runner.run('str([200,true])').value).toEqual(['200', 'true']);
    });

    it('today', () => {
      const runner = new FormulaRunner();
      const d = new Date();
      d.setHours(0, 0, 0, 0); // last midnight
      expect(runner.run('today()').value).toEqual(d);
    });

    it('now', () => {
      const runner = new FormulaRunner();
      expect(runner.run('now()').value).toBeDefined();
    });

    it('date', () => {
      const runner = new FormulaRunner();
      expect(runner.run('date(today(), true)').value).toBeTruthy();
      expect(runner.run('date(1648857895791, true)').value).toBeTruthy();
      expect(runner.run('date()').value).toBeFalsy();
    });

    it('formatDate', () => {
      const runner = new FormulaRunner();
      const format = 'MM-DD-YYYY';
      const myDay = Date(1651098415460);
      const momentDay = new moment(myDay).format(format);
      expect(runner.run("formatDate(today(), 'MM-DD-YYYY')").value).toEqual(momentDay);
    });

    it('dateDiff', () => {
      const runner = new FormulaRunner();
      expect(runner.run("dateDiff(today(), today(), 'days')").value).toEqual(0);
      expect(runner.run("dateDiff(1648857895791, 1648944298123, 'days')").value).toEqual(1);
    });

    it('dateAdd', () => {
      const runner = new FormulaRunner();
      expect(runner.run("dateAdd(today(), 2, 'days')").value).toBeDefined();
    });

    it('containsText', () => {
      const runner = new FormulaRunner();
      expect(runner.run("containsText('BrettComputer', 'Brett')").value).toBeTruthy();
      expect(runner.run("containsText('BrettComputer', 'Mac')").value).toBeFalsy();
      expect(runner.run("containsText('BrettComputer', null)").value).toBeFalsy();
      expect(runner.run("containsText(null, 'BrettComputer')").value).toBeFalsy();
    });

    it('length', () => {
      const runner = new FormulaRunner();
      expect(runner.run("length('Brett')").value).toEqual(5);
      expect(runner.run('length()').value).toEqual(0);
    });

    it('left', () => {
      const runner = new FormulaRunner();
      expect(runner.run("left('Brett', 2)").value).toEqual('Br');
      expect(runner.run('left()').value).toBeFalsy();
    });

    it('right', () => {
      const runner = new FormulaRunner();
      expect(runner.run("right('Brett', 2)").value).toEqual('tt');
      expect(runner.run('right()').value).toBeFalsy();
    });

    it('val', () => {
      const runner = new FormulaRunner();
      expect(runner.run('val(200)').value).toEqual(200);
      expect(runner.run('val("true")').value).toEqual(true);
      expect(runner.run('val("false")').value).toEqual(false);
      expect(runner.run('val("100")').value).toEqual(100);
      expect(runner.run('val("NaN")').value).toEqual(NaN);
      expect(runner.run('val("undefined")').value).toEqual(undefined);
      expect(runner.run('val("null")').value).toEqual(null);
      expect(runner.run('val([200,true])').value).toEqual([200, true]);
      expect(runner.run('val({foo: "bar"})').value).toEqual({ foo: 'bar' });
    });

    it('type', () => {
      const runner = new FormulaRunner();
      expect(runner.run('type(200)').value).toEqual('number');
      expect(runner.run('type("foobar")').value).toEqual('string');
      expect(runner.run('type([1,"foobar"])').value).toEqual('object');
    });

    it('select', () => {
      const runner = new FormulaRunner();
      expect(runner.run('select(200, {case: 200, value: "hello"}, {case: 300, value: "good bye"})').value).toEqual('hello');
    });

    it('lookup', () => {
      const runner = new FormulaRunner();
      expect(runner.run('lookup(200, [1,2,3])').value).toEqual([1, 2, 3]);
    });

    it('coalesce', () => {
      const runner = new FormulaRunner();
      expect(runner.run('coalesce([0, "foobar"])').value).toEqual('foobar');
      expect(runner.run('coalesce([null, "foobar"])').value).toEqual('foobar');
      expect(runner.run('coalesce([0, "foobar"])').value).toEqual('foobar');
    });

    it('trim', () => {
      const runner = new FormulaRunner();
      expect(runner.run('trim(undefined)').value).toEqual(undefined);
      expect(runner.run('trim("   foobar   ")').value).toEqual('foobar');
      expect(runner.run('trim("foobar   ")').value).toEqual('foobar');
      expect(runner.run('trim("   foobar")').value).toEqual('foobar');
    });

    it('toLowerCase', () => {
      const runner = new FormulaRunner();
      expect(runner.run('toLowerCase("Mr. Jenkins")').value).toEqual('mr. jenkins');
    });

    it('toUpperCase', () => {
      const runner = new FormulaRunner();
      expect(runner.run('toUpperCase("yes")').value).toEqual('YES');
    });

    it('replace', () => {
      const runner = new FormulaRunner();
      expect(runner.run('replace("one foo three", "foo", "two")').value).toEqual('one two three');
    });

    it('contains', () => {
      const runner = new FormulaRunner();
      expect(runner.run('contains("foo", "foo")').value).toEqual(false);
      expect(runner.run('contains("foo", "bar")').value).toEqual(false);
      expect(runner.run('contains(["one", "foo", "three", 200], "foo", "two")').value).toEqual(false);
      expect(runner.run('contains(["one", "foo", "three", 200], 200, "foo")').value).toEqual(true);
    });

  });

  describe('template syntax', () => {

    it('&&', () => {
      const runner = new FormulaRunner();
      expect(runner.run('1 && 1').value).toEqual(true);
    });

    describe('array special cases', () => {
      describe('unary', () => {
        it('-', () => {
          const runner = new FormulaRunner();
          expect(runner.run('-[1,2]').value).toEqual([-1, -2]);
        });
        it('!', () => {
          const runner = new FormulaRunner();
          expect(runner.run('![true, false]').value).toEqual([false, true]);
        });
      });

      describe('2 arrays', () => {
        it('+', () => {
          const runner = new FormulaRunner();
          expect(runner.run('[1,2] + [3,4]').value).toEqual([4, 6]);
        });
        it('-', () => {
          const runner = new FormulaRunner();
          expect(runner.run('[1,2] - [3,5]').value).toEqual([-2, -3]);
        });
        it('*', () => {
          const runner = new FormulaRunner();
          expect(runner.run('[1,2] * [3,5]').value).toEqual([3, 10]);
        });
        it('/', () => {
          const runner = new FormulaRunner();
          expect(runner.run('[1,4] / [2,2]').value).toEqual([0.5, 2]);
        });
        it('**', () => {
          const runner = new FormulaRunner();
          expect(runner.run('[2,4] ** [2,2]').value).toEqual([4, 16]);
        });
      });

      describe('left array', () => {
        it('+', () => {
          const runner = new FormulaRunner();
          expect(runner.run('[1,2] + 4').value).toEqual([5, 6]);
        });
        it('-', () => {
          const runner = new FormulaRunner();
          expect(runner.run('[1,2] - 1').value).toEqual([0, 1]);
        });
        it('*', () => {
          const runner = new FormulaRunner();
          expect(runner.run('[1,2] * 2').value).toEqual([2, 4]);
        });
        it('/', () => {
          const runner = new FormulaRunner();
          expect(runner.run('[1,4] / 2').value).toEqual([0.5, 2]);
        });
        it('**', () => {
          const runner = new FormulaRunner();
          expect(runner.run('[2,4] ** 2').value).toEqual([4, 16]);
        });
      });

      describe('right array', () => {
        it('+', () => {
          const runner = new FormulaRunner();
          expect(runner.run('2 + [3,4]').value).toEqual([5, 6]);
        });
        it('-', () => {
          const runner = new FormulaRunner();
          expect(runner.run('2 - [3,5]').value).toEqual([-1, -3]);
        });
        it('*', () => {
          const runner = new FormulaRunner();
          expect(runner.run('2 * [3,5]').value).toEqual([6, 10]);
        });
        it('/', () => {
          const runner = new FormulaRunner();
          expect(runner.run('2 / [4,2]').value).toEqual([0.5, 1]);
        });
        it('**', () => {
          const runner = new FormulaRunner();
          expect(runner.run('2 ** [2,3]').value).toEqual([4, 8]);
        });
      });
    });

  });

});
