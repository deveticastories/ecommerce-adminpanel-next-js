"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useStoreHydrated } from "@/hooks/useStoreHydrated";
import { useBoutiqueStore } from "@/store/useBoutiqueStore";
import { fadeInUp, pageTransition, staggerContainer } from "@/utils/Animations";
import { DEMO_CREDENTIALS, Routes } from "@/utils/Constants";
import { Images } from "@/utils/Images";

const STATS = [
  { value: "4", label: "Curated Collections" },
  { value: "6", label: "Artisan Clusters" },
  { value: "240+", label: "Handcrafted SKUs" },
];

/** Split login: editorial boutique panel on the left, credential form on the right. */
export default function LoginScreen() {
  const router = useRouter();
  const hydrated = useStoreHydrated();
  const session = useBoutiqueStore((s) => s.session);
  const login = useBoutiqueStore((s) => s.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (hydrated && session) router.replace(Routes.dashboard);
  }, [hydrated, session, router]);

  async function signIn(mail: string, pass: string) {
    setBusy(true);
    setError("");
    // A short pause so the spinner registers, as a real network sign-in would.
    await new Promise((r) => setTimeout(r, 450));
    const result = login(mail, pass);
    setBusy(false);
    if (result.ok) router.replace(Routes.dashboard);
    else setError(result.error);
  }

  return (
    <div className="flex min-h-svh bg-background">
      {/* Left: editorial boutique panel */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-login-panel p-10 text-login-text lg:flex">
        <motion.div
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image src={Images.loginHero} alt="" fill priority sizes="50vw" className="object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-tr from-login-panel via-login-panel/70 to-transparent" />

        <motion.div variants={fadeInUp} initial="hidden" animate="show" className="relative">
          <p className="font-heading text-5xl tracking-tight text-brand-gold">Aavya</p>
          <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-login-muted">Heritage &amp; Bachpan Atelier</p>
        </motion.div>

        <motion.div variants={staggerContainer(0.1, 0.25)} initial="hidden" animate="show" className="relative space-y-8">
          <div className="grid grid-cols-3 gap-6">
            {STATS.map((s) => (
              <motion.div key={s.label} variants={fadeInUp}>
                <p className="font-heading text-3xl text-brand-gold">{s.value}</p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-login-muted">{s.label}</p>
              </motion.div>
            ))}
          </div>
          <motion.blockquote
            variants={fadeInUp}
            className="border-l-2 border-brand-plum pl-4 text-sm italic leading-relaxed text-login-muted"
          >
            &ldquo;Every drape in our atelier carries six generations of karigari — this room is where that heritage meets its
            numbers.&rdquo;
          </motion.blockquote>
        </motion.div>

        <p className="relative text-xs text-sidebar-muted/80">Owner&apos;s studio · Mumbai &amp; Jaipur</p>
      </div>

      {/* Right: credential form */}
      <div className="flex w-full items-center justify-center p-6 lg:w-1/2">
        <motion.div {...pageTransition} className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <p className="font-heading text-4xl tracking-tight text-primary">Aavya</p>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-stone-500">Heritage &amp; Bachpan Atelier</p>
          </div>
          <h1 className="font-heading text-3xl tracking-tight">Welcome back to the atelier</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">Sign in to run the boutique — products, orders and the ledgers await.</p>

          <form
            className="mt-8 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              void signIn(email, password);
            }}
          >
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder={DEMO_CREDENTIALS.email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={show ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  aria-label={show ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-0 grid w-10 place-items-center text-stone-500 hover:text-stone-800"
                >
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            {error && (
              <motion.p
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: [0, -4, 4, -2, 0] }}
                transition={{ duration: 0.35 }}
                className="text-sm font-medium text-destructive"
              >
                {error}
              </motion.p>
            )}
            <Button type="submit" className="w-full" disabled={busy}>
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign in"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              disabled={busy}
              onClick={() => {
                setEmail(DEMO_CREDENTIALS.email);
                setPassword(DEMO_CREDENTIALS.password);
                void signIn(DEMO_CREDENTIALS.email, DEMO_CREDENTIALS.password);
              }}
            >
              Use demo credentials &amp; sign in
            </Button>
          </form>
          <p className="mt-6 text-xs text-muted-foreground">
            Demo access — {DEMO_CREDENTIALS.email} · {DEMO_CREDENTIALS.password}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
