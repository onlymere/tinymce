test(
  'ArrEachTest',

  [
    'ephox.katamari.api.Arr',
    'ephox.wrap.Jsc'
  ],

  function (Arr, Jsc) {
    var check = function (expected, input) {
      var values = [];
      Arr.each(input, function (x, i) {
        values.push({index: i, value: x});
      });
      assert.eq(expected, values);
    };

    check([], []);
    check([{index: 0, value: 1}], [1]);
    check([{index: 0, value: 2}, {index: 1, value: 3}, {index: 2, value: 5}], [2, 3, 5]);

    Jsc.property(
      'Each + push should equal the same object',
      Jsc.array(Jsc.json),
      function (arr) {
        var values = [ ];
        var output = Arr.each(arr, function (x, i) {
          values.push(x);
        });
        return Jsc.eq(arr, values) && Jsc.eq(undefined, output);
      }
    );
  }
);