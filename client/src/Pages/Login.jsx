import { useState } from "react";
import {
  FiMail, FiLock, FiUser, FiEye, FiEyeOff,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppConstants } from "../Util/constants";




// ── Social icons ─────────────────────────────
const GoogleIcon = () => <FcGoogle className="w-5 h-5 shrink-0" />;
const AppleIcon = () => <FaApple className="w-5 h-5 text-gray-900 shrink-0" />;
const FacebookIcon = () => <FaFacebook className="w-5 h-5 text-[#1877F2]" />;
const XIcon = () => <FaXTwitter className="w-4 h-4 text-gray-900" />;

// ── Password strength ────────────────────────
function getStrength(pw) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;

  const colors = ["", "#E24B4A", "#f59e0b", "#FF6B35", "#10B981"];
  const labels = ["", "Weak", "Fair", "Good", "Strong"];

  return {
    score,
    color: colors[score] || "#e5e7eb",
    label: labels[score] || "",
  };
}

// ── Field ────────────────────────────────────
function Field({ label, type = "text", placeholder, icon: Icon, showToggle, value, onChange }) {
  const [show, setShow] = useState(false);
  const inputType = showToggle ? (show ? "text" : "password") : type;

  return (
    <div className="mb-4">
      <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">
        {label}
      </label>

      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        )}

        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full pl-10 pr-10 py-3 rounded-xl border bg-gray-50 text-sm focus:outline-none focus:border-orange-400 focus:bg-white"
        />

        {showToggle && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {show ? <FiEyeOff /> : <FiEye />}
          </button>
        )}
      </div>
    </div>
  );
}

// ── Strength Bar ─────────────────────────────
function StrengthBar({ password }) {
  const { score, color, label } = getStrength(password);
  if (!password) return null;

  return (
    <div className="mt-2 mb-4">
      <div className="flex gap-1.5 mb-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-1 flex-1 rounded-full"
            style={{ background: i <= score ? color : "#e5e7eb" }}
          />
        ))}
      </div>
      <p className="text-xs font-medium" style={{ color }}>
        {label}
      </p>
    </div>
  );
}

// ── Social Buttons ───────────────────────────
function SocialButtons() {
  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border bg-white text-sm font-semibold">
          <GoogleIcon /> Google
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border bg-white text-sm font-semibold">
          <AppleIcon /> Apple
        </button>
      </div>
    </div>
  );
}

function Divider({ text }) {
  return (
    <div className="flex items-center gap-3 my-5">
      <div className="flex-1 h-px bg-gray-200" />
      <span className="text-xs text-gray-400">{text}</span>
      <div className="flex-1 h-px bg-gray-200" />
    </div>
  );
}

// ── LOGIN ────────────────────────────────────
function LoginForm({ onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <h1 className="text-2xl font-bold">Welcome back</h1>
      <p className="text-sm text-gray-500 mb-4">Sign in to HiruEats</p>

      <SocialButtons />
      <Divider text="or continue with email" />

      <Field
        label="Email"
        icon={FiMail}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Field
        label="Password"
        icon={FiLock}
        showToggle
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Link
  to="/forgot-password"
  className="text-xs text-orange-500 mb-4 cursor-pointer"
>
  Forgot password?
</Link>

      <button className="w-full py-3 rounded-xl bg-orange-500 text-white font-bold mb-4 cursor-pointer">
        Sign in
      </button>

      <p className="text-sm text-center">
        No account?{" "}
        <button onClick={onSwitch} className="text-orange-500 font-bold cursor-pointer">
          Create one
        </button>
      </p>
    </>
  );
}

// ── REGISTER ────────────────────────────────
function RegisterForm({ onSwitch }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(`${AppConstants.BACKEND_API_BASE_URL}/register`, {
        name: name.trim(),
        email: email.trim(),
        password,
      });

      toast.success(response.data?.message || "Account created successfully");
      setName("");
      setEmail("");
      setPassword("");
      onSwitch();
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Failed to create account";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold">Create account</h1>
      <p className="text-sm text-gray-500 mb-4">Join HiruEats</p>

      <Field
        label="Name"
        icon={FiUser}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Field
        label="Email"
        icon={FiMail}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Field
        label="Password"
        icon={FiLock}
        showToggle
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <StrengthBar password={password} />

      <button
        type="button"
        onClick={handleRegister}
        disabled={isSubmitting}
        className="w-full py-3 rounded-xl bg-orange-500 text-white font-bold mb-4 cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Creating..." : "Create account"}
      </button>

      <p className="text-sm text-center">
        Already have account?{" "}
        <button onClick={onSwitch} className="text-orange-500 font-bold cursor-pointer">
          Sign in
        </button>
      </p>
    </>
  );
}

// ── MAIN PAGE ───────────────────────────────
export default function AuthPage() {
  const [tab, setTab] = useState("login");

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative"
      style={{
        backgroundImage:
          `url('${assets.Login_Background}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* TOP LEFT LOGO */}
      <a
        href="/"
        className="absolute top-6 left-6 text-2xl font-extrabold text-white z-10"
      >
        Hiru<span className="text-orange-400">Eats</span>
      </a>

      {/* CARD */}
      <div className="relative z-10 w-full max-w-md bg-white/95 backdrop-blur-md p-8 rounded-3xl shadow-2xl">
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setTab("login")}
            className={`flex-1 py-2 rounded-xl font-semibold ${
              tab === "login" ? "bg-orange-500 text-white" : "bg-gray-100"
            }`}
          >
            Sign in
          </button>

          <button
            onClick={() => setTab("register")}
            className={`flex-1 py-2 rounded-xl font-semibold ${
              tab === "register" ? "bg-orange-500 text-white" : "bg-gray-100"
            }`}
          >
            Register
          </button>
        </div>

        {tab === "login" ? (
          <LoginForm onSwitch={() => setTab("register")} />
        ) : (
          <RegisterForm onSwitch={() => setTab("login")} />
        )}
      </div>
    </div>
  );
}