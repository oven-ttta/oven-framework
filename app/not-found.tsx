export default function NotFound() {
  return `
    <div style="
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 400px;
      padding: 2rem;
      text-align: center;
    ">
      <div style="font-size: 6rem; margin-bottom: 1rem;">🔍</div>
      <h1 style="font-size: 3rem; color: #333; margin-bottom: 1rem;">404</h1>
      <h2 style="color: #666; margin-bottom: 1rem;">Page Not Found</h2>
      <p style="color: #888; margin-bottom: 2rem; max-width: 500px;">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <a href="/" style="
        background: #ff6b35;
        color: white;
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        text-decoration: none;
      ">
        Back to Home
      </a>
    </div>
  `;
}
