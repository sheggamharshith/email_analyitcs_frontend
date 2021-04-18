import axios from "axios";
import React, { useEffect, useState } from "react";
import { useUserState } from "../../context/userContext";
import MailCard from "../MailCard";
const accessToken = localStorage.getItem("accessToken");

const getPeople = (setMail, accessToken) => {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };
  const user_id = "testingsheggam@gmail.com";
  const gmailLink = `https://gmail.googleapis.com/gmail/v1/users/${user_id}/threads`;
  axios
    .get(gmailLink, config)
    .then((response) => {
      setMail(response.data.threads);
    })
    .catch((error) => {
      console.log(error);
    });
};

const EmailInbox = () => {
  const user = useUserState();
  const accessToken = user.accessToken
    ? user.accessToken
    : localStorage.getItem("accessToken");
  const [mail, setMail] = useState([]);
  useEffect(() => {
    getPeople(setMail, accessToken);
  }, []);
  return (
    <div className="h-full flex p-2 flex-wrap space-x-4 space-y-4 overflow-y-auto justify-center">
      {mail.map((value, id) => (
        <MailCard {...value} key={id} />
      ))}
    </div>
  );
};
export default EmailInbox;
