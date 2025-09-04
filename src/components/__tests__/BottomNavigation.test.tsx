// src/components/BottomNavigation.test.tsx

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import BottomNavigation from "@/components/BottomNavigation";
import { expect, jest } from "@jest/globals";
import { Button } from "@heroui/react";

describe("BottomNavigation Component", () => {
  const leftButton = { text: "Left", onClick: jest.fn() };
  const rightButton = { text: "Right", onClick: jest.fn() };

  it("renders skeletons when isLoading is true", () => {
    render(<BottomNavigation isLoading />);
    expect(screen.queryByText(/Loading buttons/i)).toBeInTheDocument();
  });

  it("renders children when isLoading is false and children are provided", () => {
    const TestChildren = <Button>Test</Button>;
    render(
      <BottomNavigation isLoading={false}>{TestChildren}</BottomNavigation>
    );
    expect(screen.getByRole("button", { name: "Test" })).toBeInTheDocument();
  });

  it("renders buttons when isLoading is false and no children are provided", () => {
    render(
      <BottomNavigation
        isLoading={false}
        leftButton={leftButton}
        rightButton={rightButton}
      />
    );
    expect(screen.getByRole("button", { name: "Left" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Right" })).toBeInTheDocument();
  });
});
