import React, { useCallback, useEffect, useState } from "react";
import { Box, Grid, Card, Stack, Typography, Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import useAuth from "../../hooks/useAuth";
// import { cloudinaryUpload } from "../../utils/cloudinary";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, FTextField, FUploadAvatar } from "../../components/form";
// import { fData } from "../../utils/numberFormat";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "./userSlice";
import { fData } from "../../utils/numberFormat";
import LoadingScreen from "../../components/LoadingScreen";
import apiService from "../../app/apiService";
import ProductList from "../post/ProductList";
import ProductListUser from "../post/ProductListUser";
const updateUserSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  jobTitle: Yup.string(),
  phoneNumber: Yup.string(),
  address: Yup.string(),
  aboutMe: Yup.string(),
});

function AccountGeneral() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {  totalPosts, isLoading } = useSelector(
    (state) => state.post
  );
  const defaultValues = {
    name: user?.name || "",
    email: user?.email || "",
    jobTitle: user?.jobTitle || "",
    avatarUrl: user?.avatarUrl || "",
    phoneNumber: user?.phoneNumber || "",
    address: user?.address || "",
    aboutMe: user?.aboutMe || "hello",
  };

  const methods = useForm({
    resolver: yupResolver(updateUserSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(updateUserProfile({ userId: user._id, ...data }));
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      console.log(file);
      if (file) {
        setValue(
          "avatarUrl",
          Object.assign(file, { preview: URL.createObjectURL(file) })
        );
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3, textAlign: "center" }}>
            <FUploadAvatar
              name="avatarUrl"
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
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: "grid",
                rowGap: 3,
                columnGap: 2,
                gridTemplateColumns: {
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(2, 1fr)",
                },
              }}
            >
              <FTextField name="name" label="Name" />
              <FTextField name="email" label="Email" disabled />

              <FTextField name="jobTitle" label="Job Title" />

              <FTextField name="phoneNumber" label="Phone Number" />
              <FTextField name="address" label="Address" />
            </Box>

            <Stack spacing={3} alignItems="flex-start" sx={{ mt: 3 }}>
              <FTextField name="aboutMe" multiline rows={4} label="About Me" />

              <LoadingButton
                type="submit"
                variant="contained"
                sx={{ backgroundColor: "#0499a8", alignSelf: "flex-end" }}
                loading={isSubmitting || isLoading}
              >
                Save Changes
              </LoadingButton>
              <Box
                sx={{
                  borderTop: "1px solid #111",
                  paddingTop: 1,
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ color: "#0499a8", fontWeight: "700", fontSize: "14px" }}
                >
                  Total Posts: {totalPosts}
                </Typography>
                {loading ? (
                  <LoadingScreen />
                ) : (
                  <>
                    {error ? (
                      <Alert severity="error">{error}</Alert>
                    ) : (
                      <ProductListUser/>
                    )}
                  </>
                )}
              </Box>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

export default AccountGeneral;
