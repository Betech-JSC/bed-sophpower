import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AdminDashboard from "@/app/admin/page";

// Mock out Lucide icons
jest.mock("lucide-react", () => ({
  LayoutDashboard: () => <div data-testid="dashboard-icon" />,
  Users: () => <div data-testid="users-icon" />,
  FileSpreadsheet: () => <div data-testid="spreadsheet-icon" />,
  Settings: () => <div data-testid="settings-icon" />,
  TrendingUp: () => <div data-testid="trending-icon" />,
  Mail: () => <div data-testid="mail-icon" />,
  ShieldCheck: () => <div data-testid="shield-icon" />,
  CheckCircle: () => <div data-testid="check-icon" />,
  Plus: () => <div data-testid="plus-icon" />,
  Trash2: () => <div data-testid="trash-icon" />,
  Edit2: () => <div data-testid="edit-icon" />,
}));

describe("AdminDashboard component", () => {
  it("should switch between tabs correctly", () => {
    // Arrange: Render the admin dashboard
    render(<AdminDashboard />);

    // Assert: Default active tab is 'overview'
    expect(screen.getByText("TRUY CẬP HỆ THỐNG")).toBeInTheDocument();
    expect(screen.queryByText("Danh Sách Form Yêu Cầu Gửi Leads")).not.toBeInTheDocument();

    // Act: Click on the "Quản Lý Leads / Form" navigation button
    const leadsTabButton = screen.getAllByRole("button", { name: /Quản Lý Leads \/ Form/i })[0];
    fireEvent.click(leadsTabButton);

    // Assert: The view changes to the Leads tab
    expect(screen.getByText("Danh Sách Form Yêu Cầu Gửi Leads")).toBeInTheDocument();
    expect(screen.queryByText("TRUY CẬP HỆ THỐNG")).not.toBeInTheDocument();
  });

  it("should transition lead status from MỚI to ĐÃ XỬ LÝ (Mark Processed)", () => {
    // Arrange: Render page and navigate to leads tab
    render(<AdminDashboard />);
    const leadsTabButton = screen.getAllByRole("button", { name: /Quản Lý Leads \/ Form/i })[0];
    fireEvent.click(leadsTabButton);

    // Assert: Validate "Nguyễn Văn A" has status "MỚI" and processed action button is present
    const row = screen.getByText("Nguyễn Văn A").closest("tr");
    expect(row).toBeInTheDocument();
    expect(row?.textContent).toContain("MỚI");
    const markButton = screen.getByRole("button", { name: /Đánh dấu xử lý/i });

    // Act: Click the Mark Processed button
    fireEvent.click(markButton);

    // Assert: Verify status updates to "ĐÃ XỬ LÝ" and button is hidden
    expect(row?.textContent).toContain("ĐÃ XỬ LÝ");
    expect(screen.queryByRole("button", { name: /Đánh dấu xử lý/i })).not.toBeInTheDocument();
  });

  it("should remove product from grid when deleting", () => {
    // Arrange: Render page, go to Products tab, confirm presence of a product
    render(<AdminDashboard />);
    const productsTabButton = screen.getAllByRole("button", { name: /Quản Lý Sản Phẩm/i })[0];
    fireEvent.click(productsTabButton);

    const productName = "Màu đỏ Carmine (E120)";
    expect(screen.getByText(productName)).toBeInTheDocument();
    const rows = screen.getAllByRole("row");
    const carmineRow = rows.find(r => r.textContent?.includes(productName));
    expect(carmineRow).toBeDefined();

    // The delete button is within that row
    const deleteButtons = screen.getAllByTestId("trash-icon");
    // Let's click the delete icon corresponding to Carmine product. 
    // Carmine is product index 2 in list (id L15, but actual id is "15"). Let's find its delete button index
    // Our mock list has: Bột Beta-carotene (16), Nhũ tương Beta-carotene (17), Màu đỏ Carmine (15), etc.
    // So Màu đỏ Carmine is index 2.
    const carmineDeleteButton = deleteButtons[2];

    // Act: Click the delete button
    fireEvent.click(carmineDeleteButton);

    // Assert: Verify product is removed from display
    expect(screen.queryByText(productName)).not.toBeInTheDocument();
  });
});
