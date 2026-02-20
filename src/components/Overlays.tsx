import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

// --- MODAL ---
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    className?: string;
    actions?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, className, actions }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div 
                className="absolute inset-0 bg-braun-900/20 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            />
            <div className={twMerge(
                "relative bg-white border border-braun-200 shadow-2xl w-full max-w-lg z-10 animate-in zoom-in-95 slide-in-from-bottom-4 duration-300",
                className
            )}>
                <div className="flex items-center justify-between p-6 border-b border-braun-100">
                    <h3 className="text-lg font-light text-braun-900">{title}</h3>
                    <button onClick={onClose} className="text-braun-400 hover:text-braun-900 transition-colors">
                        <X size={16} />
                    </button>
                </div>
                <div className="p-6">
                    {children}
                </div>
                {actions && (
                    <div className="p-6 border-t border-braun-100 flex justify-end gap-3 bg-braun-50">
                        {actions}
                    </div>
                )}
            </div>
        </div>
    );
};

// --- DRAWER ---
interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    position?: 'left' | 'right';
    title?: string;
    children: React.ReactNode;
    className?: string;
}

export const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, position = 'right', title, children, className }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            <div 
                className="absolute inset-0 bg-braun-900/10 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            />
            <div className={twMerge(
                "absolute top-0 bottom-0 bg-white border-l border-braun-200 shadow-2xl w-80 max-w-full animate-in duration-300 flex flex-col",
                position === 'right' ? "right-0 slide-in-from-right-full border-l" : "left-0 slide-in-from-left-full border-r",
                className
            )}>
                {title ? (
                     <div className="flex items-center justify-between p-6 border-b border-braun-100 shrink-0">
                        <h3 className="text-lg font-light text-braun-900">{title}</h3>
                        <button onClick={onClose} className="text-braun-400 hover:text-braun-900 transition-colors">
                            <X size={16} />
                        </button>
                     </div>
                 ) : (
                    <button onClick={onClose} className="absolute top-4 right-4 text-braun-400 hover:text-braun-900 z-10">
                        <X size={16} />
                    </button>
                 )}
                <div className="flex-1 overflow-y-auto relative">
                    {children}
                </div>
            </div>
        </div>
    );
};

// --- TOOLTIP ---
export const Tooltip: React.FC<{ content: string | React.ReactNode; children: React.ReactNode }> = ({ content, children }) => {
    return (
        <div className="relative group inline-block">
            {children}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-braun-900 text-white text-[10px] font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                {content}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-braun-900"></div>
            </div>
        </div>
    );
};

// --- DROPDOWN MENU ---
interface DropdownItem {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
    danger?: boolean;
}

interface DropdownMenuProps {
    trigger: React.ReactNode;
    items: DropdownItem[];
    align?: 'left' | 'right';
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ trigger, items, align = 'left' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
            setIsOpen(false);
          }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative inline-block" ref={containerRef}>
            <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
                {trigger}
            </div>
            {isOpen && (
                <div className={twMerge(
                    "absolute top-full mt-1 bg-white border border-braun-200 shadow-xl min-w-[160px] z-40 py-1 animate-in fade-in zoom-in-95 duration-100",
                    align === 'right' ? "right-0" : "left-0"
                )}>
                    {items.map((item, i) => (
                        <button
                            key={i}
                            onClick={() => { item.onClick(); setIsOpen(false); }}
                            className={twMerge(
                                "w-full text-left px-4 py-2 text-xs font-sans flex items-center gap-2 hover:bg-braun-50 transition-colors",
                                item.danger ? "text-rose-600 hover:bg-rose-50" : "text-braun-700"
                            )}
                        >
                            {item.icon}
                            {item.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};