import React, { useEffect } from "react";
import axios from "axios";
import { FcMenu } from "react-icons/fc";
import { OficialLogo } from "./../assets/SVG";
import { Fragment, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import { cleanCredentials } from "../redux_app/role_base_access_control/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { IsotipoPlena } from "./../assets/SVG";

const navigation = {
  categories: [
    {
      id: "hhrr",
      name: "RECURSOS HUMANOS",
      featured: [
        {
          name: "Chief Executive Officer (CEO)",
          href: "#",
          imageSrc:
            "https://media.licdn.com/dms/image/C5622AQE5JHeMXF7VsA/feedshare-shrink_800/0/1654629870662?e=1681948800&v=beta&t=owbP3eIMzqComWRX1J7BFTllSAW9U5OmHZpeOluh8a4",
          imageAlt: "Chief Executive Officer (CEO) Econnabis SAS Colombia.",
        },
        {
          name: "Personal Altamente Calificado",
          href: "#",
          imageSrc:
            "https://media.licdn.com/dms/image/C4E22AQEmL4kxQB52Tg/feedshare-shrink_1280/0/1637188461567?e=1681948800&v=beta&t=C6CpV4qpR7JKa5qURuqX4BGxwamgLRPJySb9Glk5f_k",
          imageAlt: "Labs Testing.",
        },
      ],
      sections: [
        {
          id: "db",
          name: "Base de Datos de Empleados",
          items: [
            {
              name: "Datos Basicos",
              href: "/basic-data-employee",
            },
            {
              name: "Seguridad Social",
              href: "/social-security",
            },
            {
              name: "Vinculacion Laboral",
              href: "/employment-relationship",
            },
            {
              name: "Contactos de Emergencia",
              href: "/emergency-contact-details",
            },
            {
              name: "Datos Demograficos",
              href: "/demographic-data",
            },
            {
              name: "Datos Socio-Demograficos",
              href: "/sociodemographic-data",
            },
            {
              name: "Nucleo Familiar",
              href: "/family-nucleus",
            },
            {
              name: "Condicion de Salud",
              href: "/health-condition",
            },
          ],
        },
        {
          id: "activities",
          name: "Actividades",
          items: [
            {
              name: "Evaluacion de Rendimiento 2022",
              href: "/perfomance-evaluation-2022",
            },
          ],
        },
      ],
    },
    {
      id: "hys",
      name: "H&S",
      featured: [
        {
          name: "Medidas de Seguridad contra el COVID-19 ",
          href: "#",
          imageSrc:
            "https://www.paho.org/sites/default/files/styles/max_650x650/public/2022-10/coronavirus.jpg?itok=5fLNsvsH",
          imageAlt: ".",
        },
        {
          name: "Elementos de Proteccion Personal",
          href: "#",
          imageSrc: OficialLogo,
          imageAlt:
            "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
        },
      ],
      sections: [
        {
          id: "shortcuts",
          name: "Accesos Directos",
          items: [
            { name: "Permisos de Altura", href: "#" },
            { name: "Entrega de EPP", href: "#" },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: "HOME", href: "/home" },
    { name: "Cerrar Sesion", href: "/" },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const HeaderDashboard = () => {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const nombre_usuario_actual = useSelector((state) => state);

  const current_user =
    nombre_usuario_actual.authAPISlice.current_user.ccn_employee || 0;
  const current_employee =
    nombre_usuario_actual.authAPISlice.current_user.full_name_employee || "";
  const current_role =
    nombre_usuario_actual.authAPISlice.access_level.role || "";

  useEffect(() => {
    async function fetchImage() {
      const respImage = await axios(
        `https://sandboxhhrr.plena-global.com/api/v1/employee/images/${current_user}`
      );
      if (!image) {
        setImage(`data:image/jpeg;base64,${respImage.data.image_b64}`);
      } else {
      }
    }
    fetchImage();
  }, []);

  return (
    <>
      <div className="bg-white ">
        {/* Mobile menu */}
        <Transition.Root show={open} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                  <div className="flex px-4 pt-5 pb-2">
                    <button
                      type="button"
                      className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <svg
                        class="h-8 w-8 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Links */}

                  <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                    {navigation.pages.map((page) => (
                      <div key={page.name} className="flow-root">
                        <a
                          href={page.href}
                          className="-m-2 block p-2 font-bold text-sky-900"
                        >
                          {page.name}
                        </a>
                      </div>
                    ))}
                  </div>

                  <Tab.Group as="div" className="mt-2">
                    <div className="border-sky-900 border-b-1">
                      <Tab.List className="-mb-px flex space-x-8 px-3">
                        {navigation.categories.map((category) => (
                          <Tab
                            key={category.name}
                            className={({ selected }) =>
                              classNames(
                                selected
                                  ? "border-sky-900 text-sky-900"
                                  : "border-transparent text-gray-900",
                                "flex-1 whitespace-nowrap border-b-2 py-4 px-1 font-bold"
                              )
                            }
                          >
                            {category.name}
                          </Tab>
                        ))}
                      </Tab.List>
                    </div>
                    <Tab.Panels as={Fragment}>
                      {navigation.categories.map((category) => (
                        <Tab.Panel
                          key={category.name}
                          className="space-y-10 px-4 pt-10 pb-8"
                        >
                          <div className="grid grid-cols-2 gap-x-4">
                            {category.featured.map((item) => (
                              <div
                                key={item.name}
                                className="group relative text-sm uppercase"
                              >
                                <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                  <img
                                    src={item.imageSrc}
                                    alt={item.imageAlt}
                                    className="object-cover object-center"
                                  />
                                </div>
                                <a
                                  href={item.href}
                                  className="mt-6 block font-medium text-gray-900"
                                >
                                  <span
                                    className="absolute inset-0 z-10"
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </a>
                              </div>
                            ))}
                          </div>
                          {category.sections.map((section) => (
                            <div key={section.name}>
                              <p
                                id={`${category.id}-${section.id}-heading-mobile`}
                                className="font-arial text-black uppercase"
                              >
                                <strong>{section.name}</strong>
                              </p>
                              <ul
                                role="list"
                                aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                                className="mt-6 flex flex-col space-y-6"
                              >
                                {section.items.map((item) => (
                                  <li key={item.name} className="flow-root">
                                    <a
                                      href={item.href}
                                      className="-m-2 block p-2 hover:font-bold text-sky-900"
                                    >
                                      {item.name}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </Tab.Panel>
                      ))}
                    </Tab.Panels>
                  </Tab.Group>

                  <div className="py-4 px-3">
                    <div className="flow-root text-center uppercase">
                      <a
                        href="administration-panel"
                        className="p-2 text-sm font-bold bg-white text-cyan-900 hover:text-white hover:bg-cyan-900 ring ring-cyan-900 rounded-sm"
                      >
                        Panel de Administracion
                      </a>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <header className="relative lg:grid lg:grid-cols-2 grid grid-cols-3 justify-items-center space-x-4 bg-white">
          <nav aria-label="Top" className="max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="p-5">
              <div className="flex items-center">
                <button
                  type="button"
                  className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                  onClick={() => setOpen(true)}
                >
                  <div className="grid grid-cols-2">
                    <FcMenu className="h-10 w-10" aria-hidden="true" />
                  </div>
                </button>

                {/* Flyout menus */}
                <Popover.Group className="hidden lg:ml-4 lg:block lg:self-stretch">
                  <div className="flex h-full space-x-10">
                    {navigation.pages.map((page) => (
                      <a
                        key={page.name}
                        href={page.href}
                        className="flex items-center hover:underline-offset-4 text-xl hover:font-bold hover:text-sky-900"
                      >
                        {page.name}
                      </a>
                    ))}

                    {navigation.categories.map((category) => (
                      <Popover key={category.name} className="flex">
                        {({ open }) => (
                          <>
                            <div className="relative flex">
                              <Popover.Button
                                className={classNames(
                                  open
                                    ? "border-indigo-600 text-indigo-600"
                                    : "border-transparent text-gray-700 hover:text-gray-800",
                                  "relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
                                )}
                              >
                                {category.name}
                              </Popover.Button>
                            </div>

                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-200"
                              enterFrom="opacity-0"
                              enterTo="opacity-100"
                              leave="transition ease-in duration-150"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                                {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                <div
                                  className="absolute inset-0 top-1/2 bg-white shadow"
                                  aria-hidden="true"
                                />

                                <div className="relative bg-white">
                                  <div className="mx-auto max-w-7xl px-8">
                                    <div className="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
                                      <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                        {category.featured.map((item) => (
                                          <div
                                            key={item.name}
                                            className="group relative text-base sm:text-sm"
                                          >
                                            <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                              <img
                                                src={item.imageSrc}
                                                alt={item.imageAlt}
                                                className="object-cover object-center"
                                              />
                                            </div>
                                            <a
                                              href={item.href}
                                              className="mt-6 block font-medium text-gray-900"
                                            >
                                              <span
                                                className="absolute inset-0 z-10"
                                                aria-hidden="true"
                                              />
                                              {item.name}
                                            </a>
                                          </div>
                                        ))}
                                      </div>
                                      <div className="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">
                                        {category.sections.map((section) => (
                                          <div key={section.name}>
                                            <p
                                              id={`${section.name}-heading`}
                                              className="font-arial uppercase text-black"
                                            >
                                              <strong>{section.name}</strong>
                                            </p>
                                            <ul
                                              role="list"
                                              aria-labelledby={`${section.name}-heading`}
                                              className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                            >
                                              {section.items.map((item) => (
                                                <li
                                                  key={item.name}
                                                  className="flex"
                                                >
                                                  <a
                                                    href={item.href}
                                                    className="hover:text-gray-800"
                                                  >
                                                    {item.name}
                                                  </a>
                                                </li>
                                              ))}
                                            </ul>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Popover.Panel>
                            </Transition>
                          </>
                        )}
                      </Popover>
                    ))}
                  </div>
                </Popover.Group>
              </div>
            </div>
          </nav>
          <span className="flex lg:hidden block items-center  gap-4 text-sm">
            <button>
              <a href={`${import.meta.env.VITE_REDIRECT}/home`}>
                <IsotipoPlena />
              </a>
            </button>
          </span>
          <div className="flex items-center justify-items-end">
            <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
              <a
                href="https://support.plena-global.com"
                className="text-sm font-medium text-gray-700 hover:text-gray-800"
                target="_blank"
              >
                Soporte Tecnico
              </a>
              <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
              <a
                onClick={() => {
                  dispatch(cleanCredentials());
                }}
                href="/"
                className="text-sm text-slate-700 hover:text-slate-900 hover:font-extrabold"
              >
                Cerrar Sesion
              </a>
            </div>
            <div className="px-0 hidden lg:block">
              <div className="ml-5 text-center uppercase">
                <a
                  href="administration-panel"
                  className="p-1 text-sm font-bold bg-white text-cyan-900 hover:text-white hover:bg-cyan-900 ring ring-cyan-900 rounded-sm"
                >
                  Panel de Administracion
                </a>
              </div>
            </div>
            <div className="flex">
              <div className="my-auto ml-5">
                <svg
                  className="h-10 w-10 text-black"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {" "}
                  <path stroke="none" d="M0 0h24v24H0z" />{" "}
                  <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />{" "}
                  <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                </svg>
              </div>
              <div className="h-12 w-12 mx-2 rounded-full overflow-hidden">
                <img
                  src={image}
                  alt="Imagen de usuario"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="hidden lg:block mr-2">
                <p>
                  <strong>{current_employee}</strong>
                </p>
                <p>{current_role}</p>
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  );
};
export default HeaderDashboard;
