import { expect, test } from "vitest";
import { render, screen, within } from "@testing-library/react";
import Card from "../components/Card";
import { Stock } from "@/app/page";

const stock = {
  id: 3,
  name: "Open = High",
  tag: "Bullish",
  color: "green",
  criteria: [
    {
      type: "variable",
      text: "Today’s open < yesterday’s low by $1 %",
      variable: {
        $1: {
          type: "value",
          values: [-3, -1, -2, -5, -10],
        },
      },
    },
  ],
} as Stock;

test("Card shows details", () => {
  render(<Card stock={stock} />);
  expect(screen.getByText(stock.name)).toBeDefined();
  expect(screen.getByText(stock.tag)).toBeDefined();
  expect(screen.getByText("navigate_next")).toBeDefined();
});
