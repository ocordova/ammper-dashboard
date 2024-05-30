"use client";

export default function Error() {
  return (
    <div className="place-items-cente grid min-h-full px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">Error</h1>
        <p className="mt-6 text-base leading-7 text-muted-foreground">
          Oh no! Something went wrong. Please try again later.
        </p>
      </div>
    </div>
  );
}
