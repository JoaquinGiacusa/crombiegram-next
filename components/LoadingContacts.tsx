import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";
import { array, string } from "yup";
import { log } from "console";

interface MediaProps {
  loading?: boolean;
}

function LoadingContacts(props: MediaProps) {
  const { loading = false } = props;
  const contactsNumber = new Array(10).fill(1);

  return (
    <>
      {contactsNumber.map(() => {
        return (
          <Card sx={{ width: 500, height: 100, m: 2 }} key="contact-skeleton">
            <CardHeader
              avatar={
                <Skeleton
                  animation="wave"
                  variant="circular"
                  width={40}
                  height={40}
                />
              }
              action={null}
              title={
                <Skeleton
                  animation="wave"
                  height={10}
                  width="100%"
                  style={{ marginBottom: 6 }}
                />
              }
              subheader={<Skeleton animation="wave" height={10} width="40%" />}
            />
          </Card>
        );
      })}
    </>
  );
}

export default LoadingContacts;
