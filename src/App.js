import { useState } from 'react';
import './App.css';
import axios from './utils/axios';
import { validateDisposableEmailAddress } from './utils/validators';
import { ReactComponent as PersonSvg } from './assets/person.svg';
import { ReactComponent as SpamSvg } from './assets/spam.svg';
import { ReactComponent as MarketingSvg } from './assets/marketing.svg';

function App() {
	const [emailInput, setEmailInput] = useState('');
	const [response, setResponse] = useState('');
	const [error, setError] = useState('');

	let checkDisposableEmail = async (e) => {
		e.preventDefault();

		setResponse('');
		setError('');

		const email = emailInput.substring(emailInput.lastIndexOf('@') + 1);

		try {
			validateDisposableEmailAddress(email);
			axios.get(`/domain/` + email).then(
				(res) => {
					res.data.disposable
						? setError(email + ' is disposable')
						: setResponse(email + ' is not disposable');
				},
				(err) => {
					setError(err.response.data.error);
				},
			);
		} catch (error) {
			setError(error.message);
		}

		setEmailInput('');
	};

	return (
		<div className="app">
			<div className="app__header">
				<h1>Free Disposable Email Checker</h1>
			</div>
			<form className="app__form" onSubmit={checkDisposableEmail}>
				<img src={require('./assets/mail.png')} alt="envelope icon" />
				<label className="app__form-input">
					<input
						className="app__form-input-field"
						onChange={(e) => setEmailInput(e.target.value)}
						type="text"
						placeholder=" "
					/>
					<span className="app__form-input-label">Email Address or Domain Name</span>
				</label>
				<button type="submit" className="app__form-submit">
					Validate
				</button>
				<div className="response">{response ? <p>{response}</p> : null}</div>
				<div className="error">{error ? <p>{error}</p> : null}</div>
			</form>

			{response ? <div className="app__response"></div> : null}

			<div className="information-grid">
				<div className="information-grid__item">
					<PersonSvg className="information-grid__item-icon" />
					<h2>Prevent Unnecessary Account Registration</h2>
					<p>
						Keep your email list clean from disposable email addresses that will never provide any value to
						your business and will only clutter your server's resources.
					</p>
				</div>
				<div className="information-grid__item">
					<SpamSvg className="information-grid__item-icon" />
					<h2>Reduce Spam and Fraud</h2>
					<p>
						Many malicious visitors will typically hide behind disposable emails in order to conceal their
						true identity. Preventing temporary email addresses can deter visitors from spam, fraud, and
						attacks.
					</p>
				</div>
				<div className="information-grid__item">
					<MarketingSvg className="information-grid__item-icon" />
					<h2>Improve Email Marketing</h2>
					<p>
						Acquiring dozens of disposable email addresses in your list can deteriorate the quality of your
						email list, which can make it impossible to follow up or reach out to some of your subscribers.
					</p>
				</div>
			</div>
		</div>
	);
}

export default App;
