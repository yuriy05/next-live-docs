import CollaborativeRoom from "@/components/CollaborativeRoom";
import { getDocument } from "@/lib/actions/room.actions";
import { getClerkUsers } from "@/lib/actions/user.action";
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

  const userIds = Object.keys(room?.usersAccesses);
  const users = await getClerkUsers({ userIds });

  const usersData = users.map((user: User) => ({
    ...user,
    userType: room.usersAccesses[user.email]?.includes("room:write")
      ? "editor"
      : "viewer",
  }));

  const currentUserType = room.usersAccesses[
    clerkUser.emailAddresses[0]?.emailAddress
  ]?.includes("room:write")
    ? "editor"
    : "viewer";

  // TODO: Assess the premisions of the user to access the document

  return (
    <main className="flex w-full flex-col items-start">
      <CollaborativeRoom
        roomId={id}
        roomMetadata={room.metadata}
        users={usersData}
        currentUserType={currentUserType}
      />
    </main>
  );
}

export default Document;
