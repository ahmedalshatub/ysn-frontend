import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { signalRService } from "../services/signalRService";

export const useSignalR = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const jwtToken = useSelector((state: RootState) => state.auth.jwtToken);

  useEffect(() => {
    const isEnabled = import.meta.env.VITE_ENABLE_SIGNALR === 'true';
    
    if (isEnabled && isLoggedIn && jwtToken) {
      signalRService.initialize().catch((error) => {
        console.error('[useSignalR] Failed to initialize:', error);
      });
    }

    return () => {
      if (isEnabled && (!isLoggedIn || !jwtToken)) {
        signalRService.disconnect();
      }
    };
  }, [isLoggedIn, jwtToken]);

  return {
    isConnected: signalRService.isConnected(),
    connectionState: signalRService.getConnectionState(),
    sendMessage: signalRService.sendMessage.bind(signalRService),
  };
};
