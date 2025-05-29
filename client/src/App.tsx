import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MobileNav } from "@/components/navigation/mobile-nav";
import HealthCalculator from "@/pages/health-calculator";
import Progress from "@/pages/progress";
import Insights from "@/pages/insights";
import Profile from "@/pages/profile";
import About from "@/pages/about";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HealthCalculator} />
      <Route path="/progress" component={Progress} />
      <Route path="/insights" component={Insights} />
      <Route path="/profile" component={Profile} />
      <Route path="/about" component={About} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
        <MobileNav />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
