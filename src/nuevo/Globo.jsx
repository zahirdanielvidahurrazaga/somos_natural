// Globo de diálogo de historieta. `lado` dice de qué lado sale el piquito.
export default function Globo({ children, lado = 'izq', className = '' }) {
  return <p className={`globo globo-${lado} ${className}`}>{children}</p>
}
