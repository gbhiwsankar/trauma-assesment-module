import re

html_content = r"""
<aside aria-label="Crisis Safety Tools" class="fixed bottom-4 right-4 z-50 flex flex-col sm:flex-row items-end sm:items-center gap-2">
    <div id="safetyTooltip" class="hidden sm:block text-xs bg-gray-900 text-white px-3 py-1.5 rounded-lg shadow-lg opacity-90">
      Press <kbd class="px-1.5 py-0.5 bg-gray-800 rounded border border-gray-700 font-mono text-[10px]">ESC</kbd> or click to exit immediately
    </div>
    <button 
      id="quickExitBtn"
      onClick={handleQuickExit} 
      class="bg-red-700 hover:bg-red-800 text-white font-semibold px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 border-2 border-white transition-all transform hover:scale-105 active:scale-95 text-sm"
      aria-label="Quick Exit website immediately for safety">
      <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
      <span>Quick Exit (ESC)</span>
    </button>
  </aside>

  <header class="w-full">
    <div class="bg-red-950 text-rose-100 text-xs sm:text-sm px-4 py-2 flex flex-wrap items-center justify-between border-b border-red-900 gap-2">
      <div class="flex items-center gap-2 font-medium mx-auto md:mx-0">
        <span class="inline-flex w-2.5 h-2.5 rounded-full bg-red-400 animate-ping"></span>
        <span class="font-semibold text-white">In Immediate Crisis?</span>
        <span>Call or text <strong>988</strong> (Suicide & Crisis) or <strong>1-800-799-7233</strong> (Domestic Violence 24/7)</span>
      </div>
      <div class="flex items-center gap-4 mx-auto md:mx-0 text-xs">
        <a href="tel:988" class="underline decoration-red-300 font-semibold text-white hover:text-rose-200">One-Tap Call 988</a>
        <span class="text-rose-400">|</span>
        <a href="sms:741741?&body=HOME" class="underline decoration-red-300 font-semibold text-white hover:text-rose-200">Text HOME to 741741</a>
        <span class="text-rose-400 hidden sm:inline">|</span>
        <button onClick={() => setIsHistoryTipOpen(!isHistoryTipOpen)} class="text-rose-200 hover:text-white underline cursor-pointer hidden sm:inline">
          Clear browsing history tip
        </button>
      </div>
    </div>

    <div class="bg-brand-forest text-white shadow-md">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        
        {/* Logo */}
        <a href="#" class="flex items-center gap-2 group">
          <div class="w-9 h-9 rounded-xl bg-brand-limeAccent text-brand-forest font-serif font-black text-xl flex items-center justify-center group-hover:rotate-6 transition-transform">
            S
          </div>
          <div>
            <span class="text-2xl font-serif font-bold tracking-tight text-white">SafeHaven</span>
            <span class="text-brand-limeAccent text-xl font-bold font-serif">.org</span>
            <span class="hidden sm:inline-block ml-2 text-[11px] uppercase tracking-wider text-emerald-200 font-medium border-l border-emerald-700 pl-2">Support & Healing</span>
          </div>
        </a>

        {/* Top Right Actions */}
        <div class="flex items-center gap-3 sm:gap-5">
          <div class="hidden md:flex items-center gap-3 text-sm text-emerald-100">
            <button class="hover:text-white transition">Español</button>
            <span class="text-emerald-700">•</span>
            <a href="#about" class="hover:text-white transition">About Our Care</a>
            <span class="text-emerald-700">•</span>
            <a href="#confidentiality" class="hover:text-white transition">Your Privacy</a>
          </div>

          {/* Direct 24/7 Chat Help Button */}
          <a href="#helplines" class="bg-brand-limeAccent hover:bg-[#d8e67a] text-brand-forest font-semibold text-xs sm:text-sm px-4 py-2 rounded-full transition shadow-sm flex items-center gap-1.5 font-sans">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>Get Immediate Help</span>
          </a>
        </div>
      </div>
    </div>

    {/* Category Secondary Bar (HelpGuide Style) */}
    <nav class="bg-brand-forestDark text-emerald-100 text-xs sm:text-sm border-t border-emerald-900/60 hidden lg:block" aria-label="Support topics">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
        <ul class="flex items-center gap-6 font-medium">
          <li><a href="#trauma" class="hover:text-brand-limeAccent transition">Trauma & PTSD</a></li>
          <li><a href="#domestic" class="hover:text-brand-limeAccent transition">Domestic & Relationship Abuse</a></li>
          <li><a href="#sexual-assault" class="hover:text-brand-limeAccent transition">Assault Support</a></li>
          <li><a href="#mental-health" class="hover:text-brand-limeAccent transition">Anxiety & Coping</a></li>
          <li><a href="#safety-plan" class="hover:text-brand-limeAccent transition">Safety Planning</a></li>
          <li><a href="#directory" class="hover:text-brand-limeAccent transition">Find Local Care</a></li>
        </ul>
        <div class="text-xs text-emerald-300 italic flex items-center gap-1">
          <svg class="w-3.5 h-3.5 text-brand-limeAccent" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path>
          </svg>
          100% Confidential & Free
        </div>
      </div>
    </nav>
  </header>

  <main class="flex-grow">
    
    {/* Hero Box inspired directly by the reference screenshot container & illustration */}
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
      <div class="bg-brand-cardCream rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#E9E1D2] shadow-sm relative overflow-hidden">
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT / ARTWORK: High-Fidelity Custom SVG matching the reference illustration */}
          <div class="lg:col-span-6 flex justify-center items-center">
            <div class="w-full max-w-lg aspect-[4/3] relative rounded-2xl overflow-hidden bg-[#FAF6EE] p-3 sm:p-5 shadow-inner border border-[#EBE4D5]">
              
              <svg viewBox="0 0 540 380" class="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Warm ambient room background */}
                <rect width="540" height="380" rx="16" fill="#FBF8F1"/>
                
                {/* Gentle warm sun circle behind window */}
                <circle cx="210" cy="120" r="32" fill="#FCE588" opacity="0.6"/>

                {/* Architecture: Warm Yellow Grid Windows (as in screenshot) */}
                <g opacity="0.9">
                  <rect x="25" y="45" width="58" height="90" rx="4" fill="#FBEB95" stroke="#4A3B2C" stroke-width="2.5"/>
                  <line x1="54" y1="45" x2="54" y2="135" stroke="#4A3B2C" stroke-width="2.2"/>
                  <line x1="25" y1="90" x2="83" y2="90" stroke="#4A3B2C" stroke-width="2.2"/>
                  <line x1="25" y1="68" x2="83" y2="68" stroke="#4A3B2C" stroke-width="1.5" stroke-dasharray="2 2" opacity="0.4"/>
                  <line x1="25" y1="112" x2="83" y2="112" stroke="#4A3B2C" stroke-width="1.5" stroke-dasharray="2 2" opacity="0.4"/>
                </g>

                <g opacity="0.9">
                  <rect x="95" y="45" width="58" height="90" rx="4" fill="#FBEB95" stroke="#4A3B2C" stroke-width="2.5"/>
                  <line x1="124" y1="45" x2="124" y2="135" stroke="#4A3B2C" stroke-width="2.2"/>
                  <line x1="95" y1="90" x2="153" y2="90" stroke="#4A3B2C" stroke-width="2.2"/>
                  <line x1="95" y1="68" x2="153" y2="68" stroke="#4A3B2C" stroke-width="1.5" stroke-dasharray="2 2" opacity="0.4"/>
                  <line x1="95" y1="112" x2="153" y2="112" stroke="#4A3B2C" stroke-width="1.5" stroke-dasharray="2 2" opacity="0.4"/>
                </g>

                <path d="M0 240 L540 240" stroke="#E5DEC9" stroke-width="2"/>
                <rect x="0" y="240" width="540" height="140" fill="#E8F1EC" opacity="0.85"/>
                <path d="M0 240 L540 240" stroke="#8CB2A2" stroke-width="3"/>

                <path d="M255 240 L285 240 L278 200 L262 200 Z" fill="#D9DFDC" stroke="#374151" stroke-width="2"/>
                <ellipse cx="270" cy="241" rx="35" ry="6" fill="#C5CFCC" stroke="#374151" stroke-width="1.5"/>
                
                <rect x="200" y="105" width="165" height="108" rx="10" fill="#EFEFEF" stroke="#374151" stroke-width="2.5"/>
                <rect x="210" y="115" width="145" height="88" rx="6" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5"/>
                <circle cx="282.5" cy="110" r="2" fill="#4B5563"/>

                <g class="animate-gentle">
                  <path d="M305 130 C300 135, 235 150, 195 210 C185 225, 170 235, 150 250" 
                        stroke="#FAD2D8" stroke-width="32" stroke-linecap="round" opacity="0.4" />
                  
                  <path d="M275 145 C250 152, 220 170, 185 205 C175 215, 160 230, 155 245 C153 250, 155 258, 160 258 C168 258, 178 245, 195 225 C215 200, 245 178, 275 170 Z" 
                        fill="#F7C4CA" stroke="#E28F9E" stroke-width="2" stroke-linejoin="round"/>
                  
                  <path d="M175 220 C165 233, 152 253, 150 262 C149 265, 153 268, 156 266 C162 261, 174 242, 184 228" 
                        fill="#F7C4CA" stroke="#E28F9E" stroke-width="1.8"/>
                  <path d="M182 225 C170 242, 158 266, 157 274 C156 277, 160 280, 164 277 C172 269, 184 245, 192 230" 
                        fill="#F7C4CA" stroke="#E28F9E" stroke-width="1.8"/>
                  <path d="M190 228 C180 248, 170 270, 170 278 C169 281, 174 283, 177 280 C185 272, 194 250, 200 232" 
                        fill="#F7C4CA" stroke="#E28F9E" stroke-width="1.8"/>
                  <path d="M188 205 C180 215, 166 226, 162 230 C159 233, 162 237, 166 235 C174 230, 185 220, 195 212" 
                        fill="#F7C4CA" stroke="#E28F9E" stroke-width="1.8"/>
                </g>

                <g id="girlIllustration">
                  <ellipse cx="115" cy="335" rx="55" ry="12" fill="#0A3B2F" opacity="0.12"/>
                  
                  <path d="M102 185 C80 180, 60 205, 45 220 C35 230, 28 245, 35 252 C42 258, 62 245, 78 232 C88 224, 100 220, 108 222 Z" 
                        fill="#6E1D3B" stroke="#4A1025" stroke-width="2"/>
                  <path d="M72 225 C58 238, 48 255, 52 262 C56 268, 70 262, 85 248 C95 238, 108 235, 114 235" 
                        fill="#7E2144" stroke="#4A1025" stroke-width="2"/>
                  
                  <path d="M100 230 C95 245, 90 270, 95 295 C98 308, 112 312, 125 310 C140 307, 152 290, 148 268 C145 250, 138 236, 128 230 Z" 
                        fill="#6E1D3B" stroke="#4A1025" stroke-width="2"/>
                  
                  <path d="M75 250 C70 280, 72 315, 80 340 C95 345, 135 345, 145 340 C148 315, 145 285, 135 255 Z" 
                        fill="#5C1430" stroke="#4A1025" stroke-width="2"/>

                  <path d="M106 200 C108 215, 112 226, 118 232 C125 232, 130 225, 126 215 C124 208, 122 202, 120 196 Z" 
                        fill="#7E2144" stroke="#4A1025" stroke-width="2"/>
                  
                  <path d="M116 182 C122 186, 132 195, 134 204 C132 208, 126 212, 120 210 C114 208, 112 198, 110 190 Z" 
                        fill="#6E1D3B"/>
                  
                  <path d="M110 175 C120 176, 135 186, 138 200 C140 215, 130 230, 122 238 C116 230, 115 210, 108 198 Z" 
                        fill="#7E2144" stroke="#4A1025" stroke-width="1.5"/>
                  
                  <path d="M90 250 C86 280, 88 310, 94 330" stroke="#F6CED4" stroke-width="2.5" stroke-linecap="round" opacity="0.7"/>
                </g>

                <circle cx="215" cy="180" r="3" fill="#E06D53" opacity="0.8"/>
                <circle cx="170" cy="185" r="2.5" fill="#E8F58E" opacity="0.9"/>
                <circle cx="240" cy="225" r="2" fill="#0A3B2F" opacity="0.5"/>
                <path d="M210 160 L213 166 L219 168 L213 170 L210 176 L207 170 L201 168 L207 166 Z" fill="#E6B800" opacity="0.8"/>
              </svg>

              <div class="absolute bottom-3 left-4 bg-white/95 backdrop-blur-sm text-brand-forest text-xs font-semibold py-1 px-3 rounded-full border border-emerald-100 flex items-center gap-1.5 shadow-sm">
                <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Trained Advocates Active Now</span>
              </div>
            </div>
          </div>

          <div class="lg:col-span-6 flex flex-col justify-center">
            <div class="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-brand-forest uppercase mb-3">
              <span class="px-2.5 py-0.5 rounded bg-brand-sage text-brand-forest font-semibold">Free & Confidential</span>
              <span>•</span>
              <span class="text-brand-coral font-semibold">Available 24/7/365</span>
            </div>

            <h1 class="serif-title text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.15] mb-4">
              You are not alone. Safe, compassionate support is here for you.
            </h1>

            <p class="text-gray-600 text-base sm:text-lg mb-8 leading-relaxed">
              Whether you are experiencing abuse, processing trauma, or carrying overwhelming weight, you deserve a safe space to be heard without judgment. Connect with verified resources and gentle, certified advocates today.
            </p>

            <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-6">
              <a href="#helplines" class="bg-brand-forest hover:bg-brand-forestDark text-white text-center font-medium px-6 py-3.5 rounded-xl shadow-sm hover:shadow transition flex items-center justify-center gap-2 group">
                <svg class="w-5 h-5 text-brand-limeAccent group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>Talk with an Advocate Now</span>
              </a>

              <a href="#directory" class="bg-white hover:bg-gray-50 text-brand-forest border border-gray-300 font-medium px-5 py-3.5 rounded-xl text-center transition flex items-center justify-center gap-2">
                <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Find Local Support Near You</span>
              </a>
            </div>

            <div class="pt-4 border-t border-gray-200/80 grid grid-cols-3 gap-2 text-center sm:text-left text-xs text-gray-500">
              <div>
                <div class="font-bold text-gray-800 text-sm">No Record</div>
                <div>Encrypted & private</div>
              </div>
              <div>
                <div class="font-bold text-gray-800 text-sm">Zero Cost</div>
                <div>100% free helplines</div>
              </div>
              <div>
                <div class="font-bold text-gray-800 text-sm">Your Choice</div>
                <div>Move at your own pace</div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>

    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-xs uppercase font-bold tracking-widest text-brand-forest">Immediate Guides & Care</h2>
          <p class="serif-title text-2xl font-bold text-gray-900 mt-1">Direct Paths to Healing & Understanding</p>
        </div>
        <a href="#all-resources" class="text-sm font-semibold text-brand-forest hover:underline hidden sm:inline">Browse all 40+ topics →</a>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        
        <article class="bg-white rounded-2xl p-6 border border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md transition flex justify-between items-center group">
          <div class="pr-4">
            <span class="text-[11px] font-bold tracking-wider text-brand-forest uppercase">RELATIONSHIPS & SAFETY</span>
            <h3 class="serif-title text-xl font-bold text-gray-900 group-hover:text-brand-forest transition mt-1 mb-2">
              Recognizing Relationship Abuse & Danger Signs
            </h3>
            <p class="text-sm text-gray-600 line-clamp-2">
              Learn the emotional, physical, and financial red flags—and how to plan a secure, confidential safety exit.
            </p>
            <div class="mt-4 flex items-center gap-2 text-xs font-semibold text-brand-coral">
              <span>Read Safety Guide</span>
              <svg class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
          <div class="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center p-2 overflow-hidden">
            <svg class="w-14 h-14 text-amber-700/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
            </svg>
          </div>
        </article>

        <article class="bg-white rounded-2xl p-6 border border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md transition flex justify-between items-center group">
          <div class="pr-4">
            <span class="text-[11px] font-bold tracking-wider text-brand-forest uppercase">PTSD & TRAUMA</span>
            <h3 class="serif-title text-xl font-bold text-gray-900 group-hover:text-brand-forest transition mt-1 mb-2">
              Recovering from Assault & Sexual Trauma
            </h3>
            <p class="text-sm text-gray-600 line-clamp-2">
              Trauma-informed steps to regain your grounding, rebuild self-worth, and navigate medical or legal options.
            </p>
            <div class="mt-4 flex items-center gap-2 text-xs font-semibold text-brand-forest">
              <span>Get Healing Resources</span>
              <svg class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
          <div class="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center p-2 overflow-hidden">
            <svg class="w-14 h-14 text-brand-burgundy/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
          </div>
        </article>

        <article class="bg-white rounded-2xl p-6 border border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md transition flex justify-between items-center group">
          <div class="pr-4">
            <span class="text-[11px] font-bold tracking-wider text-brand-forest uppercase">COPING TECHNIQUES</span>
            <h3 class="serif-title text-xl font-bold text-gray-900 group-hover:text-brand-forest transition mt-1 mb-2">
              Flashbacks, Panic & Nervous System Grounding
            </h3>
            <p class="text-sm text-gray-600 line-clamp-2">
              Gentle somatic exercises (5-4-3-2-1 technique, box breathing) to return safely to your present moment.
            </p>
            <div class="mt-4 flex items-center gap-2 text-xs font-semibold text-emerald-800">
              <span>Interactive Exercises</span>
              <svg class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
          <div class="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center p-2 overflow-hidden">
            <svg class="w-14 h-14 text-brand-forest/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
        </article>

        <article class="bg-white rounded-2xl p-6 border border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md transition flex justify-between items-center group">
          <div class="pr-4">
            <span class="text-[11px] font-bold tracking-wider text-brand-forest uppercase">DIGITAL SAFETY</span>
            <h3 class="serif-title text-xl font-bold text-gray-900 group-hover:text-brand-forest transition mt-1 mb-2">
              Digital Privacy, Spyware & Stalking Defense
            </h3>
            <p class="text-sm text-gray-600 line-clamp-2">
              Protect your phone location, remove stalkerware, and create unmonitored communication lines safely.
            </p>
            <div class="mt-4 flex items-center gap-2 text-xs font-semibold text-indigo-700">
              <span>Securing Your Devices</span>
              <svg class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
          <div class="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center p-2 overflow-hidden">
            <svg class="w-14 h-14 text-indigo-700/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
          </div>
        </article>

      </div>
    </section>

    <section id="helplines" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div class="bg-brand-forest rounded-3xl p-6 sm:p-10 text-white shadow-xl">
        <div class="max-w-3xl mb-8">
          <span class="inline-block bg-brand-limeAccent text-brand-forest text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">Immediate Lines of Hope</span>
          <h2 class="serif-title text-2xl sm:text-3xl lg:text-4xl font-bold">Free, 24/7 Confidential Helplines</h2>
          <p class="text-emerald-100 text-sm sm:text-base mt-2">
            You don’t have to go through this by yourself. Specially trained advocates are waiting right now to listen, validate, and help you determine your next steps.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          <div class="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 flex flex-col justify-between hover:bg-white/15 transition">
            <div>
              <div class="flex items-center justify-between text-xs text-brand-limeAccent font-semibold mb-2">
                <span>National Crisis Line</span>
                <span>24/7 Available</span>
              </div>
              <h3 class="text-xl font-bold font-serif mb-1">Suicide & Emotional Crisis Lifeline</h3>
              <p class="text-xs text-emerald-200 mb-4">For immediate emotional distress, panic attacks, thoughts of self-harm, or feeling overwhelmed.</p>
            </div>
            <div>
              <a href="tel:988" class="block w-full text-center bg-brand-limeAccent hover:bg-[#d8e878] text-brand-forest font-bold py-2.5 rounded-xl transition text-base shadow">
                Call or Text: 988
              </a>
              <div class="text-[11px] text-center text-emerald-300 mt-2">Free, confidential, and multi-lingual</div>
            </div>
          </div>

          <div class="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 flex flex-col justify-between hover:bg-white/15 transition">
            <div>
              <div class="flex items-center justify-between text-xs text-brand-limeAccent font-semibold mb-2">
                <span>Relationship Abuse</span>
                <span>200+ Languages</span>
              </div>
              <h3 class="text-xl font-bold font-serif mb-1">National Domestic Violence Hotline</h3>
              <p class="text-xs text-emerald-200 mb-4">Highly trained advocates offering safety planning, emergency shelter connections, and emotional care.</p>
            </div>
            <div>
              <a href="tel:18007997233" class="block w-full text-center bg-white hover:bg-gray-100 text-brand-forest font-bold py-2.5 rounded-xl transition text-sm shadow">
                Call: 1-800-799-7233
              </a>
              <div class="text-[11px] text-center text-emerald-300 mt-2">Or text "START" to 88788</div>
            </div>
          </div>

          <div class="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 flex flex-col justify-between hover:bg-white/15 transition">
            <div>
              <div class="flex items-center justify-between text-xs text-brand-limeAccent font-semibold mb-2">
                <span>Sexual Assault</span>
                <span>RAINN Network</span>
              </div>
              <h3 class="text-xl font-bold font-serif mb-1">National Sexual Assault Telephone</h3>
              <p class="text-xs text-emerald-200 mb-4">Completely anonymous support, counseling referrals, forensic exam guidance, and healing resources.</p>
            </div>
            <div>
              <a href="tel:18006564673" class="block w-full text-center bg-white hover:bg-gray-100 text-brand-forest font-bold py-2.5 rounded-xl transition text-sm shadow">
                Call: 1-800-656-4673
              </a>
              <div class="text-[11px] text-center text-emerald-300 mt-2">24/7 online chat also available</div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <section id="directory" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div class="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-sm">
        
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span class="text-xs uppercase font-bold tracking-wider text-brand-forest">Verified Provider Directory</span>
            <h2 class="serif-title text-2xl sm:text-3xl font-bold text-gray-900 mt-1">Find Specialized Trauma Support Near You</h2>
            <p class="text-gray-600 text-sm sm:text-base mt-1">Connect with licensed therapists, sliding-scale clinics, victim advocates, and free peer support groups.</p>
          </div>
          <div class="flex items-center gap-2 text-xs bg-brand-sage text-brand-forest px-3.5 py-1.5 rounded-full font-medium self-start md:self-auto">
            <svg class="w-4 h-4 text-brand-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Confidential search (No IP tracking)</span>
          </div>
        </div>

        <div class="bg-brand-warmCream p-4 sm:p-6 rounded-2xl border border-gray-200/70 mb-8">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div>
              <label htmlFor="filterIssue" class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">What are you experiencing?</label>
              <select id="filterIssue" value={filterIssue} onChange={(e) => setFilterIssue(e.target.value)} class="w-full bg-white border border-gray-300 text-gray-800 text-sm rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-brand-forest">
                <option value="all">All Needs & Specialties</option>
                <option value="trauma">Trauma & PTSD Recovery</option>
                <option value="domestic">Domestic Violence / Safety</option>
                <option value="sexual-assault">Assault & Abuse Aftercare</option>
                <option value="anxiety">Severe Anxiety & Panic</option>
                <option value="grief">Traumatic Grief & Loss</option>
              </select>
            </div>

            <div>
              <label htmlFor="filterCareType" class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Support Type</label>
              <select id="filterCareType" value={filterCareType} onChange={(e) => setFilterCareType(e.target.value)} class="w-full bg-white border border-gray-300 text-gray-800 text-sm rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-brand-forest">
                <option value="all">Any Format</option>
                <option value="telehealth">Telehealth / Online Video</option>
                <option value="in-person">In-Person Care</option>
                <option value="support-group">Free Support Groups</option>
                <option value="shelter">Emergency Safe Shelter</option>
              </select>
            </div>

            <div>
              <label htmlFor="postalInput" class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">City or ZIP Code</label>
              <div class="relative">
                <input type="text" id="postalInput" value={postalInput} onChange={(e) => setPostalInput(e.target.value)} placeholder="e.g. 94102 or Chicago" class="w-full bg-white border border-gray-300 text-gray-800 text-sm rounded-xl pl-9 pr-3.5 py-2.5 focus:ring-2 focus:ring-brand-forest" />
                <svg class="w-4 h-4 text-gray-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
            </div>

            <div class="flex items-end">
              <button onClick={resetFilters} class="w-full bg-brand-forest hover:bg-brand-forestDark text-white font-medium text-sm py-2.5 px-4 rounded-xl transition flex items-center justify-center gap-1.5">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
                <span>Reset Filters</span>
              </button>
            </div>

          </div>
        </div>

        <div id="providerGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProviders.map((p, i) => (
            <div key={i} class="provider-card bg-brand-warmCream/60 rounded-2xl p-5 border border-gray-200 flex flex-col justify-between">
              <div>
                <div class="flex justify-between items-start mb-2">
                  <span class={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${p.badgeClass}`}>{p.badge}</span>
                  <span class="text-xs text-gray-500">{p.subtitle}</span>
                </div>
                <h3 class="serif-title text-lg font-bold text-gray-900">{p.name}</h3>
                <p class="text-xs text-gray-600 mt-1 mb-3">{p.desc}</p>
                
                <div class="flex flex-wrap gap-1.5 mb-4">
                  {p.tags.map(tag => (
                    <span key={tag} class="text-[11px] bg-white border border-gray-200 px-2 py-0.5 rounded text-gray-600">{tag}</span>
                  ))}
                </div>
              </div>
              
              <div class="pt-3 border-t border-gray-200 flex items-center justify-between text-xs">
                <span class={p.waitClass}>{p.waitText}</span>
                <button onClick={() => openContactModal(p.name)} class="font-semibold text-brand-forest hover:underline">{p.actionText}</button>
              </div>
            </div>
          ))}
        </div>

        {filteredProviders.length === 0 && (
          <div id="noResultsMsg" class="text-center py-10 bg-brand-warmCream rounded-2xl border border-dashed border-gray-300">
            <p class="text-gray-700 font-medium">No specialized providers matched that specific filter combination.</p>
            <p class="text-sm text-gray-500 mt-1">Please call the 24/7 hotline at <strong class="text-brand-forest">1-800-799-7233</strong> for personalized nationwide placement.</p>
            <button onClick={resetFilters} class="mt-4 text-xs bg-brand-forest text-white font-semibold px-4 py-2 rounded-lg">Clear All Filters</button>
          </div>
        )}

      </div>
    </section>

    <section id="safety-plan" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <div class="lg:col-span-4 bg-brand-cardCream rounded-3xl p-6 sm:p-8 border border-[#E8DFC9]">
          <span class="text-xs font-bold uppercase tracking-wider text-brand-coral">Practical Tools</span>
          <h2 class="serif-title text-2xl sm:text-3xl font-bold text-gray-900 mt-2 mb-3">Creating Your Personalized Safety Plan</h2>
          <p class="text-gray-600 text-sm leading-relaxed mb-6">
            A safety plan is a personalized, practical guide that helps lower your risk of hurt. Whether you are currently living with an unsafe person, planning to leave, or recovering afterward, these steps protect your well-being.
          </p>

          <div class="p-4 bg-white/80 rounded-2xl border border-gray-200 text-xs text-gray-700 space-y-2">
            <div class="font-bold text-brand-forest flex items-center gap-1.5">
              <svg class="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              Quick Browser Tip:
            </div>
            <p>Do not save this page to your bookmarks if someone has access to your phone or computer. Use private/incognito mode or our Quick Exit button.</p>
          </div>
        </div>

        <div class="lg:col-span-8 space-y-3.5" id="accordionContainer">
          
          <div class="accordion-item bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all shadow-sm">
            <button onClick={() => setExpandedAccordion(expandedAccordion === 1 ? null : 1)} class="w-full px-6 py-4 text-left flex items-center justify-between gap-4 focus:outline-none">
              <div class="flex items-center gap-3">
                <span class="w-7 h-7 rounded-full bg-brand-sage text-brand-forest font-bold text-xs flex items-center justify-center">1</span>
                <span class="serif-title text-lg font-bold text-gray-900">Securing Essential Documents & "Go-Bag"</span>
              </div>
              <svg class={`w-5 h-5 text-gray-400 transform transition-transform duration-200 ${expandedAccordion === 1 ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div class={`px-6 pb-5 text-sm text-gray-600 border-t border-gray-100 pt-3 leading-relaxed ${expandedAccordion === 1 ? '' : 'hidden'}`}>
              <p class="mb-2">If you need to leave quickly, having physical or encrypted digital copies of vital items is crucial:</p>
              <ul class="list-disc pl-5 space-y-1 text-gray-700">
                <li>Government ID, passport, birth certificates for you and children</li>
                <li>Financial documents, prepaid debit cards, or hidden emergency cash</li>
                <li>Prescription medications (at least a 7-day supply)</li>
                <li>Important deeds, car titles, lease agreements, and medical records</li>
                <li>Spare set of car keys stored with a trusted neighbor or friend</li>
              </ul>
            </div>
          </div>

          <div class="accordion-item bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all shadow-sm">
            <button onClick={() => setExpandedAccordion(expandedAccordion === 2 ? null : 2)} class="w-full px-6 py-4 text-left flex items-center justify-between gap-4 focus:outline-none">
              <div class="flex items-center gap-3">
                <span class="w-7 h-7 rounded-full bg-brand-sage text-brand-forest font-bold text-xs flex items-center justify-center">2</span>
                <span class="serif-title text-lg font-bold text-gray-900">Establishing Safe Words with Trusted Allies</span>
              </div>
              <svg class={`w-5 h-5 text-gray-400 transform transition-transform duration-200 ${expandedAccordion === 2 ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div class={`px-6 pb-5 text-sm text-gray-600 border-t border-gray-100 pt-3 leading-relaxed ${expandedAccordion === 2 ? '' : 'hidden'}`}>
              <p>Identify 1 to 2 trusted individuals outside your household. Agree on an innocent phrase or emoji (e.g., <em>"Can you send that recipe for banana bread?"</em>) that clearly signals they should call emergency services or pick you up at a pre-designated safe location immediately.</p>
            </div>
          </div>

          <div class="accordion-item bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all shadow-sm">
            <button onClick={() => setExpandedAccordion(expandedAccordion === 3 ? null : 3)} class="w-full px-6 py-4 text-left flex items-center justify-between gap-4 focus:outline-none">
              <div class="flex items-center gap-3">
                <span class="w-7 h-7 rounded-full bg-brand-sage text-brand-forest font-bold text-xs flex items-center justify-center">3</span>
                <span class="serif-title text-lg font-bold text-gray-900">Digital Safety: Phones, Location & Browser Privacy</span>
              </div>
              <svg class={`w-5 h-5 text-gray-400 transform transition-transform duration-200 ${expandedAccordion === 3 ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div class={`px-6 pb-5 text-sm text-gray-600 border-t border-gray-100 pt-3 leading-relaxed ${expandedAccordion === 3 ? '' : 'hidden'}`}>
              <p class="mb-2">Abusive partners often monitor phone accounts and shared cloud drives:</p>
              <ul class="list-disc pl-5 space-y-1 text-gray-700">
                <li>Turn off Apple "Find My" or Google Location Sharing if monitored</li>
                <li>Consider acquiring a cheap prepaid "burner" phone kept hidden</li>
                <li>Change account passwords on a computer at a public library or friend’s house</li>
                <li>Clear browser cookies and history after every search session</li>
              </ul>
            </div>
          </div>

          <div class="accordion-item bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all shadow-sm">
            <button onClick={() => setExpandedAccordion(expandedAccordion === 4 ? null : 4)} class="w-full px-6 py-4 text-left flex items-center justify-between gap-4 focus:outline-none">
              <div class="flex items-center gap-3">
                <span class="w-7 h-7 rounded-full bg-brand-sage text-brand-forest font-bold text-xs flex items-center justify-center">4</span>
                <span class="serif-title text-lg font-bold text-gray-900">How to Support a Friend or Family Member Who is Hurting</span>
              </div>
              <svg class={`w-5 h-5 text-gray-400 transform transition-transform duration-200 ${expandedAccordion === 4 ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div class={`px-6 pb-5 text-sm text-gray-600 border-t border-gray-100 pt-3 leading-relaxed ${expandedAccordion === 4 ? '' : 'hidden'}`}>
              <p>Listen without judgment. Never criticize their partner or force them to leave before they are ready, as leaving is statistically the most dangerous time. Instead, affirm: <em>"I believe you. You don’t deserve this treatment. Whenever you are ready, I am here to help you."</em></p>
            </div>
          </div>

        </div>

      </div>
    </section>

    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="bg-gradient-to-r from-[#0E3D31] to-[#145343] rounded-3xl p-6 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-lg">
        <div class="max-w-xl">
          <span class="bg-brand-limeAccent/20 text-brand-limeAccent text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-3">Somatic Calming Exercise</span>
          <h2 class="serif-title text-2xl sm:text-3xl font-bold">Feeling overwhelmed or triggered?</h2>
          <p class="text-emerald-100 text-sm mt-2">Take a quiet minute with our visual breath pacer to reset your nervous system. Deep breathing helps signal to your brain that you are safe in this current moment.</p>
        </div>

        <div class="flex flex-col items-center justify-center bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 w-full sm:w-80">
          <div id="breathCircle" class="w-28 h-28 rounded-full flex items-center justify-center text-center transition-all duration-[4000ms] ease-in-out border-2" 
               style={isBreathingActive ? {
                 transform: breathPhase === 0 || breathPhase === 1 ? "scale(1.35)" : "scale(0.9)",
                 backgroundColor: breathPhase === 0 || breathPhase === 1 ? "rgba(232, 245, 142, 0.5)" : "rgba(232, 245, 142, 0.2)",
                 borderColor: "#E8F58E"
               } : { transform: "scale(1)", backgroundColor: "rgba(232, 245, 142, 0.3)", borderColor: "#E8F58E" }}>
            <span id="breathText" class="text-xs font-bold text-white uppercase tracking-wider">{getBreathText()}</span>
          </div>
          <div class="mt-4 flex items-center gap-3">
            <button id="breathToggleBtn" onClick={toggleBreathingExercise} class="text-xs font-bold bg-brand-limeAccent text-brand-forest px-4 py-2 rounded-full hover:bg-white transition shadow">
              {isBreathingActive ? "Pause Exercise" : "Start 4-4 Breathing"}
            </button>
          </div>
          <p class="text-[11px] text-emerald-200 mt-2 text-center" id="breathPhaseDesc">{getBreathDesc()}</p>
        </div>
      </div>
    </section>

  </main>

  <div id="contactModal" class={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 ${isContactModalOpen ? '' : 'hidden'}`} role="dialog" aria-modal="true">
    <div class="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-gray-200 animate-in fade-in zoom-in duration-150">
      
      <button onClick={() => setIsContactModalOpen(false)} class="absolute top-5 right-5 text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-100 transition" aria-label="Close modal">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div class="mb-4">
        <span class="text-xs uppercase font-bold text-brand-coral tracking-wider">Direct Connect</span>
        <h3 id="modalProviderName" class="serif-title text-xl sm:text-2xl font-bold text-gray-900 mt-1">Provider Details: {modalProviderName}</h3>
        <p class="text-xs text-gray-500 mt-1">All communications are end-to-end encrypted. We never share your data.</p>
      </div>

      <form onSubmit={handleModalSubmit} class="space-y-4">
        <div>
          <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Your Preferred First Name (or Alias)</label>
          <input type="text" required placeholder="You can use a safe pseudonym" class="w-full bg-brand-warmCream border border-gray-300 text-sm rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-brand-forest" />
        </div>

        <div>
          <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Safe Contact Method</label>
          <div class="grid grid-cols-2 gap-2 text-xs mb-2">
            <label class="flex items-center gap-2 p-2 border rounded-xl cursor-pointer hover:bg-brand-warmCream">
              <input type="radio" name="contactMethod" value="email" defaultChecked class="text-brand-forest" />
              <span>Secure Email</span>
            </label>
            <label class="flex items-center gap-2 p-2 border rounded-xl cursor-pointer hover:bg-brand-warmCream">
              <input type="radio" name="contactMethod" value="phone" class="text-brand-forest" />
              <span>Discreet SMS Text</span>
            </label>
          </div>
          <input type="text" required placeholder="Enter safe email or cell number" class="w-full bg-brand-warmCream border border-gray-300 text-sm rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-brand-forest" />
        </div>

        <div>
          <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Is it safe to leave a voicemail or text if needed?</label>
          <select class="w-full bg-brand-warmCream border border-gray-300 text-sm rounded-xl px-3.5 py-2 focus:ring-2 focus:ring-brand-forest">
            <option>No, please do NOT leave voicemails</option>
            <option>Yes, discreet messages are fine</option>
          </select>
        </div>

        <div id="modalNotice" class={`p-3 bg-emerald-50 text-emerald-800 text-xs rounded-xl font-medium border border-emerald-200 ${isModalNoticeVisible ? '' : 'hidden'}`}>
          Your request was submitted securely. An intake counselor will reach out via your safe method.
        </div>

        <div class="pt-2 flex items-center justify-end gap-3">
          <button type="button" onClick={() => setIsContactModalOpen(false)} class="text-xs text-gray-500 hover:text-gray-800 px-4 py-2.5">Cancel</button>
          <button type="submit" class="bg-brand-forest hover:bg-brand-forestDark text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow transition">Send Confidential Request</button>
        </div>
      </form>

    </div>
  </div>

  <div id="historyModal" class={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 ${isHistoryTipOpen ? '' : 'hidden'}`}>
    <div class="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-gray-200">
      <h3 class="serif-title text-xl font-bold text-gray-900 mb-2">How to Browse Safely</h3>
      <p class="text-xs text-gray-600 mb-4 leading-relaxed">
        If you suspect your digital devices are monitored, here are steps you can take right now:
      </p>
      <ul class="text-xs text-gray-700 space-y-2 list-disc pl-4 mb-5">
        <li><strong>Use Incognito/Private Mode:</strong> This prevents history and search queries from saving locally.</li>
        <li><strong>Quick Escape:</strong> Press the red button in the corner or tap <kbd class="px-1 bg-gray-100 rounded border">ESC</kbd> on any computer keyboard.</li>
        <li><strong>Public computers:</strong> Libraries and community centers offer computers with less risk of home spyware.</li>
      </ul>
      <button onClick={() => setIsHistoryTipOpen(false)} class="w-full bg-brand-forest text-white text-xs font-semibold py-2.5 rounded-xl">Got it, close this tip</button>
    </div>
  </div>

  <footer class="bg-brand-forest text-emerald-100 border-t border-emerald-900 text-xs mt-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        
        <div class="md:col-span-1">
          <div class="flex items-center gap-2 mb-3">
            <div class="w-8 h-8 rounded-lg bg-brand-limeAccent text-brand-forest font-serif font-black text-lg flex items-center justify-center">S</div>
            <span class="text-xl font-serif font-bold text-white">SafeHaven</span>
          </div>
          <p class="text-xs text-emerald-200/80 leading-relaxed mb-4">
            An independent, non-profit resource dedicated to providing trauma-informed guidance, verified safety tools, and empathetic support to victims everywhere.
          </p>
          <div class="text-[11px] text-emerald-400">© 2026 SafeHaven Initiative. All rights reserved.</div>
        </div>

        <div>
          <h4 class="font-bold text-white uppercase tracking-wider text-xs mb-3">Trauma & Recovery</h4>
          <ul class="space-y-2 text-emerald-200/80">
            <li><a href="#trauma" class="hover:text-white transition">Understanding Complex PTSD</a></li>
            <li><a href="#mental-health" class="hover:text-white transition">Healing Toxic Shame</a></li>
            <li><a href="#safety-plan" class="hover:text-white transition">Grounding in Flashbacks</a></li>
            <li><a href="#directory" class="hover:text-white transition">EMDR Therapy Guide</a></li>
          </ul>
        </div>

        <div>
          <h4 class="font-bold text-white uppercase tracking-wider text-xs mb-3">Safety & Legal</h4>
          <ul class="space-y-2 text-emerald-200/80">
            <li><a href="#safety-plan" class="hover:text-white transition">Emergency Escape Plan</a></li>
            <li><a href="#confidentiality" class="hover:text-white transition">Restraining Orders & Rights</a></li>
            <li><a href="#domestic" class="hover:text-white transition">Stalkerware Removal</a></li>
            <li><a href="#directory" class="hover:text-white transition">Domestic Violence Shelters</a></li>
          </ul>
        </div>

        <div>
          <h4 class="font-bold text-white uppercase tracking-wider text-xs mb-3">Safe Haven Pledges</h4>
          <div class="space-y-3">
            <div class="flex items-center gap-2 bg-emerald-950/60 p-2 rounded-xl border border-emerald-800">
              <svg class="w-4 h-4 text-brand-limeAccent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>Zero-track privacy policy</span>
            </div>
            <div class="flex items-center gap-2 bg-emerald-950/60 p-2 rounded-xl border border-emerald-800">
              <svg class="w-4 h-4 text-brand-limeAccent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"></path>
              </svg>
              <span>No commercial ad monetization</span>
            </div>
          </div>
        </div>

      </div>

      <div class="border-t border-emerald-900/80 pt-6 text-[11px] text-emerald-300 text-center">
        Disclaimer: SafeHaven provides educational trauma guidance and verified hotline directory assistance. SafeHaven is not an emergency response dispatch service or direct medical provider. If you are in immediate life-threatening physical danger, please contact 911 or your local emergency dispatch.
      </div>

    </div>
  </footer>
"""

