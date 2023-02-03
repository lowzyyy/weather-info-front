import { List, XSquare } from "phosphor-react";
import { useState } from "react";

const menuIconSize = 24;
const Layout = (props) => {
  const [menuAnimation, setMenuAnimation] = useState(0);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const mobileMenuCallback = () => {
    if (showMobileMenu) {
      setMenuAnimation(1);
      setTimeout(() => {
        setShowMobileMenu((state) => !state);
        setMenuAnimation(0);
      }, 250);
    } else setShowMobileMenu((state) => !state);
  };
  return (
    <>
      <header className="h-16 w-full bg-gradient-to-r from-blue-500 to-blue-600  text-blue-100 ">
        <div className="m-auto flex h-full w-[95%] items-center justify-between p-2 text-3xl">
          <span className="flex items-center font-bold ">
            Smederevo weather
          </span>
          <button onClick={mobileMenuCallback} className="text-white">
            {showMobileMenu ? (
              <XSquare size={menuIconSize} weight="regular" />
            ) : (
              <List size={menuIconSize} weight="regular" />
            )}
          </button>
        </div>
        <div
          className={`absolute z-20  h-screen w-full  p-8 text-slate-900 ${
            menuAnimation === 0 ? "animate-fadeIn" : "animate-fadeOut"
          } bg-stone-200 ${showMobileMenu ? "block" : "hidden"}`}
        >
          <div className="mx-auto flex w-40  flex-col gap-3 [&>*]:flex [&>*]:justify-start [&>*]:text-2xl">
            <span className="h-10 p-1  text-center font-semibold">Radar</span>
            <span className="h-10 p-1 text-center font-semibold">
              Water level
            </span>
          </div>
        </div>
      </header>
      <main className="mx-auto mt-4 max-w-[95%]  ">{props.children}</main>
    </>
  );
};

export default Layout;
