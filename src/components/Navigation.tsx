
import React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal, Slash } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

// --- TABS ---
interface TabItem {
    id: string;
    label: string;
    icon?: React.ReactNode;
}

interface TabsProps {
    items: TabItem[];
    activeId: string;
    onChange: (id: string) => void;
    className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ items, activeId, onChange, className }) => {
    return (
        <div className={twMerge("flex border-b border-braun-200", className)}>
            {items.map((item) => {
                const isActive = activeId === item.id;
                return (
                    <button
                        key={item.id}
                        onClick={() => onChange(item.id)}
                        className={twMerge(
                            "relative px-6 py-3 flex items-center gap-2 text-xs font-medium transition-colors outline-none focus-visible:bg-braun-50",
                            isActive ? "text-braun-900" : "text-braun-500 hover:text-braun-900"
                        )}
                    >
                        {item.icon}
                        <span>{item.label}</span>
                        <div className={twMerge(
                            "absolute bottom-0 left-0 w-full h-0.5 bg-braun-900 transition-transform duration-200",
                            isActive ? "scale-x-100" : "scale-x-0"
                        )} />
                    </button>
                );
            })}
        </div>
    );
};

// --- BREADCRUMBS ---
interface BreadcrumbItem {
    label: string;
    href?: string;
    onClick?: () => void;
}

export const Breadcrumbs: React.FC<{ items: BreadcrumbItem[]; className?: string }> = ({ items, className }) => {
    return (
        <nav className={twMerge("flex items-center text-[10px] font-mono uppercase tracking-widest", className)}>
            {items.map((item, index) => {
                const isLast = index === items.length - 1;
                return (
                    <React.Fragment key={index}>
                        <button 
                            onClick={item.onClick}
                            disabled={!item.onClick || isLast}
                            className={twMerge(
                                "transition-colors px-1 py-0.5 rounded-sm",
                                isLast ? "text-braun-900 bg-braun-100 font-bold cursor-default" : "text-braun-400 hover:text-braun-900 hover:bg-braun-50"
                            )}
                        >
                            {item.label}
                        </button>
                        {!isLast && <Slash size={10} className="mx-2 text-braun-200 -rotate-12" />}
                    </React.Fragment>
                );
            })}
        </nav>
    );
};

// --- PAGINATION ---
interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, className }) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    
    // Simple truncation logic for demo purposes
    const visiblePages = pages.filter(p => 
        p === 1 || p === totalPages || (p >= currentPage - 1 && p <= currentPage + 1)
    );

    return (
        <div className={twMerge("flex items-center gap-1", className)}>
            <button
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center border border-braun-200 text-braun-600 hover:border-braun-900 hover:text-braun-900 disabled:opacity-30 disabled:hover:border-braun-200 transition-colors"
            >
                <ChevronLeft size={14} />
            </button>

            {visiblePages.map((p, i, arr) => (
                <React.Fragment key={p}>
                    {i > 0 && p > arr[i - 1] + 1 && (
                         <span className="w-8 h-8 flex items-center justify-center text-braun-300"><MoreHorizontal size={12}/></span>
                    )}
                    <button
                        onClick={() => onPageChange(p)}
                        className={twMerge(
                            "w-8 h-8 flex items-center justify-center text-xs font-mono transition-colors border",
                            currentPage === p 
                                ? "bg-braun-900 text-white border-braun-900" 
                                : "bg-transparent text-braun-500 border-braun-200 hover:border-braun-900 hover:text-braun-900"
                        )}
                    >
                        {p}
                    </button>
                </React.Fragment>
            ))}

            <button
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="w-8 h-8 flex items-center justify-center border border-braun-200 text-braun-600 hover:border-braun-900 hover:text-braun-900 disabled:opacity-30 disabled:hover:border-braun-200 transition-colors"
            >
                <ChevronRight size={14} />
            </button>
        </div>
    );
};
