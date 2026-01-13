'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Advisor {
  id: string;
  name: string;
  title: string;
  image?: string;
  phone?: string;
  email?: string;
  office: string;
  languages?: string[];
  specialties?: string[];
}

interface FilterOptions {
  office: string;
  language: string;
  specialty: string;
  group: string;
  agentName: string;
}

export default function AdvisorsPage() {
  const router = useRouter();
  const [advisors, setAdvisors] = useState<Advisor[]>([]);
  const [filteredAdvisors, setFilteredAdvisors] = useState<Advisor[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({
    office: 'Any Office',
    language: 'Any Language',
    specialty: 'Any Specialties',
    group: 'Any',
    agentName: ''
  });
  const [loading, setLoading] = useState(true);
  const [screenHeight, setScreenHeight] = useState(0);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [tempFilters, setTempFilters] = useState<FilterOptions>({
    office: 'Any Office',
    language: 'Any Language',
    specialty: 'Any Specialties',
    group: 'Any',
    agentName: ''
  });
  const [showLanguageSelect, setShowLanguageSelect] = useState(false);
  const [showDesignationSelect, setShowDesignationSelect] = useState(false);
  const [showOfficeSelect, setShowOfficeSelect] = useState(false);
  const [showGroupSelect, setShowGroupSelect] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  // 模拟筛选选项数据（根据网站信息）
  const officeOptions = [
    'Any Office',
    'Turtle Creek',
    'Fort Worth',
    'Lakewood',
    'Ranch and Land Division',
    'Southlake',
    'The North/Plano'
  ];

  const languageOptions = [
    'Any Language',
    'English',
    'French-Canadian',
    'German',
    'Mandarin Chinese',
    'Spanish'
  ];

  const specialtyOptions = [
    'Any Specialties',
    'Consulting',
    'Listing Agent',
    'Relocation',
    'Short-Sale'
  ];

  const groupOptions = [
    'Any',
    'Farm and Ranch Specialists',
    'Commercial Division',
    'Leadership Team',
    'Teams',
    'Agents',
    'Staff'
  ];

  // Designations options (mapping from specialties)
  const designationOptions = [
    'Consulting',
    'Listing Agent',
    'Relocation',
    'Short-Sale'
  ];

  // 计算屏幕高度
  useEffect(() => {
    const updateHeight = () => {
      setScreenHeight(window.innerHeight);
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  // 获取顾问数据
  useEffect(() => {
    const fetchAdvisors = async () => {
      try {
        const response = await fetch('/api/advisors');
        const data = await response.json();
        
        if (data.advisors) {
          setAdvisors(data.advisors);
          setFilteredAdvisors(data.advisors);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching advisors:', error);
        setLoading(false);
      }
    };

    fetchAdvisors();
  }, []);

  // 应用筛选
  useEffect(() => {
    let filtered = [...advisors];

    if (filters.office !== 'Any Office') {
      filtered = filtered.filter(advisor => advisor.office === filters.office);
    }

    if (filters.language !== 'Any Language') {
      filtered = filtered.filter(advisor => 
        advisor.languages?.includes(filters.language)
      );
    }

    if (filters.specialty !== 'Any Specialties') {
      filtered = filtered.filter(advisor => 
        advisor.specialties?.includes(filters.specialty)
      );
    }

    // Group筛选暂时不实现，因为数据结构中没有group字段
    // 如果需要可以后续添加

    if (filters.agentName.trim()) {
      filtered = filtered.filter(advisor => 
        advisor.name.toLowerCase().includes(filters.agentName.toLowerCase())
      );
    }

    setFilteredAdvisors(filtered);
  }, [filters, advisors]);

  const handleOfficeSelect = (office: string) => {
    setTempFilters({ ...tempFilters, office });
    setShowOfficeSelect(false);
  };

  const handleGroupSelect = (group: string) => {
    setTempFilters({ ...tempFilters, group });
    setShowGroupSelect(false);
  };

  // 同步tempFilters到filters
  useEffect(() => {
    setTempFilters({ ...filters });
  }, [filters]);

  const handleApplyFilters = () => {
    setFilters({ ...tempFilters });
    setShowFilterPanel(false);
  };

  const handleClearAll = () => {
    const clearedFilters: FilterOptions = {
      office: 'Any Office',
      language: 'Any Language',
      specialty: 'Any Specialties',
      group: 'Any',
      agentName: ''
    };
    setTempFilters(clearedFilters);
    setFilters(clearedFilters);
    setShowLanguageSelect(false);
    setShowDesignationSelect(false);
    setShowOfficeSelect(false);
    setShowGroupSelect(false);
  };

  const handleLanguageSelect = (lang: string) => {
    setTempFilters({ ...tempFilters, language: lang });
    setShowLanguageSelect(false);
  };

  const handleDesignationSelect = (spec: string) => {
    setTempFilters({ ...tempFilters, specialty: spec });
    setShowDesignationSelect(false);
  };

  return (
    <div
      className="bg-white flex flex-col w-full max-w-md mx-auto overflow-hidden relative"
      style={{ height: screenHeight || '100vh' }}
    >
      {/* Header */}
      <div className="flex-shrink-0 px-4 py-4 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="p-2 -ml-2 hover:bg-gray-100 rounded transition-colors touch-manipulation"
            aria-label="返回"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-black font-atlantic-condensed" style={{ fontFamily: 'Atlantic Condensed, Georgia, serif' }}>
            Find an Advisor
          </h1>
        </div>
      </div>

      {/* Filters Section - Header with count and Filter button */}
      <div className="flex-shrink-0 px-4 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between py-2">
          <span className="text-sm text-gray-700">
            共 {filteredAdvisors.length} 个Advisor
          </span>
          <button
            onClick={() => {
              setTempFilters({ ...filters });
              setShowLanguageSelect(false);
              setShowDesignationSelect(false);
              setShowOfficeSelect(false);
              setShowGroupSelect(false);
              setShowFilterPanel(true);
            }}
            className="px-4 py-1.5 bg-transparent border border-gray-400 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-50"
            style={{ borderRadius: '5px' }}
          >
            Filter
          </button>
        </div>
      </div>

      {/* Filter Panel - Slide in from right */}
      {showFilterPanel && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40 transition-opacity"
            onClick={() => setShowFilterPanel(false)}
          />
          
          {/* Filter Panel */}
          <div
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#001E3F] z-50 transform transition-transform duration-300 ease-out shadow-2xl"
            style={{ transform: showFilterPanel ? 'translateX(0)' : 'translateX(100%)' }}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/20">
                <h2 className="text-xl font-semibold text-white" style={{ fontFamily: 'Georgia, serif' }}>
                  Filters
                </h2>
                <button
                  onClick={() => setShowFilterPanel(false)}
                  className="text-white hover:text-gray-300 transition-colors"
                  aria-label="Close"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              {/* Filter Content */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                {/* Office location */}
                <div className="mb-6">
                  <div
                    onClick={() => setShowOfficeSelect(!showOfficeSelect)}
                    className="flex items-center justify-between pb-2 border-b border-white/30 cursor-pointer"
                  >
                    <label className="text-white text-sm font-medium">
                      Office location
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 text-sm">
                        {tempFilters.office === 'Any Office' ? 'Select' : tempFilters.office}
                      </span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"/>
                      </svg>
                    </div>
                  </div>
                  {showOfficeSelect && (
                    <div className="mt-3 space-y-2">
                      {officeOptions.map((office) => (
                        <button
                          key={office}
                          onClick={() => handleOfficeSelect(office)}
                          className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                            tempFilters.office === office
                              ? 'bg-white/20 text-white'
                              : 'text-gray-300 hover:bg-white/10'
                          }`}
                        >
                          {office}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Languages */}
                <div className="mb-6">
                  <div
                    onClick={() => setShowLanguageSelect(!showLanguageSelect)}
                    className="flex items-center justify-between pb-2 border-b border-white/30 cursor-pointer"
                  >
                    <label className="text-white text-sm font-medium">
                      Language
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 text-sm">
                        {tempFilters.language === 'Any Language' ? 'Select' : tempFilters.language}
                      </span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"/>
                      </svg>
                    </div>
                  </div>
                  {showLanguageSelect && (
                    <div className="mt-3 space-y-2">
                      {languageOptions.map((lang) => (
                        <button
                          key={lang}
                          onClick={() => handleLanguageSelect(lang)}
                          className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                            tempFilters.language === lang
                              ? 'bg-white/20 text-white'
                              : 'text-gray-300 hover:bg-white/10'
                          }`}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Specialties */}
                <div className="mb-6">
                  <div
                    onClick={() => setShowDesignationSelect(!showDesignationSelect)}
                    className="flex items-center justify-between pb-2 border-b border-white/30 cursor-pointer"
                  >
                    <label className="text-white text-sm font-medium">
                      Specialties
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 text-sm">
                        {tempFilters.specialty === 'Any Specialties' ? 'Select' : tempFilters.specialty}
                      </span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"/>
                      </svg>
                    </div>
                  </div>
                  {showDesignationSelect && (
                    <div className="mt-3 space-y-2">
                      {specialtyOptions.map((spec) => (
                        <button
                          key={spec}
                          onClick={() => handleDesignationSelect(spec)}
                          className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                            tempFilters.specialty === spec
                              ? 'bg-white/20 text-white'
                              : 'text-gray-300 hover:bg-white/10'
                          }`}
                        >
                          {spec}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Group */}
                <div className="mb-6">
                  <div
                    onClick={() => setShowGroupSelect(!showGroupSelect)}
                    className="flex items-center justify-between pb-2 border-b border-white/30 cursor-pointer"
                  >
                    <label className="text-white text-sm font-medium">
                      Group
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 text-sm">
                        {tempFilters.group === 'Any' ? 'Select' : tempFilters.group}
                      </span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"/>
                      </svg>
                    </div>
                  </div>
                  {showGroupSelect && (
                    <div className="mt-3 space-y-2">
                      {groupOptions.map((group) => (
                        <button
                          key={group}
                          onClick={() => handleGroupSelect(group)}
                          className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                            tempFilters.group === group
                              ? 'bg-white/20 text-white'
                              : 'text-gray-300 hover:bg-white/10'
                          }`}
                        >
                          {group}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-white/20">
                <button
                  onClick={handleClearAll}
                  className="text-white uppercase text-sm font-medium hover:text-gray-300 transition-colors"
                >
                  CLEAR ALL
                </button>
                <button
                  onClick={handleApplyFilters}
                  className="px-6 py-2 bg-[#001E3F] border border-amber-600 text-white uppercase text-sm font-medium hover:bg-[#002a5c] transition-colors"
                >
                  APPLY
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Search Input - Optional, can be added below filters if needed */}
      {filters.agentName && (
        <div className="flex-shrink-0 px-4 py-2 bg-white border-b border-gray-200">
          <input
            type="text"
            value={filters.agentName}
            onChange={(e) => setFilters(prev => ({ ...prev, agentName: e.target.value }))}
            placeholder="Search by name..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#001E3F] focus:border-transparent"
          />
        </div>
      )}

      {/* Advisors List */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-gray-500">Loading advisors...</p>
          </div>
        ) : filteredAdvisors.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-gray-500 text-center mb-2">No advisors found</p>
            <p className="text-sm text-gray-400 text-center">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredAdvisors.map((advisor) => (
              <div
                key={advisor.id}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex">
                  {/* Image/Avatar - Left side */}
                  <div className="flex-shrink-0 w-32 h-32 sm:w-36 sm:h-36" style={{ marginTop: '20px' }}>
                    {advisor.image ? (
                      <img
                        src={advisor.image}
                        alt={advisor.name}
                        className="w-full h-full object-cover rounded-lg"
                        onError={(e) => {
                          // 如果图片加载失败，显示首字母占位符
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `
                              <div class="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center rounded-lg">
                                <span class="text-gray-500 text-3xl font-bold" style="line-height: 1;">${advisor.name.charAt(0)}</span>
                              </div>
                            `;
                          }
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center rounded-lg">
                        <span className="text-gray-500 text-3xl font-bold" style={{ lineHeight: '1' }}>
                          {advisor.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Info - Right side */}
                  <div className="flex-1 min-w-0 p-3 sm:p-4 flex flex-col justify-between">
                    <div>
                      {/* Name */}
                      <h3 className="text-base sm:text-lg font-semibold mb-1 line-clamp-1" style={{ color: '#BD8A52' }}>
                        {advisor.name}
                      </h3>
                      
                      {/* Title */}
                      <p className="text-sm text-gray-600 mb-1.5 line-clamp-1">
                        {advisor.title}
                      </p>
                      
                      {/* Office */}
                      <p className="text-xs text-gray-500 mb-3">
                        {advisor.office}
                      </p>

                      {/* Phone Info */}
                      {advisor.phone && (
                        <div className="mb-3 space-y-1">
                          <a
                            href={`tel:${advisor.phone}`}
                            className="text-xs text-[#001E3F] hover:underline inline-block"
                            onClick={(e) => e.stopPropagation()}
                            style={{ lineHeight: '1.5', minHeight: 'auto', minWidth: 'auto' }}
                          >
                            <span style={{ color: '#BD8A52' }}>Phone:</span> {advisor.phone}
                          </a>
                          <br />
                          <a
                            href={`tel:${advisor.phone}`}
                            className="text-xs text-[#001E3F] hover:underline inline-block"
                            onClick={(e) => e.stopPropagation()}
                            style={{ lineHeight: '1.5', minHeight: 'auto', minWidth: 'auto' }}
                          >
                            <span style={{ color: '#BD8A52' }}>Cell:</span> {advisor.phone}
                          </a>
                        </div>
                      )}

                      {/* Contact me Button */}
                      <button
                        className="text-xs px-3 py-1.5 text-white rounded-md transition-colors w-fit"
                        style={{ backgroundColor: '#BD8A52' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#a67a47'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#BD8A52'}
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowContactModal(true);
                        }}
                      >
                        Contact me
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setShowContactModal(false)}
        >
          <div
            className="bg-white rounded-2xl px-8 py-6 shadow-2xl max-w-sm mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-lg font-semibold text-gray-900 text-center">
              Thanks for your email. We&apos;ve received it and will reach out shortly.
            </p>
            <button
              onClick={() => setShowContactModal(false)}
              className="mt-4 w-full px-4 py-2 bg-[#001E3F] text-white rounded-md hover:bg-[#002a5c] transition-colors"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
