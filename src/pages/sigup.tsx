import React, { useState } from 'react';
import { BuildingIcon, UserIcon, MailIcon, LockClosedIcon } from '../components/icons';
import { useTheme } from '../context/ThemeContext';
import DarkToggle from '../components/DarkToggle';

type SignupProps = {
  onSignup?: (fullName: string, email: string, password: string) => void;
  onNavigate?: (path: string) => void;
};

const Signup: React.FC<SignupProps> = ({ onSignup, onNavigate }) => {
  const { theme } = useTheme();
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.error("Les mots de passe ne correspondent pas !");
      return;
    }
    console.log('Signup attempt:', { fullName, email, password });
    onSignup && onSignup(fullName, email, password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 dark:bg-slate-900 font-sans p-4">
      <div className="w-full max-w-md">
        <div className="absolute top-6 right-6 z-20">
          <DarkToggle />
        </div>
        <div className="bg-white dark:bg-slate-950/70 backdrop-blur-sm border border-slate-200 dark:border-slate-800 shadow-2xl rounded-2xl p-8 md:p-12">
          
          <div className="flex flex-col items-center mb-8">
            <div className="p-3 bg-cyan-100 dark:bg-cyan-500/10 rounded-full border-4 border-cyan-200 dark:border-cyan-500/20 mb-4">
              <BuildingIcon className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">CampusView</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Créez votre compte</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div>
              <label 
                htmlFor="fullName" 
                className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
              >
                Nom Complet
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                </div>
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                />
              </div>
            </div>

            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
              >
                Adresse Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MailIcon className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vous@exemple.com"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                />
              </div>
            </div>

            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
              >
                Mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                </div>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                />
              </div>
            </div>
            <div>
              <label 
                htmlFor="confirmPassword" 
                className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
              >
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                </div>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-500 text-white font-semibold py-3 px-6 rounded-lg shadow-lg shadow-cyan-500/20 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 transition-all duration-300"
            >
              Créer le compte
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-8">
            Vous avez déjà un compte ?
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('login'); }} 
              className="font-semibold text-cyan-600 dark:text-cyan-400 hover:underline ml-1"
            >
              Connectez-vous
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

