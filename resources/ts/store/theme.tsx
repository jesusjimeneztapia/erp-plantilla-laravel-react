import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark";

interface ThemeState {
    theme: Theme;
    refreshTheme: () => void;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
}

const TOGGLE_THEME: Record<Theme, Theme> = {
    light: "dark",
    dark: "light",
};

export const useThemeStore = create<ThemeState>()(
    persist(
        (set, get) => ({
            theme: "light",
            refreshTheme: () => {
                const { theme } = get();
                if (theme === "dark") {
                    document.documentElement.classList.add("dark");
                } else {
                    document.documentElement.classList.remove("dark");
                }
            },
            setTheme: (theme) => {
                set(() => ({ theme }));
                const { refreshTheme } = get();
                refreshTheme();
            },
            toggleTheme: () => {
                const { theme: currentTheme, setTheme } = get();
                const theme = TOGGLE_THEME[currentTheme] ?? "light";
                setTheme(theme);
            },
        }),
        {
            name: "theme",
            onRehydrateStorage: () => (state, error) => {
                if (!error) {
                    requestAnimationFrame(() => {
                        state?.refreshTheme();
                    });
                }
            },
        }
    )
);
