import Input from '@/components/Input'
import Modal from '@/components/Modal'
import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal'
import axios from 'axios'
import React, { useState, useCallback } from 'react'

const RegisterModal = () => {
    const loginModal = useLoginModal()
    const registerModal = useRegisterModal()

    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true)
            // TODO REGISTER AND LOGIN

            await axios.post('/api/register')
            registerModal.onClose()
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }, [registerModal])

    const onToggleMode = useCallback(() => {
        if (isLoading) {
            return
        }
        registerModal.onClose()
        loginModal.onOpen()
    }, [isLoading, registerModal, loginModal])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email} disabled={isLoading} />
            <Input placeholder='Name' onChange={(e) => setName(e.target.value)} value={name} disabled={isLoading} />
            <Input placeholder='Username' onChange={(e) => setUsername(e.target.value)} value={username} disabled={isLoading} />
            <Input placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password} disabled={isLoading} />
        </div>
    )

    const footerContent = (
        <div className='text-white text-center mt-4'>
            <p>Already have an account?
                <span onClick={onToggleMode} className='text-white cursor-pointer hover:underline'> Sign in
                </span>
            </p>
        </div>
    )

    return (
        <div>
            <Modal disabled={isLoading} isOpen={registerModal.isOpen} title='Create an account' actionLabel='Register' onClose={registerModal.onClose} onSubmit={onSubmit} body={bodyContent} footer={footerContent} />
        </div>
    )
}

export default RegisterModal
