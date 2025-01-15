import { SignedIn, SignedOut } from "@clerk/nextjs";

export default async function Home() {

  return (
    <div className="flex gap-4 p-4">
      <SignedIn>
      </SignedIn>

      <SignedOut>
        <p>Marketing Page</p>
      </SignedOut>
    </div>
  );
}
