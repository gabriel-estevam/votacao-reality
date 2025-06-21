import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "../../../components/AuthForm/LoginForm";

describe("LoginForm", () => {
    const renderLoginForm = () => {
        const onForgotPassword = jest.fn();
        render(<LoginForm onForgotPassword={onForgotPassword} />);
        return { onForgotPassword };
    };


    it("renders the form fields", () => {
        renderLoginForm();
        expect(screen.getByRole("textbox", { name: /email/i })).toBeInTheDocument();
        expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    });

    it("triggers forgot password callback", async () => {
        const { onForgotPassword } = renderLoginForm();
        await userEvent.click(screen.getByText(/esqueceu a senha/i));
        expect(onForgotPassword).toHaveBeenCalledTimes(1);
    });


    it("shows errors when fields are empty", async () => {
        renderLoginForm();
        await userEvent.click(screen.getByRole("button", { name: /continuar/i }));
        expect(await screen.findByText(/email inválido/i)).toBeInTheDocument();
        expect(await screen.findByText(/senha deve ter pelo menos 3 caracteres/i)).toBeInTheDocument();
    });

    it("rejects invalid email format", async () => {
        renderLoginForm();
        await userEvent.type(screen.getByRole("textbox", { name: /email/i }), "invalid");
        await userEvent.click(screen.getByRole("button", { name: /continuar/i }));
        expect(await screen.findByText(/email inválido/i)).toBeInTheDocument();
    });

    it("toggles password visibility", async () => {
        renderLoginForm();
        const passwordInput = screen.getByLabelText(/senha/i);

        const toggleButton = screen.getByTestId("toggle-password");
        expect(toggleButton).toBeDefined();

        await userEvent.click(toggleButton);
        expect(passwordInput).toHaveAttribute("type", "text");
    });

    it("handles valid login submission", async () => {
        renderLoginForm();
        const email = screen.getByRole("textbox", { name: /email/i });
        const password = screen.getByLabelText(/senha/i);

        await userEvent.type(email, "user@email.com");
        await userEvent.type(password, "123456");

        const logSpy = jest.spyOn(console, "log").mockImplementation(() => { });
        await userEvent.click(screen.getByRole("button", { name: /continuar/i }));

        expect(logSpy).toHaveBeenCalledWith("LOGIN OK", {
            email: "user@email.com",
            password: "123456"
        });

        logSpy.mockRestore();
    });

    it("rejects malicious input (XSS/SQLi)", async () => {
        renderLoginForm();

        await userEvent.type(screen.getByRole("textbox", { name: /email/i }), "<script>alert(1)</script>");
        await userEvent.type(screen.getByLabelText(/senha/i), "' OR '1'='1");

        await userEvent.click(screen.getByRole("button", { name: /continuar/i }));

        expect(await screen.findByText(/email inválido/i)).toBeInTheDocument();
    });

    it.only("validates minimum password length", async () => {
        renderLoginForm();

        await userEvent.type(screen.getByRole("textbox", { name: /email/i }), "valid@email.com");
        await userEvent.type(screen.getByLabelText(/senha/i), "12");

        await userEvent.click(screen.getByRole("button", { name: /continuar/i }));

        expect(await screen.findByText(/senha deve ter pelo menos 3 caracteres/i)).toBeInTheDocument();
    });

    it("accepts a valid long email", async () => {
        const longEmail = `${"a".repeat(250)}@x.com`;
        renderLoginForm();

        await userEvent.type(screen.getByRole("textbox", { name: /email/i }), longEmail);
        await userEvent.type(screen.getByLabelText(/senha/i), "123456");

        const logSpy = jest.spyOn(console, "log").mockImplementation(() => { });
        await userEvent.click(screen.getByRole("button", { name: /continuar/i }));

        expect(logSpy).toHaveBeenCalledWith("LOGIN OK", {
            email: longEmail,
            password: "123456"
        });

        logSpy.mockRestore();
    });
});
