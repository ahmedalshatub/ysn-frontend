import type { ReactNode } from "react";
import Card from "./Card";

interface ListContainerProps {
  plain: boolean;
  children: ReactNode;
}

const ListContainer = ({ plain, children }: ListContainerProps) =>
  plain ? (
    <div>{children}</div>
  ) : (
    <Card variant="elevated" padding="md">
      {children}
    </Card>
  );

export default ListContainer;
