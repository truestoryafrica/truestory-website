import Link from "next/link";
import Brand from "@/components/Brand";

export const metadata = {
  title: "Reset Admin Password | TrueStory Africa",
  robots: {
    index: false,
    follow: false
  }
};

export default async function ForgotPasswordPage({ searchParams }) {
  const params = await searchParams;
  const sent = params?.sent;
  const error = params?.error;

  return (
    <main className="admin-login-page" data-theme="dark">
      <section className="admin-login-art">
        <Link className="admin-login-brand" href="/">
          <Brand size={36} />
        </Link>
        <div>
          <p className="admin-kicker">Editorial access</p>
          <h1>Locked out? Let's fix that.</h1>
          <p>
            A reset link goes straight to the editorial team's inbox — nobody
            else can trigger this without access to that email.
          </p>
        </div>
      </section>

      <section className="admin-login-card" aria-label="Forgot password">
        <p className="admin-kicker">Password Reset</p>
        <h2>Forgot your password?</h2>
        <p>We'll email a reset link to the site's admin address.</p>

        {sent && (
          <div className="admin-login-message">
            Check the inbox for a reset link — it expires in 1 hour.
          </div>
        )}
        {error === "rate" && (
          <div className="admin-login-message error">Too many requests. Try again in a few minutes.</div>
        )}
        {error === "unconfigured" && (
          <div className="admin-login-message error">Email delivery isn't configured yet. Contact whoever manages this site's environment variables.</div>
        )}
        {error === "1" && (
          <div className="admin-login-message error">Something went wrong sending the reset email. Try again.</div>
        )}

        {!sent && (
          <form action="/api/admin/forgot-password" method="post">
            <button type="submit">Send Reset Link</button>
          </form>
        )}

        <div className="admin-login-links">
          <Link className="admin-login-back" href="/admin/login">Back to login</Link>
        </div>
      </section>
    </main>
  );
}
