import { ToastProvider } from "./shared/components/feedback/Toast";
import AllRoutes from './core/routes/AllRoutes'

function App() {
  return (
    <>
      <ToastProvider position="bottom-right" richColors closeButton />
      <AllRoutes />
    </>
  );
}

export default App
