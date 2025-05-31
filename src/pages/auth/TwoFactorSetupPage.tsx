import React from 'react';
import { QrCode, ArrowRight } from 'lucide-react';

const TwoFactorSetupPage = () => {
  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Set up two-factor authentication
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Enhance your account security with 2FA
        </p>
      </div>

      <div className="mt-8 space-y-6">
        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="flex items-center justify-center">
            <div className="h-48 w-48 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              <QrCode className="h-24 w-24 text-gray-400" />
            </div>
          </div>
          
          <div className="mt-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              1. Install an authenticator app like Google Authenticator or Authy
            </p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              2. Scan the QR code or enter the code manually
            </p>
            <div className="mt-4">
              <label htmlFor="setup-code" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Manual entry code
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="setup-code"
                  id="setup-code"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-gray-800 dark:text-white dark:ring-gray-700 sm:text-sm sm:leading-6"
                  value="XXXX XXXX XXXX XXXX"
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>

        <form className="space-y-6">
          <div>
            <label htmlFor="verification-code" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Enter verification code
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="verification-code"
                id="verification-code"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-gray-800 dark:text-white dark:ring-gray-700 sm:text-sm sm:leading-6"
                placeholder="Enter 6-digit code"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </span>
              Verify and enable 2FA
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TwoFactorSetupPage;