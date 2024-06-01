import { View, TextInput, Button, Text, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { FIREBASE_AUTH } from '../../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const auth = FIREBASE_AUTH;

	const signIn = async () => {
		setLoading(true)
		try {
			const response = await signInWithEmailAndPassword(auth, email, password)
			console.log('Login success')
		} catch (err: any) {
			console.error(err);
			alert(`Sign in failed: ${err.message}`)
		} finally {
			setLoading(false)
		}
	}

	const signUp = async () => {
		setLoading(true)
		try {
			const response = await createUserWithEmailAndPassword(auth, email, password)
			console.log('Login success')
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false)
		}
	}


	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				placeholder="Email"
				value={email}
				autoCapitalize="none"
				onChangeText={setEmail}
			/>
			<TextInput
				style={styles.input}
				placeholder="Password"
				secureTextEntry
				value={password}
				autoCapitalize="none"
				onChangeText={setPassword}
			/>
			{loading ? (
					<ActivityIndicator size='large' color='#0000FF' />
				) : (
					<View style={styles.buttonsContainer}>
						<Button title='Login' onPress={() => signIn()} />
						<Button title='Create Account' onPress={() => signUp()} />
					</View>
				)
			}

		</View>
	);
};

export default Login;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		padding: 20,
	},
	input: {
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		marginBottom: 12,
		paddingLeft: 8,
	},
	buttonsContainer: {
		flexDirection: 'column',
        justifyContent: 'space-between',
        marginVertical: 5,
        width:'100%',
	},
	button: {
		margin: 10,
		borderRadius: 10,
		padding: 10,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#0000FF',
	},
	buttonText: {
		color: 'white',
		fontSize: 16,
	},
	message: {
		marginTop: 20,
		color: 'red',
	},
});
