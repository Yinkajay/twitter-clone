import Input from '@/components/Input'
import Modal from '@/components/Modal'
import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal'
import React, { useState, useCallback } from 'react'

const LoginModal = () => {
    const loginModal = useLoginModal()
    const registerModal = useRegisterModal()


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true)

            loginModal.onClose()
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }, [loginModal])

    const onToggleMode = useCallback(() => {
        if (isLoading) {
            return
        }
        loginModal.onClose()
        registerModal.onOpen()
    }, [isLoading, registerModal, loginModal])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email} disabled={isLoading} />
            <Input placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password} disabled={isLoading} />
        </div>
    )

    const footerContent = (
        <div className='text-white text-center mt-4'>
            <p>First time using X? 
                <span onClick={onToggleMode} className='text-white cursor-pointer hover:underline'> Create an account</span>
            </p>
        </div>
    )

    return (
        <div>
            <Modal disabled={isLoading} isOpen={loginModal.isOpen} title='Login' actionLabel='Sign In' onClose={loginModal.onClose} onSubmit={onSubmit} body={bodyContent} footer={footerContent} />
        </div>
    )
}

export default LoginModal
