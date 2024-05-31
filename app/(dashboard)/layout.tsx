import { PropsWithChildren } from "react";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="flex min-h-screen w-full flex-col">
        <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          {children}
        </main>
      </div>
    </>
  );
}
