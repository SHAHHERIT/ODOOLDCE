import { useNavigate } from "react-router-dom";
import { Compass } from "lucide-react";
import Button from "../components/Button";
import BackgroundVideo from "../components/BackgroundVideo";
<BackgroundVideo src="c:\Users\HERITSHAH\Downloads\From Klickpin.com- 1149332767436870831-pin-id-1149332767436870831.mp4" className="h-screen min-h-[640px]"></BackgroundVideo>
/**
 * PLACEHOLDER ONLY.
 * Per project instructions, the real Login page already exists in the main
 * GlobeTrotter repo and must not be replaced. This stub exists purely so
 * this UI bundle is runnable standalone — swap the route below for your
 * existing Login component when merging.
 */
export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-deep px-6">
      <div className="w-full max-w-sm text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-brass/30">
          <Compass size={22} className="text-brass" strokeWidth={1.5} />
        </div>
        <h1 className="mt-6 font-display text-2xl font-semibold text-ivory">
          GlobeTrotter
        </h1>
        <p className="mt-2 text-sm text-muted">
          Placeholder screen — wire up your existing login here.
        </p>
        <Button
          className="mt-8 w-full justify-center"
          onClick={() => navigate("/dashboard")}
        >
          Continue to Dashboard
        </Button>
      </div>
    </div>
  );
}
