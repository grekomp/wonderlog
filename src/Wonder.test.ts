import { wonder } from "./Wonder";

test("Example test case", () => {
  expect(wonder.GenerateLogElements(["hello", "world"])).toEqual([
    "hello",
    "world",
  ]);
});
