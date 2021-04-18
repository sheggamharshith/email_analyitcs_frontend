import { ReactComponent as GoogleLogo } from "../../assets/icons/google.svg";
const GoogleButton = () => {
  return (
    <div className=" felx text-xl  justify-self-center p-2 space-y-4">
      <button className="p-2 font-bold rounded-lg border w-full bg-white hover:bg-primaryRed shadow-lg">
        <div className="flex justify-center items-center space-x-10">
          <p>Other account </p>
        </div>
      </button>
      <button className="p-2 font-bold border rounded-lg  w-full bg-white hover:bg-primaryRed shadow-lg  ">
        <div className="flex justify-center items-center space-x-4">
          <p> Login Google</p> <GoogleLogo />
        </div>
      </button>
    </div>
  );
};

export default GoogleButton;
