import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RegisterForm from "../../../components/AuthForm/RegisterForm";

describe("RegisterForm", () => {
    const renderForm = () => render(<RegisterForm />);

    const fillValidFields = async (overrides = {}) => {
        const form = screen.getByTestId("form-register");
        const defaultData = {
            name: "Valid Name",
            email: "valid@email.com",
            password: "123456",
            confirmPassword: "123456",
            birthdate: "14/02/2000",
        };

        const data = { ...defaultData, ...overrides };

        await userEvent.clear(screen.getByLabelText(/nome completo/i));
        await userEvent.type(screen.getByLabelText(/nome completo/i), data.name);

        await userEvent.clear(screen.getByLabelText(/email/i));
        await userEvent.type(screen.getByLabelText(/email/i), data.email);

        await userEvent.clear(screen.getByLabelText(/^senha$/i));
        await userEvent.type(screen.getByLabelText(/^senha$/i), data.password);

        await userEvent.clear(screen.getByLabelText(/confirmar senha/i));
        await userEvent.type(screen.getByLabelText(/confirmar senha/i), data.confirmPassword);

        const hiddenDateInput = within(form).getByTestId("formatted-date");
        fireEvent.change(hiddenDateInput, { target: { value: data.birthdate } });

        return data;
    };

    it("shows required error when name is empty", async () => {
        renderForm();
        const nameInput = screen.getByLabelText(/nome completo/i);
        await userEvent.clear(nameInput); // apenas limpa, não digita ""
        await userEvent.click(screen.getByRole("button", { name: /registrar/i }));
        expect(await screen.findByText(/nome é obrigatório/i)).toBeInTheDocument();
    });

    it("shows required error when email is empty", async () => {
        renderForm();
        const emailInput = screen.getByLabelText(/email/i);
        await userEvent.clear(emailInput);
        await userEvent.click(screen.getByRole("button", { name: /registrar/i }));
        expect(await screen.findByText(/email inválido/i)).toBeInTheDocument(); // Zod retorna essa
    });

    it("shows required error when password is empty", async () => {
        renderForm();
        const passwordInput = screen.getByLabelText(/^senha$/i);
        await userEvent.clear(passwordInput);

        const confirmPasswordInput = screen.getByLabelText(/confirmar senha/i);
        await userEvent.clear(confirmPasswordInput);
        await userEvent.type(confirmPasswordInput, "123456"); // garantir que só o campo `password` falhe

        await userEvent.click(screen.getByRole("button", { name: /registrar/i }));

        expect(await screen.findByText(/senha é obrigatório/i)).toBeInTheDocument();
    });

    it("shows required error when confirmPassword is empty", async () => {
        renderForm();
        const passwordInput = screen.getByLabelText(/^senha$/i);
        await userEvent.clear(passwordInput);
        await userEvent.type(passwordInput, "123456");

        const confirmPasswordInput = screen.getByLabelText(/confirmar senha/i);
        await userEvent.clear(confirmPasswordInput);

        await userEvent.click(screen.getByRole("button", { name: /registrar/i }));

        expect(await screen.findByText(/confirmação senha é obrigatório/i)).toBeInTheDocument();
    });

    it("shows required error when birthdate is empty", async () => {
        renderForm();

        const form = screen.getByTestId("form-register");
        const dateInput = within(form).getByTestId("formatted-date");
        fireEvent.change(dateInput, { target: { value: "" } });

        await userEvent.click(screen.getByRole("button", { name: /registrar/i }));
        expect(await screen.findByText(/data de nascimento é obrigatória/i)).toBeInTheDocument();
    });


    it("accepts minimum length values", async () => {
        renderForm();

        await fillValidFields({
            name: "A", // 1 char
            email: "a@b.co", // minimal valid email
            password: "123", // min 3 chars
            confirmPassword: "123",
        });

        const logSpy = jest.spyOn(console, "log").mockImplementation(() => { });
        await userEvent.click(screen.getByRole("button", { name: /registrar/i }));

        expect(logSpy).toHaveBeenCalledWith("Register:", expect.objectContaining({
            name: "A",
            email: "a@b.co",
            password: "123",
            confirmPassword: "123",
        }));
        logSpy.mockRestore();
    });

    it("accepts maximum length values", async () => {
        renderForm();

        await fillValidFields({
            name: "A".repeat(65),
            email: `${"a".repeat(52)}@e.com`, // 60 chars total
            password: "1".repeat(16),
            confirmPassword: "1".repeat(16),
        });

        const logSpy = jest.spyOn(console, "log").mockImplementation(() => { });
        await userEvent.click(screen.getByRole("button", { name: /registrar/i }));

        expect(logSpy).toHaveBeenCalledWith("Register:", expect.objectContaining({
            name: "A".repeat(65),
            email: `${"a".repeat(52)}@e.com`,
            password: "1".repeat(16),
            confirmPassword: "1".repeat(16),
        }));
        logSpy.mockRestore();
    });

    it("rejects name longer than 65 characters", async () => {
        renderForm();
        await fillValidFields({ name: "A".repeat(66) });

        await userEvent.click(screen.getByRole("button", { name: /registrar/i }));

        expect(await screen.findByText(/nome.*máximo.*65/i)).toBeInTheDocument();
    });

    it("rejects email longer than 60 characters", async () => {
        renderForm();
        await fillValidFields({ email: `${"a".repeat(53)}@mail.com` }); // > 60 chars

        await userEvent.click(screen.getByRole("button", { name: /registrar/i }));

        expect(await screen.findByText(/email.*máximo.*60/i)).toBeInTheDocument();
    });

    it("rejects password shorter than 3 and longer than 16 characters", async () => {
        renderForm();
        await fillValidFields({ password: "12", confirmPassword: "12" }); // too short
        await userEvent.click(screen.getByRole("button", { name: /registrar/i }));

        expect(await screen.findAllByText("Senha deve ter pelo menos 3 caracteres")).toHaveLength(2);
    });

    it("rejects password longer than 16 characters", async () => {
        renderForm();
        await fillValidFields({ password: "1".repeat(17), confirmPassword: "1".repeat(17) }); // too long
        await userEvent.click(screen.getByRole("button", { name: /registrar/i }));

        expect(await screen.findAllByText("Senha deve ter no máximo 16 caracteres")).toHaveLength(2);
    });

    it("rejects future birthdate", async () => {
        renderForm();
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        const dd = String(tomorrow.getDate()).padStart(2, '0');
        const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
        const yyyy = tomorrow.getFullYear();

        await fillValidFields({ birthdate: `${dd}/${mm}/${yyyy}` });

        await userEvent.click(screen.getByRole("button", { name: /registrar/i }));

        expect(await screen.findByText(/data não pode ser no futuro/i)).toBeInTheDocument();
    });
});
