import React from "react";

export default function Error404() {
  return (
    <div className="min-h-screen bg-[#F8F8F8] flex flex-col items-center justify-center p-6 font-sans antialiased text-center">
      <div className="relative mb-10 w-full max-w-lg flex justify-center items-center">
        <span className="text-[12rem] md:text-[16rem] font-extrabold text-black tracking-tight leading-none">
          4
        </span>

        <div className="relative flex justify-center items-center -mx-2.5">
          <span className="text-[12rem] md:text-[16rem] font-extrabold text-black tracking-tight leading-none opacity-20">
            0
          </span>

          <div className="absolute right-[2.5px] inset-0 flex items-center justify-center pt-8">
            <img
              src="/biceps.png"
              alt="Strong arm lifting a dumbbell through the zero"
              className="h-48 md:h-64 object-contain"
            />
          </div>
        </div>

        <span className="text-[12rem] md:text-[16rem] font-extrabold text-black tracking-tight leading-none">
          4
        </span>
      </div>

      <h1 className="text-3xl md:text-5xl font-extrabold text-black mb-6 tracking-tight">
        Oops! Page Not Found!
      </h1>

      <p className="max-w-2xl text-sm md:text-base text-zinc-700 leading-relaxed mb-12">
        The page you're looking for doesn't exist or may have been moved.
        Continue managing your gym by returning to your dashboard.
      </p>

      <a
        href="/app"
        className="inline-block bg-[#FF8038] text-white font-semibold px-8 py-3 rounded-md shadow-lg hover:bg-[#E67029] transition-colors duration-200"
      >
        Back To Dashboard
      </a>
    </div>
  );
}
