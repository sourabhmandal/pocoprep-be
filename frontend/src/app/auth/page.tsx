'use client'
import { signIn } from "@/lib/auth/auth-client"; //import the auth client
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ROOT } from "@/lib/route";

export default function LoginPage() {

    return (
        <ErrorBoundary>
            <div className="flex flex-col h-screen w-screen">
                <div className="flex justify-between">
                    <Button className="m-4" variant="ghost">
                        <Link href={ROOT}>
                            <span className="flex items-center gap-2">
                                <ArrowLeft /> Back to Chat
                            </span>
                        </Link>
                    </Button>
                </div>
                <div className="flex h-full w-full items-center justify-center">
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <h1 className="text-2xl font-bold">Sign In</h1>
                        <Button
                            onClick={() => signIn.social({
                                provider: "google",
                                callbackURL: ROOT,
                                errorCallbackURL: ROOT,
                                newUserCallbackURL: ROOT
                            })}
                            className="w-full"
                            size="lg"
                        >
                            Sign in with Google
                        </Button>
                    </div>
                </div>
            </div>
        </ErrorBoundary>
    )
}
