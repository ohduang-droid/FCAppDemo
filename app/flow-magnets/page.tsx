'use client';

// 苏富比冰箱贴页面 - 基于 app/[id]/page.tsx 的功能，使用静态数据
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AudioPlayerModal } from "@/components/AudioPlayerModal";
import { SubscriptionModal } from "@/components/SubscriptionModal";
import dynamic from 'next/dynamic';
import { slugify } from '@/lib/slug';
import { NewsletterData, RichTextElement } from '@/lib/types/notion';

// Dynamically import RichTextRenderer with SSR disabled to avoid hydration issues
const RichTextRenderer = dynamic(
  () => import('@/components/RichTextRenderer').then(mod => ({ default: mod.RichTextRenderer })),
  { ssr: false }
);

// 静态数据 - 苏富比冰箱贴
const staticNewsletterData: NewsletterData = {
  id: 'flow-magnets-1',
  templateKey: 'flow-magnets',
  title: '苏富比冰箱贴\n收藏艺术\n的独特方式',
  author: 'Sotheby\'s',
  content: '<p>苏富比冰箱贴是收藏艺术品的独特方式。每一枚冰箱贴都承载着艺术品的精髓，让您在家中就能欣赏到世界顶级艺术品的魅力。</p><p>这些精美的冰箱贴不仅具有装饰功能，更是艺术收藏的入门级选择。无论是印象派大师的作品，还是当代艺术家的杰作，都能以冰箱贴的形式呈现在您的日常生活中。</p><h2>收藏价值</h2><p>每一枚苏富比冰箱贴都经过精心设计，确保在保持艺术品原貌的同时，适应冰箱贴的独特展示方式。我们与全球顶级艺术家和画廊合作，为您带来最优质的艺术品收藏体验。</p><h2>使用场景</h2><ul><li>家庭装饰 - 为您的厨房增添艺术气息</li><li>礼品选择 - 送给艺术爱好者的完美礼物</li><li>收藏入门 - 以亲民的价格开始您的艺术收藏之旅</li></ul>',
  contentRichText: [
    {
      type: 'text',
      text: { content: '<p>苏富比冰箱贴是收藏艺术品的独特方式。每一枚冰箱贴都承载着艺术品的精髓，让您在家中就能欣赏到世界顶级艺术品的魅力。</p><p>这些精美的冰箱贴不仅具有装饰功能，更是艺术收藏的入门级选择。无论是印象派大师的作品，还是当代艺术家的杰作，都能以冰箱贴的形式呈现在您的日常生活中。</p><h2>收藏价值</h2><p>每一枚苏富比冰箱贴都经过精心设计，确保在保持艺术品原貌的同时，适应冰箱贴的独特展示方式。我们与全球顶级艺术家和画廊合作，为您带来最优质的艺术品收藏体验。</p><h2>使用场景</h2><ul><li>家庭装饰 - 为您的厨房增添艺术气息</li><li>礼品选择 - 送给艺术爱好者的完美礼物</li><li>收藏入门 - 以亲民的价格开始您的艺术收藏之旅</li></ul>', link: null },
      annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false, color: 'default' },
      plain_text: '苏富比冰箱贴是收藏艺术品的独特方式。每一枚冰箱贴都承载着艺术品的精髓，让您在家中就能欣赏到世界顶级艺术品的魅力。这些精美的冰箱贴不仅具有装饰功能，更是艺术收藏的入门级选择。无论是印象派大师的作品，还是当代艺术家的杰作，都能以冰箱贴的形式呈现在您的日常生活中。收藏价值：每一枚苏富比冰箱贴都经过精心设计，确保在保持艺术品原貌的同时，适应冰箱贴的独特展示方式。我们与全球顶级艺术家和画廊合作，为您带来最优质的艺术品收藏体验。使用场景：家庭装饰 - 为您的厨房增添艺术气息；礼品选择 - 送给艺术爱好者的完美礼物；收藏入门 - 以亲民的价格开始您的艺术收藏之旅。',
      href: null
    }
  ],
  time: '2025年1月',
  annualPrice: '¥500/年',
  monthlyPrice: '¥50/月',
  ctaText: '查看完整内容',
  benefits: [
    '精美的艺术品冰箱贴收藏',
    '定期更新的限量版设计',
    '专属会员折扣和优先购买权',
    '艺术收藏指南和专家建议'
  ],
  consume: '苏富比冰箱贴是收藏艺术品的独特方式。每一枚冰箱贴都承载着艺术品的精髓，让您在家中就能欣赏到世界顶级艺术品的魅力。这些精美的冰箱贴不仅具有装饰功能，更是艺术收藏的入门级选择。无论是印象派大师的作品，还是当代艺术家的杰作，都能以冰箱贴的形式呈现在您的日常生活中。',
  ttsUrl: undefined
};

