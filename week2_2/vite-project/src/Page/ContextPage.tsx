import NavBar from "./NavBar";
import ThemeContent from "./ThemeContent";
import { ThemeProvider } from "../context/ThemeProvider";

export default function ContextPage() : Element {
  return (
        <ThemeProvider>
            <div className = 'flex flex-col items-center justify-center min-h-screen'>
                <NavBar />
                <ThemeContent />
            </div>
        </ThemeProvider>
  );
}
