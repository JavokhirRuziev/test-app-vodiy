import { Button } from '@/components/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { ReactNode } from 'react';

export function Modal({
    children,
    buttonText,
    onClick,
}: {
    children: ReactNode;
    buttonText: string | ReactNode;
    onClick?: () => void;
}) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant='outline' className='p-2' onClick={onClick}>
                    {buttonText}
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-80'>
                <div className='grid gap-4'>
                    <div className='space-y-2'>
                        <h4 className='font-medium leading-none'>
                            Add product
                        </h4>
                    </div>
                    {children}
                </div>
            </PopoverContent>
        </Popover>
    );
}
