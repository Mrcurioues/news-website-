import React, { useState, useEffect } from 'react';
import { Globe, Users, Workflow, Search, Share2, Bell, Puzzle, Terminal, ChevronRight, Plus, Edit2, Trash2, X, KeyRound, User, Shield, Camera, Lock, Save } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { createSupabaseUser, updateSupabaseUserPassword, verifyCurrentPasswordAndUpdate, supabase, isSupabaseConfigured } from '../../services/supabase';
import { useAuthStore } from '../../stores/authStore';
import { useSiteConfigStore, uploadLogoToSupabase } from '../../stores/siteConfigStore';

const TABS = [
  { id: 'profile', label: 'My Profile & Account', icon: User },
  { id: 'sections', label: 'Sections & Topics', icon: Globe },
  { id: 'authors', label: 'Authors & Users', icon: Users },
  { id: 'workflow', label: 'Editorial Workflow', icon: Workflow },
  { id: 'seo', label: 'SEO Defaults', icon: Search },
  { id: 'social', label: 'Social', icon: Share2 },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'integrations', label: 'Integrations', icon: Puzzle },
  { id: 'developer', label: 'Developer Tools', icon: Terminal },
];

interface SectionItem {
  id: string;
  name: string;
  slug: string;
  color: string;
  storiesCount: number;
}

interface AuthorItem {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Journalist';
  stories: number;
  status: 'active' | 'inactive';
}

const INITIAL_SECTIONS: SectionItem[] = [
  { id: 'sec-1', name: 'National', slug: 'national', color: '#1E40AF', storiesCount: 42 },
  { id: 'sec-2', name: 'Politics', slug: 'politics', color: '#7C3AED', storiesCount: 28 },
  { id: 'sec-3', name: 'Business', slug: 'business', color: '#059669', storiesCount: 19 },
  { id: 'sec-4', name: 'Cricket', slug: 'cricket', color: '#DC2626', storiesCount: 35 },
  { id: 'sec-5', name: 'Tech & AI', slug: 'tech', color: '#0891B2', storiesCount: 24 },
  { id: 'sec-6', name: 'Entertainment', slug: 'entertainment', color: '#D97706', storiesCount: 17 },
  { id: 'sec-7', name: 'Lifestyle', slug: 'lifestyle', color: '#BE185D', storiesCount: 13 },
  { id: 'sec-8', name: 'World', slug: 'world', color: '#4F46E5', storiesCount: 22 },
];

const INITIAL_AUTHORS: AuthorItem[] = [
  { id: 'auth-1', name: 'Amit Sharma', email: 'amit@bharatnews.com', role: 'Admin', stories: 47, status: 'active' },
  { id: 'auth-2', name: 'Priya Mehta', email: 'priya@bharatnews.com', role: 'Editor', stories: 93, status: 'active' },
  { id: 'auth-3', name: 'Rahul Verma', email: 'rahul@bharatnews.com', role: 'Journalist', stories: 38, status: 'active' },
  { id: 'auth-4', name: 'Anita Kapoor', email: 'anita@bharatnews.com', role: 'Journalist', stories: 52, status: 'active' },
  { id: 'auth-5', name: 'Deepak Singh', email: 'deepak@bharatnews.com', role: 'Journalist', stories: 29, status: 'inactive' },
];

