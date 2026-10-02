import type { FC } from "react";
import { Suspense } from "react";

const loading = () => <div />;
const DefaultLayout: FC<any> = (children: any) => {
  return <Suspense fallback={loading()}>{children}</Suspense>;
};

export default DefaultLayout;
