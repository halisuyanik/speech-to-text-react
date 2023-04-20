import React, {
    useState,
    useEffect
} from "react";
import * as copy from 'copy-to-clipboard'
import toast, {
    Toaster
} from 'react-hot-toast';
export const useCopyClipboard = ({
    timeout = null
}) => {
    const [isCopied, setCopied] = useState(false);
    useEffect(() => {
        let reset;
        if (isCopied && timeout) {
            reset = setTimeout(() => {
                setCopied(false);
            }, timeout);
        }
        return () => {
            clearTimeout(reset);
        }
    }, [isCopied, timeout])
    const copyClipboard = (text) => {
        if (text !== "") {
            if (typeof text === 'string' || typeof text === 'number') {
                copy(text.toString());
                setCopied(true);
                toast('copied to clipboard', {
                    icon: '🍓',
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                });
            }

        } else {
            setCopied(false);
            toast('text could not be copied', {
                icon: '🥔',
                style: {
                    borderRadius: '10px',
                    background: '#FF5656',
                    color: '#fff',
                },
            });
        }
    }

    return [
        isCopied,
        copyClipboard
    ]
}