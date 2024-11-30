import React from 'react'
import { forwardRef, useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { Button } from './button'
import { Input, type InputProps } from './input'
import { cn } from '../utils'

const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
    ({ className, ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false)
        const disabled =
            props.value === '' || props.value === undefined || props.disabled

        return (
            <div className="relative">
                <Input
                    type={showPassword ? 'text' : 'password'}
                    className={cn('hide-password-toggle pr-10', className)}
                    ref={ref}
                    {...props}
                />
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="top-0 right-0 absolute hover:bg-transparent px-3 py-2 h-full"
                    onClick={() => setShowPassword((prev) => !prev)}
                    disabled={disabled}
                >
                    {showPassword && !disabled ? (
                        <FaRegEye className="w-4 h-4" aria-hidden="true" />
                    ) : (
                        <FaRegEyeSlash className="w-4 h-4" aria-hidden="true" />
                    )}
                    <span className="sr-only">
                        {showPassword ? 'Hide password' : 'Show password'}
                    </span>
                </Button>

                {/* hides browsers password toggles */}
                <style>{`
					.hide-password-toggle::-ms-reveal,
					.hide-password-toggle::-ms-clear {
						visibility: hidden;
						pointer-events: none;
						display: none;
					}
				`}</style>
            </div>
        )
    },
)
PasswordInput.displayName = 'PasswordInput'

export { PasswordInput }