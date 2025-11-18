import React, { useState } from 'react';
import { BuildingIcon, MailIcon, LockClosedIcon } from '../components/icons';
import { useTheme } from '../context/ThemeContext';
import DarkToggle from '../components/DarkToggle';
import { useNavigate } from 'react-router-dom';
import {toast} from 'sonner';

type LoginProps = {
  onLogin?: (email: string, password: string) => void;
};

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading,setLoading]=useState(false);
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true)
    try{
      e.preventDefault();
      console.log('Login attempt:', { email, password });
      onLogin && onLogin(email, password);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }catch{
      toast.error('Erreur de connexion');
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 dark:bg-slate-900 font-sans p-4">
       <div className="absolute top-6 right-6 z-20">
          <DarkToggle />
        </div>
      <div className="w-full max-w-md relative">
       

        <div className="bg-white dark:bg-slate-950/70 backdrop-blur-sm border border-slate-200 dark:border-slate-800 shadow-2xl rounded-2xl p-8 md:p-12">
          <div className="flex flex-col items-center mb-8">
            <div className="p-3 bg-cyan-100 dark:bg-cyan-500/10 rounded-full border-4 border-cyan-200 dark:border-cyan-500/20 mb-4">
              <BuildingIcon className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">CampusView</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Connectez-vous à votre compte</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
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
                  className="w-full pl-10 pr-4 py-3 bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="password" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Mot de passe
                </label>
                <a href="#" className="text-sm font-medium text-cyan-600 dark:text-cyan-400 hover:underline">
                  Oublié ?
                </a>
              </div>
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
                  className="w-full pl-10 pr-4 py-3 bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-500 text-white font-semibold py-3 px-6 rounded-lg shadow-lg shadow-cyan-500/20 hover:bg-cyan-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-cyan-500"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <style>{`.spinner_P7sC{transform-origin:center;animation:spinner_svv2 .75s infinite linear}@keyframes spinner_svv2{100%{transform:rotate(360deg)}}`}</style>
                    <path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z" className="spinner_P7sC" fill="currentColor"/>
                  </svg>
                  Connexion...
                </span>
              ) : (
                'Se connecter'
              )}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-8">
            Pas de compte ?
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate('/signup');
              }}
              className="font-semibold text-cyan-600 dark:text-cyan-400 hover:underline ml-1"
            >
              Créez-en un
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
