'use client';

import React, { useState, useEffect } from 'react';
import { useCmsStore, CmsData } from '@/lib/cms-store';
import {
  Lock,
  Save,
  CheckCircle2,
  Plus,
  Trash2,
  Globe,
  Building2,
  Briefcase,
  FileText,
  Mail,
  ShieldAlert,
  Eye,
  EyeOff,
  LogOut,
  Upload,
  Download,
  Activity,
  Layers,
  Monitor,
  Smartphone,
  Copy,
  Check,
  ExternalLink,
} from 'lucide-react';

interface MediaFile {
  filename: string;
  url: string;
  size: string;
  uploadedAt: string;
}

export default function AdminPage() {
  const { data, updateCms, fetchCms } = useCmsStore();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState<
    'analytics' | 'hero' | 'about' | 'companies' | 'ventures' | 'journal' | 'careers' | 'contact' | 'media' | 'seo'
  >('analytics');

  const [formData, setFormData] = useState<CmsData>(data);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Live Preview State
  const [showLivePreview, setShowLivePreview] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');

  // Media Library State
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  // Audit Activity Log
  const [activityLogs, setActivityLogs] = useState<string[]>([
    'System initialized — Drixel Labs Inc. CMS Active',
    'Founders recorded: Anelisa Thelejene & Andzani Mashabane',
  ]);

  useEffect(() => {
    fetchCms();
    const storedAuth = sessionStorage.getItem('drixel_admin_auth');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, [fetchCms]);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const loadMediaFiles = async () => {
    try {
      const res = await fetch('/api/upload');
      if (res.ok) {
        const files = await res.json();
        setMediaFiles(files);
      }
    } catch {
      // quiet catch
    }
  };

  useEffect(() => {
    if (activeTab === 'media' && isAuthenticated) {
      loadMediaFiles();
    }
  }, [activeTab, isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'drixel2026') {
      setIsAuthenticated(true);
      sessionStorage.setItem('drixel_admin_auth', 'true');
      setAuthError('');
      addLog('Administrator session authenticated.');
    } else {
      setAuthError('Invalid administrator passcode');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('drixel_admin_auth');
  };

  const addLog = (message: string) => {
    const time = new Date().toLocaleTimeString();
    setActivityLogs((prev) => [`[${time}] ${message}`, ...prev.slice(0, 15)]);
  };

  const handleSave = async () => {
    const success = await updateCms(formData);
    if (success) {
      setSavedSuccess(true);
      addLog('Published live updates to cms.json dataset.');
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  const handleExportBackup = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(formData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `drixel-cms-backup-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    addLog('Exported JSON backup file.');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const file = files[0];
    const form = new FormData();
    form.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'x-admin-passcode': 'drixel2026',
        },
        body: form,
      });

      if (res.ok) {
        addLog(`Uploaded media file: ${file.name}`);
        loadMediaFiles();
      }
    } catch {
      // quiet
    } finally {
      setUploading(false);
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-matte">
        <div className="glass-panel p-10 rounded-3xl border border-white/15 max-w-md w-full text-center shadow-2xl">
          <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 grid place-items-center mx-auto mb-6 text-warmWhite">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="font-heading text-2xl font-semibold mb-2">Drixel Labs Admin Portal</h2>
          <p className="text-metalTitanium text-xs mb-8">Enter secure passcode to access dynamic CMS controller</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type={showPasscode ? 'text' : 'password'}
                placeholder="Enter Admin Passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-warmWhite text-center outline-none focus:border-white/40 font-mono text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPasscode(!showPasscode)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-metalTitanium hover:text-warmWhite"
              >
                {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {authError && <p className="text-red-400 text-xs font-mono">{authError}</p>}
            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-warmWhite text-matte font-medium text-sm hover:bg-[#E2E2DF] transition-all"
            >
              Authenticate Portal
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-8 pt-32 pb-24 max-w-7xl mx-auto">
      {/* Top Bar Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-mono uppercase text-metalTitanium tracking-widest">Enterprise CMS v2.0 Active</span>
          </div>
          <h1 className="font-heading text-3xl font-semibold text-warmWhite">Website Management Portal</h1>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {savedSuccess && (
            <span className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1.5 rounded-full">
              <CheckCircle2 className="w-4 h-4" /> Published Live
            </span>
          )}

          <button
            onClick={() => setShowLivePreview(!showLivePreview)}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-mono border transition-all ${
              showLivePreview
                ? 'bg-white/20 border-white/40 text-warmWhite'
                : 'bg-white/5 border-white/10 text-metalTitanium hover:text-warmWhite'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" /> {showLivePreview ? 'Hide Live Preview' : 'Live Preview'}
          </button>

          <button
            onClick={handleExportBackup}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-metalTitanium hover:text-warmWhite hover:bg-white/10 transition-all"
          >
            <Download className="w-3.5 h-3.5" /> Export Backup
          </button>

          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-warmWhite text-matte font-medium text-sm hover:bg-[#E2E2DF] transition-all shadow-lg"
          >
            <Save className="w-4 h-4" /> Save & Publish
          </button>

          <button
            onClick={handleLogout}
            title="Logout"
            className="p-2.5 rounded-full bg-white/5 border border-white/10 text-metalTitanium hover:text-red-400 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Grid: Controls + Live Preview */}
      <div className={`grid gap-8 ${showLivePreview ? 'lg:grid-cols-12' : 'grid-cols-1'}`}>
        <div className={showLivePreview ? 'lg:col-span-7' : 'w-full'}>
          {/* Section Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-8 border-b border-white/10">
            {[
              { id: 'analytics', label: 'Overview & Metrics', icon: Activity },
              { id: 'hero', label: 'Homepage', icon: Globe },
              { id: 'about', label: 'About & Founders', icon: Building2 },
              { id: 'companies', label: 'Companies', icon: Building2 },
              { id: 'ventures', label: 'Ventures', icon: Briefcase },
              { id: 'journal', label: 'Journal', icon: FileText },
              { id: 'careers', label: 'Careers', icon: Briefcase },
              { id: 'contact', label: 'Contact', icon: Mail },
              { id: 'media', label: 'Media Assets', icon: Layers },
              { id: 'seo', label: 'SEO Suite', icon: ShieldAlert },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-white/15 border border-white/30 text-warmWhite'
                      : 'text-metalTitanium hover:text-warmWhite hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Form Content Panes */}
          <div className="glass-panel p-8 rounded-3xl border border-white/10">
            {/* OVERVIEW & METRICS TAB */}
            {activeTab === 'analytics' && (
              <div className="space-y-8">
                <div>
                  <h3 className="font-heading text-xl font-medium mb-2">System Analytics & Content Metrics</h3>
                  <p className="text-metalTitanium text-xs">Real-time status monitor of Drixel Labs Inc. CMS data.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                    <div className="font-mono text-[11px] text-metalTitanium uppercase mb-1">Entities</div>
                    <div className="font-heading text-3xl font-semibold text-warmWhite">{formData.companies.items.length}</div>
                    <div className="text-[10px] text-metalTitanium mt-1">Operating Units</div>
                  </div>

                  <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                    <div className="font-mono text-[11px] text-metalTitanium uppercase mb-1">Ventures</div>
                    <div className="font-heading text-3xl font-semibold text-warmWhite">{formData.ventures.items.length}</div>
                    <div className="text-[10px] text-metalTitanium mt-1">R&D Projects</div>
                  </div>

                  <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                    <div className="font-mono text-[11px] text-metalTitanium uppercase mb-1">Articles</div>
                    <div className="font-heading text-3xl font-semibold text-warmWhite">{formData.journal.articles.length}</div>
                    <div className="text-[10px] text-metalTitanium mt-1">Editorial Notes</div>
                  </div>

                  <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                    <div className="font-mono text-[11px] text-metalTitanium uppercase mb-1">SEO Health</div>
                    <div className="font-heading text-3xl font-semibold text-emerald-400">100%</div>
                    <div className="text-[10px] text-metalTitanium mt-1">Sitemap & Schema</div>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-6">
                  <h4 className="font-mono text-xs text-metalTitanium uppercase tracking-wider mb-4">CMS Activity Audit Trail</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto font-mono text-xs text-metalTitanium bg-black/30 p-4 rounded-xl border border-white/5">
                    {activityLogs.map((log, i) => (
                      <div key={i} className="py-1 border-b border-white/5 last:border-0">{log}</div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* HOMEPAGE TAB */}
            {activeTab === 'hero' && (
              <div className="space-y-6">
                <h3 className="font-heading text-xl font-medium mb-6">Homepage Settings</h3>
                <div>
                  <label className="block text-xs font-mono text-metalTitanium uppercase mb-2">Hero Headline</label>
                  <input
                    type="text"
                    value={formData.hero.title}
                    onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, title: e.target.value } })}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-warmWhite font-heading text-lg focus:outline-none focus:border-white/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-metalTitanium uppercase mb-2">Hero Subtitle</label>
                  <textarea
                    rows={3}
                    value={formData.hero.subtitle}
                    onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, subtitle: e.target.value } })}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-warmWhite text-sm focus:outline-none focus:border-white/40"
                  />
                </div>
              </div>
            )}

            {/* ABOUT & FOUNDERS TAB */}
            {activeTab === 'about' && (
              <div className="space-y-6">
                <h3 className="font-heading text-xl font-medium mb-6">About & Founders Narrative</h3>
                <div>
                  <label className="block text-xs font-mono text-metalTitanium uppercase mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.about.title}
                    onChange={(e) => setFormData({ ...formData, about: { ...formData.about, title: e.target.value } })}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-warmWhite text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-metalTitanium uppercase mb-2">Description</label>
                  <textarea
                    rows={3}
                    value={formData.about.description}
                    onChange={(e) => setFormData({ ...formData, about: { ...formData.about, description: e.target.value } })}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-warmWhite text-sm"
                  />
                </div>

                <div className="border-t border-white/10 pt-4">
                  <h4 className="font-heading text-sm font-semibold mb-3 text-warmWhite">Founders Information</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {formData.about.founders.map((founder, idx) => (
                      <div key={idx} className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                        <label className="block text-xs font-mono text-metalTitanium uppercase mb-1">Founder #{idx + 1} Name</label>
                        <input
                          type="text"
                          value={founder.name}
                          onChange={(e) => {
                            const updatedFounders = [...formData.about.founders];
                            updatedFounders[idx].name = e.target.value;
                            setFormData({ ...formData, about: { ...formData.about, founders: updatedFounders } });
                          }}
                          className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-warmWhite font-medium text-sm"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* COMPANIES TAB */}
            {activeTab === 'companies' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-heading text-xl font-medium">Operating Entities</h3>
                  <button
                    type="button"
                    onClick={() => {
                      const newComp = {
                        id: `comp-${Date.now()}`,
                        name: 'New Company Entity',
                        status: 'Status: In Development',
                        isDev: true,
                        websiteUrl: 'https://drixel.co.za',
                        description: 'Company description...',
                        scope: 'Capabilities scope...',
                      };
                      setFormData({ ...formData, companies: { ...formData.companies, items: [...formData.companies.items, newComp] } });
                      addLog('Added new company entity entry.');
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-mono bg-white/10 border border-white/20 px-4 py-2 rounded-full hover:bg-white/20"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Company Entity
                  </button>
                </div>

                {formData.companies.items.map((item, idx) => (
                  <div key={item.id} className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-4">
                    <div className="flex justify-between items-center text-xs font-mono text-metalTitanium">
                      <span>Entity #{idx + 1}</span>
                      <button
                        onClick={() => {
                          const updated = formData.companies.items.filter((c) => c.id !== item.id);
                          setFormData({ ...formData, companies: { ...formData.companies, items: updated } });
                          addLog(`Removed company entity #${idx + 1}`);
                        }}
                        className="text-red-400 hover:underline flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-metalTitanium uppercase mb-1">Company Name</label>
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => {
                            const items = [...formData.companies.items];
                            items[idx].name = e.target.value;
                            setFormData({ ...formData, companies: { ...formData.companies, items } });
                          }}
                          className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-warmWhite font-semibold text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-metalTitanium uppercase mb-1">Website URL (Tap Destination)</label>
                        <input
                          type="text"
                          value={item.websiteUrl || 'https://drixel.co.za'}
                          onChange={(e) => {
                            const items = [...formData.companies.items];
                            items[idx].websiteUrl = e.target.value;
                            setFormData({ ...formData, companies: { ...formData.companies, items } });
                          }}
                          placeholder="https://drixel.co.za"
                          className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-warmWhite font-mono text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-metalTitanium uppercase mb-1">Entity Status</label>
                      <input
                        type="text"
                        value={item.status}
                        onChange={(e) => {
                          const items = [...formData.companies.items];
                          items[idx].status = e.target.value;
                          setFormData({ ...formData, companies: { ...formData.companies, items } });
                        }}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-warmWhite text-xs font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-metalTitanium uppercase mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={item.description}
                        onChange={(e) => {
                          const items = [...formData.companies.items];
                          items[idx].description = e.target.value;
                          setFormData({ ...formData, companies: { ...formData.companies, items } });
                        }}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-warmWhite text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* VENTURES TAB */}
            {activeTab === 'ventures' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-heading text-xl font-medium">Ventures & R&D Manager</h3>
                    <p className="text-metalTitanium text-xs">Add, edit, or remove products and engineering projects.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newProj = {
                        id: `proj-${Date.now()}`,
                        name: 'New Product Venture',
                        category: 'Industrial Design',
                        status: 'In Development',
                        tagline: 'Precision Engineering Initiative',
                        description: 'Detailed description of the new product venture...',
                        websiteUrl: 'https://drixel.co.za',
                      };
                      setFormData({ ...formData, ventures: { ...formData.ventures, items: [...formData.ventures.items, newProj] } });
                      addLog('Added new venture project entry.');
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-mono bg-white/10 border border-white/20 px-4 py-2 rounded-full hover:bg-white/20"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Project Venture
                  </button>
                </div>

                {formData.ventures.items.length === 0 ? (
                  <div className="text-center py-12 font-mono text-xs text-metalTitanium border border-dashed border-white/10 rounded-2xl">
                    No venture projects listed. Click "Add Project Venture" above to create one.
                  </div>
                ) : (
                  formData.ventures.items.map((proj, idx) => (
                    <div key={proj.id} className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-4">
                      <div className="flex justify-between items-center text-xs font-mono text-metalTitanium">
                        <span>Project #{idx + 1}</span>
                        <button
                          onClick={() => {
                            const updated = formData.ventures.items.filter((p) => p.id !== proj.id);
                            setFormData({ ...formData, ventures: { ...formData.ventures, items: updated } });
                            addLog(`Removed venture project #${idx + 1}`);
                          }}
                          className="text-red-400 hover:underline flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono text-metalTitanium uppercase mb-1">Project Name</label>
                          <input
                            type="text"
                            value={proj.name}
                            onChange={(e) => {
                              const items = [...formData.ventures.items];
                              items[idx].name = e.target.value;
                              setFormData({ ...formData, ventures: { ...formData.ventures, items } });
                            }}
                            className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-warmWhite font-semibold text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-metalTitanium uppercase mb-1">Category</label>
                          <input
                            type="text"
                            value={proj.category}
                            onChange={(e) => {
                              const items = [...formData.ventures.items];
                              items[idx].category = e.target.value;
                              setFormData({ ...formData, ventures: { ...formData.ventures, items } });
                            }}
                            className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-warmWhite text-xs font-mono"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono text-metalTitanium uppercase mb-1">Development Status</label>
                          <select
                            value={proj.status}
                            onChange={(e) => {
                              const items = [...formData.ventures.items];
                              items[idx].status = e.target.value;
                              setFormData({ ...formData, ventures: { ...formData.ventures, items } });
                            }}
                            className="w-full bg-matte border border-white/10 rounded-lg px-3 py-2 text-warmWhite text-xs font-mono"
                          >
                            <option value="In Development">In Development</option>
                            <option value="Released">Released</option>
                            <option value="Archived">Archived</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-metalTitanium uppercase mb-1">Tagline</label>
                          <input
                            type="text"
                            value={proj.tagline}
                            onChange={(e) => {
                              const items = [...formData.ventures.items];
                              items[idx].tagline = e.target.value;
                              setFormData({ ...formData, ventures: { ...formData.ventures, items } });
                            }}
                            className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-warmWhite text-xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-metalTitanium uppercase mb-1">Description</label>
                        <textarea
                          rows={3}
                          value={proj.description}
                          onChange={(e) => {
                            const items = [...formData.ventures.items];
                            items[idx].description = e.target.value;
                            setFormData({ ...formData, ventures: { ...formData.ventures, items } });
                          }}
                          className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-warmWhite text-xs"
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* CAREERS TAB */}
            {activeTab === 'careers' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-heading text-xl font-medium">Careers & Opportunities Manager</h3>
                    <p className="text-metalTitanium text-xs">Manage position listings and vacancy announcements.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newJob = {
                        id: `job-${Date.now()}`,
                        title: 'Senior Product Engineer',
                        department: 'Engineering',
                        type: 'Full-time',
                        location: 'South Africa',
                        link: 'mailto:contact@drixel.co.za',
                      };
                      const jobs = formData.careers.jobs || [];
                      setFormData({ ...formData, careers: { ...formData.careers, jobs: [...jobs, newJob] } });
                      addLog('Added job opportunity listing.');
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-mono bg-white/10 border border-white/20 px-4 py-2 rounded-full hover:bg-white/20"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Job Listing
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-mono text-metalTitanium uppercase mb-2">Default Vacancy Notice</label>
                  <textarea
                    rows={2}
                    value={formData.careers.notice}
                    onChange={(e) => setFormData({ ...formData, careers: { ...formData.careers, notice: e.target.value } })}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-warmWhite text-sm"
                  />
                </div>

                <div className="border-t border-white/10 pt-6">
                  <h4 className="font-heading text-sm font-semibold text-warmWhite mb-4">Active Open Positions ({formData.careers.jobs?.length || 0})</h4>

                  {!formData.careers.jobs || formData.careers.jobs.length === 0 ? (
                    <div className="text-center py-8 font-mono text-xs text-metalTitanium border border-dashed border-white/10 rounded-2xl">
                      No active open positions. The default vacancy notice above will be presented to visitors.
                    </div>
                  ) : (
                    formData.careers.jobs.map((job, idx) => (
                      <div key={job.id} className="p-4 rounded-xl border border-white/10 bg-white/[0.02] mb-4 space-y-3">
                        <div className="flex justify-between items-center text-xs font-mono text-metalTitanium">
                          <span>Listing #{idx + 1}</span>
                          <button
                            onClick={() => {
                              const updatedJobs = formData.careers.jobs.filter((j) => j.id !== job.id);
                              setFormData({ ...formData, careers: { ...formData.careers, jobs: updatedJobs } });
                              addLog(`Removed job listing #${idx + 1}`);
                            }}
                            className="text-red-400 hover:underline flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Remove Position
                          </button>
                        </div>

                        <div className="grid md:grid-cols-2 gap-3">
                          <input
                            type="text"
                            value={job.title}
                            onChange={(e) => {
                              const jobs = [...formData.careers.jobs];
                              jobs[idx].title = e.target.value;
                              setFormData({ ...formData, careers: { ...formData.careers, jobs } });
                            }}
                            placeholder="Job Title"
                            className="bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-warmWhite text-sm"
                          />

                          <input
                            type="text"
                            value={job.department}
                            onChange={(e) => {
                              const jobs = [...formData.careers.jobs];
                              jobs[idx].department = e.target.value;
                              setFormData({ ...formData, careers: { ...formData.careers, jobs } });
                            }}
                            placeholder="Department"
                            className="bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-warmWhite text-xs font-mono"
                          />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* CONTACT TAB */}
            {activeTab === 'contact' && (
              <div className="space-y-6">
                <h3 className="font-heading text-xl font-medium mb-6">Contact & Social Links</h3>
                <div>
                  <label className="block text-xs font-mono text-metalTitanium uppercase mb-2">Direct Email Address</label>
                  <input
                    type="email"
                    value={formData.contact.email}
                    onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, email: e.target.value } })}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-warmWhite text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-metalTitanium uppercase mb-2">Headquarters Location</label>
                  <input
                    type="text"
                    value={formData.contact.location}
                    onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, location: e.target.value } })}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-warmWhite text-sm"
                  />
                </div>
              </div>
            )}

            {/* MEDIA TAB */}
            {activeTab === 'media' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-heading text-xl font-medium">Media Asset Library</h3>
                    <p className="text-metalTitanium text-xs">Upload images and brand assets to your server.</p>
                  </div>

                  <label className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-xs font-mono text-warmWhite hover:bg-white/20 cursor-pointer">
                    <Upload className="w-3.5 h-3.5" />
                    {uploading ? 'Uploading...' : 'Upload Asset'}
                    <input type="file" onChange={handleFileUpload} className="hidden" accept="image/*" />
                  </label>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
                  {mediaFiles.length === 0 ? (
                    <div className="col-span-3 text-center py-12 font-mono text-xs text-metalTitanium border border-dashed border-white/10 rounded-2xl">
                      No uploaded media assets yet. Click upload to add images.
                    </div>
                  ) : (
                    mediaFiles.map((file) => (
                      <div key={file.filename} className="glass-panel p-3 rounded-2xl border border-white/10 space-y-2">
                        <div className="h-28 bg-black/40 rounded-lg overflow-hidden flex items-center justify-center">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={file.url} alt={file.filename} className="h-full object-cover" />
                        </div>
                        <div className="text-[11px] font-mono text-warmWhite truncate">{file.filename}</div>
                        <div className="flex items-center justify-between text-[10px] font-mono text-metalTitanium">
                          <span>{file.size}</span>
                          <button
                            onClick={() => copyToClipboard(file.url)}
                            className="flex items-center gap-1 text-warmWhite hover:underline"
                          >
                            {copiedUrl === file.url ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            {copiedUrl === file.url ? 'Copied' : 'Copy URL'}
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* SEO TAB */}
            {activeTab === 'seo' && (
              <div className="space-y-6">
                <h3 className="font-heading text-xl font-medium mb-6">Google Search Meta Settings</h3>
                <div>
                  <label className="block text-xs font-mono text-metalTitanium uppercase mb-2">Meta Title</label>
                  <input
                    type="text"
                    value={formData.seo.metaTitle}
                    onChange={(e) => setFormData({ ...formData, seo: { ...formData.seo, metaTitle: e.target.value } })}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-warmWhite text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-metalTitanium uppercase mb-2">Meta Description</label>
                  <textarea
                    rows={3}
                    value={formData.seo.metaDescription}
                    onChange={(e) => setFormData({ ...formData, seo: { ...formData.seo, metaDescription: e.target.value } })}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-warmWhite text-sm"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Live Interactive Split-Screen Preview Pane */}
        {showLivePreview && (
          <div className="lg:col-span-5 space-y-4">
            <div className="glass-panel p-4 rounded-2xl border border-white/10 flex items-center justify-between">
              <div className="text-xs font-mono text-metalTitanium uppercase">Live Preview Pane</div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPreviewDevice('desktop')}
                  className={`p-1.5 rounded-lg border text-xs ${
                    previewDevice === 'desktop' ? 'bg-white/20 border-white/40 text-warmWhite' : 'border-white/10 text-metalTitanium'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setPreviewDevice('mobile')}
                  className={`p-1.5 rounded-lg border text-xs ${
                    previewDevice === 'mobile' ? 'bg-white/20 border-white/40 text-warmWhite' : 'border-white/10 text-metalTitanium'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="glass-panel p-2 rounded-3xl border border-white/15 overflow-hidden flex justify-center bg-black/60">
              <iframe
                src="http://localhost:3000"
                className={`transition-all duration-300 rounded-2xl border border-white/10 ${
                  previewDevice === 'mobile' ? 'w-[360px] h-[640px]' : 'w-full h-[600px]'
                }`}
                title="Drixel Live Preview"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
