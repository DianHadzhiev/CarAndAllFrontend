'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { verifyEmail } from '../confirm-email/actions';


export function ConfirmEmail({ initialEmail }) {
  const [confirmationCode, setConfirmationCode] = useState('');
  const [state, setState] = useState({ error: null, loading: false });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({ error: null, loading: true });

    try {
      const result = await verifyEmail({ email: initialEmail, confirmationCode: confirmationCode });
      if (result.error) {
        setError(result.error);
        console.log(error)
        setState({loading: true })
      } else if (result.success) {
        router.push('/login');
      }
    } catch (error) {
      console.log(error);
      console.error('Error in handleSubmit:', error);
      setError('An unexpected error occurred');
    }

    router.push('/login');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-500 p-4">
      <div className="w-full max-w-md rounded bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">Verify Your Email</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Confirmation Code
            </label>
            <input
              type="text"
              name="confirmationCode"
              value={confirmationCode}
              onChange={(e) => setConfirmationCode(e.target.value)}
              className="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
              required
              placeholder="Enter the code from your email"
            />
          </div>

          {state.error && (
            <div className="mb-4 rounded bg-red-100 p-3 text-red-700">
              {state.error}
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded bg-blue-600 py-2 px-4 font-medium text-white hover:bg-blue-700 disabled:bg-blue-300"
            disabled={state.loading}
          >
            {state.loading ? 'Verifying...' : 'Verify Email'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Didn't receive the code?{' '}
          <button
            onClick={() => alert('Resend logic not implemented yet!')}
            className="text-blue-600 hover:text-blue-800"
          >
            Resend Code
          </button>
        </p>
      </div>
    </div>
  );
}
