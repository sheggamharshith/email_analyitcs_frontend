import { Link } from "react-router-dom";
import "./index.css";

const MailCard = (props) => {
  return (
    <div className=" border p-4 rounded-lg max-w-lg w-144 shadow-lg transform  overflow-hidden h-40 card bg-white ">
      <Link to={`/dashboard/inbox/${props.id}`}>
        <div className="w-full h-full">{props.snippet}</div>
      </Link>
    </div>
  );
};

export default MailCard;
