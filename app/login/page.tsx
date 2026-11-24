import Image from "next/image";
import LoginForm from "./login-form";

const page = () => {
  return (
    <main className="min-h-screen bg-white grid lg:grid-cols-2 items-center">
      <section className="flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12">
        <div className="w-full max-w-md mx-auto">
          <Image
            src="/casalavoroLogon.png"
            width={170}
            height={170}
            alt="CasaLavoro"
            className="mx-auto mb-16"
            priority
          />
          <h1 className="text-2xl font-bold text-black">Welcome Back 👋</h1>
          <p className="mt-6 text-md text-gray-500 leading-relaxed">
            Today is a new day, it&apos;s your day. You shape it — sign in to
            start managing your projects.
          </p>
          <LoginForm />
        </div>
      </section>

      <section className="hidden lg:flex items-center justify-center p-12">
        <Image
          src="/login-illustration.svg"
          width={540}
          height={380}
          alt="Secure sign in illustration"
          priority
        />
      </section>
    </main>
  );
};

export default page;
