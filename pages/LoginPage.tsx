
import React from 'react';

const LoginPage: React.FC = () => {
    return (
        <div className="bg-nsus-gray-100 flex items-center justify-center py-24">
            <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-nsus-gray-900">Welcome Back</h2>
                    <p className="mt-2 text-nsus-gray-500">Log in to manage your applications.</p>
                </div>
                <form className="mt-8 space-y-6" action="#" method="POST">
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-3 border border-nsus-gray-300 placeholder-nsus-gray-500 text-nsus-gray-900 rounded-t-md focus:outline-none focus:ring-nsus-blue focus:border-nsus-blue focus:z-10 sm:text-sm" placeholder="Email address" />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-3 border border-nsus-gray-300 placeholder-nsus-gray-500 text-nsus-gray-900 rounded-b-md focus:outline-none focus:ring-nsus-blue focus:border-nsus-blue focus:z-10 sm:text-sm" placeholder="Password" />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="text-sm">
                            <a href="#" className="font-medium text-nsus-blue hover:text-blue-700">Forgot your password?</a>
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-nsus-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nsus-blue">
                            Sign in
                        </button>
                    </div>
                </form>
                 <div className="mt-6">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Or continue with</span>
                      </div>
                    </div>

                    <div className="mt-6">
                      <a href="#" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        SSO Login
                      </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
