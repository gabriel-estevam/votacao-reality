import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RegisterForm from "../../../components/AuthForm/RegisterForm";

describe("RegisterForm", () => {
    const renderForm = () => render(<RegisterForm />);

    it("renders all required fields", () => {
        renderForm();

        expect(screen.getByLabelText(/nome completo/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^senha$/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/confirmar senha/i)).toBeInTheDocument();
        expect(screen.getByTestId("formatted-date")).toBeInTheDocument();
    });

    it("shows validation errors when submitting empty", async () => {
        renderForm();

        await userEvent.click(screen.getByRole("button", { name: /registrar/i }));

        expect(await screen.findByText(/nome é obrigatório/i)).toBeInTheDocument();
        expect(await screen.findByText(/email inválido/i)).toBeInTheDocument();
        expect(await screen.findByText(/senha deve ter pelo menos 3 caracteres/i)).toBeInTheDocument();
        expect(await screen.findByText(/confirmação de senha é obrigatória/i)).toBeInTheDocument();
        expect(await screen.findByText(/data de nascimento é obrigatória/i)).toBeInTheDocument();
    });

    it("shows error if passwords do not match", async () => {
        renderForm();
        const form = screen.getByTestId("form-register");

        await userEvent.type(within(form).getByLabelText(/nome completo/i), "Fulano de Tal");
        await userEvent.type(within(form).getByLabelText(/email/i), "fulano@email.com");

        const hiddenDateInput = within(form).getByTestId("formatted-date");
        fireEvent.change(hiddenDateInput, { target: { value: "14/02/2001" } })

        await userEvent.type(within(form).getByLabelText(/^senha$/i), "12345678");
        await userEvent.type(within(form).getByLabelText(/confirmar senha/i), "senhaerrada");

        await userEvent.click(within(form).getByRole("button", { name: /registrar/i }));

        const errorMessage = await within(form).findByText(/senhas.*iguais/i);
        expect(errorMessage).toBeInTheDocument();
    });

    it("toggles password visibility", async () => {
        renderForm();

        const passwordField = screen.getByLabelText(/^senha$/i);
        const toggleButtons = screen.getAllByRole("button", { hidden: true });

        await userEvent.click(toggleButtons[0]);
        expect(passwordField).toHaveAttribute("type", "text");

        await userEvent.click(toggleButtons[0]);
        expect(passwordField).toHaveAttribute("type", "password");
    });

    it("submits valid data correctly", async () => {
        renderForm();
        const form = screen.getByTestId("form-register");

        await userEvent.type(screen.getByLabelText(/nome completo/i), "Maria Silva");
        await userEvent.type(screen.getByLabelText(/email/i), "maria@example.com");
        await userEvent.type(screen.getByLabelText(/^senha$/i), "123456");
        await userEvent.type(screen.getByLabelText(/confirmar senha/i), "123456");

        const hiddenDateInput = within(form).getByTestId("formatted-date");
        fireEvent.change(hiddenDateInput, { target: { value: "14/02/2001" } })

        const logSpy = jest.spyOn(console, "log").mockImplementation(() => { });

        await userEvent.click(screen.getByRole("button", { name: /registrar/i }));

        expect(logSpy).toHaveBeenCalledWith("Register:", {
            name: "Maria Silva",
            email: "maria@example.com",
            password: "123456",
            confirmPassword: "123456",
            birthdate: expect.any(Date),
        });

        logSpy.mockRestore();
    });
});
