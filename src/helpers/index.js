import { FormHelperText } from "@material-ui/core";

export const textError = (formik, values) => ({
  error: formik.errors[values] && formik.touched[values],
  helperText:
    formik.errors[values] && formik.touched[values]
      ? formik.errors[values]
      : null,
});

export const selectError = (formik, values) => {
  if (formik.errors[values] && formik.touched[values]) {
    return <FormHelperText>{formik.errors[values]}</FormHelperText>;
  }
  return false;
};

export const selectIsError = (formik, values) =>
  formik.errors[values] && formik.touched[values];
