import { PropsWithChildren } from "react";

export type ILoginProps = PropsWithChildren<{
    /**
     * 登录调用
     * @param token 
     * @returns 
     */
    onLogin: (token: string) => void;
    onLogout: () => void;
}>

export type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
  };