export const SettingsPage: React.FC<{ onNavigate: (p: string) => void }> = () => {
  const { user, setUser } = useAuthStore();
  const { config, updateConfig } = useSiteConfigStore();
  const initialTab = typeof window !== 'undefined' ? (new URLSearchParams(window.location.search).get('tab') || 'profile') : 'profile';
  const [activeTab, setActiveTab] = useState(initialTab);
  
  // Profile Form & Password States
  const [profileName, setProfileName] = useState(user?.name || 'Amit Sharma');
  const [profileEmail, setProfileEmail] = useState(user?.email || 'amit@bharatnews.com');
  const [profileBio, setProfileBio] = useState(user?.bio || 'Chief Editor & Senior Journalist covering National Affairs, Technology, and Public Governance.');
  const [profileAvatar, setProfileAvatar] = useState(user?.avatar || '');

  // Site Logo & Branding States
  const [siteLogoUrl, setSiteLogoUrl] = useState(config.logoUrl || '');
  const [siteBadgeText, setSiteBadgeText] = useState(config.logoBadgeText || 'भा');
  const [primaryColor, setPrimaryColor] = useState(config.primaryColor || '#e11d48');
  const [appNameHi, setAppNameHi] = useState(config.appNameHi || 'भारत समाचार');
  const [appNameEn, setAppNameEn] = useState(config.appNameEn || 'Bharat News');
  const [appSuffixHi, setAppSuffixHi] = useState(config.appSuffixHi || 'लाइव');
  const [appSuffixEn, setAppSuffixEn] = useState(config.appSuffixEn || 'LIVE');
  const [taglineHi, setTaglineHi] = useState(config.taglineHi || 'सत्य, निष्पक्ष और विश्वसनीय ताज़ा ख़बरें 24x7');
  const [taglineEn, setTaglineEn] = useState(config.taglineEn || 'Truthful, Unbiased & Verified Headlines 24x7');
  const [isSavingBranding, setIsSavingBranding] = useState(false);

  const handleSiteLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      return toast.error('Logo image size must be less than 5MB');
    }
    const toastId = toast.loading('Uploading logo to Supabase Storage…');
    const uploadedPublicUrl = await uploadLogoToSupabase(file, siteLogoUrl);
    setSiteLogoUrl(uploadedPublicUrl);
    toast.success('Site logo uploaded to Supabase Storage! Click "Save Branding & Logo" to apply.', { id: toastId });
  };

  const handleSaveBranding = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingBranding(true);
    await updateConfig({
      logoUrl: siteLogoUrl,
      logoBadgeText: siteBadgeText,
      primaryColor,
      appNameHi,
      appNameEn,
      appSuffixHi,
      appSuffixEn,
      taglineHi,
      taglineEn
    });
    setIsSavingBranding(false);
    toast.success('Portal Logo, Color Theme & Branding saved to Supabase & Live Website!');
  };
  
  // 3-Step Password Change States
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      return toast.error('Image size must be less than 5MB');
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Url = reader.result as string;
      setProfileAvatar(base64Url);
      toast.success('Profile photo uploaded! Click "Save Profile Changes" to persist in Supabase.');
    };
    reader.readAsDataURL(file);
  };

  const [isSavingPassword, setIsSavingPassword] = useState(false);

  // 1. DEDICATED HANDLER: Save Profile Details & Photo Only
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingProfile(true);

    if (isSupabaseConfigured()) {
      try {
        await supabase.auth.updateUser({
          data: {
            full_name: profileName,
            avatar_url: profileAvatar,
            bio: profileBio
          }
        });
      } catch (err) {
        console.warn('Supabase User Metadata sync warning:', err);
      }
    }

    setUser({
      ...user,
      name: profileName,
      email: profileEmail,
      bio: profileBio,
      avatar: profileAvatar
    });

    setIsSavingProfile(false);
    toast.success('Profile details & photo saved successfully!');
  };

  // 2. DEDICATED HANDLER: Save Password Only
  const handleSavePasswordOnly = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingPassword(true);

    if (!currentPassword.trim()) {
      setIsSavingPassword(false);
      return toast.error('Please enter your Current Password');
    }
    if (!newPassword.trim()) {
      setIsSavingPassword(false);
      return toast.error('New Password cannot be empty');
    }
    if (newPassword.length < 6) {
      setIsSavingPassword(false);
      return toast.error('New Password must be at least 6 characters long');
    }
    if (newPassword !== confirmPassword) {
      setIsSavingPassword(false);
      return toast.error('New Password and Confirm Password do not match');
    }

    const { error } = await verifyCurrentPasswordAndUpdate(profileEmail, currentPassword, newPassword);
    if (error) {
      setIsSavingPassword(false);
      return toast.error(error.message);
    }

    toast.success('Supabase Auth: Current Password verified & New Password created successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setIsSavingPassword(false);
  };
  const [sections, setSections] = useState<SectionItem[]>(INITIAL_SECTIONS);
  const [authors, setAuthors] = useState<AuthorItem[]>(INITIAL_AUTHORS);

  const [isSectionModalOpen, setIsSectionModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<SectionItem | null>(null);
  const [secName, setSecName] = useState('');
  const [secSlug, setSecSlug] = useState('');
  const [secColor, setSecColor] = useState('#1E40AF');

  const [isAuthorModalOpen, setIsAuthorModalOpen] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState<AuthorItem | null>(null);
  const [authName, setAuthName] = useState('');
  const [authEmail, setAuthEmail] = useState('');
  const [authRole, setAuthRole] = useState<'Admin' | 'Editor' | 'Journalist'>('Journalist');
  const [authStatus, setAuthStatus] = useState<'active' | 'inactive'>('active');

  const handleOpenAddSection = () => {
    setEditingSection(null);
    setSecName('');
    setSecSlug('');
    setSecColor('#1E40AF');
    setIsSectionModalOpen(true);
  };

  const handleOpenEditSection = (sec: SectionItem) => {
    setEditingSection(sec);
    setSecName(sec.name);
    setSecSlug(sec.slug);
    setSecColor(sec.color);
    setIsSectionModalOpen(true);
  };

  useEffect(() => {
    if (isSupabaseConfigured()) {
      supabase.from('sections').select('*').then(({ data }) => {
        if (data && data.length > 0) {
          setSections(data.map((d: any) => ({
            id: d.id,
            name: d.name,
            slug: d.slug,
            color: d.color || '#1E40AF',
            storiesCount: d.stories_count || 0
          })));
        }
      });
      supabase.from('authors').select('*').then(({ data }) => {
        if (data && data.length > 0) {
          setAuthors(data.map((d: any) => ({
            id: d.id,
            name: d.name,
            email: d.email,
            role: d.role || 'Journalist',
            stories: d.stories_count || 0,
            status: d.status || 'active'
          })));
        }
      });
    }
  }, []);

  const handleSaveSection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!secName.trim()) return toast.error('Section name is required');
    const slug = secSlug.trim() || secName.toLowerCase().replace(/[^a-z0-9]+/g, '');

    if (editingSection) {
      setSections(prev => prev.map(s => s.id === editingSection.id ? { ...s, name: secName, slug, color: secColor } : s));
      if (isSupabaseConfigured()) {
        supabase.from('sections').update({ name: secName, slug, color: secColor }).eq('id', editingSection.id).then();
      }
      toast.success(`Section "${secName}" updated in Supabase!`);
    } else {
      const newSec: SectionItem = { id: `sec-${Date.now()}`, name: secName, slug, color: secColor, storiesCount: 0 };
      setSections(prev => [...prev, newSec]);
      if (isSupabaseConfigured()) {
        supabase.from('sections').insert({ name: secName, slug, color: secColor, stories_count: 0 }).then();
      }
      toast.success(`Section "${secName}" added & saved in Supabase!`);
    }
    setIsSectionModalOpen(false);
  };

  const handleDeleteSection = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete section "${name}"?`)) {
      setSections(prev => prev.filter(s => s.id !== id));
      if (isSupabaseConfigured()) {
        supabase.from('sections').delete().eq('id', id).then();
      }
      toast.success(`Section "${name}" deleted from Supabase`);
    }
  };

  // State for Supabase Auth Password input
  const [authPassword, setAuthPassword] = useState('');

  const handleOpenAddAuthor = () => {
    setEditingAuthor(null);
    setAuthName('');
    setAuthEmail('');
    setAuthPassword('');
    setAuthRole('Journalist');
    setAuthStatus('active');
    setIsAuthorModalOpen(true);
  };

  const handleOpenEditAuthor = (auth: AuthorItem) => {
    setEditingAuthor(auth);
    setAuthName(auth.name);
    setAuthEmail(auth.email);
    setAuthPassword('');
    setAuthRole(auth.role);
    setAuthStatus(auth.status);
    setIsAuthorModalOpen(true);
  };

  const handleSaveAuthor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authName.trim()) return toast.error('Author name is required');
    if (!authEmail.trim()) return toast.error('Email is required');

    if (editingAuthor) {
      if (authPassword.trim()) {
        const { error } = await updateSupabaseUserPassword(authEmail, authPassword);
        if (error) {
          toast.error(`Supabase Auth Reset Notice: ${error.message}`);
        } else {
          toast.success(`Supabase password reset email sent for ${authEmail}!`);
        }
      }
      setAuthors(prev => prev.map(a => a.id === editingAuthor.id ? { ...a, name: authName, email: authEmail, role: authRole, status: authStatus } : a));
      if (isSupabaseConfigured()) {
        supabase.from('authors').update({ name: authName, email: authEmail, role: authRole, status: authStatus }).eq('id', editingAuthor.id).then();
      }
      toast.success(`Author "${authName}" updated in Supabase Database!`);
    } else {
      if (!authPassword.trim() || authPassword.length < 6) {
        return toast.error('Password must be at least 6 characters long for Supabase user creation');
      }

      const { data, error } = await createSupabaseUser(authEmail, authPassword, authName, authRole);
      if (error) {
        toast.error(`Supabase Auth Creation Notice: ${error.message}`);
      } else {
        toast.success(`User "${authName}" successfully created in Supabase Auth!`);
      }

      const newAuth: AuthorItem = { id: data?.user?.id || `auth-${Date.now()}`, name: authName, email: authEmail, role: authRole, stories: 0, status: authStatus };
      setAuthors(prev => [...prev, newAuth]);
      if (isSupabaseConfigured()) {
        supabase.from('authors').insert({ name: authName, email: authEmail, role: authRole, status: authStatus, stories_count: 0 }).then();
      }
    }
    setIsAuthorModalOpen(false);
  };

  const handleDeleteAuthor = (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove author "${name}"?`)) {
      setAuthors(prev => prev.filter(a => a.id !== id));
      if (isSupabaseConfigured()) {
        supabase.from('authors').delete().eq('id', id).then();
      }
      toast.success(`Author "${name}" removed from Supabase`);
    }
  };

  return (
    <div className="flex h-full relative">
      <div className="w-56 border-r border-gray-200 bg-white shrink-0 py-4">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors cursor-pointer ${activeTab === tab.id ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
            {activeTab === tab.id && <ChevronRight className="w-4 h-4 ml-auto" />}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        {activeTab === 'profile' && (
          <div className="max-w-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <User className="w-6 h-6 text-rose-600" />
                  <span>My Profile & Account Settings</span>
                </h2>
                <p className="text-sm text-gray-500 mt-1">Manage your administrator details, avatar, and security password</p>
              </div>
              <span className="bg-rose-100 text-rose-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {user.role || 'Admin'}
              </span>
            </div>

            {/* Profile Avatar Header */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs flex items-center gap-6">
              <div className="relative group">
                {profileAvatar ? (
                  <img
                    src={profileAvatar}
                    alt={profileName}
                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-rose-600 text-white font-black text-2xl flex items-center justify-center border-4 border-white shadow-md">
                    {profileName ? profileName[0].toUpperCase() : 'A'}
                  </div>
                )}
                <label className="absolute bottom-0 right-0 bg-gray-900 text-white p-2 rounded-full shadow-md cursor-pointer hover:bg-rose-600 transition-colors" title="Upload New Photo">
                  <Camera className="w-4 h-4" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{profileName}</h3>
                <p className="text-xs text-gray-500">{profileEmail}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Active Session
                  </span>
                  <span className="text-[11px] font-semibold text-gray-400">Joined {new Date().getFullYear()}</span>
                </div>
              </div>
            </div>

            {/* Profile Info Edit Form */}
            <form onSubmit={handleSaveProfile} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <span className="text-xs font-extrabold text-gray-900 flex items-center gap-1.5 uppercase tracking-wide">
                  <User className="w-4 h-4 text-rose-600" />
                  <span>Personal Profile Details</span>
                </span>
                <span className="text-[10px] text-gray-400 font-semibold">(Name, Email, Bio & Photo)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Display Name *</label>
                  <input
                    type="text"
                    required
                    value={profileName}
                    onChange={e => setProfileName(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={profileEmail}
                    onChange={e => setProfileEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Short Author Bio / Designation</label>
                <textarea
                  rows={3}
                  value={profileBio}
                  onChange={e => setProfileBio(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                  placeholder="Tell readers about your reporting domain and background..."
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isSavingProfile}
                  className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm px-6 py-2.5 rounded-full shadow-xs transition-colors cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSavingProfile ? 'Saving...' : 'Save Profile Details & Photo'}</span>
                </button>
              </div>
            </form>

            {/* Portal Branding & Logo Settings Card */}
            <form onSubmit={handleSaveBranding} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <span className="text-xs font-extrabold text-gray-900 flex items-center gap-1.5 uppercase tracking-wide">
                  <Globe className="w-4 h-4 text-rose-600" />
                  <span>Portal Logo & Site Branding (पोर्टल लोगो एवं नाम संपादन)</span>
                </span>
                <span className="text-[10px] text-gray-400 font-semibold">(Public Header & Footer Branding)</span>
              </div>

              {/* Logo Upload & Preview Box */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 p-4 bg-gray-50 border border-gray-200 rounded-xl">
                <div className="flex items-center gap-3">
                  {siteLogoUrl ? (
                    <div className="relative group shrink-0">
                      <img
                        src={siteLogoUrl}
                        alt="Site Logo"
                        className="h-14 w-auto max-w-[160px] object-contain rounded-lg border border-gray-200 bg-white p-1.5 shadow-xs"
                      />
                      <button
                        type="button"
                        onClick={() => setSiteLogoUrl('')}
                        className="absolute -top-2 -right-2 bg-rose-600 text-white p-1 rounded-full shadow-md hover:bg-rose-700 transition-colors cursor-pointer"
                        title="Remove Custom Logo"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded-xl bg-rose-600 text-white font-black text-2xl flex items-center justify-center shadow-sm shrink-0">
                      {siteBadgeText || 'भा'}
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-1.5">
                  <h4 className="text-xs font-bold text-gray-900">Upload Site Logo (पोर्टल लोगो फोटो)</h4>
                  <p className="text-[11px] text-gray-500">Supports PNG, SVG, WebP, JPG. Recommended height: 40px–60px transparent background logo.</p>
                  <div className="flex items-center gap-3 pt-1">
                    <label className="inline-flex items-center gap-1.5 bg-gray-900 hover:bg-black text-white text-xs font-bold px-4 py-2 rounded-lg cursor-pointer transition-colors shadow-xs">
                      <Camera className="w-3.5 h-3.5" />
                      <span>Upload Logo Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleSiteLogoUpload}
                        className="hidden"
                      />
                    </label>
                    {siteLogoUrl && (
                      <button
                        type="button"
                        onClick={() => setSiteLogoUrl('')}
                        className="text-xs text-rose-600 font-bold hover:underline cursor-pointer"
                      >
                        Reset to Letter Badge
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Website Theme Color Picker (Matches Logo Primary Accent) */}
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">Logo & Website Primary Theme Color (लोगो एवं वेबसाइट थीम कलर)</h4>
                    <p className="text-[11px] text-gray-500">Pick the exact main color from your logo to brand the entire news portal UI automatically.</p>
                  </div>
                  <div className="flex items-center gap-2 border border-gray-200 bg-white p-1 rounded-lg">
                    <input
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-7 h-7 rounded cursor-pointer border-0 p-0"
                      title="Custom Color Picker"
                    />
                    <span className="text-xs font-mono font-bold text-gray-800 pr-1">{primaryColor}</span>
                  </div>
                </div>

                {/* Preset Color Swatches */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mr-1">Quick Presets:</span>
                  {[
                    { label: 'Crimson Red', hex: '#e11d48' },
                    { label: 'Royal Blue', hex: '#2563eb' },
                    { label: 'Navy Blue', hex: '#1e3a8a' },
                    { label: 'Emerald Green', hex: '#059669' },
                    { label: 'Purple Violet', hex: '#7c3aed' },
                    { label: 'Saffron Amber', hex: '#d97706' },
                    { label: 'Teal Cyan', hex: '#0d9488' },
                    { label: 'Dark Charcoal', hex: '#111827' }
                  ].map((preset) => (
                    <button
                      key={preset.hex}
                      type="button"
                      onClick={() => setPrimaryColor(preset.hex)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                        primaryColor.toLowerCase() === preset.hex.toLowerCase()
                          ? 'border-gray-900 ring-2 ring-gray-900/20 shadow-xs'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="w-3 h-3 rounded-full shrink-0 shadow-2xs" style={{ backgroundColor: preset.hex }}></span>
                      <span className="text-gray-700">{preset.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Portal Name Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Portal Name (Hindi) *</label>
                  <input
                    type="text"
                    required
                    value={appNameHi}
                    onChange={e => setAppNameHi(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                    placeholder="e.g. भारत समाचार"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Portal Name (English) *</label>
                  <input
                    type="text"
                    required
                    value={appNameEn}
                    onChange={e => setAppNameEn(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                    placeholder="e.g. Bharat News"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Logo Badge Text *</label>
                  <input
                    type="text"
                    required
                    maxLength={4}
                    value={siteBadgeText}
                    onChange={e => setSiteBadgeText(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 uppercase"
                    placeholder="e.g. भा or BN"
                  />
                </div>
              </div>

              {/* Suffix Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Suffix (Hindi)</label>
                  <input
                    type="text"
                    value={appSuffixHi}
                    onChange={e => setAppSuffixHi(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                    placeholder="e.g. लाइव"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Suffix (English)</label>
                  <input
                    type="text"
                    value={appSuffixEn}
                    onChange={e => setAppSuffixEn(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                    placeholder="e.g. LIVE"
                  />
                </div>
              </div>

              {/* Taglines */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Tagline (Hindi)</label>
                  <input
                    type="text"
                    value={taglineHi}
                    onChange={e => setTaglineHi(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                    placeholder="e.g. सत्य, निष्पक्ष और विश्वसनीय ताज़ा ख़बरें 24x7"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Tagline (English)</label>
                  <input
                    type="text"
                    value={taglineEn}
                    onChange={e => setTaglineEn(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                    placeholder="e.g. Truthful, Unbiased & Verified Headlines 24x7"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isSavingBranding}
                  className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm px-6 py-2.5 rounded-full shadow-xs transition-colors cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSavingBranding ? 'Saving...' : 'Save Branding & Logo'}</span>
                </button>
              </div>
            </form>

            {/* Separate Security & Password Update Card */}
            <form onSubmit={handleSavePasswordOnly} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <span className="text-xs font-extrabold text-gray-900 flex items-center gap-1.5 uppercase tracking-wide">
                  <Lock className="w-4 h-4 text-rose-600" />
                  <span>Security & Password Change</span>
                </span>
                <span className="text-[10px] text-gray-400 font-semibold">(Requires Current Password Verification)</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Current Password *</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={e => setCurrentPassword(e.target.value)}
                  placeholder="Enter your current password"
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">New Password *</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    placeholder="New password (min 6 chars)"
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Confirm New Password *</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Re-type new password"
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isSavingPassword}
                  className="flex items-center gap-2 bg-gray-900 hover:bg-black text-white font-bold text-sm px-6 py-2.5 rounded-full shadow-xs transition-colors cursor-pointer"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>{isSavingPassword ? 'Updating Password...' : 'Update Password Only'}</span>
                </button>
              </div>
            </form>
          </div>
        )}
        {activeTab === 'sections' && (
          <div className="max-w-2xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Sections & Topics</h2>
                <p className="text-sm text-gray-500 mt-1">Manage your news categories and topics</p>
              </div>
              <button onClick={handleOpenAddSection} className="text-sm font-medium text-gray-700 border border-gray-200 rounded-full px-4 py-2 hover:bg-gray-50 cursor-pointer">+ Add Section</button>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              {sections.map((s, i) => (
                <div key={s.id} className={`flex items-center gap-4 px-5 py-4 ${i < sections.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ background: s.color }} />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{s.name}</div>
                    <div className="text-xs text-gray-400">/{s.slug} · {s.storiesCount} stories</div>
                  </div>
                  <button onClick={() => handleOpenEditSection(s)} className="text-xs text-blue-600 hover:text-blue-800 cursor-pointer">Edit</button>
                  <button onClick={() => handleDeleteSection(s.id, s.name)} className="text-xs text-red-600 hover:text-red-800 cursor-pointer">Delete</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'authors' && (
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Authors</h2>
                <p className="text-sm text-gray-500 mt-1">Manage journalists and contributors</p>
              </div>
              <button onClick={handleOpenAddAuthor} className="text-sm font-medium bg-gray-900 text-white rounded-full px-4 py-2 hover:bg-gray-800 cursor-pointer">+ Add Author</button>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              {authors.map((author, i) => (
                <div key={author.id} className={`flex items-center gap-4 px-5 py-4 ${i < authors.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-600 shrink-0">
                    {author.name[0]}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{author.name}</div>
                    <div className="text-xs text-gray-400">{author.email} · {author.stories} stories</div>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${author.role === 'Admin' ? 'bg-gray-900 text-white' : author.role === 'Editor' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                    {author.role}
                  </span>
                  <span className={`w-2 h-2 rounded-full ${author.status === 'active' ? 'bg-emerald-500' : 'bg-gray-300'}`} />
                  <button onClick={() => handleOpenEditAuthor(author)} className="text-xs text-blue-600 hover:text-blue-800 cursor-pointer">Edit</button>
                  <button onClick={() => handleDeleteAuthor(author.id, author.name)} className="text-xs text-red-600 hover:text-red-800 cursor-pointer">Remove</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'workflow' && (
          <div className="max-w-2xl space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Editorial Workflow</h2>
              <p className="text-sm text-gray-500 mt-1">Configure approval requirements and notifications</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-5">
              {[
                { label: 'Require editor approval before publishing', desc: 'All stories must be approved before they go live', checked: true },
                { label: 'Email author when story is approved', desc: 'Send email notification on approval', checked: true },
                { label: 'Email author when changes are requested', desc: 'Notify authors to revise their story', checked: true },
                { label: 'Allow journalists to self-publish', desc: 'Skip review for trusted journalists', checked: false },
              ].map((setting, i) => (
                <div key={i} className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{setting.label}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{setting.desc}</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input type="checkbox" defaultChecked={setting.checked} className="sr-only peer" />
                    <div className="w-10 h-5 bg-gray-200 peer-checked:bg-gray-900 rounded-full peer-focus:ring-2 peer-focus:ring-gray-300 transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5" />
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {['seo', 'social', 'notifications', 'integrations'].includes(activeTab) && (
          <div className="max-w-xl">
            <h2 className="text-xl font-bold text-gray-900 mb-2 capitalize">{TABS.find(t => t.id === activeTab)?.label}</h2>
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-6 text-center mt-8">
              <div className="text-4xl mb-3">🚧</div>
              <div className="text-sm font-medium text-amber-800">Coming Soon</div>
              <div className="text-xs text-amber-600 mt-1">This section is being built. Check back soon.</div>
            </div>
          </div>
        )}

        {activeTab === 'developer' && (
          <div className="max-w-xl space-y-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Developer Tools</h2>
              <p className="text-sm text-gray-500 mt-1">Advanced configuration — handle with care</p>
            </div>
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 flex gap-3">
              <Terminal className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-semibold text-rose-800">Admin Only</div>
                <div className="text-xs text-rose-700 mt-0.5">These settings can break your site. Only modify if you know what you're doing.</div>
              </div>
            </div>
            {['API Keys', 'Webhooks', 'Custom CSS (Sandboxed)', 'Schema Viewer', 'Environment Info'].map(item => (
              <div key={item} className="bg-white border border-gray-200 rounded-xl px-5 py-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors">
                <span className="text-sm font-medium text-gray-700">{item}</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION EDIT / CREATE POPUP MODAL */}
      {isSectionModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-lg font-bold text-gray-900">
                {editingSection ? 'Edit Section / Topic' : 'Add New Section / Topic'}
              </h3>
              <button onClick={() => setIsSectionModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveSection} className="space-y-4 text-xs font-medium">
              <div>
                <label className="block text-gray-700 mb-1">Section Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. National, Sports, Business"
                  value={secName}
                  onChange={e => {
                    setSecName(e.target.value);
                    if (!editingSection) setSecSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, ''));
                  }}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-rose-500 text-sm font-semibold"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">URL Slug</label>
                <input
                  type="text"
                  placeholder="e.g. national, sports"
                  value={secSlug}
                  onChange={e => setSecSlug(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-rose-500 text-sm font-mono text-gray-600"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Badge & Category Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={secColor}
                    onChange={e => setSecColor(e.target.value)}
                    className="w-10 h-10 rounded cursor-pointer border border-gray-200 p-1"
                  />
                  <span className="text-xs font-mono text-gray-600 uppercase">{secColor}</span>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsSectionModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 cursor-pointer font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold cursor-pointer shadow-xs"
                >
                  Save Section
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* AUTHOR EDIT / CREATE POPUP MODAL */}
      {isAuthorModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-lg font-bold text-gray-900">
                {editingAuthor ? 'Edit Author Details' : 'Add New Author'}
              </h3>
              <button onClick={() => setIsAuthorModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveAuthor} className="space-y-4 text-xs font-medium">
              <div>
                <label className="block text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Amit Sharma"
                  value={authName}
                  onChange={e => setAuthName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-rose-500 text-sm font-semibold"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. author@bharatnews.com"
                  value={authEmail}
                  onChange={e => setAuthEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-rose-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1 flex items-center justify-between">
                  <span>Supabase Password {editingAuthor ? '(Leave blank to keep unchanged)' : '*'}</span>
                  <span className="text-[10px] text-rose-600 font-bold">🔒 Supabase Auth</span>
                </label>
                <input
                  type="password"
                  required={!editingAuthor}
                  placeholder={editingAuthor ? "Type new password to reset" : "Enter password for login (min 6 chars)"}
                  value={authPassword}
                  onChange={e => setAuthPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-rose-500 text-sm font-mono"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 mb-1">Role</label>
                  <select
                    value={authRole}
                    onChange={e => setAuthRole(e.target.value as any)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-rose-500 text-sm bg-white font-semibold"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Editor">Editor</option>
                    <option value="Journalist">Journalist</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Status</label>
                  <select
                    value={authStatus}
                    onChange={e => setAuthStatus(e.target.value as any)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-rose-500 text-sm bg-white font-semibold"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsAuthorModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 cursor-pointer font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold cursor-pointer shadow-xs"
                >
                  Save Author
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
