import useUser from “@/hooks/useUser”;
import { fetcher } from “@/utils/fetcher”;
import Add from “@mui/icons-material/Add”;
import { Button, IconButton, Typography } from “@mui/material”;
import React, { useRef, useState } from “react”;
import { useForm } from “react-hook-form”;
import { mutate } from “swr”;
const AddImage = () => {
  const [file, setFile] = useState<File | null>();
  const inputFile = useRef<any>(null);
  const { data, error, isLoading } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setFile(e.target.files[0]);
  };
  const handleFormData = () => {
    let formData = new FormData(); //formdata object
    if (file) {
      formData.append(“file”, file); //append the values with key, value pair
    }
    console.log({ formData });
    return formData;
  };
  const onSubmit = handleSubmit(async (data) => {
    let formData = handleFormData();
    if (data.contentText) {
      formData.append(“contentText”, data.contentText);
    }
    // console.log({ formData });
    const jsonResponse = await fetcher(“/post”, {
      method: “POST”,
      body: formData,
      headers: { “content-type”: “multipart/form-data” },
    });
    // const jsonData = await response.json();
    console.log(“jsonResponse”, jsonResponse);
    if (jsonResponse) {
      //mutate();
    }
  });
  return (
    <>
      <input
        style={{ display: “none” }}
        type=“file”
        onChange={handleChange}
        ref={inputFile}
      />
      <Button
        color=“primary”
        aria-label=“edit”
        onClick={() => inputFile.current!.click()}
      >
        <Add fontSize=“small” />
        <Typography>Add Image</Typography>
      </Button>
    </>
  );
};
export default AddImage;
