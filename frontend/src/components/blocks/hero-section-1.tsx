'use client';
import React from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronRight, Menu, X, TriangleAlert } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatedGroup } from '@/components/ui/animated-group'
import { cn } from '@/lib/utils'
import BrandLogo from '@/components/branding/BrandLogo'

const transitionVariants = {
    item: {
        hidden: {
            opacity: 0,
            filter: 'blur(12px)',
            y: 12,
        },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: {
                type: 'spring',
                bounce: 0.3,
                duration: 1.5,
            },
        },
    },
} as const

export function HeroSection({ dashboardNode }: { dashboardNode?: React.ReactNode }) {
    return (
        <div className="dark">
            <HeroHeader />
            <main className="overflow-hidden bg-[#0A0A0A] text-white min-h-screen">

                <section>
                    <div className="relative pt-24 md:pt-36">

                        <div className="mx-auto max-w-7xl px-6 relative z-10">
                            <div className="text-center sm:mx-auto lg:mt-0">
                                <AnimatedGroup variants={transitionVariants}>
                                    <Link
                                        href="#link"
                                        className="hover:bg-white/5 hover:border-t-white/10 bg-white/5 group mx-auto flex w-fit items-center gap-4 rounded-full border border-white/10 p-1 pl-4 shadow-md transition-all duration-300">
                                        <TriangleAlert size={14} className="text-white/60" />
                                        <span className="text-white/80 text-sm">IRDAI-Compliant Fraud Detection</span>
                                        <span className="border-t-white/5 block h-4 w-0.5 border-l border-white/10 bg-white/20"></span>

                                        <div className="bg-white/10 group-hover:bg-white/20 size-6 overflow-hidden rounded-full duration-500">
                                            <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                                                <span className="flex size-6">
                                                    <ArrowRight className="m-auto size-3 text-white" />
                                                </span>
                                                <span className="flex size-6">
                                                    <ArrowRight className="m-auto size-3 text-white" />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                        
                                    <h1
                                        className="mt-8 max-w-4xl mx-auto text-balance text-5xl md:text-6xl lg:mt-16 xl:text-[5.25rem] font-bold text-white tracking-tight">
                                        Stop ₹10,000 Cr in Healthcare Fraud.
                                    </h1>
                                    <p
                                        className="mx-auto mt-8 max-w-2xl text-balance text-lg text-white/50">
                                        AI fraud detection built specifically for Indian insurers. Deployed on free-tier infrastructure with zero maintenance cost. Real-Time. Explainable.
                                    </p>
                                </AnimatedGroup>

                                <AnimatedGroup
                                    variants={{
                                        container: {
                                            visible: {
                                                transition: {
                                                    staggerChildren: 0.05,
                                                    delayChildren: 0.5,
                                                },
                                            },
                                        },
                                        ...transitionVariants,
                                    }}
                                    className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row">
                                    <div
                                        key={1}
                                        className="bg-white/10 rounded-[14px] border border-white/10 p-0.5">
                                        <Button
                                            asChild
                                            size="lg"
                                            className="rounded-xl px-6 text-base bg-white text-black hover:bg-neutral-200 cursor-pointer">
                                            <button onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}>
                                                <span className="text-nowrap">See Live Demo</span>
                                            </button>
                                        </Button>
                                    </div>
                                    <Button
                                        key={2}
                                        asChild
                                        size="lg"
                                        variant="ghost"
                                        className="h-[46px] rounded-xl px-6 border border-transparent hover:border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white transition-all cursor-pointer">
                                        <Link href="https://github.com">
                                            <span className="text-nowrap">View on GitHub</span>
                                        </Link>
                                    </Button>
                                </AnimatedGroup>
                            </div>
                        </div>

                        <AnimatedGroup
                            variants={{
                                container: {
                                    visible: {
                                        transition: {
                                            staggerChildren: 0.05,
                                            delayChildren: 0.75,
                                        },
                                    },
                                },
                                ...transitionVariants,
                            }}>
                            <div className="relative mt-12 sm:mt-16 md:mt-24 w-full">
                                <div
                                    aria-hidden
                                    className="bg-gradient-to-b to-[#0A0A0A] absolute inset-0 z-10 from-transparent from-35% pointer-events-none"
                                />
                                <div className="bg-[#0A0A0A] relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-white/10 z-20">
                                    {dashboardNode}
                                </div>
                            </div>
                        </AnimatedGroup>
                    </div>
                </section>
                <section className="bg-[#0A0A0A] pb-16 pt-16 md:pb-32">
                    <div className="group relative m-auto max-w-5xl px-6">
                        <div className="absolute inset-0 z-10 flex scale-95 items-center justify-center opacity-0 duration-500 group-hover:scale-100 group-hover:opacity-100">
                            <Link
                                href="#demo"
                                className="block text-sm duration-150 hover:opacity-75 text-white">
                                <span> Try Our Integration Options</span>
                                <ChevronRight className="ml-1 inline-block size-3 pt-0.5" />
                            </Link>
                        </div>
                        <div className="group-hover:blur-xs mx-auto mt-12 grid max-w-2xl grid-cols-4 gap-x-12 gap-y-8 transition-all duration-500 group-hover:opacity-10 sm:gap-x-16 sm:gap-y-14">
                            <div className="flex">
                                <img
                                    className="mx-auto h-5 w-fit invert opacity-50 block"
                                    src="https://html.tailus.io/blocks/customers/nvidia.svg"
                                    alt="Client Logo"
                                    height="20"
                                    width="auto"
                                />
                            </div>

                            <div className="flex">
                                <img
                                    className="mx-auto h-4 w-fit invert opacity-50 block"
                                    src="https://html.tailus.io/blocks/customers/column.svg"
                                    alt="Client Logo"
                                    height="16"
                                    width="auto"
                                />
                            </div>
                            <div className="flex">
                                <img
                                    className="mx-auto h-4 w-fit invert opacity-50 block"
                                    src="https://html.tailus.io/blocks/customers/github.svg"
                                    alt="Integration Logo"
                                    height="16"
                                    width="auto"
                                />
                            </div>
                            <div className="flex">
                                <img
                                    className="mx-auto h-5 w-fit invert opacity-50 block"
                                    src="https://html.tailus.io/blocks/customers/nike.svg"
                                    alt="Client Logo"
                                    height="20"
                                    width="auto"
                                />
                            </div>
                            <div className="flex">
                                <img
                                    className="mx-auto h-5 w-fit invert opacity-50 block"
                                    src="https://html.tailus.io/blocks/customers/lemonsqueezy.svg"
                                    alt="Client Logo"
                                    height="20"
                                    width="auto"
                                />
                            </div>
                            <div className="flex">
                                <img
                                    className="mx-auto h-4 w-fit invert opacity-50 block"
                                    src="https://html.tailus.io/blocks/customers/laravel.svg"
                                    alt="Integration Logo"
                                    height="16"
                                    width="auto"
                                />
                            </div>
                            <div className="flex">
                                <img
                                    className="mx-auto h-7 w-fit invert opacity-50 block"
                                    src="https://html.tailus.io/blocks/customers/lilly.svg"
                                    alt="Client Logo"
                                    height="28"
                                    width="auto"
                                />
                            </div>

                            <div className="flex">
                                <img
                                    className="mx-auto h-6 w-fit invert opacity-50 block"
                                    src="https://html.tailus.io/blocks/customers/openai.svg"
                                    alt="AI Logo"
                                    height="24"
                                    width="auto"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

const menuItems = [
    { name: 'Features', href: '#features' },
    { name: 'Solutions', href: '#solutions' },
    { name: 'Demo', href: '#demo' },
    { name: 'Tech Stack', href: '#stack' },
]

const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    return (
        <header className="fixed top-0 z-50 w-full transition-all text-white">
            <nav
                data-state={menuState && 'active'}
                className="w-full px-2 group">
                <div className={cn('mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12', isScrolled && 'bg-[#0A0A0A]/50 max-w-4xl rounded-2xl border border-white/10 backdrop-blur-lg lg:px-5')}>
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                        <div className="flex w-full justify-between lg:w-auto">
                            <Link
                                href="/"
                                aria-label="home"
                                className="flex items-center space-x-2">
                                <BrandLogo size="sm" priority />
                            </Link>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden text-white/70">
                                <Menu className="in-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                            </button>
                        </div>

                        <div className="absolute inset-0 m-auto hidden size-fit lg:block">
                            <ul className="flex gap-8 text-sm">
                                {menuItems.map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            href={item.href}
                                            className="text-white/60 hover:text-white block duration-150">
                                            <span>{item.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-[#0A0A0A] group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border border-white/10 p-6 shadow-2xl md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                            <div className="lg:hidden">
                                <ul className="space-y-6 text-base">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                href={item.href}
                                                className="text-white/60 hover:text-white block duration-150">
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                                <Button
                                    asChild
                                    variant="outline"
                                    size="sm"
                                    className={cn("bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white", isScrolled && 'lg:hidden')}>
                                    <Link href="/login">
                                        <span>Login</span>
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    size="sm"
                                    className={cn("bg-white text-black hover:bg-neutral-200", isScrolled && 'lg:hidden')}>
                                    <Link href="/dashboard">
                                        <span>Dashboard</span>
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    size="sm"
                                    className={cn("bg-white text-black hover:bg-neutral-200", isScrolled ? 'lg:inline-flex' : 'hidden')}>
                                    <Link href="/dashboard">
                                        <span>Dashboard</span>
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}
