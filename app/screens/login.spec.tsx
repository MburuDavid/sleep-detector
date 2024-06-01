import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Login from './Login';
import { FIREBASE_AUTH } from '../../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

jest.mock('firebase/auth', () => ({
	createUserWithEmailAndPassword: jest.fn(),
	signInWithEmailAndPassword: jest.fn(),
}));

jest.mock('../../firebaseConfig', () => ({
	FIREBASE_AUTH: {
		currentUser: null,
	},
}));

describe('Login', () => {
	it('renders correctly', () => {
		const { getByPlaceholderText } = render(<Login />);
		expect(getByPlaceholderText('Email')).toBeTruthy();
		expect(getByPlaceholderText('Password')).toBeTruthy();
	});

	it('handles email and password input', () => {
		const { getByPlaceholderText } = render(<Login />);
		const emailInput = getByPlaceholderText('Email');
		const passwordInput = getByPlaceholderText('Password');

		fireEvent.changeText(emailInput, 'test@example.com');
		fireEvent.changeText(passwordInput, 'password123');

		expect(emailInput.props.value).toBe('test@example.com');
		expect(passwordInput.props.value).toBe('password123');
	});

	it('shows loading indicator when loading', async () => {
		signInWithEmailAndPassword.mockImplementationOnce(() => new Promise((resolve) => setTimeout(resolve, 100)));

		const { getByText, getByRole } = render(<Login />);
		const loginButton = getByText('Login');

		fireEvent.press(loginButton);

		expect(getByRole('progressbar')).toBeTruthy();
		await waitFor(() => expect(getByRole('progressbar')).not.toBeTruthy());
	});

	it('calls signInWithEmailAndPassword on login button press', async () => {
		signInWithEmailAndPassword.mockResolvedValueOnce({});

		const { getByPlaceholderText, getByText } = render(<Login />);
		const emailInput = getByPlaceholderText('Email');
		const passwordInput = getByPlaceholderText('Password');
		const loginButton = getByText('Login');

		fireEvent.changeText(emailInput, 'test@example.com');
		fireEvent.changeText(passwordInput, 'password123');
		fireEvent.press(loginButton);

		await waitFor(() => {
		expect(signInWithEmailAndPassword).toHaveBeenCalledWith(FIREBASE_AUTH, 'test@example.com', 'password123');
		});
	});

	it('calls createUserWithEmailAndPassword on signup button press', async () => {
		createUserWithEmailAndPassword.mockResolvedValueOnce({});

		const { getByPlaceholderText, getByText } = render(<Login />);
		const emailInput = getByPlaceholderText('Email');
		const passwordInput = getByPlaceholderText('Password');
		const signupButton = getByText('Create Account');

		fireEvent.changeText(emailInput, 'test@example.com');
		fireEvent.changeText(passwordInput, 'password123');
		fireEvent.press(signupButton);

		await waitFor(() => {
		expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(FIREBASE_AUTH, 'test@example.com', 'password123');
		});
	});
});
