import { useEffect } from "react";

const useTitle = (title: string) => {
  title = "App Name - " + title;

  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;
    return () => {
      document.title = prevTitle;
    };
  }, [title]);
};

export default useTitle;
