import React from 'react';
import { Shield, ArrowRight } from 'lucide-react';

const TwoFactorVerifyPage = () => {
  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Two-factor verification
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Enter the code from your authenticator app
        </p>
      </div>

      <form className="mt-8 space-y-6">
        <div className="rounded-md shadow-sm">
          <div>
            <label htmlFor="verification-code" className="sr-only">
              Verification code
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Shield className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="verification-code"
                name="verification-code"
                type="text"
                required
                className="block w-full rounded-md border-0 py-2.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:placeholder:text-gray-500"
                placeholder="Enter 6-digit code"
              />
            </div>
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
            Verify
          </button>
        </div>
      </form>

      <div className="text-center text-sm">
        <p className="text-gray-600 dark:text-gray-400">
          Having trouble? Contact support for assistance
        </p>
      </div>
    </div>
  );
};

export default TwoFactorVerifyPage;