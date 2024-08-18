import React from "react";
import { render, screen } from "@testing-library/react";
import User from "./User";
import { BrowserRouter } from "react-router-dom";

test("renders user", () => {
  const user = {
    id: "1",
    userName: "Alice",
    email: "alice@xd.pl",
    description: "I like sports",
    lastActive: "2021-09-04T12:00:00Z",
    sports: [
      { id: 1, name: "Tennis" },
      { id: 2, name: "Soccer" },
    ],
  };

  render(
    <BrowserRouter>
      <User user={user} />
    </BrowserRouter>
  );

  const userName = screen.getByText("Alice");
  const description = screen.getByText("I like sports");
  const sports = screen.getByText("Tennis");
  const timestamp = screen.getByText(/.* ago$/);

  expect(userName).toBeInTheDocument();
  expect(description).toBeInTheDocument();
  expect(sports).toBeInTheDocument();
  expect(timestamp).toBeInTheDocument();
  expect(timestamp).toHaveAttribute(
    "title",
    new Date(Date.parse("2021-09-04T12:00:00Z")).toString()
  );
});
