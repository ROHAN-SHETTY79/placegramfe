import { createContext } from "react";

// this is the object that we can share between components.
// when we update it, any component that listen to it will also get updated.
// note: we don't need to pass like props

/*importtant note:
when the value which we pass to AuthContext.Provider gets changed all the compoenents 
which are wrapped inside it will not re-render but only components where we then
will add some code to listen to out context.
*/
export const AuthContext =  createContext({ isLoggedIn: false, login: () => {}, logout: () => {} });