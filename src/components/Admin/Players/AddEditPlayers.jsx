import React, { useEffect, useState } from "react";
import AdminLayout from "../../../Hoc/AdminLayout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import { playersCollection } from "../../../firebase";
import { useParams } from "react-router-dom";

const defaultValues = {
  name: "",
  lastname: "",
  number: "",
  position: "",
};

const textError = (formik, values) => ({
  error: formik.errors[values] && formik.touched[values],
  helperText:
    formik.errors[values] && formik.touched[values]
      ? formik.errors[values]
      : null,
});

const selectError = (formik, values) => {
  if (formik.errors[values] && formik.touched[values]) {
    return <FormHelperText>{formik.errors[values]}</FormHelperText>;
  }
  return false;
};

const selectIsError = (formik, values) =>
  formik.errors[values] && formik.touched[values];

const AddEditPlayers = () => {
  const [loading, setLoading] = useState(false);
  const [formType, setFormType] = useState("");
  const [values, setValues] = useState(defaultValues);
  const { playerid } = useParams();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: values,
    validationSchema: Yup.object({
      name: Yup.string().required("This input is required"),
      lastname: Yup.string().required("This input is required"),
      number: Yup.number()
        .required("This input is required")
        .min("0", "The minimum is 0")
        .max("100", "The max is 100"),
      position: Yup.string().required("This input is required"),
    }),
  });

  useEffect(() => {
    if (playerid) {
      setFormType("edit");
      // setValues(defaultValues);
    } else {
      setFormType("add");
      setValues(defaultValues);
    }
  }, [playerid]);

  return (
    <AdminLayout title={formType === "add" ? "Add player" : "Edit player"}>
      <div className="editplayers_dialog_wrapper">
        <div>
          <form onSubmit={formik.handleSubmit}>
            image
            <hr />
            <h4>Player info</h4>
            <div className="mb-5">
              <FormControl>
                <TextField
                  id="name"
                  name="name"
                  variant="outlined"
                  placeholder="Add firstname"
                  {...formik.getFieldProps("name")}
                  {...textError(formik, "name")}
                />
              </FormControl>
            </div>
            <div className="mb-5">
              <FormControl>
                <TextField
                  id="lastname"
                  name="lastname"
                  variant="outlined"
                  placeholder="Add lastname"
                  {...formik.getFieldProps("lastname")}
                  {...textError(formik, "lastname")}
                />
              </FormControl>
            </div>
            <div className="mb-5">
              <FormControl>
                <TextField
                  id="number"
                  name="number"
                  variant="outlined"
                  placeholder="Add number"
                  {...formik.getFieldProps("number")}
                  {...textError(formik, "number")}
                />
              </FormControl>
            </div>
            <div className="mb-5">
              <FormControl error={selectIsError(formik, "position")}>
                <Select
                  id="position"
                  name="position"
                  variant="outlined"
                  displayEmpty
                  {...formik.getFieldProps("position")}
                >
                  <MenuItem value="" disabled>
                    Select a position
                  </MenuItem>
                  <MenuItem value="Keeper">Keeper</MenuItem>
                  <MenuItem value="Defence">Defence</MenuItem>
                  <MenuItem value="Midfield">Midfield</MenuItem>
                  <MenuItem value="Striker">Striker</MenuItem>
                </Select>
                {selectError(formik, "position")}
              </FormControl>
            </div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {formType === "add" ? "Add player" : "Edit player"}
            </Button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddEditPlayers;
