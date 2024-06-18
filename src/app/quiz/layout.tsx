export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex flex-col flex-1 max-w-96 w-full m-auto max-h-screen h-[720px] gap-6">
        {children}
      </div>
    </>
  );
}
