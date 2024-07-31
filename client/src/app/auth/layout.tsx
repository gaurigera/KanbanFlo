export default function LoginLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="bg-gradient-to-b from-white via-indigo-100 to-indigo-400 h-dvh min-h-dvh min-w-dvh flex">
      <div className="m-auto bg-white border-2 rounded-lg text-black flex flex-col items-center p-16 gap-2">
        <div className="text-3xl text-pretty">
          <span>
            Welcome to <span className="text-indigo-700">Workflo</span>!
          </span>
        </div>
        <>{children}</>
      </div>
    </main>
  );
}
