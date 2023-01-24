import useUser from "@/hooks/useUser";
import { fetcher } from "@/utils/fetcher";
import { Add } from "@mui/icons-material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";

const AddImage = (image: File) => {
  const [file, setFile] = useState<File | null>();
  const inputFile = useRef<any>(null);
  const { data, error, isLoading, mutate } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setFile(e.target.files[0]);
  };

  const onSubmit = handleSubmit(async (data) => {
    let formData = new FormData(); //formdata object
    if (file) {
      formData.append("file", file, file?.name); //append the values with key, value pair
    }

    // console.log({ formData });
    const jsonResponse = await fetcher(
      "/post",
      {
        method: "POST",
        body: formData,
      },
      true
    );

    if (jsonResponse) {
      mutate();
    }
  });
  return (
    <>
      <input
        style={{ display: "none" }}
        type="file"
        onChange={handleChange}
        ref={inputFile}
      />
      <Button
        color="primary"
        aria-label="edit"
        onClick={() => inputFile.current!.click()}
      >
        <Add fontSize="small" />
        <Typography>Add Image</Typography>
      </Button>
    </>
  );
};
export default AddImage;
