import { CircularProgress } from "@material-ui/core";
import React, { useState } from "react";
import { Fade } from "react-awesome-reveal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { promotionsCollection } from "../../../firebase";
import { query, where, getDocs, setDoc, doc } from "firebase/firestore";

const Enroll = () => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("The email is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      setLoading(true);
      submitForm(values, resetForm);
    },
  });

  const submitForm = async (values) => {
    try {
      const q = query(promotionsCollection, where("email", "==", values.email));
      const isOnTheList = await getDocs(q);

      if (isOnTheList.docs.length >= 1) {
        toast.error(`Sorry you are on the list already`);
        setLoading(false);
        return false;
      }

      await setDoc(doc(promotionsCollection), { email: values.email });
      formik.resetForm();
      setLoading(false);
      toast.success("Congratulation !!!");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <Fade>
      <div className="enroll_wrapper">
        <form onSubmit={formik.handleSubmit}>
          <div className="enroll_title">Enter your email</div>
          <div className="enroll_input">
            <input
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder="Enter your email"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error_label">{formik.errors.email}</div>
            ) : null}

            {loading ? (
              <CircularProgress color="secondary" className="progress" />
            ) : (
              <button type="submit">Enroll</button>
            )}

            <div className="enroll_discl">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut,
              dolore?
            </div>
          </div>
        </form>
      </div>
    </Fade>
  );
};

export default Enroll;
