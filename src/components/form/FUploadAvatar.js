import { useFormContext, Controller } from "react-hook-form";
import { FormHelperText } from "@mui/material";
import UploadAvatar from "../upload/UploadAvatar";

function FUploadAvatar({ name, ...other }) {
  const { control } = useFormContext();

  
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const checkError = !!error && !field.value;
        return (
          <div>
            <UploadAvatar file={field.value} error={checkError} {...other}  />
            {checkError && (
              <FormHelperText error sx={{ px: 2, textAlign: "center" }}>
                {error.message}
              </FormHelperText>
            )}
          </div>
        );
      }}
    />
  );
}

export default FUploadAvatar;