# Regex replacements for JSX compliance
html_content = re.sub(r'class=', 'className=', html_content)
html_content = re.sub(r'fill-rule', 'fillRule', html_content)
html_content = re.sub(r'clip-rule', 'clipRule', html_content)
html_content = re.sub(r'stroke-linecap', 'strokeLinecap', html_content)
html_content = re.sub(r'stroke-linejoin', 'strokeLinejoin', html_content)
html_content = re.sub(r'stroke-width', 'strokeWidth', html_content)
html_content = re.sub(r'stroke-dasharray', 'strokeDasharray', html_content)

jsx_template = """import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [expandedAccordion, setExpandedAccordion] = useState(1);
  const [filterIssue, setFilterIssue] = useState('all');
  const [filterCareType, setFilterCareType] = useState('all');
  const [postalInput, setPostalInput] = useState('');
  
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [modalProviderName, setModalProviderName] = useState('');
  const [isModalNoticeVisible, setIsModalNoticeVisible] = useState(false);
  
  const [isHistoryTipOpen, setIsHistoryTipOpen] = useState(false);
  
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState(0); // 0 = Inhale, 1 = Hold, 2 = Exhale, 3 = Rest

  useEffect(() => {
    let interval;
    if (isBreathingActive) {
      interval = setInterval(() => {
        setBreathPhase((prev) => (prev + 1) % 4);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isBreathingActive]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" || e.keyCode === 27) {
        handleQuickExit();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleQuickExit = () => {
    window.location.replace("https://www.weather.com");
  };

  const resetFilters = () => {
    setFilterIssue('all');
    setFilterCareType('all');
    setPostalInput('');
  };

  const openContactModal = (providerName) => {
    setModalProviderName(providerName);
    setIsModalNoticeVisible(false);
    setIsContactModalOpen(true);
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    setIsModalNoticeVisible(true);
    setTimeout(() => {
      setIsContactModalOpen(false);
    }, 2400);
  };

  const toggleBreathingExercise = () => {
    if (isBreathingActive) {
      setIsBreathingActive(false);
      setBreathPhase(0);
    } else {
      setIsBreathingActive(true);
      setBreathPhase(0);
    }
  };

  const getBreathText = () => {
    if (!isBreathingActive) return "Inhale";
    switch (breathPhase) {
      case 0: return "Inhale";
      case 1: return "Hold";
      case 2: return "Exhale";
      case 3: return "Rest";
      default: return "Inhale";
    }
  };

  const getBreathDesc = () => {
    if (!isBreathingActive) return "Breathe in gently through your nose...";
    switch (breathPhase) {
      case 0: return "Breathe in peace and calm (4s)...";
      case 1: return "Gently hold your breath without strain...";
      case 2: return "Slowly release all tension through your mouth...";
      case 3: return "Feel your body rooted and safe...";
      default: return "Breathe in gently through your nose...";
    }
  };

  const providers = [
    {
      name: "Hope River Trauma Counseling Center",
      issue: "trauma",
      type: "telehealth",
      location: "94102",
      badge: "Sliding Scale / Free",
      badgeClass: "bg-emerald-100 text-emerald-800",
      subtitle: "Online & CA",
      desc: "Specialized EMDR, somatic experiencing, and narrative therapy for survivors of relational trauma.",
      tags: ["EMDR Certified", "LGBTQ+ Friendly", "Telehealth"],
      waitText: "Wait time: < 48 hours",
      waitClass: "text-emerald-700 font-medium",
      actionText: "View Profile & Contact →"
    },
    {
      name: "Beacon Family Safety Network",
      issue: "domestic",
      type: "in-person shelter",
      location: "chicago",
      badge: "Emergency Shelter",
      badgeClass: "bg-rose-100 text-rose-800",
      subtitle: "Chicago Area",
      desc: "Confidential emergency housing, legal protective order advocacy, and survivor support groups.",
      tags: ["Legal Advocacy", "Child Support", "Secure Haven"],
      waitText: "24/7 Bed Availability",
      waitClass: "text-rose-700 font-medium",
      actionText: "View Safe Access →"
    },
    {
      name: "Voices Reclaimed Healing Circle",
      issue: "sexual-assault",
      type: "support-group",
      location: "94102",
      badge: "Free Weekly Group",
      badgeClass: "bg-purple-100 text-purple-800",
      subtitle: "Virtual (Nationwide)",
      desc: "Facilitated weekly survivor circle focused on overcoming shame, reclaiming bodily autonomy, and mutual empathy.",
      tags: ["Peer-Led", "Confidential Zoom", "Thursdays 7PM"],
      waitText: "Open Enrollment",
      waitClass: "text-purple-700 font-medium",
      actionText: "Join Circle →"
    }
  ];

  const filteredProviders = providers.filter(p => {
    const matchesIssue = filterIssue === 'all' || p.issue.includes(filterIssue);
    const matchesType = filterCareType === 'all' || p.type.includes(filterCareType);
    const matchesLocation = !postalInput || p.location.toLowerCase().includes(postalInput.toLowerCase());
    return matchesIssue && matchesType && matchesLocation;
  });

  return (
    <div className="safe-haven-landing min-h-screen flex flex-col antialiased selection:bg-brand-roseSoft selection:text-brand-burgundy relative">
HTML_PLACEHOLDER
    </div>
  );
};

export default Dashboard;
"""

final_code = jsx_template.replace("HTML_PLACEHOLDER", html_content)

with open("src/pages/Dashboard.jsx", "w") as f:
    f.write(final_code)
