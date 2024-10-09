import { getSession } from "next-auth/react";

const AdminPage = () => {
  return <div>Admin Panel - Access Granted</div>;
};

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default AdminPage;
