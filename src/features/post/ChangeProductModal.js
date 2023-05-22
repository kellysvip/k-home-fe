import React, { useCallback } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
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
import { changePost, getPosts, getPostsOfUser } from "./postSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { fData } from "../../utils/numberFormat";
import useAuth from "../../hooks/useAuth";

const postSchema = Yup.object().shape({
  title: Yup.string(),
  address: Yup.string(),
  price: Yup.number().min(0, "Min value 0."),
  noBedroom: Yup.number().min(0, "Min value 0."),
  noBathroom: Yup.number().min(0, "Min value 0."),
  area: Yup.number().min(0, "Min value 0."),
  description: Yup.string(),
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
  { value: "District 1", label: "District 1" },
  { value: "District 2", label: "District 2" },
  { value: "District 3", label: "District 3" },
  { value: "District 4", label: "District 4" },
  { value: "District 5", label: "District 5" },
  { value: "District 6", label: "District 6" },
  { value: "District 7", label: "District 7" },
  { value: "District 8", label: "District 8" },
  { value: "District 9", label: "District 9" },
  { value: "District 10", label: "District 10" },
  { value: "District 11", label: "District 11" },
  { value: "District 12", label: "District 12" },
  { value: "Binh Tan District", label: "Binh Tan District" },
  { value: "Binh Thanh District", label: "Binh Thanh District" },
  { value: "Go Vap District", label: "Go Vap District" },
  { value: "Phu Nhuan District", label: "Phu Nhuan District" },
  { value: "Tan Binh District", label: "Tan Binh District" },
  { value: "Tan Phu District", label: "Tan Phu District" },
  { value: "Thu Duc City", label: "Thu Duc City" },
];

const statusList = [
  { value: "available", label: "Available" },
  { value: "reserve", label: "Reserve" },
  { value: "rented", label: "Rented" },
];

export default function ChangeProductModal({ product }) {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const productId = product._id;
  const defaultValues = {
    title: product?.title || "",
    image: product?.imageUrl || "",
    status: product?.status || "",
    address: product?.address || "",
    price: product?.price || "",
    noBedroom: product?.noBedroom || "",
    noBathroom: product?.noBathroom || "",
    area: product?.area || "",
    description: product?.description || "",
  };
  const methods = useForm({ resolver: yupResolver(postSchema), defaultValues });
  const {
    handleSubmit,
    setValue,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmitChangePost = async (data) => {
    try {
      dispatch(changePost(productId, data));
      dispatch(getPostsOfUser({ userId: user._id }));
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
    <Box sx={style}>
      <Typography variant="h5" component="h2">
        Infomation of Your Home
      </Typography>
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(onSubmitChangePost)}
      >
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
            <FSelect name="status" label="Status">
              {statusList.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </FSelect>
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
            update
          </LoadingButton>
        </Box>
      </FormProvider>
    </Box>
  );
}
