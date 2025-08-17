import { BaseLayout } from "@/components/healthcare/BaseLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft, Search, FileQuestion } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <BaseLayout title="Page Not Found">
      <div className="flex items-center justify-center min-h-[500px]">
        <Card className="shadow-lg max-w-md w-full">
          <CardContent className="p-8 text-center">
            <div className="w-24 h-24 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileQuestion className="w-12 h-12 text-violet-600" />
            </div>

            <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Page Not Found
            </h2>

            <p className="text-gray-600 mb-8">
              The page you're looking for doesn't exist or has been moved.
              Please check the URL or navigate back to a safe page.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild className="bg-violet-600 hover:bg-violet-700">
                <Link to="/">
                  <Home className="w-4 h-4 mr-2" />
                  Go Home
                </Link>
              </Button>

              <Button variant="outline" onClick={() => window.history.back()}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-3">Quick navigation:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/patients">Patients</Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/schedule">Schedule</Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/clinical">Clinical</Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/messages">Messages</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </BaseLayout>
  );
}
