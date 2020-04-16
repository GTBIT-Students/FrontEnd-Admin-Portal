import React from "react";
import LoadingOverlay from "react-loading-overlay";
import CircularProgress from "@material-ui/core/CircularProgress";


function Loader({ children, active }) {
  return (
    <>
      <LoadingOverlay
        active={active}
        spinner={<CircularProgress className="text-dark"/>}
        styles={{
          overlay: (base) => ({
          ...base,
          background: 'none',
          
        })
      }}
        style={{background:'none'}}
      >
        {children}
      </LoadingOverlay>
    </>
  );
}

export default Loader;
