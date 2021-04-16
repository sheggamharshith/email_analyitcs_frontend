import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardFooter,
} from "shards-react";
import GoogleButton from "../googleButtom";
import "./index.scss";

export default function LoginCard(props) {
  const { loginfunction, dispatch } = props;
  return (
    <Card style={{ maxWidth: "400px" }}>
      <CardHeader className="loginCard">Login</CardHeader>

      <CardBody style={{ textAlign: "center" }}>
        <CardTitle>Welcome to Gmail Analytics</CardTitle>
        <p>Please Login with your gmail account</p>
        <div onClick={() => loginfunction(dispatch)}>
          <GoogleButton />
        </div>
      </CardBody>
      <CardFooter>Copyright @harshithsheggam</CardFooter>
    </Card>
  );
}
