import { Outlet, Navigate } from 'react-router-dom'

/*
- Wrap both SigninForm and SignupForm
- Generic layout, where either SigninForm or SignupForm is rendered
- Additionally contains
    - Logo
    - Image gallery
*/
const AuthLayout = () => {
  const isAuthenticated = false;

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/"/> // if authenticated, navigate to home
      ): (
        // else, render wrapped components (SigninForm, SignupForm)
        <>
          <section className="flex flex-1 justify-center items-center flex-col py-10"> 
            <Outlet /> 
            {/* Outlet renders child route elements */}
          </section>
          <section>
            <img 
              src="/assets/images/background-photo.jpg"
              alt="logo"
              className="hidden xl:block h-screen object-cover bg-no-repeat"
            />
          </section>
        </> 
      )}
    </>
  )
}

export default AuthLayout