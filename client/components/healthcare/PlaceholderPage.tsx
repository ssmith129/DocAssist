import { Navigation } from "@/components/healthcare/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Construction, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export function PlaceholderPage({
  title,
  description,
  icon,
}: PlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="text-center">
          <CardContent className="p-12">
            <div className="flex justify-center mb-6">
              {icon || <Construction className="w-16 h-16 text-gray-400" />}
            </div>

            <h1 className="text-3xl font-bold text-hc-text-primary mb-4">
              {title}
            </h1>
            <p className="text-lg text-hc-text-secondary mb-8 max-w-2xl mx-auto">
              {description}
            </p>

            <div className="space-y-4">
              <p className="text-sm text-hc-text-tertiary">
                This section is currently under development. Please continue
                prompting to help build out this functionality.
              </p>

              <div className="flex items-center justify-center space-x-4">
                <Button asChild variant="outline">
                  <Link to="/dashboard-home">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Dashboard
                  </Link>
                </Button>
                <Button className="bg-healthcare-primary hover:bg-healthcare-secondary">
                  Request Feature
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
