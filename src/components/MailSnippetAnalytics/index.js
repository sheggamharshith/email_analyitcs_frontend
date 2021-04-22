import axios from "axios";
import { useEffect, useState } from "react";
import { useUserState } from "../../context/userContext";
import Loader from "../Loader";
import MailAnalysisCard from "../MailAnalysiscard";

const getAutomatedReply = (mail, user_id, setReply) => {
  if (mail) {
    mail.map((message) => {
      return axios
        .post("http://localhost:5000/v1/predict/", {
          request_id: `${user_id}`,
          sentence: `${message.snippet}`,
        })
        .then((response) => {
          setReply((oldreply) => [...oldreply, response.data]);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }
};

const getAnalyticsReport = (setLoading, accessToken, user_id, setReply) => {
  setLoading(true);
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };
  const gmailLink = `https://gmail.googleapis.com/gmail/v1/users/${user_id}/threads?maxResults=10`;

  axios
    .get(gmailLink, config)
    .then((response) => {
      setLoading(false);
      return response.data.threads;
    })
    .then((mail) => {
      getAutomatedReply(mail, user_id, setReply);
    })
    .catch((error) => {
      setLoading(false);
      console.log(error);
    });
};

const MailSnippetAnalytics = () => {
  const [loading, setLoading] = useState(false);
  const [reply, setReply] = useState([]);
  const user = useUserState();
  const accessToken = user.accessToken;
  const email = user.user.email;

  useEffect(() => {
    getAnalyticsReport(setLoading, accessToken, email, setReply);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) {
    return (
      <div className="flex h-full w-full justify-center items-center">
        <Loader />
      </div>
    );
  }

  function handleScroll(props) {
    console.log("scrooleed down");
  }

  return (
    <div className="flex flex-wrap space-y-4 space-x-4 overflow-y-auto items-center justify-center p-2 ">
      {reply.map((data, id) => (
        <MailAnalysisCard {...data} key={id} />
      ))}
    </div>
  );
};

export default MailSnippetAnalytics;
