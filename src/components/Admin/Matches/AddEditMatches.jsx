import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import AdminLayout from "../../../Hoc/AdminLayout";
import { toast } from "react-toastify";
import { textError, selectError, selectIsError } from "../../../helpers";
import { matchesCollection, teamsCollection } from "../../../firebase";
import { useParams } from "react-router-dom";

const defaultValues = {
  date: "",
  local: "",
  resultLocal: "",
  away: "",
  resultAway: "",
  referee: "",
  stadium: "",
  result: "",
  final: "",
};

const AddEditMatches = () => {
  const [loading, setLoading] = useState(false);
  const [formType, setFormType] = useState("");
  const [teams, setTeams] = useState(null);
  const [values, setValues] = useState(defaultValues);

  const { matchid } = useParams();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: values,
    validationSchema: Yup.object({
      date: Yup.string().required("This input is required"),
      local: Yup.string().required("This input is required"),
      resultLocal: Yup.number()
        .required("This input is required")
        .min(0, "The minimum is 0")
        .max(30, "The maximum is 30"),
      away: Yup.string().required("This input is required"),
      resultAway: Yup.number()
        .required("This input is required")
        .min(0, "The minimum is 0")
        .max(30, "The maximum is 30"),
      referee: Yup.string().required("This input is required"),
      stadium: Yup.string().required("This input is required"),
      result: Yup.mixed()
        .required("This input is required")
        .oneOf(["W", "D", "L", "n/a"]),
      final: Yup.mixed()
        .required("This input is required")
        .oneOf(["Yes", "No"]),
    }),
    onSubmit: (values) => {
      submitForm(values);
    },
  });

  const submitForm = async (values) => {
    let dataToSubmit = values;
    setLoading(true);

    if (formType === "add") {
    } else {
    }
  };

  useEffect(() => {
    if (matchid) {
      setFormType("edit");
    } else {
      setFormType("add");
    }
  }, [matchid]);

  console.log(formType);

  return (
    <AdminLayout
      title={formType === "add" ? "Add match" : "Edit match"}
    ></AdminLayout>
  );
};

export default AddEditMatches;
