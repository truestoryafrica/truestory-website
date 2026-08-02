import Link from "next/link";
import Brand from "@/components/Brand";

export const metadata = {
  title: "Admin Login | TrueStory Africa",
  robots: {
    index: false,
    follow: false
  }
};

export default async function AdminLoginPage({ searchParams }) {
  const params = await searchParams;
  const error = params?.error;
  const loggedOut = params?.loggedOut;
  const reset = params?.reset;
  const redirectTo = params?.redirectTo || "/admin";

  return (
    <main className="admin-login-page" data-theme="dark">
      <section className="admin-login-art">
        <Link className="admin-login-brand" href="/">
          <Brand size={36} />
        </Link>
        <div>
          <p className="admin-kicker">Editorial access</p>
          <h1>Stories enter quietly. Impact leaves loudly.</h1>
          <p>
            A private doorway for the TrueStory Africa team to manage field
            stories, images, publishing details and SEO foundations.
          </p>
        </div>
      </section>

      <section className="admin-login-card" aria-label="Admin login form">
        <p className="admin-kicker">Admin Login</p>
        <h2>Welcome back.</h2>
        <p>Enter the website admin password to manage stories, messages and site details.</p>

        {error === "rate" && (
          <div className="admin-login-message error">Too many attempts. Try again in a few minutes.</div>
        )}
        {error && error !== "rate" && <div className="admin-login-message error">Incorrect password. Try again.</div>}
        {loggedOut && <div className="admin-login-message">You have been logged out safely.</div>}
        {reset && <div className="admin-login-message">Password updated. Log in with your new password.</div>}

        <form action="/api/admin/login" method="post">
          <input type="hidden" name="redirectTo" value={redirectTo} />
          <label>
            <span>Password</span>
            <input name="password" type="password" placeholder="Enter admin password" required />
          </label>
          <button type="submit">Enter Dashboard</button>
        </form>

        <div className="admin-login-links">
          <Link href="/admin/forgot-password">Forgot password?</Link>
          <Link className="admin-login-back" href="/">Back to website</Link>
        </div>
      </section>
    </main>
  );
}
