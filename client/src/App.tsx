import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Portfolio } from "@/pages/Portfolio";
import { CaseStudy } from "@/pages/CaseStudy";
import { KudraCaseStudy } from "@/pages/KudraCaseStudy";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Portfolio} />
      <Route path="/case-study" component={CaseStudy} />
      <Route path="/case-study/kudra" component={KudraCaseStudy} />
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
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
