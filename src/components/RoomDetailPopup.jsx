import React from 'react';

// Icons for the popup
const StatusIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const RoomTypeIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
);

const BuildingIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
);

const UserIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const FloorIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
);

const CloseIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const getStatusConfig = (status) => {
    switch (status) {
        case 'Occupée':
            return {
                gradient: 'from-red-500 to-rose-600',
                bgLight: 'bg-red-50',
                bgDark: 'dark:bg-red-900/20',
                textColor: 'text-red-600 dark:text-red-400',
                borderColor: 'border-red-200 dark:border-red-800',
                dotColor: 'bg-red-500',
                label: 'Occupée'
            };
        case 'Disponible':
            return {
                gradient: 'from-emerald-500 to-green-600',
                bgLight: 'bg-emerald-50',
                bgDark: 'dark:bg-emerald-900/20',
                textColor: 'text-emerald-600 dark:text-emerald-400',
                borderColor: 'border-emerald-200 dark:border-emerald-800',
                dotColor: 'bg-emerald-500',
                label: 'Disponible'
            };
        case 'En maintenance':
            return {
                gradient: 'from-amber-500 to-orange-500',
                bgLight: 'bg-amber-50',
                bgDark: 'dark:bg-amber-900/20',
                textColor: 'text-amber-600 dark:text-amber-400',
                borderColor: 'border-amber-200 dark:border-amber-800',
                dotColor: 'bg-amber-500',
                label: 'En maintenance'
            };
        default:
            return {
                gradient: 'from-slate-500 to-slate-600',
                bgLight: 'bg-slate-50',
                bgDark: 'dark:bg-slate-900/20',
                textColor: 'text-slate-600 dark:text-slate-400',
                borderColor: 'border-slate-200 dark:border-slate-800',
                dotColor: 'bg-slate-500',
                label: 'Inconnu'
            };
    }
};

const RoomDetailPopup = ({ room, position, onClose }) => {
    if (!room) return null;

    const statusConfig = getStatusConfig(room.etat);

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-40 popup-backdrop animate-fadeIn"
                onClick={onClose}
            />

            {/* Popup - Always centered at top */}
            <div
                className="fixed z-50 w-80 animate-bounceIn"
                style={{
                    top: '80px',
                    left: '50%',
                    transform: 'translateX(-50%)'
                }}
            >
                {/* Card with solid background for better dark mode visibility */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700">

                    {/* Header with Gradient */}
                    <div className={`bg-gradient-to-r ${statusConfig.gradient} p-5 relative`}>
                        {/* Decorative circles */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

                        <div className="relative">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-white/80 text-sm font-medium mb-1">Chambre</p>
                                    <h3 className="text-3xl font-bold text-white tracking-tight">
                                        {room.numero_chambre}
                                    </h3>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all duration-200 hover:scale-110 hover:rotate-90"
                                >
                                    <CloseIcon className="w-5 h-5 text-white" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 space-y-4">

                        {/* Status Badge */}
                        <div className={`flex items-center gap-3 p-3 rounded-xl ${statusConfig.bgLight} ${statusConfig.bgDark} border ${statusConfig.borderColor}`}>
                            <div className="relative">
                                <div className={`w-3 h-3 rounded-full ${statusConfig.dotColor}`} />
                                <div className={`absolute inset-0 w-3 h-3 rounded-full ${statusConfig.dotColor} animate-ping opacity-75`} />
                            </div>
                            <span className={`font-semibold ${statusConfig.textColor}`}>
                                {statusConfig.label}
                            </span>
                        </div>

                        {/* Info Items */}
                        <div className="space-y-3">
                            {/* Type de chambre */}
                            <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200">
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                                    <RoomTypeIcon className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Type</p>
                                    <p className="text-sm font-semibold text-slate-800 dark:text-white">
                                        {room.type_chambre || 'Non spécifié'}
                                    </p>
                                </div>
                            </div>

                            {/* Bâtiment */}
                            <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200">
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                                    <BuildingIcon className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Bâtiment</p>
                                    <p className="text-sm font-semibold text-slate-800 dark:text-white">
                                        {room.batiment || 'Non spécifié'}
                                    </p>
                                </div>
                            </div>

                            {/* Étage */}
                            {room.etage && (
                                <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200">
                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                                        <FloorIcon className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Étage</p>
                                        <p className="text-sm font-semibold text-slate-800 dark:text-white">
                                            {room.etage}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Étudiant (si occupée) */}
                            {room.etudiant_nom && (
                                <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200">
                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center">
                                        <UserIcon className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Étudiant</p>
                                        <p className="text-sm font-semibold text-slate-800 dark:text-white">
                                            {room.etudiant_nom}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="px-5 pb-5">
                        <button
                            onClick={onClose}
                            className="w-full py-3 px-4 bg-gradient-to-r from-slate-800 to-slate-900 dark:from-slate-700 dark:to-slate-800 text-white font-semibold rounded-xl hover:from-slate-700 hover:to-slate-800 dark:hover:from-slate-600 dark:hover:to-slate-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
                        >
                            <span>Fermer</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RoomDetailPopup;
