import type { ReactNode } from "react";
import Card from "./Card";

interface ListContainerProps {
  plain: boolean;
  children: ReactNode;
}

const ListContainer = ({ plain, children }: ListContainerProps) =>
  plain ? (
    <div className="space-y-4">{children}</div>
  ) : (
    <Card variant="elevated" padding="md">
      <div className="space-y-4">{children}</div>
    </Card>
  );

export default ListContainer;
