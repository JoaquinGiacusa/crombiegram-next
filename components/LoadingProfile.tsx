import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";

function LoadingProfile() {
  return (
    <>
      <Card
        sx={{
          borderRadius: 5,
          m: 1,
          mt: 5,
          maxWidth: 700,
          width: "100%",
          p: 2,
        }}
      >
        <Skeleton animation="wave" height={160} />
        <Skeleton animation="wave" height={220} />
      </Card>

      <Card sx={{ width: 500, m: 2 }}>
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

        <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />

        <CardContent>
          <React.Fragment>
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" height={10} width="80%" />
          </React.Fragment>
        </CardContent>
      </Card>
    </>
  );
}
export default LoadingProfile;
