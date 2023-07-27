"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeButton = () => {
  const { resolvedTheme, setTheme } = useTheme();

  // resolved hydratation mismatched
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const icon = resolvedTheme === "dark" ? <FaMoon /> : <FaSun />;
  const newTheme = resolvedTheme === "dark" ? "light" : "dark";

  return <button onClick={() => setTheme(newTheme)}>{icon}</button>;
};

export default ThemeButton;
