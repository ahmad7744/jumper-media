'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Assets from '../../../public/assets/assets';
import { Button } from '../ui/button';

type ModalProps = {
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
};

const Modal: React.FC<ModalProps> = ({ onClose, children, title }) => {
    const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const div = document.createElement('div');
        document.body.appendChild(div);
        setModalRoot(div);
        setIsMounted(true);

        return () => {
            document.body.removeChild(div);
        };
    }, []);

    if (!modalRoot) return null;

    return createPortal(
        <AnimatePresence>
            {isMounted && (
                <motion.div 
                    className="modal-overlay Inter fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div 
                        className="modal-wrapper"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <div className="modal bg-zinc-900 p-6 rounded-lg shadow-lg">
                            <div className="modal-header flex justify-between items-center">
                                {title && <h1 className='text-zinc-200 text-2xl font-semibold'>{title}</h1>}
                                <Button 
                                    variant={'outline'} 
                                    size={'icon'} 
                                    className='bg-[#FFFFFF0D] rounded-full items-center text-zinc-200 border-none' 
                                    onClick={() => { setIsMounted(false); setTimeout(onClose, 300); }}
                                >
                                    <div dangerouslySetInnerHTML={{ __html: Assets.CrossIcon }} />
                                </Button>
                            </div>
                            <div className="modal-body mt-4">{children}</div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        modalRoot
    );
};

export default Modal;