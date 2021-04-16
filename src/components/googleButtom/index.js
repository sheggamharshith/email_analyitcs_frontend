import { Button } from "shards-react";
import "./index.scss";
import { ReactComponent as GoogleLogo } from "../../assets/icons/google.svg";

const GoogleButton = () => {
  return (
    <Button theme="light" outline className="google-button-main">
      <GoogleLogo />
    </Button>
  );
};

export default GoogleButton;
