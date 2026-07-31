import React, { useEffect } from 'react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'deposit' | 'convert' | 'staking' | 'withdraw';
  amount: string;
  coinType: string;
}

const SuccessModalComponent: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  type,
  amount,
  coinType
}) => {
  // Handle escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      createConfettiEffect();
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const getTypeConfig = (modalType: string) => {
    const config = {
      deposit: {
        title: 'Deposit Submitted!',
        message: 'Your deposit request has been received. Funds will be credited after admin review.',
        icon: 'fas fa-arrow-down',
        color: '#26a17b',
      },
      convert: {
        title: 'Conversion Complete!',
        message: 'Your currency conversion has been processed successfully.',
        icon: 'fas fa-exchange-alt',
        color: '#3a8ef6',
      },
      staking: {
        title: 'Staking Active!',
        message: 'Your funds are now staked and actively earning rewards.',
        icon: 'fas fa-coins',
        color: '#f0a500',
      },
      withdraw: {
        title: 'Withdrawal Submitted!',
        message: 'Your withdrawal request is under review. We will process it within 24 hours.',
        icon: 'fas fa-arrow-up',
        color: '#F41112',
      },
    };
    return config[modalType as keyof typeof config] || config.deposit;
  };

  const createConfettiEffect = () => {
    const colors = ['#F3BA2F', '#00C076', '#627EEA', '#FFFFFF'];
    const modalContainer = document.querySelector('.success-modal-overlay');

    if (!modalContainer) return;

    // Clear existing confetti
    const existingConfetti = modalContainer.querySelectorAll('.success-confetti');
    existingConfetti.forEach(confetti => confetti.remove());

    for (let i = 0; i < 30; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'success-confetti';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.top = '-10px';
      confetti.style.animation = `successConfettiFall ${Math.random() * 3 + 2}s linear forwards`;
      confetti.style.animationDelay = Math.random() * 1 + 's';

      modalContainer.appendChild(confetti);

      setTimeout(() => {
        if (confetti.parentNode) {
          confetti.remove();
        }
      }, 5000);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const { title, message, icon, color } = getTypeConfig(type);

  return (
    <>
      <style>{`
        /* ── Overlay ── */
        .success-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(4px);
          display: flex;
          justify-content: center;
          align-items: flex-end;
          z-index: 10000;
          padding: 0 0 env(safe-area-inset-bottom, 0);
          overflow: hidden;
        }

        /* ── Sheet card (slides up) ── */
        .success-modal-container {
          background: #15161c;
          width: 100%;
          max-width: 400px;
          border-radius: 24px 24px 0 0;
          padding: 32px 24px 40px;
          text-align: center;
          border: 1px solid #1e1f26;
          border-bottom: none;
          box-shadow: 0 -8px 40px rgba(0, 0, 0, 0.6);
          animation: smSlideUp 0.38s cubic-bezier(0.32, 0.72, 0, 1) both;
          position: relative;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        @keyframes smSlideUp {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }

        /* ── Drag handle ── */
        .success-modal-handle {
          width: 40px;
          height: 4px;
          background: #2a2a2e;
          border-radius: 2px;
          margin: 0 auto 28px;
        }

        /* ── Icon ring ── */
        .success-modal-icon-wrap {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          margin: 0 auto 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          animation: smIconPop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s both;
        }

        .success-modal-icon-wrap::before {
          content: '';
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          border: 2px solid currentColor;
          opacity: 0.2;
        }

        @keyframes smIconPop {
          from { transform: scale(0); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }

        .success-modal-icon-wrap i {
          font-size: 30px;
          color: #fff;
        }

        /* ── Title ── */
        .success-modal-title {
          font-size: 20px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 8px;
          letter-spacing: -0.3px;
        }

        /* ── Amount pill ── */
        .success-modal-amount {
          display: inline-block;
          font-size: 28px;
          font-weight: 800;
          letter-spacing: -0.5px;
          margin: 12px 0 16px;
          background: linear-gradient(135deg, #fff 0%, #aaa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ── Divider ── */
        .success-modal-divider {
          height: 1px;
          background: #1e1f26;
          margin: 0 0 16px;
        }

        /* ── Message ── */
        .success-modal-message {
          font-size: 13px;
          color: #777;
          line-height: 1.6;
          margin-bottom: 28px;
          padding: 0 4px;
        }

        /* ── CTA button ── */
        .success-modal-button {
          width: 100%;
          padding: 15px;
          border: none;
          border-radius: 14px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s;
          background: #F41112;
          color: #fff;
          letter-spacing: 0.2px;
        }

        .success-modal-button:hover  { opacity: 0.9; }
        .success-modal-button:active { transform: scale(0.98); }

        /* ── Confetti pieces ── */
        .success-confetti {
          position: absolute;
          width: 7px;
          height: 7px;
          border-radius: 2px;
          opacity: 0;
          pointer-events: none;
        }

        @keyframes successConfettiFall {
          0%   { transform: translateY(-60px) rotate(0deg);   opacity: 1; }
          100% { transform: translateY(460px) rotate(480deg); opacity: 0; }
        }
      `}</style>

      <div className="success-modal-overlay" onClick={handleOverlayClick}>
        <div className="success-modal-container">
          {/* drag handle */}
          <div className="success-modal-handle" />

          {/* icon */}
          <div
            className="success-modal-icon-wrap"
            style={{ background: `${color}22`, color }}
          >
            <i className={icon} />
          </div>

          {/* title */}
          <div className="success-modal-title">{title}</div>

          {/* amount */}
          <div className="success-modal-amount">
            {amount} <span style={{ fontSize: '18px', fontWeight: 600, opacity: 0.7 }}>{coinType}</span>
          </div>

          <div className="success-modal-divider" />

          {/* message */}
          <div className="success-modal-message">{message}</div>

          {/* button */}
          <button className="success-modal-button" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </>
  );
};

export default SuccessModalComponent;