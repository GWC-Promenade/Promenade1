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
          <section> 
            <Outlet /> 
          </section>
        </> 
      )}
    </>
  )
}

export default AuthLayout