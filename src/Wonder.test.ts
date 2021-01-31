import { wonder, Wonder } from "./Wonder";

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
test.each(wonderTestCases)("wonder test case %#", (tc) => {
  const w = tc.wonderInstance ?? wonder;
  expect(w.GenerateLogElements(tc.elements)).toEqual(tc.expected);
});
