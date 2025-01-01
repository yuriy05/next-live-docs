import CollaborativeRoom from "@/components/ui/CollaborativeRoom";
import { JSX } from "react";

function Document(): JSX.Element {
  return (
    <main className="flex w-full flex-col items-start">
      <CollaborativeRoom />
    </main>
  );
}

export default Document;
