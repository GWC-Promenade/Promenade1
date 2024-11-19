import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod" // shadcn form
import { Link, useNavigate } from 'react-router-dom'

import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input" 
import { useForm } from "react-hook-form"
import { SignupValidation } from "@/lib/validation"
import Loader from "@/components/shared/Loader"
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"


 


const SignupForm = () => {
  const { toast } = useToast()
  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } = useCreateUserAccount(); 
  /* ^
  - This sets up a hook to use with React Query for adding a new account to our auths and our database
  - React Query is an extra layer between our Appwrite API and our front end, in order to have smooth extra features like caching
  - mutateAsync is the mutationFn function in the return of useCreateUserAccountMutation(), namely createUserAccount() 
  - "mutateAsync: createUserAccount" syntax renames the function "mutateAsync" to "createUserAccount"
  - isLoading is a bool denoting whether the action of mutation is currently loading. We can use it to render a loading animation
  */

  // @ts-expect-error unused
  const { mutateAsync: signInAccount, isPending: isSigningIn } = useSignInAccount();
  // @ts-expect-error unused
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const navigate = useNavigate();

  // <shadcn form>
  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: ""
    },
  })
 
  // 2. Define a submit handler.
  /* 
  - create a new user account and add it to the database
  - sign into the account and navigate to home
  - why await and async? creating a newUser is an action in the database that may take some time
  */
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    // Create the user
    // Input will be type-safe and validated.

    const newUser = await createUserAccount(values);
    console.log("new user created:", newUser);

    if (!newUser) {
      return toast({
        variant: "destructive",
        title: "Oops!",
        description: "Sign up failed. Please try again.",
      });
    }

    const session = await signInAccount({
      email: values.email,
      password: values.password
    }); 

    if (!session) {
      return toast({
        variant: "destructive",
        title: "Oops!",
        description: "Sign up failed. Please try again.",
      });
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();
      navigate('/');
    } else {
      return toast({
        variant: "destructive",
        title: "Oops!",
        description: "Sign up failed. Please try again.",
      });
    }
  }
  // </shadcn form>

  return (
    <Form {...form}>
      <img src="/assets/images/logo.png" alt="logo" className="w-20"/>

      <div className="sm:w-420 flex-center flex-col">
        

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Create a new account</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">To use Promenade, enter your details</p>
      

        {/* <shadcn form> */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
            {isCreatingAccount ? (
              <div className="flex-center gap-2">
                <Loader/> 
                Loading...
              </div>
            ): "Sign up"}
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account? 
            <Link to="/sign-in" className="text-primary-500 text-small-semi-bold ml-1">Log in</Link>
          </p>
        </form>
        {/* </shadcn form> */}
      </div>
    </Form>

  )
}

export default SignupForm