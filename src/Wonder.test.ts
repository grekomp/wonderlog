import { wonder, Wonder } from "./Wonder";
import WonderHelper from "./WonderHelper";

type WonderTestCase = {
  wonderInstance?: Wonder;
  elements: any[];
  expected: any[];
};
const wonderTestCases: WonderTestCase[] = [
  {
    elements: [],
    expected: [],
  },
  {
    elements: ["hello", "world"],
    expected: ["hello", "world"],
  },
  {
    elements: ["hello", wonder.red("world")],
    expected: ["%chello%c %cworld", "", "", "color: red"],
  },
  {
    elements: ["hello", wonder.red("world", wonder.blue("blue"))],
    expected: [
      "%chello%c %cworld%c %cblue",
      "",
      "",
      "color: red",
      "",
      "color: blue",
    ],
  },
  {
    elements: [wonder.formatStringAsLiteral("literal string")],
    expected: [
      '%c"%c%cliteral string%c%c"',
      "color: #F28B54",
      "",
      "color: #F28B54",
      "",
      "color: #F28B54",
    ],
  },
  {
    elements: [
      "first",
      wonder.formatStringAsLiteral("second"),
      "third",
      wonder.formatNumberAsLiteral(345.23),
    ],
    expected: [
      '%cfirst%c %c"%c%csecond%c%c"%c %cthird%c %c345.23',
      "",
      "",
      "color: #F28B54",
      "",
      "color: #F28B54",
      "",
      "color: #F28B54",
      "",
      "",
      "",
      "color: #9980FF",
    ],
  },
];
test.each(wonderTestCases)("Wonder styling test %#", (tc) => {
  const w = tc.wonderInstance ?? wonder;
  expect(WonderHelper.GenerateLogElements(w, tc.elements)).toEqual(tc.expected);
});

test("Wonder options independence test", () => {
  const preset1 = wonder.red;
  const preset1Equivalent = wonder.red;
  const preset2 = preset1.bgBlack;

  expect(preset1.options.style.background).toBeUndefined();
  expect(preset2.options.style.background).toEqual("black");
  // expect(preset1.options).toEqual(preset1Equivalent.options);

  expect(preset1Equivalent.options).not.toBe(preset1.options);

  expect(preset1.options).not.toBe(preset2.options);
  expect(preset1.options.content).not.toBe(preset2.options.content);
  expect(preset1.options.formatters).not.toBe(preset2.options.formatters);
  expect(preset1.options.prefixValue).not.toBe(preset2.options.prefixValue);
  expect(preset1.options.postfixValue).not.toBe(preset2.options.postfixValue);
  expect(preset1.options.style).not.toBe(preset2.options.style);
});
