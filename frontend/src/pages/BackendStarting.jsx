export default function BackendStarting({ configurationError }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F8F8F8] px-6 py-12 text-center font-sans text-zinc-900">
      <section
        className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-lg md:p-12"
        role="status"
        aria-live="polite"
      >
        {configurationError ? (
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-2xl font-bold text-red-600">
            !
          </div>
        ) : (
          <div
            className="mx-auto mb-6 h-14 w-14 animate-spin rounded-full border-4 border-zinc-200 border-t-[#FF8038]"
            aria-hidden="true"
          />
        )}

        <h1 className="mb-3 text-2xl font-bold md:text-3xl">
          {configurationError
            ? "Backend URL isn't configured"
            : "Backend is starting up"}
        </h1>
        <p className="text-sm leading-6 text-zinc-600 md:text-base">
          {configurationError
            ? "The API address is missing. Please try again later."
            : "The server is waking up. This usually takes a few moments. Please wait; we'll connect automatically as soon as it's ready."}
        </p>
        {!configurationError && (
          <p className="mt-5 text-sm font-medium text-[#E67029]">
            Checking the server…
          </p>
        )}
      </section>
    </main>
  );
}
