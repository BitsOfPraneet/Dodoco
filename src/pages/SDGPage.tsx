import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowLeft, ExternalLink, BookOpen, Info, Target, Zap } from 'lucide-react';
import TopUtilityBar from '@/components/TopUtilityBar';
import Navbar from '@/components/Navbar';
import { sdgContent, SDGDetail } from '@/data/sdgContent';

const SDGPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const goalId = parseInt(searchParams.get('goal') || '13');
    const [activeSDG, setActiveSDG] = useState<SDGDetail>(sdgContent[goalId] || sdgContent[13]);

    useEffect(() => {
        if (sdgContent[goalId]) {
            setActiveSDG(sdgContent[goalId]);
        }
    }, [goalId]);

    const handleSelectSDG = (num: number) => {
        setSearchParams({ goal: num.toString() });
    };

    return (
        <div className="min-h-screen bg-background">
            <TopUtilityBar />
            <Navbar
                onOpenAuth={() => { }}
                onOpenSettings={() => { }}
                onToggleSidebar={() => { }}
            />

            <div className="pt-[110px] flex h-[calc(100vh-110px)] overflow-hidden">
                {/* Permanent Sidebar */}
                <aside className="w-64 flex-shrink-0 bg-card border-r border-border overflow-y-auto">
                    <div className="p-4 border-b border-border bg-muted/30">
                        <h2 className="text-sm font-heading font-bold flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-primary" />
                            SDG Knowledge Base
                        </h2>
                    </div>
                    <nav className="p-2 space-y-1">
                        {Object.values(sdgContent).map((sdg) => (
                            <button
                                key={sdg.number}
                                onClick={() => handleSelectSDG(sdg.number)}
                                className={`w-full text-left p-3 rounded-lg transition-all flex items-center justify-between group ${activeSDG.number === sdg.number
                                        ? 'bg-primary/10 border-primary/20 shadow-sm'
                                        : 'hover:bg-accent'
                                    }`}
                                style={{
                                    border: activeSDG.number === sdg.number ? `1px solid ${sdg.color}40` : '1px solid transparent'
                                }}
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-8 h-8 rounded flex items-center justify-center text-white font-bold text-xs"
                                        style={{ background: sdg.color }}
                                    >
                                        {sdg.number}
                                    </div>
                                    <span className={`text-sm font-medium ${activeSDG.number === sdg.number ? 'text-primary' : 'text-muted-foreground'}`}>
                                        {sdg.name}
                                    </span>
                                </div>
                                <ChevronRight className={`w-4 h-4 transition-transform ${activeSDG.number === sdg.number ? 'translate-x-1 text-primary' : 'opacity-0 group-hover:opacity-100 text-muted-foreground'}`} />
                            </button>
                        ))}
                    </nav>

                    <div className="mt-8 p-4">
                        <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                            <p className="text-xs text-muted-foreground leading-relaxed italic">
                                "The Sustainable Development Goals are a call for action by all countries to promote prosperity while protecting the planet."
                            </p>
                        </div>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto scroll-smooth bg-background">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeSDG.number}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="max-w-4xl mx-auto p-8 lg:p-12"
                        >
                            {/* Breadcrumbs */}
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
                                <a href="/" className="hover:text-primary transition-colors">Home</a>
                                <ChevronRight className="w-3 h-3" />
                                <span className="text-primary font-medium">SDG {activeSDG.number}</span>
                            </div>

                            {/* Hero Header */}
                            <header className="mb-12">
                                <div className="flex items-center gap-4 mb-4">
                                    <div
                                        className="px-4 py-2 rounded-lg text-white font-bold text-2xl shadow-lg"
                                        style={{ background: activeSDG.color }}
                                    >
                                        Goal {activeSDG.number}
                                    </div>
                                    <h1 className="text-4xl lg:text-5xl font-heading font-black tracking-tight">
                                        {activeSDG.name}
                                    </h1>
                                </div>
                                <p className="text-xl text-muted-foreground font-medium leading-relaxed italic border-l-4 border-primary/20 pl-6 my-6">
                                    {activeSDG.tagline}
                                </p>
                            </header>

                            {/* Wikipedia-style sections */}
                            <div className="prose prose-slate dark:prose-invert max-w-none space-y-12">

                                {/* Overview Section */}
                                <section>
                                    <h2 className="flex items-center gap-3 text-2xl font-heading font-bold border-b border-border pb-2 mb-4">
                                        <Info className="w-6 h-6 text-primary" />
                                        Overview
                                    </h2>
                                    <p className="text-lg leading-relaxed text-muted-foreground">
                                        {activeSDG.overview}
                                    </p>
                                </section>

                                {/* Integration Section */}
                                <section className="bg-card border border-border rounded-2xl p-6 lg:p-8 shadow-sm">
                                    <h2 className="flex items-center gap-3 text-2xl font-heading font-bold mb-4 text-primary">
                                        <Zap className="w-6 h-6" />
                                        Intersection with Wildfires
                                    </h2>
                                    <p className="text-lg leading-relaxed mb-6">
                                        {activeSDG.wildfireLink}
                                    </p>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        {activeSDG.sections.map((section, idx) => (
                                            <div key={idx} className="bg-background border border-border p-5 rounded-xl">
                                                <h3 className="font-heading font-bold mb-2 flex items-center gap-2">
                                                    <Target className="w-4 h-4 text-secondary" />
                                                    {section.title}
                                                </h3>
                                                <p className="text-sm text-muted-foreground leading-relaxed">
                                                    {section.content}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* Resources Section */}
                                <section>
                                    <h2 className="text-2xl font-heading font-bold border-b border-border pb-2 mb-4">
                                        Resources & Sources
                                    </h2>
                                    <div className="grid sm:grid-cols-2 gap-3">
                                        {activeSDG.sources.map((source, idx) => (
                                            <a
                                                key={idx}
                                                href="#"
                                                className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent transition-colors group"
                                                onClick={(e) => e.preventDefault()}
                                            >
                                                <span className="text-sm font-medium">{source}</span>
                                                <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary" />
                                            </a>
                                        ))}
                                    </div>
                                </section>

                            </div>

                            {/* Footer navigation */}
                            <footer className="mt-20 pt-8 border-t border-border flex justify-between items-center text-sm text-muted-foreground">
                                <button
                                    onClick={() => handleSelectSDG(activeSDG.number - 1)}
                                    disabled={activeSDG.number <= 3}
                                    className="flex items-center gap-2 hover:text-primary disabled:opacity-30 transition-colors"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Previous Goal
                                </button>
                                <p>© 2026 UN Sustainable Development Knowledge Platform</p>
                                <button
                                    onClick={() => handleSelectSDG(activeSDG.number + 1)}
                                    disabled={activeSDG.number >= 17}
                                    className="flex items-center gap-2 hover:text-primary disabled:opacity-30 transition-colors"
                                >
                                    Next Goal
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </footer>
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
};

export default SDGPage;
