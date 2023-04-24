import Head from "next/head";

const Layout = ({ children }: { children: any }) => {
  return (
    <>
      <Head>
        <title>Hashcast</title>
      </Head>
      <main className="bg-purple-200">{children}</main>
    </>
  );
};

export default Layout;
