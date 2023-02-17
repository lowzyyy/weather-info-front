import Link from "next/link";
import { useRouter } from "next/router";
import { List, XSquare } from "phosphor-react";
import { useState } from "react";

const menuIconSize = 24;
const Layout = (props) => {
  const [menuAnimation, setMenuAnimation] = useState(0);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const router = useRouter();
  // CALLBACKS
  const mobileMenuCallback = () => {
    if (showMobileMenu) {
      setMenuAnimation(1);
      setTimeout(() => {
        setShowMobileMenu((state) => !state);
        setMenuAnimation(0);
      }, 250);
    } else setShowMobileMenu((state) => !state);
  };
  const linkClickCallback = () => {
    if (showMobileMenu) {
      setMenuAnimation(1);
      setTimeout(() => {
        setShowMobileMenu((state) => !state);
        setMenuAnimation(0);
      }, 250);
    }
  };
  const avatarCallback = () => {
    router.push("/");
  };
  return (
    <>
      <header className="h-16 w-full bg-gradient-to-r from-blue-500 to-blue-600  text-blue-100 ">
        <div className="m-auto flex h-full w-[95%] items-center justify-between p-2 text-3xl sm:w-[90%] lg:w-[75%] xl:w-[60%]">
          <img
            onClick={avatarCallback}
            src="Grb_Smedereva.svg.png"
            className="hover: hidden max-h-full cursor-pointer lg:block"
          ></img>
          <span className="flex items-center font-bold ">
            <Link onClick={linkClickCallback} href="/">
              Smederevo weather
            </Link>
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
          className={`absolute z-50  h-screen w-full  p-8 text-slate-900 ${
            menuAnimation === 0 ? "animate-fadeIn" : "animate-fadeOut"
          } bg-stone-200 ${showMobileMenu ? "block" : "hidden"}`}
        >
          {/* <div
          className={`absolute z-50  h-screen w-full  bg-stone-200 p-8  text-slate-900 ${
            showMobileMenu ? "block" : "hidden"
          }`}
        > */}
          <div className="mx-auto flex w-40  flex-col gap-3 [&>*]:flex [&>*]:justify-start [&>*]:text-2xl">
            <span className="h-10 p-1  text-center font-semibold">
              <Link onClick={mobileMenuCallback} href={"/radar"}>
                Radar
              </Link>
            </span>
            <span className="h-10 p-1 text-center font-semibold">
              <Link onClick={mobileMenuCallback} href="/water_level">
                Water level
              </Link>
            </span>
          </div>
        </div>
      </header>
      <main className="mx-auto mt-2 max-w-[95%] sm:max-w-[90%] lg:max-w-[75%] xl:w-[60%] ">
        {props.children}
      </main>
    </>
  );
};

export default Layout;
