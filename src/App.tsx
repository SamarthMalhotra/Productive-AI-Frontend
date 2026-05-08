import { Toaster } from "sonner";
import ContextProvider from "./ContextAPI/provider";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <ContextProvider>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            minWidth: "400px", // increase width
            maxWidth: "1000px",
            fontSize: "15px", // better readability
            padding: "10px",
            alignContent: "center",
          },
        }}
        richColors
      />
      <Outlet />
    </ContextProvider>
  );
}

export default App;
