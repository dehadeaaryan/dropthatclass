'use client'
import { config, signIn } from "@/lib/auth"

export default async function SignIn() {
    const providers = config.providers
    return (
        <>
            {providers && Object.values(providers).map((provider) => (
                <div key={provider.name}>
                    <button onClick={() => signIn(provider.name)}>
                        Sign in with {provider.name}
                    </button>
                </div>
            ))}
        </>
    )
}
