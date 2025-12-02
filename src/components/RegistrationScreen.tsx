import React, { useState, useRef } from 'react';
import { UserData } from '../types';
import { Camera, Upload, ArrowRight, Ruler, Weight, CheckCircle2 } from 'lucide-react';

interface RegistrationScreenProps {
    user: UserData;
    onRegister: (updatedUser: UserData) => void;
}

const RegistrationScreen: React.FC<RegistrationScreenProps> = ({ user, onRegister }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<Partial<UserData>>({
        height: '',
        weight: '',
        measurements: {
            waist: '',
            bust: '',
            leg: '',
            butt: '',
        },
        photos: {
            frontLegs: '',
            sideButt: '',
        }
    });

    const fileInputRef1 = useRef<HTMLInputElement>(null);
    const fileInputRef2 = useRef<HTMLInputElement>(null);

    const handleMeasurementChange = (key: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            measurements: {
                ...prev.measurements!,
                [key]: value
            }
        }));
    };

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, key: 'frontLegs' | 'sideButt') => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    photos: {
                        ...prev.photos!,
                        [key]: reader.result as string
                    }
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        const updatedUser: UserData = {
            ...user,
            ...formData,
            registrationCompleted: true
        };
        onRegister(updatedUser);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
            <div className="w-full max-w-lg glass-card rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10 animate-fade-in-up">

                {/* Progress Bar */}
                <div className="flex justify-between mb-8 relative">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 dark:bg-slate-700 -z-10 rounded-full"></div>
                    <div className={`absolute top-1/2 left-0 h-1 bg-brand-500 -z-10 rounded-full transition-all duration-500`} style={{ width: `${((step - 1) / 2) * 100}%` }}></div>

                    {[1, 2, 3].map((s) => (
                        <div key={s} className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${step >= s ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/30' : 'bg-slate-200 dark:bg-slate-700 text-slate-400'}`}>
                            {step > s ? <CheckCircle2 size={16} /> : s}
                        </div>
                    ))}
                </div>

                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                        {step === 1 && "Vamos nos conhecer!"}
                        {step === 2 && "Suas Medidas"}
                        {step === 3 && "Registro Fotográfico"}
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                        {step === 1 && "Para personalizar seu treino, precisamos de alguns dados."}
                        {step === 2 && "Acompanhe sua evolução com precisão."}
                        {step === 3 && "As fotos são essenciais para comparar seu antes e depois."}
                    </p>
                </div>

                {/* Step 1: Basic Info */}
                {step === 1 && (
                    <div className="space-y-4 animate-fade-in">
                        <div>
                            <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1 ml-1 uppercase tracking-wide">Altura (cm)</label>
                            <div className="relative">
                                <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="number"
                                    className="w-full pl-10 bg-white/50 dark:bg-slate-800/50 border border-white/40 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
                                    placeholder="Ex: 165"
                                    value={formData.height}
                                    onChange={e => setFormData({ ...formData, height: e.target.value })}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1 ml-1 uppercase tracking-wide">Peso (kg)</label>
                            <div className="relative">
                                <Weight className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="number"
                                    className="w-full pl-10 bg-white/50 dark:bg-slate-800/50 border border-white/40 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
                                    placeholder="Ex: 60.5"
                                    value={formData.weight}
                                    onChange={e => setFormData({ ...formData, weight: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 2: Measurements */}
                {step === 2 && (
                    <div className="grid grid-cols-2 gap-4 animate-fade-in">
                        {['bust', 'waist', 'butt', 'leg'].map((key) => (
                            <div key={key}>
                                <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1 ml-1 uppercase tracking-wide">
                                    {key === 'bust' && 'Busto'}
                                    {key === 'waist' && 'Cintura'}
                                    {key === 'butt' && 'Quadril/Glúteo'}
                                    {key === 'leg' && 'Coxa'} (cm)
                                </label>
                                <input
                                    type="number"
                                    className="w-full bg-white/50 dark:bg-slate-800/50 border border-white/40 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
                                    placeholder="0"
                                    value={formData.measurements?.[key as keyof typeof formData.measurements]}
                                    onChange={e => handleMeasurementChange(key, e.target.value)}
                                />
                            </div>
                        ))}
                    </div>
                )}

                {/* Step 3: Photos */}
                {step === 3 && (
                    <div className="space-y-4 animate-fade-in">
                        {/* Front Legs Photo */}
                        <div
                            className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-4 text-center cursor-pointer hover:border-brand-500 transition-colors bg-white/30 dark:bg-slate-800/30"
                            onClick={() => fileInputRef1.current?.click()}
                        >
                            <input
                                type="file"
                                ref={fileInputRef1}
                                className="hidden"
                                accept="image/*"
                                onChange={(e) => handlePhotoUpload(e, 'frontLegs')}
                            />
                            {formData.photos?.frontLegs ? (
                                <div className="relative h-32 w-full">
                                    <img src={formData.photos.frontLegs} alt="Front Legs" className="h-full w-full object-cover rounded-xl" />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-xl opacity-0 hover:opacity-100 transition-opacity">
                                        <span className="text-white text-xs font-bold">Alterar</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center py-4">
                                    <div className="w-12 h-12 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center mb-2 text-brand-500">
                                        <Camera size={24} />
                                    </div>
                                    <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Foto Pernas (Frente)</p>
                                    <p className="text-xs text-slate-500">Clique para enviar</p>
                                </div>
                            )}
                        </div>

                        {/* Side Butt Photo */}
                        <div
                            className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-4 text-center cursor-pointer hover:border-brand-500 transition-colors bg-white/30 dark:bg-slate-800/30"
                            onClick={() => fileInputRef2.current?.click()}
                        >
                            <input
                                type="file"
                                ref={fileInputRef2}
                                className="hidden"
                                accept="image/*"
                                onChange={(e) => handlePhotoUpload(e, 'sideButt')}
                            />
                            {formData.photos?.sideButt ? (
                                <div className="relative h-32 w-full">
                                    <img src={formData.photos.sideButt} alt="Side Butt" className="h-full w-full object-cover rounded-xl" />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-xl opacity-0 hover:opacity-100 transition-opacity">
                                        <span className="text-white text-xs font-bold">Alterar</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center py-4">
                                    <div className="w-12 h-12 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center mb-2 text-brand-500">
                                        <Camera size={24} />
                                    </div>
                                    <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Foto Glúteo (Lateral)</p>
                                    <p className="text-xs text-slate-500">Clique para enviar</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="mt-8 flex gap-3">
                    {step > 1 && (
                        <button
                            onClick={() => setStep(step - 1)}
                            className="flex-1 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                            Voltar
                        </button>
                    )}

                    <button
                        onClick={() => {
                            if (step < 3) setStep(step + 1);
                            else handleSubmit();
                        }}
                        disabled={
                            (step === 1 && (!formData.height || !formData.weight)) ||
                            (step === 2 && (!formData.measurements?.waist || !formData.measurements?.bust || !formData.measurements?.leg || !formData.measurements?.butt)) ||
                            (step === 3 && (!formData.photos?.frontLegs || !formData.photos?.sideButt))
                        }
                        className="flex-[2] bg-brand-600 hover:bg-brand-500 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-brand-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {step === 3 ? "Finalizar Cadastro" : "Próximo"}
                        <ArrowRight size={18} />
                    </button>
                </div>

            </div>
        </div>
    );
};

export default RegistrationScreen;
