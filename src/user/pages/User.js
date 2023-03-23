import React from "react";
import UsersList from "../components/UsersList";

function User() {
  const USERS = [
    {
      id: "1",
      name: "Habakuk",
      image:
        "https://i.uai.com.br/vxlgx-gnv8VWODgHmIpJ84abeIQ=/750x0/imgsapp2.uai.com.br/app/noticia_133890394703/2023/03/22/320379/poster-de-shazam-2_1_73931.jpeg",
      places: 3,
    },
  ];

  return <UsersList items={USERS} />;
}

export default User;
