import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Compass } from "lucide-react";
import Button from "../components/Button";
import api from "../lib/api";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("traveler@example.com");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const result = await api.post<{ token: string; user: { email: string } }>(
        "/auth/login",
        { email, password }
      );
      localStorage.setItem("token", result.token);
      localStorage.setItem("userEmail", result.user.email);
      navigate("/dashboard");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to sign in");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-deep px-6">
      <div className="w-full max-w-sm text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-brass/30">
          <Compass size={22} className="text-brass" strokeWidth={1.5} />
        </div>
        <h1 className="mt-6 font-display text-2xl font-semibold text-ivory">
          GlobeTrotter
        </h1>
        <p className="mt-2 text-sm text-muted">Plan the journey. Keep the story.</p>
        <form className="mt-8 space-y-4 text-left" onSubmit={handleSubmit}>
          <label className="block text-sm text-muted">
            Email
            <input
              className="mt-2 w-full rounded border border-white/10 bg-white/5 px-3 py-3 text-ivory outline-none focus:border-brass"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          <label className="block text-sm text-muted">
            Password
            <input
              className="mt-2 w-full rounded border border-white/10 bg-white/5 px-3 py-3 text-ivory outline-none focus:border-brass"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
          {error && <p className="text-sm text-red-300">{error}</p>}
          <Button className="w-full justify-center" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Continue to Dashboard"}
          </Button>
        </form>
      </div>
    </div>
  );
}
