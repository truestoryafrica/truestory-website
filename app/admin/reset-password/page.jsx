import Link from "next/link";
import Brand from "@/components/Brand";
import { isValidPasswordResetToken } from "@/lib/adminCredentials";

export const metadata = {
  title: "Set New Admin Password | TrueStory Africa",
  robots: {
    index: false,
    follow: false
  }
};

export default async function ResetPasswordPage({ searchParams }) {
  const params = await searchParams;
  const token = String(params?.token || "");
  const error = params?.error;
  const tokenValid = await isValidPasswordResetToken(token);

  return (
    <main className="admin-login-page" data-theme="dark">
      <section className="admin-login-art">
        <Link className="admin-login-brand" href="/">
          <Brand size={36} />
        </Link>
        <div>
          <p className="admin-kicker">Editorial access</p>
          <h1>Choose a new password.</h1>
          <p>
            Pick something at least 10 characters long that you haven't used
            before.
          </p>
        </div>
      </section>

      <section className="admin-login-card" aria-label="Set new password">
        <p className="admin-kicker">Password Reset</p>
        <h2>Set a new password.</h2>

        {!tokenValid ? (
          <>
            <p>This reset link is invalid or has expired. Request a new one.</p>
            <div className="admin-login-links">
              <Link className="admin-login-back" href="/admin/forgot-password">Request a new reset link</Link>
            </div>
          </>
        ) : (
          <>
            <p>Enter and confirm your new password below.</p>

            {error === "short" && (
              <div className="admin-login-message error">Password must be at least 10 characters.</div>
            )}
            {error === "mismatch" && (
              <div className="admin-login-message error">Passwords don't match. Try again.</div>
            )}
            {error === "failed" && (
              <div className="admin-login-message error">Couldn't save the new password. Try again.</div>
            )}

            <form action="/api/admin/reset-password" method="post">
              <input type="hidden" name="token" value={token} />
              <label>
                <span>New Password</span>
                <input name="password" type="password" placeholder="At least 10 characters" minLength={10} required />
              </label>
              <label>
                <span>Confirm Password</span>
                <input name="confirmPassword" type="password" placeholder="Repeat the password" minLength={10} required />
              </label>
              <button type="submit">Set New Password</button>
            </form>

            <div className="admin-login-links">
              <Link className="admin-login-back" href="/admin/login">Back to login</Link>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
