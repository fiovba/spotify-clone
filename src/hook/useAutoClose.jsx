import { useEffect, useRef, useCallback } from 'react';

export function useAutoClose(isOpen, setIsOpen, isTrackPanelOpen, setIsTrackPanelOpen) {
    const isOpenRef = useRef(isOpen);
    const isTrackPanelOpenRef = useRef(isTrackPanelOpen);
    const width = window.innerWidth;
    const isSmall = width < 1024;
    useEffect(() => {
        isOpenRef.current = isOpen;
    }, [isOpen]);

    useEffect(() => {
        isTrackPanelOpenRef.current = isTrackPanelOpen;
    }, [isTrackPanelOpen]);

    const handleResize = useCallback(() => {


        if (isSmall && isOpenRef.current && isTrackPanelOpenRef.current) {
            setIsTrackPanelOpen(false);

        }

    }, [setIsTrackPanelOpen]);

    useEffect(() => {
        if (isSmall && isTrackPanelOpen && isOpenRef.current) {
            setIsOpen(false);
        }
    }, [isTrackPanelOpen, setIsOpen]);

    useEffect(() => {
        if (isSmall && isOpen && isTrackPanelOpenRef.current) {
            setIsTrackPanelOpen(false);
        }
    }, [isOpen, setIsTrackPanelOpen]);


    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize(); // İlk açılışda da yoxlamaq üçün
        return () => window.removeEventListener('resize', handleResize);
    }, [handleResize]);
}
