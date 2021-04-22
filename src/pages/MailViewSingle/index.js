import { useParams } from "react-router";
import Loader from "../../components/Loader";
import axios from "axios";
import base64url from "base64url";
import { unstable_batchedUpdates } from "react-dom";

const { useState, useEffect } = require("react");
const { useUserState } = require("../../context/userContext");

// make api call to get the inbox message it uses threads
const getMessage = (
  accessToken,
  user_id,
  message_id,
  setLoading,
  setMessages,
  setError
) => {
  setLoading(true);
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };
  const gmailLink = `https://gmail.googleapis.com/gmail/v1/users/${user_id}/threads/${message_id}`;
  axios
    .get(gmailLink, config)
    .then((response) => {
      console.log(response);
      const data = [];
      console.log(response.data.messages[0].payload.body);
      response.data.messages.map((message) => data.push(message.payload.parts));

      console.log(data);
      unstable_batchedUpdates(() => {
        setMessages(data);
        setLoading(false);
      });
    })
    .catch((error) => {
      unstable_batchedUpdates(() => {
        setError(error.message);
        setLoading(false);
      });
      console.log(error);
    });
};

// creates a markup
function createMarkup(data) {
  return { __html: `${data}` };
}

// main component
const MailViewSingle = () => {
  const user = useUserState();
  const { message_id } = useParams();
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMessage(
      user.accessToken,
      user.user.email,
      message_id,
      setLoading,
      setMessages,
      setError
    );
  }, [message_id, user]);

  // loader
  if (loading) {
    return (
      <div className="flex h-full justify-center items-center">
        <Loader />
      </div>
    );
  }
  //display error
  if (error) {
    return <div>{error}</div>;
  }
  //  display message
  try {
    if (messages) {
      console.log(messages);
      return (
        <div className="flex h-full   w-full overflow-y-auto ">
          <div className="flex flex-col md:flex-row border  p-2 h-full w-full overflow-y-auto">
            <div className="flex   md:w-40 w-full  border shadow-lg  overflow-y-auto w-10">
              {" "}
              hi{" "}
            </div>
            <div className="block p-2 w-full h-full overflow-y-scroll border border-red-800  justify-center">
              {messages.map((message, id) => {
                console.log(message);
                return (
                  <div
                    className="flex flex-col p-2 w-full  justify-center border border-red-800"
                    key={id}
                  >
                    {message.map((body, id) => {
                      console.log(body);
                      return (
                        <div
                          className=" overflow-scroll border border-blue-900"
                          key={id}
                          dangerouslySetInnerHTML={createMarkup(
                            base64url.decode(body.body.data)
                          )}
                        />
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }
  } catch (error) {
    console.log(error);
  }
  return <div>message not found</div>;
};

export default MailViewSingle;
