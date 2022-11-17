import type {NextPage} from "next";
import {useState, useEffect} from "react";
import { Fragment } from "react";
import {Disclosure, Menu, Transition} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {ChevronDownIcon} from "@heroicons/react/20/solid";
import moment from "moment";
import SignUpModal from "../components/SignUpModal";
import {signIn, useSession} from "next-auth/react";
import {NewsArticle, NewsSource} from "../types/news-api";
import axios from "axios";

let user = {
  name: "Pochi Chao",
  email: "19pochi94@gmail.com",
  imageUrl: "/images/profilePic.jpeg"
}

const navigation = [
  { name: "Homepage", href: "#", current: true },
  { name: "Sources", href: "#", current: false },
  { name: "Preferences", href: "#", current: false },
]

let userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign Out", href: "#" },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join("")
}

const Home: NextPage = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [open, setOpen] = useState(true);
  const {data, status} = useSession();

  useEffect(() => {
    axios.get("/api/news/get-breaking")
    .then((res) => setArticles(res.data.articles))
  }, [])
  return (
    <>
      <SignUpModal open={open} setOpen={setOpen} /> 
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <img
                      className="h-8 w-8"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                      alt="NewsStream"
                    />
                    <p className="text-purple-400 pl-2 text-lg">NewsStream</p>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "outline outline-yellow-400 outline-offset-1 text-gray-300 hover:bg-gray-700 hover:text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "px-3 py-2 rounded-md text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="ml-6 flex items-center md:ml-6">
                    <button
                      type="button"
                      className="p-1 text-gray-400 hover:text-white "
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      className={`p-1 text-gray-400 hover:text-white ${status==="authenticated" ? "hidden" : ""}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setOpen(true);
                      }}
                    >
                      Sign Up
                    </button>
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm mr-3">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src={user.imageUrl}
                            alt="User Profile Pic"
                          />
                        </Menu.Button>
                      </div>
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 ">
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <a
                                href={item.href}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                {item.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Menu>
                    <button
                      className="text-gray-300 hover:bg-gray-700 hover:text-white"
                      onClick={(event) => {
                        event.preventDefault();
                        signIn("google");
                      }}
                    >
                      {status === "authenticated" ? "Sign Out" : "Sign In"}
                    </button>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white ">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              {/* not sure what this disclosure panel is doing */}
              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block px-3 py-2 rounded-md text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-gray-700 pt-4 pb-3">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {user.name}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        {user.email}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Menu as="div" className="text-left mx-auto max-w-7xl sm:px-3 lg:px-3 justify-between">
          <div className="py-1">
            <Menu.Button className="ml-80 inline-flex w-40 justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
              Filter By
              <ChevronDownIcon
                className="-mr-1 ml-2 h-5 w-5"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>
          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Source
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Author
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Date
                  </a>
                )}
              </Menu.Item>
              <form method="POST" action="#">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      type="submit"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block w-full px-4 py-2 text-left text-sm"
                      )}
                    >
                      Category
                    </button>
                  )}
                </Menu.Item>
              </form>
            </div>
          </Menu.Items>
          <div className="py-1">
            <Menu.Button className="ml-80 inline-flex w-40 justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
              Sort By
              <ChevronDownIcon
                className="-mr-1 ml-2 h-5 w-5"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>
          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Source
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Author
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Date
                  </a>
                )}
              </Menu.Item>
              <form method="POST" action="#">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      type="submit"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block w-full px-4 py-2 text-left text-sm"
                      )}
                    >
                      Category
                    </button>
                  )}
                </Menu.Item>
              </form>
            </div>
          </Menu.Items>
        </Menu>
        {articles.map((article, count) => {
          article["key"] = count;
          count++;

          return (
            <div>
              <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl py-3 px-3 sm:px-3 lg:px-3">
                  <a href={article.url}>
                    <h2 className="text-3xl font-bold tracking-tight text-blue-600">
                      {article.title}
                    </h2>
                  </a>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    {article.author ?? "No Author"},{" "}
                    {moment(article.publishedAt).format("MMMM Do YYYY")}
                  </p>
                </div>
              </header>
              <main>
                <div className="mx-auto max-w-7xl py-2 sm:px-2 lg:px-2">
                  <div className="px-3 py-3 sm:px-0">
                    <div className="rounded-lg border-2 border-dashed border-gray-200">
                      <img src={article.urlToImage} />
                      <p className="px-5 py-3">{article.content}</p>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Home;
