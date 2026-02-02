import React, { useState } from 'react';
import { Plane, MapPin, Calendar, Users, Heart, Search, Menu, Bell, User, Plus, ChevronRight } from 'lucide-react';

export default function TravelDesignSystem() {
  const [activeTab, setActiveTab] = useState('colors');
  const [copiedItem, setCopiedItem] = useState('');

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(label);
    setTimeout(() => setCopiedItem(''), 2000);
  };

  const colors = {
    primary: {
      name: 'Bleu Voyage',
      shades: [
        { name: 'Primary 50', hex: '#EFF6FF', css: 'bg-blue-50' },
        { name: 'Primary 100', hex: '#DBEAFE', css: 'bg-blue-100' },
        { name: 'Primary 500', hex: '#3B82F6', css: 'bg-blue-500' },
        { name: 'Primary 600', hex: '#2563EB', css: 'bg-blue-600' },
        { name: 'Primary 700', hex: '#1D4ED8', css: 'bg-blue-700' },
      ]
    },
    neutral: {
      name: 'Gris Neutre',
      shades: [
        { name: 'White', hex: '#FFFFFF', css: 'bg-white' },
        { name: 'Gray 50', hex: '#F9FAFB', css: 'bg-gray-50' },
        { name: 'Gray 100', hex: '#F3F4F6', css: 'bg-gray-100' },
        { name: 'Gray 400', hex: '#9CA3AF', css: 'bg-gray-400' },
        { name: 'Gray 600', hex: '#4B5563', css: 'bg-gray-600' },
        { name: 'Gray 900', hex: '#111827', css: 'bg-gray-900' },
      ]
    },
    semantic: {
      name: 'Couleurs Sémantiques',
      shades: [
        { name: 'Success', hex: '#10B981', css: 'bg-green-500' },
        { name: 'Warning', hex: '#F59E0B', css: 'bg-amber-500' },
        { name: 'Error', hex: '#EF4444', css: 'bg-red-500' },
        { name: 'Info', hex: '#3B82F6', css: 'bg-blue-500' },
      ]
    }
  };

  const typography = [
    { name: 'Display', size: '3.75rem', weight: '700', class: 'text-6xl font-bold', example: 'Votre Voyage' },
    { name: 'H1', size: '3rem', weight: '700', class: 'text-5xl font-bold', example: 'Titre Principal' },
    { name: 'H2', size: '2.25rem', weight: '600', class: 'text-4xl font-semibold', example: 'Sous-titre' },
    { name: 'H3', size: '1.875rem', weight: '600', class: 'text-3xl font-semibold', example: 'Section' },
    { name: 'Body Large', size: '1.125rem', weight: '400', class: 'text-lg', example: 'Texte de présentation important' },
    { name: 'Body', size: '1rem', weight: '400', class: 'text-base', example: 'Texte courant et paragraphes' },
    { name: 'Body Small', size: '0.875rem', weight: '400', class: 'text-sm', example: 'Informations secondaires' },
    { name: 'Caption', size: '0.75rem', weight: '400', class: 'text-xs', example: 'Labels et légendes' },
  ];

  const spacing = [
    { name: 'xs', value: '0.25rem (4px)', class: 'p-1' },
    { name: 'sm', value: '0.5rem (8px)', class: 'p-2' },
    { name: 'md', value: '1rem (16px)', class: 'p-4' },
    { name: 'lg', value: '1.5rem (24px)', class: 'p-6' },
    { name: 'xl', value: '2rem (32px)', class: 'p-8' },
    { name: '2xl', value: '3rem (48px)', class: 'p-12' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Plane className="text-blue-600" size={28} />
              <h1 className="text-2xl font-bold text-gray-900">Design System</h1>
              <span className="text-sm text-gray-500 ml-2">Travel App MVP</span>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
                Documentation
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
                Télécharger
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-6">
            {['colors', 'typography', 'spacing', 'components', 'icons'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Colors Tab */}
        {activeTab === 'colors' && (
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Palette de Couleurs</h2>
              <p className="text-gray-600">Couleurs épurées et apaisantes pour une expérience voyage sereine</p>
            </div>

            {Object.entries(colors).map(([key, palette]) => (
              <div key={key}>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{palette.name}</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {palette.shades.map((shade) => (
                    <div key={shade.name} className="space-y-2">
                      <div 
                        className={`h-24 rounded-lg ${shade.css} ${shade.hex === '#FFFFFF' ? 'border border-gray-200' : ''} cursor-pointer hover:scale-105 transition-transform`}
                        onClick={() => copyToClipboard(shade.hex, shade.name)}
                      />
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-900">{shade.name}</p>
                        <p className="text-xs text-gray-500 font-mono">{shade.hex}</p>
                        {copiedItem === shade.name && (
                          <p className="text-xs text-green-600">✓ Copié!</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* CSS Variables */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">CSS Variables (à intégrer)</h3>
              <pre className="bg-gray-50 p-4 rounded text-sm overflow-x-auto">
{`:root {
  /* Primary - Bleu Voyage */
  --color-primary-50: #EFF6FF;
  --color-primary-500: #3B82F6;
  --color-primary-600: #2563EB;
  --color-primary-700: #1D4ED8;
  
  /* Neutral */
  --color-gray-50: #F9FAFB;
  --color-gray-900: #111827;
  
  /* Semantic */
  --color-success: #10B981;
  --color-error: #EF4444;
}`}
              </pre>
            </div>
          </div>
        )}

        {/* Typography Tab */}
        {activeTab === 'typography' && (
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Typographie</h2>
              <p className="text-gray-600">Inter - Police claire et lisible pour tous les âges</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
              {typography.map((typo) => (
                <div key={typo.name} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">{typo.name}</h4>
                      <p className="text-xs text-gray-500 font-mono mt-1">
                        {typo.size} / {typo.weight}
                      </p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(typo.class, typo.name)}
                      className="text-xs text-blue-600 hover:text-blue-700"
                    >
                      {copiedItem === typo.name ? '✓ Copié' : 'Copier classe'}
                    </button>
                  </div>
                  <p className={`${typo.class} text-gray-900`}>{typo.example}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Spacing Tab */}
        {activeTab === 'spacing' && (
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Espacement</h2>
              <p className="text-gray-600">Système d'espacement cohérent basé sur 4px</p>
            </div>

            <div className="space-y-4">
              {spacing.map((space) => (
                <div key={space.name} className="bg-white rounded-lg p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-sm font-semibold text-gray-900">{space.name}</span>
                      <span className="text-sm text-gray-500 ml-3">{space.value}</span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(space.class, space.name)}
                      className="text-xs text-blue-600 hover:text-blue-700"
                    >
                      {copiedItem === space.name ? '✓ Copié' : 'Copier classe'}
                    </button>
                  </div>
                  <div className="flex">
                    <div className={`bg-blue-100 ${space.class}`}>
                      <div className="bg-blue-500 h-12 w-12 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Components Tab */}
        {activeTab === 'components' && (
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Composants</h2>
              <p className="text-gray-600">Bibliothèque de composants réutilisables</p>
            </div>

            {/* Buttons */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Boutons</h3>
              <div className="bg-white rounded-lg p-8 border border-gray-200">
                <div className="flex flex-wrap gap-4">
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                    Primary Button
                  </button>
                  <button className="px-6 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 font-medium">
                    Secondary Button
                  </button>
                  <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium">
                    Tertiary Button
                  </button>
                  <button className="px-6 py-3 text-blue-600 hover:bg-blue-50 rounded-lg font-medium">
                    Text Button
                  </button>
                </div>
                
                <div className="mt-6 flex flex-wrap gap-4">
                  <button className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <Plus size={20} />
                  </button>
                  <button className="p-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50">
                    <Heart size={20} />
                  </button>
                  <button className="p-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                    <Search size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Inputs */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Champs de saisie</h3>
              <div className="bg-white rounded-lg p-8 border border-gray-200 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Destination
                  </label>
                  <input
                    type="text"
                    placeholder="Où souhaitez-vous aller ?"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dates du voyage
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Sélectionnez vos dates"
                      className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                    <Calendar className="absolute left-3 top-3.5 text-gray-400" size={20} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    placeholder="Décrivez votre voyage..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Cards */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Cartes</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Travel Card */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600"></div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-lg font-semibold text-gray-900">Paris, France</h4>
                      <button className="text-gray-400 hover:text-red-500">
                        <Heart size={20} />
                      </button>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                      <Calendar size={16} />
                      <span>15-22 Mars 2024</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">5 activités</span>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
                        Voir détails
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Activity Card */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                        <MapPin className="text-blue-600" size={28} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Tour Eiffel</h4>
                      <p className="text-sm text-gray-600 mb-3">Visite du monument emblématique</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          16 Mars, 14h
                        </span>
                        <span className="flex items-center gap-1">
                          <Users size={14} />
                          4 personnes
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Navigation</h3>
              <div className="bg-white rounded-lg border border-gray-200 p-8">
                <div className="flex items-center justify-around">
                  <button className="flex flex-col items-center gap-2 text-blue-600">
                    <MapPin size={24} />
                    <span className="text-xs font-medium">Voyages</span>
                  </button>
                  <button className="flex flex-col items-center gap-2 text-gray-400 hover:text-gray-600">
                    <Search size={24} />
                    <span className="text-xs font-medium">Explorer</span>
                  </button>
                  <button className="flex flex-col items-center gap-2 text-gray-400 hover:text-gray-600">
                    <Heart size={24} />
                    <span className="text-xs font-medium">Favoris</span>
                  </button>
                  <button className="flex flex-col items-center gap-2 text-gray-400 hover:text-gray-600">
                    <User size={24} />
                    <span className="text-xs font-medium">Profil</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Alerts */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Alertes</h3>
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
                  <Bell className="text-blue-600 flex-shrink-0" size={20} />
                  <div>
                    <p className="text-sm font-medium text-blue-900">Information</p>
                    <p className="text-sm text-blue-700">Votre voyage a été créé avec succès</p>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3">
                  <div className="text-green-600 flex-shrink-0">✓</div>
                  <div>
                    <p className="text-sm font-medium text-green-900">Succès</p>
                    <p className="text-sm text-green-700">Activité ajoutée à votre itinéraire</p>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
                  <div className="text-amber-600 flex-shrink-0">⚠</div>
                  <div>
                    <p className="text-sm font-medium text-amber-900">Attention</p>
                    <p className="text-sm text-amber-700">Vérifiez vos dates de réservation</p>
                  </div>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
                  <div className="text-red-600 flex-shrink-0">✕</div>
                  <div>
                    <p className="text-sm font-medium text-red-900">Erreur</p>
                    <p className="text-sm text-red-700">Impossible de sauvegarder les modifications</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Icons Tab */}
        {activeTab === 'icons' && (
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Iconographie</h2>
              <p className="text-gray-600">Icônes Lucide React - Cohérentes et épurées</p>
            </div>

            <div className="bg-white rounded-lg p-8 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Icônes principales</h3>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-8">
                {[
                  { Icon: Plane, name: 'Avion' },
                  { Icon: MapPin, name: 'Lieu' },
                  { Icon: Calendar, name: 'Calendrier' },
                  { Icon: Users, name: 'Groupe' },
                  { Icon: Heart, name: 'Favoris' },
                  { Icon: Search, name: 'Recherche' },
                  { Icon: Menu, name: 'Menu' },
                  { Icon: Bell, name: 'Notification' },
                  { Icon: User, name: 'Profil' },
                  { Icon: Plus, name: 'Ajouter' },
                ].map(({ Icon, name }) => (
                  <div key={name} className="flex flex-col items-center gap-3 text-gray-600 hover:text-blue-600 cursor-pointer">
                    <Icon size={32} />
                    <span className="text-xs text-center">{name}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Installation :</strong> npm install lucide-react
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Import :</strong> import {`{ Plane, MapPin }`} from 'lucide-react'
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center text-sm text-gray-500">
            <p>Design System - Application d'Organisation de Voyage MVP</p>
            <p className="mt-2">Stack : Vue.js 3 + Tailwind CSS + .NET + PostgreSQL</p>
          </div>
        </div>
      </footer>
    </div>
  );
}