export default function FlowMagnets() {
  const router = useRouter();
  const newsletter = staticNewsletterData;

  // Screen1 functionality states
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showArticleContent, setShowArticleContent] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [screenHeight, setScreenHeight] = useState(0);
  const [titleFontSizes, setTitleFontSizes] = useState<{ [key: number]: number }>({});
  const [ttsText, setTtsText] = useState<string>('');
  const [isPlayingTTS, setIsPlayingTTS] = useState(false);
  const [ttsTitle, setTtsTitle] = useState<string>('');
  const [ttsProgress, setTtsProgress] = useState(0);
  const [ttsCurrentTime, setTtsCurrentTime] = useState(0);
  const [ttsDuration, setTtsDuration] = useState(0);
  const [newsletterTitle, setNewsletterTitle] = useState<string>(newsletter.title);
  const [showPlaybackControls, setShowPlaybackControls] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRefs = useRef<{ [key: number]: HTMLHeadingElement | null }>({});
  const isScrollingRef = useRef(false);
  const touchStartYRef = useRef(0);
  const touchEndYRef = useRef(0);
  const isTouchingRef = useRef(false);
  const currentIndexRef = useRef(currentIndex);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUnlockedRef = useRef(false);
  const [showAudioUnlockPrompt, setShowAudioUnlockPrompt] = useState(false);

  // Create article array from static data
  const articles = [{
    id: 1,
    title: newsletter.title,
    author: newsletter.author,
    readMinutes: 5,
    date: newsletter.time,
    category: 'Newsletter',
    benefits: newsletter.benefits,
    audioTitle: newsletter.title,
    audioProgress: 0
  }];

  const currentArticle = articles.length > 0 ? articles[currentIndex] : null;

  // Keep currentIndexRef in sync with currentIndex
  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  // Calculate actual screen height dynamically
  useEffect(() => {
    const updateHeight = () => {
      const height = window.innerHeight;
      setScreenHeight(height);
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    window.addEventListener('orientationchange', updateHeight);

    return () => {
      window.removeEventListener('resize', updateHeight);
      window.removeEventListener('orientationchange', updateHeight);
    };
  }, []);

  // Reset font sizes on window resize
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setTitleFontSizes({});
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  // Adjust title font size to fit within 4 lines
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const adjustTitleFontSize = (articleId: number) => {
      const titleElement = titleRefs.current[articleId];
      if (!titleElement) return;

      const hasContent = titleElement.textContent && titleElement.textContent.trim().length > 0;
      if (!hasContent) {
        setTimeout(() => {
          adjustTitleFontSize(articleId);
        }, 100);
        return;
      }

      titleElement.style.visibility = 'hidden';
      titleElement.style.opacity = '0';

      const baseSize = window.innerWidth >= 640 ? 40 : 35;
      let fontSize = baseSize;
      titleElement.style.fontSize = `${fontSize}pt`;

      const calculateOptimalSize = () => {
        titleElement.offsetHeight;

        const computedStyle = window.getComputedStyle(titleElement);
        const lineHeightValue = computedStyle.lineHeight;
        const lineHeight = lineHeightValue === 'normal'
          ? fontSize * 1.2
          : parseFloat(lineHeightValue);

        const maxHeight = lineHeight * 4;
        let actualHeight = titleElement.scrollHeight;

        while (actualHeight > maxHeight && fontSize > 20) {
          fontSize -= 1;
          titleElement.style.fontSize = `${fontSize}pt`;
          titleElement.offsetHeight;
          actualHeight = titleElement.scrollHeight;
        }

        setTitleFontSizes(prev => ({ ...prev, [articleId]: fontSize }));
        titleElement.style.visibility = 'visible';
        titleElement.style.opacity = '1';
      };

      setTimeout(() => {
        calculateOptimalSize();
      }, 50);
    };

    const currentArticle = articles[currentIndex];
    if (currentArticle) {
      if (currentIndex === 0 && !newsletterTitle) {
        setTimeout(() => {
          adjustTitleFontSize(currentArticle.id);
        }, 200);
      } else {
        adjustTitleFontSize(currentArticle.id);
      }
    }
  }, [currentIndex, screenHeight, newsletterTitle]);

  const handleViewFullIssue = () => {
    if (isSubscribed) {
      setShowArticleContent(true);
    } else {
      setShowSubscriptionModal(true);
    }
  };

  const handleSubscribe = async () => {
    setIsSubscribed(true);
    setShowSubscriptionModal(false);
    setShowArticleContent(true);
  };

  const handleCloseModal = () => {
    setShowSubscriptionModal(false);
  };

  const handleBackToMagnet = () => {
    setShowArticleContent(false);
  };

  const handlePlaybackClick = () => {
    setShowAudioPlayer(true);
  };

  const handleCloseAudioPlayer = () => {
    setShowAudioPlayer(false);
  };

  // Handle explicit audio unlock tap - iOS Safari requires this
  const handleAudioUnlockTap = () => {
    const audio = audioRef.current;
    if (!audio) {
      audioUnlockedRef.current = true;
      setShowAudioUnlockPrompt(false);
      if (newsletter?.consume && !newsletter.ttsUrl) {
        startTTSPlayback(newsletter.consume);
      }
      return;
    }

    audio.play().then(() => {
      audioUnlockedRef.current = true;
      setShowAudioUnlockPrompt(false);
      setIsPlayingTTS(true);
      setShowPlaybackControls(true);
    }).catch(err => {
      console.error('Audio unlock failed:', err);
      audioUnlockedRef.current = true;
      setShowAudioUnlockPrompt(false);
    });
  };

  // Initialize Audio logic when component mounts
  useEffect(() => {
    if (!newsletter) return;

    stopTTSPlayback();
    setTtsTitle(newsletter.title.split('\n')[0]);

    // Priority 1: S3 Audio URL
    if (newsletter.ttsUrl) {
      setTtsText("Audio available");
      setShowPlaybackControls(true);

      if (audioUnlockedRef.current && audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlayingTTS(true);
        }).catch(() => {
          setShowAudioUnlockPrompt(true);
          setIsPlayingTTS(false);
        });
      } else {
        setShowAudioUnlockPrompt(true);
        setIsPlayingTTS(false);
      }
      return;
    }

    // Priority 2: TTS (Web Speech API) Fallback
    if (newsletter.consume) {
      setTtsText(newsletter.consume);

      if (audioUnlockedRef.current) {
        setTimeout(() => {
          startTTSPlayback(newsletter.consume);
        }, 500);
      } else {
        setShowAudioUnlockPrompt(true);
        setShowPlaybackControls(true);
      }
    }
  }, [newsletter]);

  // Start Playback (Unified)
  const startTTSPlayback = (textSource: string, startTime: number = 0) => {
    // Mode A: Audio URL
    if (newsletter?.ttsUrl && audioRef.current) {
      const audio = audioRef.current;
      audio.currentTime = startTime;
      audio.play().then(() => {
        setIsPlayingTTS(true);
        setShowPlaybackControls(true);
      }).catch(err => {
        console.error("Audio playback error:", err);
        if (err.name === 'NotAllowedError') {
          setIsPlayingTTS(false);
          setShowPlaybackControls(true);
        }
      });
      return;
    }

    // Mode B: Web Speech API (Fallback)
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.error('Speech synthesis not supported');
      return;
    }

    if (synthRef.current) {
      synthRef.current.cancel();
    }

    synthRef.current = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(textSource);
    utterance.lang = 'zh-CN';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    utterance.onstart = () => {
      setIsPlayingTTS(true);
      setShowPlaybackControls(true);

      const fullDuration = ttsText.length / 10;
      const remainingDuration = textSource.length / 10;
      setTtsDuration(fullDuration);

      const interval = 100;
      let elapsed = startTime;

      progressIntervalRef.current = setInterval(() => {
        elapsed += interval / 1000;
        const progress = Math.min((elapsed / fullDuration) * 100, 100);
        setTtsProgress(progress);
        setTtsCurrentTime(elapsed);
      }, interval);
    };

    utterance.onend = () => {
      setIsPlayingTTS(false);
      setTtsProgress(100);
      setTtsCurrentTime(ttsDuration);
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    };

    utterance.onerror = (error) => {
      console.error('TTS error:', error);
      setIsPlayingTTS(false);
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    };

    utteranceRef.current = utterance;
    synthRef.current.speak(utterance);
  };

  // Toggle Playback (Unified)
  const toggleTTSPlayback = () => {
    if (newsletter?.ttsUrl && audioRef.current) {
      if (isPlayingTTS) {
        audioRef.current.pause();
        setIsPlayingTTS(false);
      } else {
        audioRef.current.play();
        setIsPlayingTTS(true);
        setShowPlaybackControls(true);
      }
      return;
    }

    if (!synthRef.current || !utteranceRef.current) return;

    if (isPlayingTTS) {
      synthRef.current.pause();
      setIsPlayingTTS(false);
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    } else {
      synthRef.current.resume();
      setIsPlayingTTS(true);
      setShowPlaybackControls(true);
    }
  };

  // Stop Playback (Unified)
  const stopTTSPlayback = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    if (synthRef.current) {
      synthRef.current.cancel();
    }

    setIsPlayingTTS(false);
    setTtsProgress(0);
    setTtsCurrentTime(0);
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };

  // Seek forward 15 seconds (Unified)
  const seekForward15 = () => {
    if (newsletter?.ttsUrl && audioRef.current) {
      audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 15, audioRef.current.duration);
      return;
    }

    if (!ttsText || !synthRef.current) return;

    const wasPlaying = isPlayingTTS;
    const currentTime = ttsCurrentTime;
    const duration = ttsDuration || (ttsText.length / 10);
    const newTime = Math.min(currentTime + 15, duration);

    const newProgress = (newTime / duration) * 100;
    setTtsCurrentTime(newTime);
    setTtsProgress(newProgress);

    if (wasPlaying && newTime < duration) {
      const charsPerSecond = ttsText.length / duration;
      const startChar = Math.floor(newTime * charsPerSecond);
      const remainingText = ttsText.substring(startChar);

      synthRef.current.cancel();
      setIsPlayingTTS(false);
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }

      setTimeout(() => {
        startTTSPlayback(remainingText, newTime);
      }, 100);
    }
  };

  // Seek backward 15 seconds (Unified)
  const seekBackward15 = () => {
    if (newsletter?.ttsUrl && audioRef.current) {
      audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 15, 0);
      return;
    }

    if (!ttsText || !synthRef.current) return;

    const wasPlaying = isPlayingTTS;
    const currentTime = ttsCurrentTime;
    const duration = ttsDuration || (ttsText.length / 10);
    const newTime = Math.max(currentTime - 15, 0);

    const newProgress = (newTime / duration) * 100;
    setTtsCurrentTime(newTime);
    setTtsProgress(newProgress);

    if (wasPlaying && newTime >= 0) {
      const charsPerSecond = ttsText.length / duration;
      const startChar = Math.floor(newTime * charsPerSecond);
      const remainingText = ttsText.substring(startChar);

      synthRef.current.cancel();
      setIsPlayingTTS(false);
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }

      setTimeout(() => {
        startTTSPlayback(remainingText, newTime);
      }, 100);
    }
  };

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('.fixed.bottom-0')) return;

    if (isTouchingRef.current || isScrollingRef.current) return;
    isTouchingRef.current = true;
    touchStartYRef.current = e.targetTouches[0].clientY;
    touchEndYRef.current = e.targetTouches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isTouchingRef.current) return;
    touchEndYRef.current = e.targetTouches[0].clientY;
  };

  const handleTouchEnd = () => {
    if (!isTouchingRef.current || isScrollingRef.current) {
      isTouchingRef.current = false;
      return;
    }

    const startY = touchStartYRef.current;
    const endY = touchEndYRef.current;

    isTouchingRef.current = false;

    if (!startY || !endY || startY === endY) {
      touchStartYRef.current = 0;
      touchEndYRef.current = 0;
      return;
    }

    const distance = startY - endY;
    const minSwipeDistance = 50;

    if (isScrollingRef.current) return;

    if (distance > minSwipeDistance && currentIndex < articles.length - 1) {
      isScrollingRef.current = true;
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 600);
    } else if (distance < -minSwipeDistance && currentIndex > 0) {
      isScrollingRef.current = true;
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 600);
    }

    touchStartYRef.current = 0;
    touchEndYRef.current = 0;
  };

  return (
    <div
      ref={containerRef}
      className="bg-white flex flex-col w-full max-w-md mx-auto overflow-hidden relative"
      style={{ height: screenHeight || '100vh' }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Conditional rendering: Show article content or magnet view */}
      {showArticleContent ? (
        /* Article Content View */
        <div className="flex-1 overflow-y-auto px-3 sm:px-4 pb-6">
          <div className="max-w-none w-full pt-3 sm:pt-4">
            {/* Back button */}
            <button
              onClick={handleBackToMagnet}
              className="mb-3 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Back to overview"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-sm sm:text-base">返回</span>
            </button>

            {/* Article Title */}
            <h1 className="text-[24pt] sm:text-[28pt] font-bold mb-3 sm:mb-4 leading-tight text-black break-words font-atlantic-condensed" style={{ fontFamily: 'Atlantic Condensed, Georgia, serif' }}>
              {newsletter.title}
            </h1>

            {/* Author and Date */}
            <div className="flex justify-between items-center mb-4 sm:mb-5">
              <Link
                href={`/channel/${slugify(newsletter.author)}`}
                className="text-xs sm:text-sm text-gray-600 hover:underline"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                作者：{newsletter.author}
              </Link>
              <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider" style={{ fontFamily: 'monospace' }}>
                {newsletter.time}
              </p>
            </div>

            {/* Article Content */}
            <RichTextRenderer richText={newsletter.contentRichText} />
          </div>
        </div>
      ) : (
        /* Magnet View */
        <>
          <div className="flex-1 overflow-hidden relative">
            <div
              className="h-full transition-transform duration-500 ease-in-out"
              style={{ transform: `translateY(-${currentIndex * 100}%)` }}
            >
              {articles.map((article, index) => {
                return (
                  <div
                    key={article.id}
                    className="h-full flex flex-col overflow-hidden"
                  >
                    <div className="flex-1 overflow-y-auto px-3 sm:px-4 pb-safe">
                      <div className="max-w-none w-full pt-3 sm:pt-4 pb-24">
                        {/* Main headline */}
                        <h1
                          ref={(el) => { titleRefs.current[article.id] = el; }}
                          className="font-bold mb-4 sm:mb-5 leading-tight text-black text-center font-atlantic-condensed"
                          style={{
                            fontFamily: 'Atlantic Condensed, Georgia, serif',
                            fontSize: titleFontSizes[article.id]
                              ? `${titleFontSizes[article.id]}pt`
                              : '32pt',
                            visibility: titleFontSizes[article.id] ? 'visible' : 'visible',
                            opacity: titleFontSizes[article.id] ? '1' : '1'
                          }}
                        >
                          {newsletter.title.split('\n').map((line, i) => (
                            <span key={i}>
                              {line}
                              {i < newsletter.title.split('\n').length - 1 && <br />}
                            </span>
                          ))}
                        </h1>
                        {/* Author and date */}
                        <div className="flex flex-col items-center mb-2 gap-2">
                          <Link
                            href={`/channel/${slugify(newsletter.author)}`}
                            className="text-sm sm:text-base text-gray-600 break-words text-center hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-gray-900 focus-visible:outline-offset-2"
                            style={{ fontFamily: 'Georgia, serif' }}
                            aria-label={`View channel for ${newsletter.author}`}
                          >
                            作者：{newsletter.author}
                          </Link>
                          <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider text-center">
                            {newsletter.time}
                          </p>
                        </div>

                        {/* Button */}
                        <div className="flex justify-end mb-5 sm:mb-8 mt-8 sm:mt-10 -mx-3 sm:-mx-4">
                          <button
                            onClick={handleViewFullIssue}
                            className="bg-red-600 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-none font-bold text-lg sm:text-xl hover:bg-red-700 transition-colors touch-manipulation w-full h-[82px] font-atlantic-condensed flex items-center justify-center gap-2"
                            style={{ fontFamily: 'Atlantic Condensed, Georgia, serif' }}
                          >
                            <span>{newsletter.ctaText || '查看完整内容'}</span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="sm:w-6 sm:h-6">
                              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </button>
                        </div>

                        {/* You'll get section */}
                        <div className="mt-10 sm:mt-14 grid">
                          <h2 className="text-lg sm:text-xl font-bold text-black mb-3 sm:mb-4 break-words font-atlantic-condensed text-center" style={{ fontFamily: 'Atlantic Condensed, Georgia, serif' }}>
                            You&apos;ll get:
                          </h2>

                          <ul className="space-y-2 sm:space-y-2.5 flex flex-col items-center">
                            {article.benefits.map((benefit, i) => (
                              <li key={i} className="text-lg sm:text-xl text-black leading-relaxed break-words font-atlantic-condensed text-center" style={{ fontFamily: 'Atlantic Condensed, Georgia, serif' }}>
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* Bottom playback controls - only show in magnet view */}
      {showPlaybackControls && !showArticleContent && (
        <div className="fixed bottom-0 left-0 right-0 w-full max-w-md mx-auto px-3 sm:px-4 bg-white pb-[max(1rem,env(safe-area-inset-bottom))] pt-2 z-50">
          <div className="h-0.5 bg-gray-200 mb-2 sm:mb-3">
            <div
              className="h-full bg-hark-red transition-all duration-500"
              style={{ width: `${ttsText ? ttsProgress : (currentArticle?.audioProgress ?? 0)}%` }}
            ></div>
          </div>
          <div className="flex items-center justify-between gap-2 cursor-pointer" onClick={handlePlaybackClick}>
            <div className="flex-1 mr-2 sm:mr-4 min-w-0 overflow-hidden relative" style={{ height: '1.5em' }}>
              <h2
                className="text-sm sm:text-lg font-bold text-black whitespace-nowrap absolute transition-all duration-500"
                style={{
                  animation: (ttsText && newsletterTitle && newsletterTitle.replace(/\n/g, ' ').length > 30) ||
                    (!ttsText && currentArticle?.audioTitle && currentArticle.audioTitle.length > 30)
                    ? 'scroll-text 15s linear infinite'
                    : 'none'
                }}
              >
                {ttsText
                  ? (newsletterTitle ? newsletterTitle.replace(/\n/g, ' ') : ttsTitle)
                  : (currentArticle?.audioTitle || '加载中...')}
              </h2>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <button
                className="p-1.5 sm:p-1 touch-manipulation"
                aria-label={isPlayingTTS ? 'Pause' : 'Play'}
                onClick={(e) => {
                  e.stopPropagation();
                  if (ttsText) {
                    toggleTTSPlayback();
                  }
                }}
              >
                {isPlayingTTS ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="sm:w-6 sm:h-6">
                    <rect x="8" y="6" width="3" height="12" fill="#000000" />
                    <rect x="13" y="6" width="3" height="12" fill="#000000" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="sm:w-6 sm:h-6">
                    <path d="M6 4L18 12L6 20V4Z" fill="#000000" />
                  </svg>
                )}
              </button>
              <button
                className="p-1.5 sm:p-1 touch-manipulation"
                aria-label="Stop"
                onClick={(e) => {
                  e.stopPropagation();
                  if (ttsText) {
                    stopTTSPlayback();
                    setTtsText('');
                    setTtsTitle('');
                    setTtsProgress(0);
                    setTtsCurrentTime(0);
                    setTtsDuration(0);
                    setShowPlaybackControls(false);
                  }
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="sm:w-6 sm:h-6">
                  <path d="M18 6L6 18M6 6L18 18" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Audio Unlock Prompt */}
      {showAudioUnlockPrompt && !showArticleContent && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={handleAudioUnlockTap}
        >
          <button
            className="bg-white rounded-2xl px-8 py-6 shadow-2xl flex flex-col items-center gap-4 touch-manipulation active:scale-95 transition-transform"
            onClick={handleAudioUnlockTap}
          >
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M6 4L18 12L6 20V4Z" fill="white" />
              </svg>
            </div>
            <span className="text-lg font-bold text-gray-900">点击启用音频</span>
            <span className="text-sm text-gray-500">音频播放需要此操作</span>
          </button>
        </div>
      )}

      {/* Audio Player Modal */}
      <AudioPlayerModal
        isOpen={showAudioPlayer}
        onClose={handleCloseAudioPlayer}
        onSeekForward={seekForward15}
        onSeekBackward={seekBackward15}
        ttsText={ttsText}
        onViewFullIssue={handleViewFullIssue}
        newsletterTitle={newsletterTitle}
        newsletterAuthor={newsletter.author}
        isPlaying={isPlayingTTS}
        onTogglePlay={toggleTTSPlayback}
        progress={ttsProgress}
        currentTime={ttsCurrentTime}
        duration={ttsDuration}
      />

      {/* Subscription Modal */}
      <SubscriptionModal
        isOpen={showSubscriptionModal}
        onClose={handleCloseModal}
        onSubscribe={handleSubscribe}
        annualPrice={newsletter.annualPrice}
        monthlyPrice={newsletter.monthlyPrice}
      />

      {/* Hidden Audio Element for S3 URL Playback */}
      {newsletter?.ttsUrl && (
        <audio
          ref={audioRef}
          src={newsletter.ttsUrl}
          onTimeUpdate={(e) => {
            const audio = e.currentTarget;
            if (!Number.isNaN(audio.duration)) {
              setTtsCurrentTime(audio.currentTime);
              setTtsDuration(audio.duration);
              setTtsProgress((audio.currentTime / audio.duration) * 100);
            }
          }}
          onEnded={() => {
            setIsPlayingTTS(false);
            setTtsProgress(100);
          }}
          onPause={() => setIsPlayingTTS(false)}
          onPlay={() => {
            setIsPlayingTTS(true);
            setShowPlaybackControls(true);
          }}
          onError={(e) => console.error("Audio element error:", e)}
        />
      )}
    </div>
  );
}
