type ContainerProps = {
  children: React.ReactNode;
};

export function Container({ children }: ContainerProps) {
  return (
    <>
      <main className="w-full flex flex-col max-w-400 mx-auto my-5 pb-1647">
        {children}
      </main>
    </>
  );
}
