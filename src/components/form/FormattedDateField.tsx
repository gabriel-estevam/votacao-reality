import { Controller, useFormContext } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ptBR } from "date-fns/locale";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export default function BirthdateField() {
    const {
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
            <Controller
                name="birthdate"
                control={control}
                render={({ field }) => (
                    <DatePicker
                        label="Data de Nascimento"
                        value={field.value ?? null}
                        onChange={(date) => field.onChange(date)}
                        format="dd/MM/yyyy"
                        slotProps={{
                            textField: {
                                fullWidth: true,
                                margin: "normal",
                                error: !!errors.birthdate,
                                helperText: typeof errors.birthdate?.message === "string" ? errors.birthdate?.message : undefined,
                            },
                        }}
                    />
                )}
            />
        </LocalizationProvider>
    );
}
