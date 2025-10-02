import type { ReactNode, MouseEvent } from 'react'
import { createPortal } from 'react-dom'

interface ModalProps {
  children: ReactNode
  onClose: () => void
}

const modalRoot = document.getElementById('modal-root')

const Modal = ({ children, onClose }: ModalProps) => {
  if (!modalRoot) return null

  const handleContentClick = (e: MouseEvent) => {
    e.stopPropagation()
  }

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={handleContentClick}>
        <span className="modal__close" onClick={onClose}>
          ×
        </span>
        {children}
      </div>
    </div>,
    modalRoot
  )
}

export default Modal
