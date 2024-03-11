import Input from "@/components/Input";
import { env } from "process";
import axios from "axios";
import React, { useCallback } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import {FaGoogle} from 'react-icons/fa'
import {FaGithub} from 'react-icons/fa'

type Props = {};

function Auth({}: Props) {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [variant, setVariant] = React.useState<"login" | "register">("login");

  const toggleVariant = () => {
    setVariant(variant === "login" ? "register" : "login");
  };

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });
      router.push("/");
    } catch (error) {
      console.debug("error", error);
    }
  }, [email, password, router])

  const register = useCallback(async () => {
    try {
      const response = await axios.post("/api/register", {
        email,
        name,
        password,
      });
      login();
      console.debug("res", response);
    } catch (error) {
      console.error(error);
    }
  }, [email, name, password]);

 ;

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
                  onChange={(event) => setName(event.target.value)}
                  value={name}
                />
              )}
              <Input
                id={"email"}
                label="Email"
                onChange={(event) => setEmail(event.target.value)}
                value={email}
                type="email"
              />

              <Input
                id={"password"}
                label="Password"
                onChange={(event) => setPassword(event.target.value)}
                value={password}
                type="password"
              />
            </div>
            <button
              onClick={variant === "login" ? login : register}
              className="bg-red-500 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {variant === "login" ? "Login" : "Register"}
            </button>
            <div className="flex justify-between mt-4">
              <button className="bg-white py-3 text-black rounded-md w-[48%] hover:bg-gray-200 transition">
                <FaGoogle className="inline-block text-xl mr-2" />
                Google
              </button>
              <button className="bg-gray-800 py-3 text-white rounded-md w-[48%] hover:bg-gray-700 transition">
                <FaGithub className="inline-block text-xl mr-2" />
                Github
              </button>
            </div>
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
