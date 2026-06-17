import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Contact from "@/app/contact/page";

// Mock out Lucide icons
jest.mock("lucide-react", () => ({
  Mail: () => <div data-testid="mail-icon" />,
  Phone: () => <div data-testid="phone-icon" />,
  MapPin: () => <div data-testid="mappin-icon" />,
  Send: () => <div data-testid="send-icon" />,
  CheckCircle2: () => <div data-testid="check-icon" />,
}));

describe("Contact Component (Form Submission)", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should submit successfully when all required fields are filled", async () => {
    // Arrange: Render the form and query elements
    render(<Contact />);
    const nameInput = screen.getByPlaceholderText("Nhập họ tên của bạn...");
    const emailInput = screen.getByPlaceholderText("email@example.com");
    const phoneInput = screen.getByPlaceholderText("Số điện thoại / Zalo...");
    const messageInput = screen.getByPlaceholderText(
      "Chi tiết sản phẩm cần báo giá hoặc nội dung cần tư vấn..."
    );
    const submitButton = screen.getByRole("button", { name: /GỬI YÊU CẦU BÁO GIÁ/ });

    // Act: Fill out inputs and submit
    fireEvent.change(nameInput, { target: { value: "Nguyen Van A" } });
    fireEvent.change(emailInput, { target: { value: "nva@gmail.com" } });
    fireEvent.change(phoneInput, { target: { value: "0969700520" } });
    fireEvent.change(messageInput, { target: { value: "Báo giá Beta-carotene" } });
    fireEvent.click(submitButton);

    // Assert: Verify success state is displayed and inputs are cleared
    expect(screen.getByText("Gửi yêu cầu thành công!")).toBeInTheDocument();
    expect(screen.getByText("Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi lại bạn sớm nhất có thế.")).toBeInTheDocument();
  });

  it("should not submit if required email and phone are both missing", () => {
    // Arrange: Render form
    render(<Contact />);
    const nameInput = screen.getByPlaceholderText("Nhập họ tên của bạn...");
    const submitButton = screen.getByRole("button", { name: /GỬI YÊU CẦU BÁO GIÁ/ });

    // Act: Fill name but keep contact fields empty, then submit
    fireEvent.change(nameInput, { target: { value: "Nguyen Van A" } });
    fireEvent.click(submitButton);

    // Assert: Verify success message is NOT shown
    expect(screen.queryByText("Gửi yêu cầu thành công!")).not.toBeInTheDocument();
  });

  it("should reset success message after 5 seconds", () => {
    // Arrange: Submit form successfully
    render(<Contact />);
    const nameInput = screen.getByPlaceholderText("Nhập họ tên của bạn...");
    const emailInput = screen.getByPlaceholderText("email@example.com");
    const submitButton = screen.getByRole("button", { name: /GỬI YÊU CẦU BÁO GIÁ/ });

    fireEvent.change(nameInput, { target: { value: "Nguyen Van A" } });
    fireEvent.change(emailInput, { target: { value: "nva@gmail.com" } });
    fireEvent.click(submitButton);

    expect(screen.getByText("Gửi yêu cầu thành công!")).toBeInTheDocument();

    // Act: Fast-forward timers by 5 seconds
    jest.advanceTimersByTime(5000);

    // Assert: Verify the success alert is removed and form is active again
    expect(screen.queryByText("Gửi yêu cầu thành công!")).not.toBeInTheDocument();
    expect(screen.getByPlaceholderText("Nhập họ tên của bạn...")).toBeInTheDocument();
  });
});
