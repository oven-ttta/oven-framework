interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error }: ErrorProps) {
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
      <div style="font-size: 4rem; margin-bottom: 1rem;">😵</div>
      <h1 style="color: #e74c3c; margin-bottom: 1rem;">Something went wrong!</h1>
      <p style="color: #666; margin-bottom: 2rem; max-width: 500px;">
        ${error.message || 'An unexpected error occurred'}
      </p>
      <a href="/" style="
        background: #ff6b35;
        color: white;
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        text-decoration: none;
      ">
        Go Home
      </a>
    </div>
  `;
}
