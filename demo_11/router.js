var routes = [
  {
    path: "/",
    name: "index",
    redirect: "/page1",
  },
  {
    path: "/page1",
    name: "index",
    children: [
      {
        path: "page11",
        name: "index",
      },
    ],
  },
  {
    path: "/page2",
    name: "index",
  },
];
export default routes;
