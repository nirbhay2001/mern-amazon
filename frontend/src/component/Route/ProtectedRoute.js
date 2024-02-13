import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
//   const { loading, isAuthenticated, user } = useSelector((state) => state.user);

//   return (
//     <Fragment>
//       {loading === false && (
//         <Routes>
//           <Route
//             {...rest}
//             render={(props) => {
//               if (isAuthenticated === false) {
//                 return <Navigate to="/login" />;
//               }

//               if (isAdmin === true && user.role !== "admin") {
//                 return <Navigate to="/login" />;
//               }

//               // return <Component {...props} />;

//               return (
//                 <Fragment>
//                   {loading === false ? <Component {...props} /> : null}
//                 </Fragment>
//               );
//             }}
//           />
//         </Routes>
//       )}
//     </Fragment>
//   );
// };

// export default ProtectedRoute;











// const ProtectedRoute = ({ isAdmin, children }) => {
//   const { loading, isAuthenticated, user } = useSelector(state => state.user)

//   if (!loading && isAuthenticated === false) {
//       return <Navigate to='/login' />
//   }

//   if (!loading && isAdmin === true && user.role !== 'admin') {
//       return <Navigate to='/login' />
//   }

//   return <Fragment>{loading === false ? children : null}</Fragment>
// }


// export default ProtectedRoute;








const ProtectedRoute = ({ isAdmin, component: Component, ...routeProps }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  if (!loading && isAuthenticated === false) {
    return <Navigate to="/login" />;
  }

  if (!loading && isAdmin === true && user?.role !== "admin") {
    return <Navigate to="/login" />;
  }

  return (
    <Fragment>
      {loading === false ? (
       <Component {...routeProps} />
      ) : null}
    </Fragment>
  );
};


export default ProtectedRoute;

