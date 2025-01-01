import { liveblocks } from "@/lib/liveblocks";
import { getUserColor } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

type clerkUserType = {
  id: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  emailAddresses: Record<string, any>;
};

export async function POST(request: Request) {
  const clerkUser = await currentUser();

  if (!currentUser) redirect("/sign-in");

  const { id, firstName, lastName, imageUrl, emailAddresses } =
    clerkUser as clerkUserType;

  // Get the current user from your database
  const user = {
    id,
    info: {
      id,
      name: `${firstName} ${lastName}`,
      email: emailAddresses[0].emailAddress,
      avatar: imageUrl,
      color: getUserColor(id),
    },
  };

  // Identify the user and return the result
  const { status, body } = await liveblocks.identifyUser(
    {
      userId: user.info.email,
      groupIds: [],
    },
    { userInfo: user.info },
  );

  return new Response(body, { status });
}
