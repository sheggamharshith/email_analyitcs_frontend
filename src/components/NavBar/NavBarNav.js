import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { Link, useHistory } from "react-router-dom";
import {
  signOut,
  useUserDispatch,
  useUserState,
} from "../../context/userContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const dispatch = useUserDispatch();
  const history = useHistory();
  const navigation = [
    {
      name: "Analytics",
      href: "/dashboard/analytics",
      current:
        history.location.pathname === "/dashboard/analytics" ? true : false,
    },
    {
      name: "Inbox",
      href: "/dashboard/inbox",
      current: history.location.pathname === "/dashboard/inbox" ? true : false,
    },
    {
      name: "Main",
      href: "/dashboard/main",
      current: history.location.pathname === "/dashboard/main" ? true : false,
    },
  ];
  const user = useUserState();
  return (
    <Disclosure as="nav" className="bg-white">
      {({ open }) => (
        <>
          <div className=" mx-auto px-2 sm:px-6 lg:px-8 border shadow-md">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-primaryRed focus:outline-none  focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="block lg:hidden h-8 w-auto"
                    src="https://png.pngtree.com/png-vector/20190302/ourlarge/pngtree-analytics-icon-design-template-vector-isolated-png-image_745938.jpg"
                    alt="Workflow"
                  />
                  <img
                    className="hidden lg:block h-8 w-auto"
                    src="https://png.pngtree.com/png-vector/20190302/ourlarge/pngtree-analytics-icon-design-template-vector-isolated-png-image_745938.jpg"
                    alt="Workflow"
                  />
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current
                            ? "border-b border-b-2 border-red-900 text-white font-bold "
                            : "text-gray-300 hover:bg-primaryRed hover:text-white",
                          "px-3 py-2  text-md font-medium"
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button className="bg-white p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  {({ open }) => (
                    <>
                      <div>
                        <Menu.Button className=" flex bg-primaryRed text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                          <img
                            className="h-8 w-8 rounded-full"
                            src={user.user.photoUrl}
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        show={open}
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items
                          static
                          className="origin-top-right absolute right-0 mt-2 w-48 z-50 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                          <Menu.Item>
                            {({ active }) => (
                              <p
                                className={classNames(
                                  active ? "bg-primaryRed" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Your Profile
                              </p>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <p
                                className={classNames(
                                  active ? "bg-primaryRed" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Settings
                              </p>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <p
                                className={classNames(
                                  active ? "bg-primaryRed" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                                onClick={() => {
                                  signOut(dispatch);
                                }}
                              >
                                Sign out
                              </p>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    item.current
                      ? "bg-primaryRed text-white opacity-90"
                      : "text-gray-300 hover:bg-primaryRed hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
