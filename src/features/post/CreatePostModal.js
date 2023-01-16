import React, { useCallback } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  FormProvider,
  FSelect,
  FTextField,
  FUploadImage,
} from "../../components/form";
import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/system";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { createPost } from "./postSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { fData } from "../../utils/numberFormat";

const postSchema = Yup.object().shape({
  title: Yup.string().required("Content is required"),
  address: Yup.string().required("Address is required"),
  price: Yup.number().required("Price is required").min(0, "Min value 0."),
  noBedroom: Yup.number()
    .required("Number Bedroom is required")
    .min(0, "Min value 0."),
  noBathroom: Yup.number()
    .required("Number Bathroom is required")
    .min(0, "Min value 0."),
  area: Yup.number().required("Area is required").min(0, "Min value 0."),
  description: Yup.string().required("Description is required"),
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const addressList = [
  { value: "district1", label: "District 1" },
  { value: "district2", label: "District 2" },
  { value: "district3", label: "District 3" },
  { value: "district4", label: "District 4" },
  { value: "district5", label: "District 5" },
  { value: "district6", label: "District 6" },
  { value: "district7", label: "District 7" },
  { value: "district8", label: "District 8" },
  { value: "district9", label: "District 9" },
  { value: "district10", label: "District 10" },
  { value: "district11", label: "District 11" },
  { value: "district12", label: "District 12" },
  { value: "btdistrict", label: "Binh Tan District" },
  { value: "bthanhdistrict", label: "Binh Thanh District" },
  { value: "gvdistrict", label: "Go Vap District" },
  { value: "pndistrict", label: "Phu Nhuan District" },
  { value: "tbdistrict", label: "Tan Binh District" },
  { value: "tpdistrict", label: "Tan Phu District" },
  { value: "tdcity", label: "Thu Duc City" },
];

export default function BasicModal({ open, setOpen }) {
  const dispatch = useDispatch();
  const handleClose = () => setOpen(false);

  const methods = useForm({ resolver: yupResolver(postSchema) });
  const {
    handleSubmit,
    setValue,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      dispatch(createPost(data)).then(() => reset());
    } catch (error) {
      reset();
      console.log(error);
      setError("responseError", error);
    }
  };
  const handleDrop = useCallback(
    (acceptedFiles) => {
      console.log("acceptedFiles", acceptedFiles);
      const file = acceptedFiles[0];
      console.log(file);
      if (file) {
        setValue(
          "image",
          Object.assign(file, { preview: URL.createObjectURL(file) })
        );
      }
    },
    [setValue]
  );

  return (
    <Modal
      open={open}
      onClose={handleClose}s
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h5" component="h2">
          Infomation of Your Home
        </Typography>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <FTextField name="title" label="Title" />
          <Stack sx={{ mt: 1, flexDirection: { md: "row", sm: "column" } }}>
            <Stack spacing={0.5} sx={{ mr: 3, minWidth: "300px" }}>
              <FUploadImage
                name="image"
                accept="image/*"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: "auto",
                      display: "block",
                      textAlign: "center",
                      color: "text.secondary",
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
            </Stack>
            <Stack spacing={1}>
              <FSelect name="address" label="Address">
                {addressList.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </FSelect>
              <FTextField name="price" label="Price" />
              <Box sx={{ display: "flex" }}>
                <FTextField name="noBedroom" label="Bedroom" />
                <FTextField name="noBathroom" label="Bathroom" />
              </Box>
              <FTextField name="area" label="Area" />
              <FTextField
                multiline
                rows={4}
                name="description"
                label="Description"
              />
            </Stack>
          </Stack>
          <Box
            sx={{
              dispaly: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <LoadingButton
              type="submit"
              variant="contained"
              sx={{
                mt: 1,
                padding: "18px 25px",
                lineHeight: "0",
                backgroundColor: "#01adba",
                color: "#fff",
                fontWeight: "600",
                fontSize: "13px",
              }}
              size="small"
              loading={isSubmitting}
            >
              post
            </LoadingButton>
          </Box>
        </FormProvider>
      </Box>
    </Modal>
  );
}