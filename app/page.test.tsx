import { render, screen } from "@testing-library/react";
import Home from "./page";
import "@testing-library/jest-dom";

describe("test top page", () => {
    it("rendering", async () => {
        render(<Home />);
        const heading = screen.getByRole("heading", {
          name: "User & Post List from API",
        });
        const selectUser = screen.getByRole("heading", {
          name: "Select user",
        });
    
        expect(heading).toBeInTheDocument();
        expect(selectUser).toBeInTheDocument();
    });
});