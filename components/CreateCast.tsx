import { useSIWE } from "connectkit";

// export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
//   const { address } = await siweServer.getSession(req, res);

//   if (!address) {
//     return {
//       props: { address: "" },
//     };
//   }
//   return {
//     props: { address },
//   };
// };

export default function CreateCast({
  address,
}: {
  address: string | undefined;
}) {
  const { isSignedIn, data, ...rest } = useSIWE();
  console.log(data);

  return (
    <>
      <div className="block rounded-md mx-auto py-6 px-4 bg-purple-100 ">
        {isSignedIn && data?.address ? data.address : "Not signed in"}
      </div>
    </>
  );
}
