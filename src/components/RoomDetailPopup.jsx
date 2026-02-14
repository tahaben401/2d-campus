import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Building2, User, Layers, Info, CheckCircle2, AlertCircle, Clock } from 'lucide-react';

const getStatusConfig = (status) => {
    switch (status) {
        case 'Occupée':
            return {
                gradient: 'from-rose-500 to-red-600',
                bg: 'bg-rose-500/10',
                border: 'border-rose-500/20',
                text: 'text-rose-500',
                icon: AlertCircle,
                label: 'Occupée'
            };
        case 'Disponible':
            return {
                gradient: 'from-emerald-500 to-teal-600',
                bg: 'bg-emerald-500/10',
                border: 'border-emerald-500/20',
                text: 'text-emerald-500',
                icon: CheckCircle2,
                label: 'Disponible'
            };
        case 'En maintenance':
            return {
                gradient: 'from-amber-500 to-orange-600',
                bg: 'bg-amber-500/10',
                border: 'border-amber-500/20',
                text: 'text-amber-500',
                icon: Clock,
                label: 'Maintenance'
            };
        default:
            return {
                gradient: 'from-slate-500 to-slate-600',
                bg: 'bg-slate-500/10',
                border: 'border-slate-500/20',
                text: 'text-slate-500',
                icon: Info,
                label: 'Statut inconnu'
            };
    }
};

const InfoItem = ({ icon: Icon, label, value, delay }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay, duration: 0.3 }}
        className="flex items-center gap-4 p-3 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-colors group"
    >
        <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 group-hover:bg-cyan-500/10 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
            <Icon className="w-5 h-5" />
        </div>
        <div>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{label}</p>
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{value || 'N/A'}</p>
        </div>
    </motion.div>
);

const RoomDetailPopup = ({ room, position, onClose }) => {
    if (!room) return null;

    const statusConfig = getStatusConfig(room.etat);
    const StatusIcon = statusConfig.icon;

    return (
        <AnimatePresence mode="wait">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 z-40 bg-slate-900/20 dark:bg-slate-950/40 backdrop-blur-sm"
            />

            {/* Popup Container - Centered */}
            <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-4">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 10 }}
                    transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                    className="w-full max-w-sm pointer-events-auto"
                >
                    {/* Glass Card */}
                    <div className="relative overflow-hidden rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-white/20 dark:border-slate-700 shadow-2xl shadow-slate-500/10 dark:shadow-black/50">

                        {/* Header Gradient Background */}
                        <div className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-br ${statusConfig.gradient} opacity-10`} />

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-slate-500 dark:text-slate-400 z-10"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="relative p-6 pt-8">
                            {/* Main Header */}
                            <div className="text-center mb-8">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", delay: 0.1 }}
                                    className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${statusConfig.gradient} flex items-center justify-center shadow-lg shadow-${statusConfig.text.split('-')[1]}-500/30`}
                                >
                                    <span className="text-2xl font-bold text-white">
                                        {room.numero_chambre?.toString().slice(-2)}
                                    </span>
                                </motion.div>
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-1">
                                    Chambre {room.numero_chambre}
                                </h3>
                                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${statusConfig.bg} ${statusConfig.border} border ${statusConfig.text}`}>
                                    <StatusIcon className="w-3.5 h-3.5" />
                                    {statusConfig.label}
                                </div>
                            </div>

                            {/* Details Grid */}
                            <div className="space-y-3">
                                <InfoItem
                                    icon={Layers}
                                    label="Type"
                                    value={room.type_chambre}
                                    delay={0.2}
                                />
                                <InfoItem
                                    icon={Building2}
                                    label="Bâtiment"
                                    value={room.batiment}
                                    delay={0.3}
                                />
                                <InfoItem
                                    icon={User}
                                    label="Occupant"
                                    value={room.etudiant_nom || (room.etat === 'Disponible' ? 'Aucun' : 'Non assigné')}
                                    delay={0.4}
                                />
                            </div>

                            {/* Footer Action */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="mt-8"
                            >
                                <button
                                    onClick={onClose}
                                    className="w-full py-3.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold shadow-lg shadow-slate-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                                >
                                    Fermer
                                </button>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default RoomDetailPopup;
