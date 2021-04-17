import React from "react";
import GoogleButton from "../googleButtom";

export default function LoginCard(props) {
  const { loginfunction, dispatch } = props;
  return (
    <>
      <div className="w-full  max-w-md mx-4 space-y-4 border  flex flex-col  p-4 rounded-xl  shadow-lg  bg-white items-center  ">
        <p className="font-bold text-primaryRed text-4xl border-b w-full text-center">
          {" "}
          ANALYTICS
        </p>
        <img
          className="max-h-60  "
          src="https://cdn.dribbble.com/users/4874/screenshots/3074660/gmaildribbble.gif"
        />
        <div onClick={() => loginfunction(dispatch)}>
          <GoogleButton />
        </div>
      </div>
    </>
  );
}
