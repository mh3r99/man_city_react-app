import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import AdminLayout from "../../../Hoc/AdminLayout";
import { toast } from "react-toastify";
import { textError, selectError, selectIsError } from "../../../helpers";
import { db, matchesCollection, teamsCollection } from "../../../firebase";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { getDocs, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

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

  const navigate = useNavigate();
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

    teams.forEach((team) => {
      if (team.shortName === dataToSubmit.local) {
        dataToSubmit["localThmb"] = team.thmb;
      }
      if (team.shortName === dataToSubmit.away) {
        dataToSubmit["awayThmb"] = team.thmb;
      }
    });

    setLoading(true);

    if (formType === "add") {
      try {
        await setDoc(doc(matchesCollection), dataToSubmit);
        toast.success("Match added");
        formik.resetForm();
        navigate("/admin_matches");
      } catch (error) {
        toast.error(error);
      }
    } else {
      const docRef = doc(db, "matches", matchid);

      try {
        await updateDoc(docRef, dataToSubmit);
        toast.success("Match updated");
      } catch (error) {
        toast.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (matchid) {
      const fetchMatch = async () => {
        const docRef = doc(db, "matches", matchid);
        const docSnap = await getDoc(docRef);

        setValues(docSnap.data());
      };

      setFormType("edit");
      fetchMatch();
    } else {
      setFormType("add");
      setValues(defaultValues);
    }
  }, [matchid]);

  useEffect(() => {
    const getTeams = async () => {
      try {
        const docSnap = await getDocs(teamsCollection);
        const teams = docSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTeams(teams);
      } catch (error) {
        toast.error(error);
      }
    };

    if (!teams) {
      getTeams();
    }
  }, [teams]);

  const showTeams = () =>
    teams?.map((team) => (
      <MenuItem key={team.id} value={team.shortName}>
        {team.shortName}
      </MenuItem>
    ));

  return (
    <AdminLayout title={formType === "add" ? "Add match" : "Edit match"}>
      <div className="editmatch_dialog_wrapper">
        <div>
          <form onSubmit={formik.handleSubmit}>
            <div>
              <h4>Select date</h4>
              <FormControl>
                <TextField
                  id="date"
                  name="date"
                  type="date"
                  variant="outlined"
                  {...formik.getFieldProps("date")}
                  {...textError(formik, "date")}
                />
              </FormControl>
            </div>

            <hr />

            <div>
              <h4>Result local</h4>
              <FormControl error={selectIsError(formik, "local")}>
                <Select
                  id="local"
                  name="local"
                  variant="outlined"
                  displayEmpty
                  {...formik.getFieldProps("local")}
                >
                  <MenuItem value="" disabled>
                    Select a team
                  </MenuItem>
                  {showTeams()}
                </Select>
                {selectError(formik, "local")}
              </FormControl>

              <FormControl
                style={{
                  marginLeft: "10px",
                }}
              >
                <TextField
                  id="resultLocal"
                  name="resultLocal"
                  type="number"
                  variant="outlined"
                  {...formik.getFieldProps("resultLocal")}
                  {...textError(formik, "resultLocal")}
                />
              </FormControl>
            </div>

            <div>
              <h4>Result away</h4>
              <FormControl error={selectIsError(formik, "away")}>
                <Select
                  id="away"
                  name="away"
                  variant="outlined"
                  displayEmpty
                  {...formik.getFieldProps("away")}
                >
                  <MenuItem value="" disabled>
                    Select a team
                  </MenuItem>
                  {showTeams()}
                </Select>
                {selectError(formik, "away")}
              </FormControl>

              <FormControl
                style={{
                  marginLeft: "10px",
                }}
              >
                <TextField
                  id="resultAway"
                  name="resultAway"
                  type="number"
                  variant="outlined"
                  {...formik.getFieldProps("resultAway")}
                  {...textError(formik, "resultAway")}
                />
              </FormControl>
            </div>

            <hr />

            <div>
              <h4>Match info</h4>
              <div className="mb-5">
                <FormControl>
                  <TextField
                    id="referee"
                    name="referee"
                    variant="outlined"
                    placeholder="Add the referee name"
                    {...formik.getFieldProps("referee")}
                    {...textError(formik, "referee")}
                  />
                </FormControl>
              </div>

              <div className="mb-5">
                <FormControl>
                  <TextField
                    id="stadium"
                    name="stadium"
                    variant="outlined"
                    placeholder="Add the stadium name"
                    {...formik.getFieldProps("stadium")}
                    {...textError(formik, "stadium")}
                  />
                </FormControl>
              </div>

              <div className="mb-5">
                <FormControl error={selectIsError(formik, "result")}>
                  <Select
                    id="result"
                    name="result"
                    variant="outlined"
                    displayEmpty
                    {...formik.getFieldProps("result")}
                  >
                    <MenuItem value="" disabled>
                      Select a result
                    </MenuItem>
                    <MenuItem value="W">Win</MenuItem>
                    <MenuItem value="D">Draw</MenuItem>
                    <MenuItem value="L">Lose</MenuItem>
                    <MenuItem value="n/a">Non available</MenuItem>
                  </Select>
                  {selectError(formik, "result")}
                </FormControl>
              </div>

              <div className="mb-5">
                <FormControl error={selectIsError(formik, "final")}>
                  <Select
                    id="final"
                    name="final"
                    variant="outlined"
                    displayEmpty
                    {...formik.getFieldProps("final")}
                  >
                    <MenuItem value="" disabled>
                      Was the game played ?
                    </MenuItem>
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </Select>
                  {selectError(formik, "final")}
                </FormControl>
              </div>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {formType === "add" ? "Add match" : "Edit match"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddEditMatches;
