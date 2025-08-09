import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg"></div>
              <span className="text-xl font-semibold text-foreground">
                Brand
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* 404 Content */}
      <div className="flex-1 flex items-center justify-center py-24">
        <div className="text-center space-y-6 max-w-md mx-auto px-6">
          <div className="space-y-4">
            <h1 className="text-8xl font-bold text-muted-foreground">404</h1>
            <h2 className="text-2xl font-semibold text-foreground">
              Page Not Found
            </h2>
            <p className="text-muted-foreground">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>
          <div className="space-y-4">
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Back to Home
            </Link>
            <p className="text-sm text-muted-foreground">
              Or navigate using the menu above
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
