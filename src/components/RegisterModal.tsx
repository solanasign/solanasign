import React, { useState } from 'react';
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from 'react-router-dom';
import InputField from './InputField';
import axios from 'axios';

interface RegisterModalProps {
    onClose: () => void;
    onSuccess: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ onClose, onSuccess }) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [displayNameError, setDisplayNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isCheckingEmail, setIsCheckingEmail] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password: string) => {
        return password.length >= 8;
    };

    const checkEmailExists = async (email: string) => {
        try {
            setIsCheckingEmail(true);
            setEmailError('');
            // Try to login with the email to check if it exists
            const response = await axios.post('/api/auth/login', {
                email,
                password: 'temp_password_for_check'
            });
            // If login succeeds, email exists (though this shouldn't happen with wrong password)
            return true;
        } catch (error: any) {
            if (error.response?.status === 401) {
                if (error.response?.data?.error?.includes('Invalid credentials')) {
                    return false;
                }
            }
            return false;
        } finally {
            setIsCheckingEmail(false);
        }
    };

    const handleEmailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        if (newEmail && !validateEmail(newEmail)) {
            setEmailError('Please enter a valid email address');
            return;
        }
        if (newEmail && validateEmail(newEmail)) {
            const emailExists = await checkEmailExists(newEmail);
            if (emailExists) {
                setEmailError('This email is already registered');
            } else {
                setEmailError('');
            }
        } else {
            setEmailError('');
        }
    };

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newUsername = e.target.value;
        setUsername(newUsername);
        if (!newUsername) {
            setUsernameError('Username is required');
        } else {
            setUsernameError('');
        }
    };

    const handleDisplayNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDisplayName = e.target.value;
        setDisplayName(newDisplayName);
        if (!newDisplayName) {
            setDisplayNameError('Display name is required');
        } else {
            setDisplayNameError('');
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        if (newPassword && !validatePassword(newPassword)) {
            setPasswordError('Password must be at least 8 characters long');
        } else {
            setPasswordError('');
        }
        if (confirmPassword && newPassword !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match');
        } else {
            setConfirmPasswordError('');
        }
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);
        if (newConfirmPassword && password !== newConfirmPassword) {
            setConfirmPasswordError('Passwords do not match');
        } else {
            setConfirmPasswordError('');
        }
    };

    const handleRegister = async () => {
        if (!isFormValid) return;
        setIsLoading(true);
        try {
            const response = await axios.post('/api/auth/register', {
                email,
                password,
                username,
                displayName,
                role: 'user'
            });
            console.log('Registration successful:', response.data);
            localStorage.setItem('userToken', response.data.token);
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userData', JSON.stringify(response.data.user));
            onSuccess();
            navigate('/wallet');
        } catch (error: any) {
            console.error('Registration error:', error);
            if (error.response?.data?.error) {
                if (error.response.data.error.includes('already exists')) {
                    setEmailError('This email is already registered. Please try logging in instead.');
                } else {
                    setEmailError(error.response.data.error);
                }
            } else {
                setEmailError('Registration failed. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const isFormValid = email && password && confirmPassword && username && displayName &&
                       !emailError && !usernameError && !displayNameError && !passwordError && !confirmPasswordError &&
                       !isCheckingEmail && password === confirmPassword;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="w-full max-w-md mx-auto">
                <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-2xl shadow-xs border border-zinc-200/50 dark:border-zinc-800/50 overflow-hidden">
                    <div className="p-5 border-b border-zinc-200/50 dark:border-zinc-800/50 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xs">
                        <div className="flex items-start justify-between mb-2">
                            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                                Create Account
                            </h2>
                            <Button
                                variant="ghost"
                                className="text-zinc-500 hover:text-zinc-700"
                                onClick={onClose}
                            >
                                <X className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                    <div className="p-5 space-y-4">
                        <div className="space-y-4">
                            <InputField
                                id="email"
                                type="email"
                                label="Email Address"
                                value={email}
                                onChange={handleEmailChange}
                                placeholder="Enter your email address"
                                className={`${emailError ? 'border-red-500 text-white' : 'text-white'} h-12 text-base px-4`}
                                labelColor="text-white"
                            />
                            {emailError && (
                                <p className="text-red-500 text-sm">{emailError}</p>
                            )}
                            {isCheckingEmail && (
                                <p className="text-blue-500 text-sm">Checking email availability...</p>
                            )}
                            <InputField
                                id="username"
                                type="text"
                                label="Username"
                                value={username}
                                onChange={handleUsernameChange}
                                placeholder="Enter your username"
                                className={`${usernameError ? 'border-red-500 text-white' : 'text-white'} h-12 text-base px-4`}
                                labelColor="text-white"
                            />
                            {usernameError && (
                                <p className="text-red-500 text-sm">{usernameError}</p>
                            )}
                            <InputField
                                id="displayName"
                                type="text"
                                label="Display Name"
                                value={displayName}
                                onChange={handleDisplayNameChange}
                                placeholder="Enter your display name"
                                className={`${displayNameError ? 'border-red-500 text-white' : 'text-white'} h-12 text-base px-4`}
                                labelColor="text-white"
                            />
                            {displayNameError && (
                                <p className="text-red-500 text-sm">{displayNameError}</p>
                            )}
                            <InputField
                                id="password"
                                type={showPassword ? "text" : "password"}
                                label="Password"
                                value={password}
                                onChange={handlePasswordChange}
                                placeholder="Enter your password"
                                className={`${passwordError ? 'border-red-500 text-white' : 'text-white'} h-12 text-base px-4`}
                                labelColor="text-white"
                                isPassword={true}
                                isVisible={showPassword}
                                toggleVisibility={() => setShowPassword(!showPassword)}
                            />
                            {passwordError && (
                                <p className="text-red-500 text-sm">{passwordError}</p>
                            )}
                            <InputField
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                label="Confirm Password"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                placeholder="Confirm your password"
                                className={`${confirmPasswordError ? 'border-red-500 text-white' : 'text-white'} h-12 text-base px-4`}
                                labelColor="text-white"
                                isPassword={true}
                                isVisible={showConfirmPassword}
                                toggleVisibility={() => setShowConfirmPassword(!showConfirmPassword)}
                            />
                            {confirmPasswordError && (
                                <p className="text-red-500 text-sm">{confirmPasswordError}</p>
                            )}
                        </div>
                        <div className="flex gap-3 pt-4">
                            <Button
                                variant="ghost"
                                className="flex-1 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                onClick={onClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="flex-1 bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50"
                                onClick={handleRegister}
                                disabled={!isFormValid || isLoading}
                            >
                                {isLoading ? 'Creating Account...' : 'Continue to Wallet'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterModal; 