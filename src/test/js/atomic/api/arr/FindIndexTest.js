test(
  'FindIndexTest',

  [
    'ephox.katamari.api.Arr',
    'ephox.katamari.api.Fun',
    'ephox.wrap.Jsc'
  ],

  function (Arr, Fun, Jsc) {
    var check = function (expected, input, pred) {
      var actual = Arr.findIndex(input, pred);
      assert.eq(expected, actual);
    };

    check(-1, [], function (x) { return x > 0; });
    check(-1, [-1], function (x) { return x > 0; });
    check(0, [1], function (x) { return x > 0; });
    check(3, [4, 2, 10, 41, 3], function (x) { return x == 41; });
    check(5, [4, 2, 10, 41, 3, 100], function (x) { return x > 80; });
    check(-1, [4, 2, 10, 412, 3], function (x) { return x == 41; });

    Jsc.property(
      'the index found by findIndex always passes predicate',
      Jsc.array(Jsc.json),
      Jsc.fun(Jsc.bool),
      function (arr, pred) {
        var index = Arr.findIndex(arr, pred);
        if (index === -1) {
          return !Arr.exists(arr, pred);
          // nothing in array matches predicate
        } else {
          return pred(arr[index]);
        }
      }
    );

    Jsc.property(
      'If predicate is always false, then index is always negative one',
      Jsc.array(Jsc.json),
      function (arr) {
        var index = Arr.findIndex(arr, Fun.constant(false));
        return index === -1;
      }
    );

    Jsc.property(
      'If predicate is always true, then index is always 0, or -1 if array is empty',
      Jsc.array(Jsc.json),
      function (arr) {
        var index = Arr.findIndex(arr, Fun.constant(true));
        var expected = arr.length === 0 ? -1 : 0;
        return Jsc.eq(expected, index);
      }
    );
  }
);