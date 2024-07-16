import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { register } from "@/http/api";
import { useMutation } from "@tanstack/react-query";

import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignupPage = () => {

  const navigate = useNavigate()

  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      console.log("signup successful")
      //redirect to dashboard
      navigate('/dashboard')
    }
  })

  const handleSignupSubmit = () => {
    const name = nameRef.current?.value
    const email = emailRef.current?.value
    const password = passwordRef.current?.value

    //make server call
    if (!name || !email || !password) {
      return alert("Please enter all fields")
    }

    mutation.mutate({ name, email, password })
  }

  return (
    <div className="w-full xl:min-h-[800px]">
      <div className="flex md:mt-40 items-center  px-12 rounded-md  justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Sign up</h1>
            <p className="text-sm text-muted-foreground">
              Enter your username, email and password below to register to your
              account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Name</Label>
              <Input ref={nameRef} id="name" type="name" placeholder="m" required />
            </div>
            <div className="grid gap-2">
              <Label  htmlFor="email">Email</Label>
              <Input
              ref={emailRef}
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input ref={passwordRef} id="password" type="password" required />
            </div>
            <Button onClick={handleSignupSubmit} type="submit" className="w-full">
              Sign up
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/auth/login" className="underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
