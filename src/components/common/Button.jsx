export default function Button({ children, variant = 'primary', icon: Icon, className = '', ...props }) {
  return <button className={`button button-${variant} ${className}`} {...props}>{Icon && <Icon size={16} strokeWidth={2} />}{children}</button>
}
