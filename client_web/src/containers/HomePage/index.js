import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const HomePage = (props) => {
  const loginView = props?.location?.hash === "#login";

  return (
    <div className="flex flex-col-reverse lg:flex-row h-screen justify-center items-center">
      <div className="bg-purple-100 flex-grow w-full lg:w-auto lg:h-full" />
      <div className="m-12 sm:mt-32 sm:mb-24 lg:w-1/2 2xl:w-5/12">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-0 tracking-tight whitespace-nowrap">
          Find and share
          <br /> the best of the web
        </h2>
        <br />
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight text-purple-600">
          Share 5 links, once a week.
        </h3>
        <br />
        <br />
        {loginView ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
};

export default HomePage;
