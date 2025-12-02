import React, { useEffect } from 'react';
import { X, Calendar } from 'lucide-react';

interface PopupModalProps {
    isOpen: boolean;
    onClose: () => void;
    message: string;
    autoCloseDelay?: number; // milliseconds
}

const PopupModal: React.FC<PopupModalProps> = ({
    isOpen,
    onClose,
    message,
    autoCloseDelay = 3000
}) => {
    useEffect(() => {
        if (isOpen && autoCloseDelay > 0) {
            const timer = setTimeout(() => {
                onClose();
            }, autoCloseDelay);
            return () => clearTimeout(timer);
        }
    }, [isOpen, autoCloseDelay, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative glass-card rounded-3xl p-8 max-w-md w-full shadow-2xl animate-scale-in border-2 border-white/20">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                >
                    <X size={24} />
                </button>

                {/* Icon */}
                <div className="w-20 h-20 bg-gradient-to-br from-brand-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-brand-500/30">
                    <Calendar size={40} className="text-white" />
                </div>

                {/* Message */}
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-3">
                    Limite Diário Atingido
                </h2>
                <p className="text-slate-600 dark:text-slate-300 text-center text-lg leading-relaxed">
                    {message}
                </p>

                {/* Progress indicator for auto-close */}
                {autoCloseDelay > 0 && (
                    <div className="mt-6 h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-brand-500 to-purple-600 animate-progress-bar"
                            style={{ animationDuration: `${autoCloseDelay}ms` }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default PopupModal;
