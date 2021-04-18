import "./index.css";

const MailCard = (props) => {
  return (
    <div className="border p-4 rounded-lg max-w-lg shadow-lg transform  overflow-hidden h-40 card bg-white ">
      {props.snippet}
    </div>
  );
};

export default MailCard;
