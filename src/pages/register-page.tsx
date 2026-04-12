import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { AuthShell } from "@/components/shared/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getStoredToken, setStoredAuth } from "@/features/auth/auth-storage";
import {
  registerSchema,
  type RegisterSchema,
} from "@/features/auth/auth-schema";
import { registerUser } from "@/features/auth/auth-api";
import { ApiError } from "@/lib/api-client";

export default function RegisterPage() {
  const navigate = useNavigate();
  const existingToken = getStoredToken();

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      setStoredAuth(data.token, data.user);
      navigate("/projects", { replace: true });
    },
  });

  if (existingToken) {
    return <Navigate to="/projects" replace />;
  }

  const rootError =
    mutation.error instanceof ApiError ? mutation.error.message : null;

  return (
    <AuthShell
      title="Create account"
      description="Register to start managing projects and tasks."
    >
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
      >
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" type="text" {...form.register("name")} />
          {form.formState.errors.name ? (
            <p className="text-sm text-destructive">
              {form.formState.errors.name.message}
            </p>
          ) : null}
        </div>

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
          {mutation.isPending ? "Creating account..." : "Register"}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-foreground underline">
            Login
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}