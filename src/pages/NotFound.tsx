import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <span className="text-primary text-5xl font-serif mb-4 block">𝄪</span>
        <h1 className="mb-4 font-serif text-5xl text-foreground">404</h1>
        <p className="mb-6 font-body text-xl text-muted-foreground">
          Page introuvable
        </p>
        <a
          href={import.meta.env.BASE_URL}
          className="btn-elegant inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à l'accueil
        </a>
      </div>
    </div>
  );
};

export default NotFound;
