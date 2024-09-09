import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";

import prismadb from "@/lib/prismadb";

const isUserAuthenticated = async (req: NextApiRequest) => {
  const session = await getSession({ req });
  if (!session?.user?.email) {
    throw new Error("Not signed in");
  }

  const user = await prismadb.user.findUnique({ where: { email: session.user.email } });
  if (!user) {
    throw new Error("Not signed in");
  }

  return { user };
}

export default isUserAuthenticated;