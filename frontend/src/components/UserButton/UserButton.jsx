import { Popover, Transition } from "@headlessui/react";
// import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Fragment, useContext } from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";
// import { AiOutlineMenu } from "react-icons/ai";
// import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { SideBarContext } from "../../context/SideBarContext";
import { Link, useNavigate } from "react-router-dom";
import { useClerk, useUser } from "@clerk/clerk-react";
import { useGetOneCompteQuery } from "../../redux/slices/compteApiSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { setCompteImage } from "../../redux/slices/compteSlice";

export default function UserButton() {
  // const { image } = useSelector((state) => state.compte);
  // const dispatch = useDispatch();
  // const handleChangementImage = () => {
  //   dispatch(setCompteImage(nouvelleImage));
  // };
  // const [nouvelleImage, setNouvelleImage] = useState('');
  const navigate = useNavigate();

  const { toggleTheme, theme } = useContext(SideBarContext);
  const { signOut } = useClerk();
  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };
  const { user } = useUser();
  const id = user.id;
  const { data, isSuccess, isError } = useGetOneCompteQuery(id);

  return (
    <div className="relative">
      <Popover className="">
        {() => (
          <>
            {isSuccess && (
              <Popover.Button className={"outline-none"}>
                {data.map((item) => (
                  <img
                    key={item.id}
                    className="w-10 h-10 rounded-full object-cover"
                    src={"/api" + item.image}
                    alt=""
                  />
                ))}

                {/* <AiOutlineMenu className="text-2xl" /> */}
              </Popover.Button>
            )}
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute bg-white dark:bg-zinc-800  rounded -left-14 z-10 mt-2 w-[215px] -translate-x-1/2 transform px-0 ">
                {isSuccess && (
                  <div>
                    <div className="overflow-hidden md:rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 flex-col flex">
                      {data.map((item) => (
                        <div className="flex hover:bg-slate-100 dark:hover:bg-slate-800 items-center space-x-3 p-2 text-zinc-950 dark:text-slate-50 dark:bg-zinc-800 cursor-pointer  duration-300 ease-in-out">
                          <Link to="/compte" className=" w-60 h-10 shadow space-x-2 mx-auto dark:bg-zinc-900 bg-white rounded-lg flex items-center justify-center">
                            <img
                              key={item.id}
                              className="w-8 h-8 rounded-full object-cover"
                              src={"/api" + item.image}
                              alt=""
                            />
                            <span>{item.pseudo}</span>
                          </Link>
                        </div>
                      ))}
                      <div
                        onClick={toggleTheme}
                        className="flex items-center space-x-3 p-2 text-zinc-950 dark:text-slate-50 hover:bg-slate-800 dark:hover:bg-zinc-950 cursor-pointer duration-300 ease-in-out"
                      >
                        {theme === "light" ? (
                          <div className="rounded-full w-8 h-8 bg-slate-100  dark:bg-slate-800 flex items-center justify-center">
                            <MdDarkMode className="text-xl" />
                          </div>
                        ) : (
                          <div className="rounded-full w-8 h-8 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                            <MdLightMode className="text-xl" />
                          </div>
                        )}
                        <span className="hover:text-slate-50">
                          {theme === "light" ? "Sombre" : "Lumière"}
                        </span>
                      </div>
                      <div
                        onClick={handleSignOut}
                        className="flex items-center space-x-3 p-2 text-zinc-950 dark:text-slate-50 hover:bg-slate-800 dark:hover:bg-zinc-950 cursor-pointer hover:text-slate-50  duration-300 ease-in-out"
                      >
                        <div className="rounded-full w-8 h-8 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                          <RiLogoutCircleRLine className="text-xl font-semibold " />
                        </div>
                        <span>Déconnecter</span>
                      </div>
                    </div>
                  </div>
                )}
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
