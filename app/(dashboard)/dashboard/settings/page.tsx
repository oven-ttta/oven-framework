import type { PageProps, Metadata } from '../../../../src/types';

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Manage your dashboard settings',
};

export default function SettingsPage({ params }: PageProps) {
  return `
    <div>
      <h1 style="font-size: 2rem; margin-bottom: 0.5rem;">Settings</h1>
      <p style="color: #666; margin-bottom: 2rem;">Manage your account and preferences</p>

      <div style="max-width: 600px;">
        <section style="background: white; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
          <h2 style="margin-bottom: 1rem; font-size: 1.25rem;">Profile</h2>
          <div style="margin-bottom: 1rem;">
            <label style="display: block; margin-bottom: 0.5rem; color: #555;">Name</label>
            <input type="text" value="John Doe" style="
              width: 100%;
              padding: 0.75rem;
              border: 1px solid #ddd;
              border-radius: 8px;
              font-size: 1rem;
            ">
          </div>
          <div style="margin-bottom: 1rem;">
            <label style="display: block; margin-bottom: 0.5rem; color: #555;">Email</label>
            <input type="email" value="john@example.com" style="
              width: 100%;
              padding: 0.75rem;
              border: 1px solid #ddd;
              border-radius: 8px;
              font-size: 1rem;
            ">
          </div>
        </section>

        <section style="background: white; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
          <h2 style="margin-bottom: 1rem; font-size: 1.25rem;">Preferences</h2>
          <div style="margin-bottom: 1rem; display: flex; justify-content: space-between; align-items: center;">
            <span>Dark Mode</span>
            <label style="
              position: relative;
              width: 50px;
              height: 26px;
            ">
              <input type="checkbox" style="opacity: 0; width: 0; height: 0;">
              <span style="
                position: absolute;
                cursor: pointer;
                top: 0; left: 0; right: 0; bottom: 0;
                background: #ccc;
                border-radius: 26px;
                transition: 0.3s;
              "></span>
            </label>
          </div>
          <div style="margin-bottom: 1rem; display: flex; justify-content: space-between; align-items: center;">
            <span>Email Notifications</span>
            <label style="
              position: relative;
              width: 50px;
              height: 26px;
            ">
              <input type="checkbox" checked style="opacity: 0; width: 0; height: 0;">
              <span style="
                position: absolute;
                cursor: pointer;
                top: 0; left: 0; right: 0; bottom: 0;
                background: #ff6b35;
                border-radius: 26px;
                transition: 0.3s;
              "></span>
            </label>
          </div>
        </section>

        <section style="background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
          <h2 style="margin-bottom: 1rem; font-size: 1.25rem; color: #e74c3c;">Danger Zone</h2>
          <p style="color: #666; margin-bottom: 1rem;">Once you delete your account, there is no going back.</p>
          <button style="
            background: #e74c3c;
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            cursor: pointer;
          ">
            Delete Account
          </button>
        </section>
      </div>
    </div>
  `;
}
