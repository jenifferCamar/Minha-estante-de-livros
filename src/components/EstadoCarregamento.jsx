export default function EstadoCarregamento() {
  return (
    <div className="estado-carregamento" aria-live="polite">
      <svg
        className="estado-carregamento__icone"
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
        <path
          d="M12 3v4m7.99 2.01A8 8 0 0 1 12 20a8 8 0 0 1-7.99-7.07"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 12 12"
            to="360 12 12"
            dur="0.9s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
      <p>Organizando sua estante…</p>
    </div>
  );
}
