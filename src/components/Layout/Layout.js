const Layout = (props) => {
  return (
    <>
      <header className="h-16 w-full bg-gradient-to-r from-blue-500 to-blue-600 p-2 text-center align-middle text-3xl font-bold text-blue-100 ">
        <text className=" align-middle">Smederevo weather</text>
      </header>
      <main className="mx-auto mt-4 max-w-[95%]  ">{props.children}</main>
    </>
  );
};

export default Layout;
