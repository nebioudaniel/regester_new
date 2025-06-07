import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ThankYou() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center px-4">
      <h1
        className="text-5xl text-green-500 mb-4"
        style={{ fontFamily: "'Pacifico', cursive" }}
      >
        You’re successfully registered!
      </h1>
      <p className="text-gray-600 text-lg mb-8">
        Thank you for your registration with Multiverse Enterprise PLC.
      </p>
      <Link href="/">
        <Button className=" text-white px-6 py-2 rounded-full shadow-md  transition">
          Go Home
        </Button>
      </Link>
    </div>
  );
}
