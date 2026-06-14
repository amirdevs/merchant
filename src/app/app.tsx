import { AppRouter } from "@/app/router";
import { AppLayout } from "@/app/layouts/app-layout";
import { Providers } from "@/sub-domains/shared/providers";

export function App() {
  return (
    <Providers>
      <AppLayout>
        <AppRouter />
      </AppLayout>
    </Providers>
  );
}
