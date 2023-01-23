import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import MainLayout from "@/components/layouts/mainLayout";
import useUser from "@/hooks/useUser";
import UserCard from "@/components/UserCard";

export type ListUserProps = {
  id: string;
  firstName: string;
  lastName: string;
  profileImage: string;
  position: string;
}[];
function Network() {
  const [listUser, setListUser] = useState<ListUserProps>([]);
  const [reFetchPost, setReFetchPost] = useState(0);

  const { data, error, isLoading } = useUser();

  useEffect(() => {
    if (data) {
      setListUser(data);
    }
  }, [data, reFetchPost]);

  return (
    <MainLayout>
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            mt: 2,
          }}
        >
          {listUser.length > 0
            ? listUser.map((user) => {
                return (
                  <UserCard
                    key={user.id}
                    id={user.id}
                    firstName={user.firstName}
                    lastName={user.lastName}
                    position={user.position}
                  />
                );
              })
            : "No contacts to show."}
        </Box>
      </Box>
    </MainLayout>
  );
}

export default Network;
