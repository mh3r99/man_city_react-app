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
} from "@material-ui/core";
import { playersCollection } from "../../../firebase";
import { useParams } from "react-router-dom";

const defaultValues = {
  name: "",
  lastname: "",
  number: "",
  position: "",
};

const AddEditPlayers = () => {
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

  return <AdminLayout></AdminLayout>;
};

export default AddEditPlayers;
