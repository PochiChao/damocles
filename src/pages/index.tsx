import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  ArchiveBoxIcon,
  ArrowRightCircleIcon,
  ChevronDownIcon,
  DocumentDuplicateIcon,
  HeartIcon,
  PencilSquareIcon,
  TrashIcon,
  UserPlusIcon,
} from "@heroicons/react/20/solid";
import moment from "moment";
import SignUpModal from "../components/SignUpModal";
import Head from "next/head";
import { signIn, useSession } from "next-auth/react";
import { NewsArticle, NewsSource } from "../types/news-api";
import axios from "axios";
import { isNull } from "util";

let user = {
  name: "Pochi Chao",
  email: "19pochi94@gmail.com",
  imageUrl: "/images/profilePic.jpeg",
};

const navigation = [
  { name: "Homepage", href: "#", current: true },
  { name: "Sources", href: "#", current: false },
  { name: "Preferences", href: "#", current: false },
];

let userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign Out", href: "#" },
];

let filterBy = ["Source", "Author", "Date", "Category"];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join("");
}

const Home: NextPage = () => {
  const [selected, setSelected] = useState("");
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [open, setOpen] = useState(true);
  const { data, status } = useSession();

  useEffect(() => {
    axios
      .get("/api/news/get-breaking")
      .then((res) => setArticles(res.data.articles));
  }, []);
  return (
    <>
      <Head>
        <title>Damocles</title>
      </Head>
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
                      src="/images/logo.jpeg"
                      alt="BreakingOracle"
                    />
                    <p className="text-purple-400 pl-2 text-lg">Damocles</p>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "outline outline-yellow-400 outline-offset-1 text-gray-300 hover:bg-gray-700 hover:text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white hover:rounded-lg",
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
                      className={`p-1 text-gray-400 hover:text-white hover:rounded-lg ${
                        status === "authenticated" ? "hidden" : ""
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        setOpen(true);
                      }}
                    >
                      Sign Up
                    </button>
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button
                          className="flex max-w-xs items-center rounded-full bg-gray-800 
                        text-sm mr-3"
                        >
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src={user.imageUrl}
                            alt="User Profile Pic"
                          />
                        </Menu.Button>
                      </div>
                      <Menu.Items
                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md
                       bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 "
                      >
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
                      className="text-gray-300 hover:bg-gray-700 hover:text-white hover:rounded-lg"
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
                    <Disclosure.Button
                      className="inline-flex items-center justify-center rounded-md
                     bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white "
                    >
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
                      className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400
                       hover:text-white"
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
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400
                         hover:bg-gray-700 hover:text-white"
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
        <div className="mx-auto max-w-7xl pt-2 sm:px-6 lg:px-8">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button
                className="inline-flex w-full justify-center rounded-md border border-gray-300
             bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 "
              >
                Filter By
                <ChevronDownIcon
                  className="-mr-1 ml-2 h-5 w-5"
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                className="absolute left-0 z-10 mt-2 w-56 origin-top-right divide-y
             divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
              >
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "group flex items-center px-4 py-2 text-sm"
                        )}
                      >
                        <PencilSquareIcon
                          className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                        Source
                      </a>
                    )}
                  </Menu.Item>
                </div>
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "group flex items-center px-4 py-2 text-sm"
                        )}
                      >
                        <DocumentDuplicateIcon
                          className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                        Author
                      </a>
                    )}
                  </Menu.Item>
                </div>
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "group flex items-center px-4 py-2 text-sm"
                        )}
                      >
                        <ArchiveBoxIcon
                          className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                        Date
                      </a>
                    )}
                  </Menu.Item>
                </div>
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "group flex items-center px-4 py-2 text-sm"
                        )}
                      >
                        <ArrowRightCircleIcon
                          className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                        Category
                      </a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>

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
};

export default Home;
