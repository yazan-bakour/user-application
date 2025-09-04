import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import FormInput from "@/components/FormInput";
import { FieldError } from "react-hook-form";

describe("FormInput Component", () => {
  const defaultProps = {
    label: "Test Label",
    placeholder: "Test placeholder",
  };

  it("renders input with default props", () => {
    render(<FormInput {...defaultProps} />);

    expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Test placeholder")).toBeInTheDocument();
  });

  // it("renders skeleton when isLoading is true", () => {
  //   render(<FormInput {...defaultProps} isLoading />);

  //   expect(screen.getByRole("status")).toBeInTheDocument();
  //   expect(screen.queryByLabelText("Test Label")).not.toBeInTheDocument();
  // });

  it("displays error message from error prop", () => {
    const error: FieldError = {
      type: "required",
      message: "This field is required",
    };

    render(
      <FormInput
        {...defaultProps}
        isInvalid={true}
        isLoading={false}
        error={error}
      />
    );

    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });

  it("displays errorMessage prop over error.message", () => {
    const error: FieldError = {
      type: "required",
      message: "Error from error prop",
    };

    render(
      <FormInput
        {...defaultProps}
        isInvalid={true}
        error={error}
        errorMessage="Error from errorMessage prop"
      />
    );

    expect(
      screen.getByText("Error from errorMessage prop")
    ).toBeInTheDocument();
    expect(screen.queryByText("Error from error prop")).not.toBeInTheDocument();
  });

  it("sets aria-label based on id prop", () => {
    render(<FormInput {...defaultProps} id="test-input" />);

    const input = screen.getByLabelText("Test Label");
    expect(input).toHaveAttribute("aria-label", "test-input-input");
  });

  it("sets aria-label based on string label when no id", () => {
    render(<FormInput label="String Label" />);

    const input = screen.getByLabelText("String Label");
    expect(input).toHaveAttribute("aria-label", "String Label");
  });

  it("sets aria-label to undefined when label is not string and no id", () => {
    const labelElement = <span>Complex Label</span>;
    render(<FormInput label={labelElement} data-testid="form-input" />);

    const input = screen.getByTestId("form-input");
    expect(input).not.toHaveAttribute("aria-label");
  });

  it("forwards ref correctly", () => {
    const ref = createRef<HTMLInputElement>();
    render(<FormInput {...defaultProps} ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("accepts custom className prop", () => {
    const { container } = render(
      <FormInput {...defaultProps} className="custom-class" />
    );

    expect(screen.getByLabelText("Test Label")).toBeInTheDocument();

    expect(container.querySelector(".custom-class")).toBeInTheDocument();
  });

  it("sets input as readonly when isReadOnly is true", () => {
    render(<FormInput {...defaultProps} isReadOnly />);

    const input = screen.getByLabelText("Test Label");
    expect(input).toHaveAttribute("readonly");
  });

  it("applies custom value", () => {
    render(<FormInput {...defaultProps} value="custom value" />);

    const input = screen.getByDisplayValue("custom value");
    expect(input).toBeInTheDocument();
  });

  it("applies custom type", () => {
    render(<FormInput {...defaultProps} type="email" />);

    const input = screen.getByLabelText("Test Label");
    expect(input).toHaveAttribute("type", "email");
  });

  it("merges custom classNames with default classNames", () => {
    const customClassNames = {
      inputWrapper: "custom-wrapper",
      label: "custom-label",
    };

    render(
      <FormInput
        {...defaultProps}
        classNames={customClassNames}
        data-testid="form-input"
      />
    );

    expect(screen.getByTestId("form-input")).toBeInTheDocument();
  });

  it("passes through additional props", () => {
    render(
      <FormInput
        {...defaultProps}
        data-testid="form-input"
        autoComplete="off"
      />
    );

    const input = screen.getByTestId("form-input");
    expect(input).toHaveAttribute("autocomplete", "off");
  });

  it("has correct displayName", () => {
    expect(FormInput.displayName).toBe("FormInput");
  });
});
