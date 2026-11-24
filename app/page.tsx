import Image from "next/image";
import Link from "next/link";

const page = () => {
  return (
    <>
      <section className="flex flex-col items-center justify-center min-h-screen">
        <div className="p-4 shadow-lg rounded-full">
          <Image
            src="/casalavoroLogon.png"
            width={160}
            height={160}
            alt="logo"
          />
        </div>
        <h1 className="text-3xl font-bold mt-4">
          Welcome to Casalavoro Seamless HR
        </h1>
        <Link href="/login">
          <button className="px-6 py-3 transition-all ease-in-out duration-300 rounded-md bg-orange-400 mt-6 font-semibold text-white hover:cursor-pointer hover:bg-orange-500">
            Proceed to login
          </button>
        </Link>
      </section>
    </>
  );
};

export default page;
