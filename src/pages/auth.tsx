import Input from "@/components/Input";
import { env } from "process";
import React from "react";

type Props = {};

function Auth({}: Props) {
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [variant, setVariant] = React.useState<"login" | "register">("login");

  const toggleVariant = () => {
    setVariant(variant === "login" ? "register" : "login");
  };

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50 ">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="Logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "Sign in" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  id={"name"}
                  label="Username"
                  onChange={
                    // set name
                    (event) => setName(event.target.value)
                  }
                  value={name}
                />
              )}
              <Input
                id={"email"}
                label="Email"
                onChange={
                  // set email
                  (event) => setEmail(event.target.value)
                }
                value={email}
                type="email"
              />

              <Input
                id={"password"}
                label="Password"
                onChange={
                  // set password
                  (event) => setPassword(event.target.value)
                }
                value={password}
                type="password"
              />
            </div>
            <button className="bg-red-500 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
              {variant === "login" ? "Login" : "Register"}
            </button>
            <p className="text-neutral-500 mt-12">
              {variant === "login"
                ? "Don't have an account?"
                : "Already have an account?"}
              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
                >
                {variant === "login" ? "Create an account" : "Sign up"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
