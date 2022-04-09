import { userInfo } from "os";
import { createContext, useState } from "react";

interface UserContext {
    user: string | undefined
    pwd: string | undefined
    roles: string[]
    accessToken: string | undefined
}

interface AuthContext {
    auth: UserContext
    setAuth: (auth: UserContext) => void
}

const AuthContext: React.Context<AuthContext> = createContext({} as AuthContext);

export const AuthProvider: React.FC = ({ children }) => {
    const [auth, setAuth] = useState<UserContext>({} as UserContext);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;