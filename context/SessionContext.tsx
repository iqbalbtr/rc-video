import { getCurrentUser, logout, signIn } from "@services/user";
import { useRouter } from "expo-router";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";

export type UserType = {
    username: string,
    name: string,
    email: string,
    avatar: string,
    accountId: string,
    id: string
}

type Context = {
    isLogged: boolean,
    user: null | UserType,
    isLoading: boolean,
    sessionRefresh: () => void,
    signout: () => Promise<{} | undefined>,
    signin: (email: string, password: string) => any,
};

const Context = createContext<Context>({
    isLogged: false,
    user: null,
    isLoading: true,
    sessionRefresh: () => { },
    signout: async() => ({}),
    signin: () => {}
});

export const useSession = () => {
    return useContext(Context);
}

const SessionProvider = ({ children }: { children: ReactNode }) => {

    const [isLogged, setLogged] = useState(false);
    const [user, setUser] = useState<null | UserType>(null);
    const [isLoading, setLoading] = useState(true);
    const router = useRouter();

    const signout = async() => {
        setLoading(true)
        try {
            const out = await logout()
            setLogged(false)
            setUser(null)
            router.replace("/sign-in")
            return out;
        } catch (error: any) {
            Alert.alert("Error", error.message)
        } finally{
            setLoading(false)
        }
    }

    const signin = async(email: string, password: string) => {
        setLoading(true)
        try {
            const sign = await signIn(email,password)
            currentUser();
            router.replace("/home")
            return sign;
        } catch (error: any) {
            Alert.alert("Error", error.message)
        } finally{
            setLoading(false)
        }
    }


    const currentUser = () => {
        getCurrentUser()
            .then(res => {
                if (res) {
                    setLogged(true)
                    setUser(res)
                } else {
                    setLogged(false)
                    setUser(null)
                }
            })
            .catch(err => {
                console.log(err);

            })
            .finally(() =>
                setLoading(false)
            )
    }

    useEffect(() => {
        currentUser();
    }, [])

    return (
        <Context.Provider value={{
            isLoading,
            isLogged,
            user,
            signin,
            signout,
            sessionRefresh: currentUser
        }}>
            {children}
        </Context.Provider>
    )
}

export default SessionProvider;