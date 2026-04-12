import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { AuthShell } from "@/components/shared/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getStoredToken, setStoredAuth } from "@/features/auth/auth-storage";
import { loginSchema, type LoginSchema } from "@/features/auth/auth-schema";
import { loginUser } from "@/features/auth/auth-api";
import { ApiError } from "@/lib/api-client";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const existingToken = getStoredToken();
  const from = (location.state as { from?: { pathname?: string } } | null)?.from
    ?.pathname;

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "test@example.com",
      password: "password123",
    },
  });

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setStoredAuth(data.token, data.user);
      navigate(from || "/projects", { replace: true });
    },
  });

  if (existingToken) {
    return <Navigate to="/projects" replace />;
  }

  const rootError =
    mutation.error instanceof ApiError ? mutation.error.message : null;

  return (
    <AuthShell
      title="Welcome back"
      description="Login to manage your projects and tasks."
    >
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
      >
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...form.register("email")} />
          {form.formState.errors.email ? (
            <p className="text-sm text-destructive">
              {form.formState.errors.email.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" {...form.register("password")} />
          {form.formState.errors.password ? (
            <p className="text-sm text-destructive">
              {form.formState.errors.password.message}
            </p>
          ) : null}
        </div>

        {rootError ? (
          <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {rootError}
          </div>
        ) : null}

        <Button type="submit" className="w-full" disabled={mutation.isPending}>
          {mutation.isPending ? "Logging in..." : "Login"}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="font-medium text-foreground underline">
            Register
          </Link>
        </p>

        <div className="rounded-md bg-muted p-3 text-sm text-muted-foreground">
          <p className="font-medium text-foreground">Test credentials</p>
          <p>Email: test@example.com</p>
          <p>Password: password123</p>
        </div>
      </form>
    </AuthShell>
  );
}