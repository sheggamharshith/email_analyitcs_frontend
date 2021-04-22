import PieChatAnalysis from "../AnalysisPieBar";
import "./index.css";

const MailAnalysisCard = (props) => {
  const { request_id, sentence, NEGATIVE, POSITIVE } = props;
  const data = [
    { name: "POSITIVE", value: POSITIVE },
    { name: "NEGATIVE", value: NEGATIVE },
  ];
  return (
    <div className="flex flex-col border shadow-md p-2 w-144 overflow-hidden card border rounded-xl ">
      <div className="font-bold border-b p-3 uppercase">{request_id}</div>
      <div className="flex  p-2 justify-between items-center">
        <div className=" overflow-hidden">
          <div> {sentence}</div>
          <div className="font-bold">Postive : {POSITIVE.toFixed(2)}</div>
          <div>negative : {NEGATIVE.toFixed(2)}</div>
        </div>
        <PieChatAnalysis height={130} width={130} data={data} />
      </div>
    </div>
  );
};

export default MailAnalysisCard;
