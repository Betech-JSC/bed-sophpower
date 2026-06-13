import React from "react";
import { render, screen } from "@testing-library/react";
import SearchPage from "@/app/search/page";

// Mock out the icons and components that aren't critical to search logic
jest.mock("lucide-react", () => ({
  Search: () => <div data-testid="search-icon" />,
  ArrowRight: () => <div data-testid="arrow-icon" />,
}));

describe("SearchPage component", () => {
  it("should display search results matching the keyword (Arrange-Act-Assert)", async () => {
    // Arrange: Set up mock searchParams with a keyword that matches Beta-carotene
    const searchParams = Promise.resolve({ keyword: "carotene" });

    // Act: Invoke the server component and render the resolved JSX element
    const resolvedJsx = await SearchPage({ searchParams });
    render(resolvedJsx);

    // Assert: Verify the products containing the keyword are displayed
    expect(screen.getByText("Bột Beta-carotene")).toBeInTheDocument();
    expect(screen.getByText("Nhũ tương Beta-carotene")).toBeInTheDocument();
    expect(screen.queryByText("Niacinamide (Vitamin B3)")).not.toBeInTheDocument();
  });

  it("should render the empty state when no products match the keyword", async () => {
    // Arrange: Set up mock searchParams with a non-matching keyword
    const searchParams = Promise.resolve({ keyword: "non-existent-product" });

    // Act: Invoke the server component and render the resolved JSX element
    const resolvedJsx = await SearchPage({ searchParams });
    render(resolvedJsx);

    // Assert: Verify that the empty state warning and suggestion are shown
    expect(screen.getByText("Không tìm thấy sản phẩm")).toBeInTheDocument();
    expect(screen.getByText(/Vui lòng thử tìm với từ khóa khác/)).toBeInTheDocument();
  });

  it("should be case-insensitive and handle whitespace trimming", async () => {
    // Arrange: Set up mock searchParams with mixed case and extra whitespace
    const searchParams = Promise.resolve({ keyword: "   NiACINAmide   " });

    // Act: Invoke the server component and render the resolved JSX element
    const resolvedJsx = await SearchPage({ searchParams });
    render(resolvedJsx);

    // Assert: Verify the product matches and displays correctly
    expect(screen.getByText("Niacinamide (Vitamin B3)")).toBeInTheDocument();
    expect(screen.queryByText("Bột Beta-carotene")).not.toBeInTheDocument();
  });
});
