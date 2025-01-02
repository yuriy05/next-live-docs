import CollaborativeRoom from "@/components/CollaborativeRoom";
import { getDocument } from "@/lib/actions/room.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { JSX } from "react";

async function Document({
  params: { id },
}: SearchParamProps): Promise<JSX.Element> {
  const clerkUser = await currentUser();

  if (!currentUser) redirect("/sign-in");

  const room = await getDocument({
    roomId: id,
    userId: clerkUser?.emailAddresses[0]?.emailAddress,
  });

  if (!room) redirect("/");

  // TODO: Assess the premisions of the user to access the document

  return (
    <main className="flex w-full flex-col items-start">
      <CollaborativeRoom roomId={id} roomMetadata={room.metadata} />
    </main>
  );
}

export default Document;
