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
import { db, playersCollection } from "../../../firebase";
import { useNavigate, useParams } from "react-router-dom";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import { textError, selectError, selectIsError } from "../../../helpers";

const defaultValues = {
  image: "",
  name: "",
  lastname: "",
  number: "",
  position: "",
};

const AddEditPlayers = () => {
  const [loading, setLoading] = useState(false);
  const [formType, setFormType] = useState("");
  const [values, setValues] = useState(defaultValues);
  const navigate = useNavigate();
  const { playerid } = useParams();

  // image upload
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const storage = getStorage();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: values,
    validationSchema: Yup.object({
      name: Yup.string().required("This input is required"),
      lastname: Yup.string().required("This input is required"),
      number: Yup.number()
        .required("This input is required")
        .min(0, "The minimum is 0")
        .max(100, "The max is 100"),
      position: Yup.string().required("This input is required"),
      image: Yup.string().required("This image is required"),
    }),
    onSubmit: (values) => {
      submitForm(values);
    },
  });

  const submitForm = async (values) => {
    let dataToSubmit = values;
    setLoading(true);

    if (formType === "add") {
      try {
        await setDoc(doc(playersCollection), dataToSubmit);
        toast.success("Player added");
        formik.resetForm();
        navigate("/admin_players");
      } catch (error) {
        toast.error(error);
      }
    } else {
      const docRef = doc(db, "players", playerid);

      try {
        await updateDoc(docRef, dataToSubmit);
        toast.success("Player updated");
      } catch (error) {
        toast.error(error);
      } finally {
        setLoading(false);
      }
    }

    uploadFile();
  };

  useEffect(() => {
    if (playerid) {
      const fetchPlayer = async () => {
        const docRef = doc(db, "players", playerid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const imgName = docSnap.data().image;
          const imageRef = ref(storage, `players/${imgName}`);
          getDownloadURL(imageRef).then((url) => {
            setImageUrl(url);
          });

          setFormType("edit");
          setValues(docSnap.data());
        } else {
          toast.error("Sorry, nothing was found");
        }
      };

      fetchPlayer();
    } else {
      setFormType("add");
      setValues(defaultValues);
    }
  }, [playerid, storage]);

  const uploadFile = () => {
    if (imageUpload == null) return;

    const imageRef = ref(storage, `players/${imageUpload.name}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrl(url);
      });
    });
  };

  return (
    <AdminLayout title={formType === "add" ? "Add player" : "Edit player"}>
      <div className="editplayers_dialog_wrapper">
        <div>
          <form onSubmit={formik.handleSubmit}>
            {!imageUrl ? (
              <FormControl error={selectIsError(formik, "image")}>
                <input
                  id="image"
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={(event) => {
                    const img = event.target.files[0];
                    if (img) {
                      setImageUpload(img);
                      setImageUrl(URL.createObjectURL(img));
                      formik.setFieldValue("image", img.name);
                    }
                  }}
                />
                {selectError(formik, "image")}
              </FormControl>
            ) : (
              <div className="image_upload_container">
                <img
                  style={{
                    width: "100%",
                  }}
                  src={imageUrl}
                  alt="player img"
                />
                <div
                  className="remove"
                  onClick={() => {
                    formik.setFieldValue("image", "");
                    setImageUrl("");
                  }}
                >
                  Remove
                </div>
              </div>
            )}

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
                  type="number"
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
