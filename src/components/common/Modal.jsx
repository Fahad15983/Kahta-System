import { X } from 'lucide-react'

export default function Modal({ title, subtitle, onClose, children, wide = false }) {
  return <div className="modal-backdrop" onMouseDown={onClose}><div className={`modal ${wide ? 'modal-wide' : ''}`} onMouseDown={(event) => event.stopPropagation()}><div className="modal-header"><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div><button className="icon-button" onClick={onClose} aria-label="Close"><X size={19} /></button></div>{children}</div></div>
}
