import axios from "axios";
import React, { useEffect, useState } from "react";
import { useUserState } from "../../context/userContext";
import Loader from "../Loader";
import MailCard from "../MailCard";

const getMail = (setMail, accessToken, user_id, setLoading) => {
  setLoading(true);
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };
  const gmailLink = `https://gmail.googleapis.com/gmail/v1/users/${user_id}/threads`;

  axios
    .get(gmailLink, config)
    .then((response) => {
      console.log(response);
      setMail(response.data.threads);
      setLoading(false);
    })
    .catch((error) => {
      setLoading(false);
      console.log(error);
    });
};

const EmailInbox = () => {
  const user = useUserState();
  const [loading, setLoading] = useState(false);
  const [mail, setMail] = useState([]);
  useEffect(() => {
    getMail(setMail, user.accessToken, user.user.email, setLoading);
  }, [user]);

  //return the loader
  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="h-full flex p-2 flex-wrap space-x-4 space-y-4 overflow-y-auto justify-center w-full   ">
      {mail.map((value, id) => (
        <MailCard {...value} key={id} />
      ))}
    </div>
  );
};
export default EmailInbox;
