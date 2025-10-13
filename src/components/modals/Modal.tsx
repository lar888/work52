import type { ReactNode, MouseEvent } from 'react'
import { createPortal } from 'react-dom'

interface ModalProps {
  children: ReactNode
  onClose: () => void
  onConfirm?: () => void
  confirmText?: string
  cancelText?: string
  showActions?: boolean
}

const modalRoot = document.getElementById('modal-root')

const Modal = ({
  children,
  onClose,
  onConfirm,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  showActions = false
}: ModalProps) => {
  if (!modalRoot) return null

  const handleContentClick = (e: MouseEvent) => e.stopPropagation()

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={handleContentClick}>
        <span className="modal__close" onClick={onClose}>
          ×
        </span>

        <div className="modal__content">{children}</div>

        {showActions && (
          <div className="modal__actions">
            <button className="modal__btn--cancel" onClick={onClose}>
              {cancelText}
            </button>
            <button className="modal__btn--confirm" onClick={onConfirm}>
              {confirmText}
            </button>
          </div>
        )}
      </div>
    </div>,
    modalRoot
  )
}

export default Modal
