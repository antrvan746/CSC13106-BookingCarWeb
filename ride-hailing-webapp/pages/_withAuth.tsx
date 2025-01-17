import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import FirebaseApp from "../config/firebase";
import LoadingPage from "./loading";

const app = FirebaseApp;
const auth = getAuth();

function withAuth(WrappedComponent: React.ComponentType<any>) {
  return function AuthPage(props: any){
    const [user, loading, _error] = useAuthState(auth);
    const router = useRouter();
    useEffect(() => {
      if (!loading && !user) {
        router.replace("/admin/login");
      }
    }, [user, loading, router]);

    if (loading || !user) {
      return <LoadingPage />;
    }
    else return <WrappedComponent {...props} />;
  };
};

export default withAuth;
