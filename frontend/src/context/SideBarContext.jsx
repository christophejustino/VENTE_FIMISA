import { createContext, useState } from "react";

export const SideBarContext = createContext();

const SideBarContextProvider = ({ children }) => {
  const [size, setSize] = useState("full");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const toggleSize = () => {
    size === "full" ? setSize("mini") : setSize("full");
  };

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
  };
  if (theme === "light") {
    document.body.classList.remove("dark");
    document.body.classList.add("light");
  } else {
    document.body.classList.remove("light");
    document.body.classList.add("dark");
  }
  return (
    <SideBarContext.Provider value={{ size, toggleSize, toggleTheme, theme }}>
      {children}
    </SideBarContext.Provider>
  );
};

export default SideBarContextProvider;
