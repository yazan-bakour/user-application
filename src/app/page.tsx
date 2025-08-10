import { Button } from "@heroui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <main className="flex flex-col gap-[32px] row-start-1 items-center sm:items-start">
        <h1 className="text-4xl font-bold text-primary-800">
          Welcome to User Application
        </h1>
        <p className="text-lg text-gray-600 max-w-md">
          Get started with our wizard to set up your profile and preferences.
        </p>
        <Link href="/wizard">
          <Button size="lg" color="primary" variant="flat" radius="none">
            Go to Wizard
          </Button>
        </Link>
      </main>
    </div>
  );
}
