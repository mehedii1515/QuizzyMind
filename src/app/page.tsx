import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Brain, Zap, Trophy, Users } from "lucide-react";

export default async function Home() {
  // No more authentication checks - direct access to homepage

  const features = [
    {
      icon: Brain,
      title: "AI-Powered",
      description: "Generate intelligent quizzes on any topic using advanced AI technology"
    },
    {
      icon: Zap,
      title: "Instant Creation",
      description: "Create comprehensive quizzes in seconds, not hours"
    },
    {
      icon: Trophy,
      title: "Track Progress",
      description: "Monitor your learning progress with detailed analytics and insights"
    },
    {
      icon: Users,
      title: "For Everyone",
      description: "Perfect for students, teachers, and lifelong learners"
    }
  ];

  return (
    <div className="pastel-full-spectrum">

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 pastel-mint-blue rounded-2xl mb-6 shadow-lg">
              <Brain className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
              QuizzyMind
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Transform your learning with AI-powered quizzes.<br />
              Create, practice, and master any subject instantly.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/auth">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg px-8 py-6 text-lg font-semibold"
              >
                Get Started Free
              </Button>
            </Link>
            <Link href="/auth">
              <Button 
                variant="outline" 
                size="lg"
                className="px-8 py-6 text-lg font-semibold border-primary/20 hover:border-primary/40 bg-secondary/50 hover:bg-secondary/70"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Why Choose QuizzyMind?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow border-border/50">
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-foreground">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pastel-cream-peach py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-foreground">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of learners who are already using AI to accelerate their knowledge.
          </p>
          <Link href="/auth">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg px-12 py-6 text-lg font-semibold"
            >
              Start Learning Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
