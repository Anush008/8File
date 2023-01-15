import { signIn } from "next-auth/react"
import { useRef, useState } from "react"


export default function SignIn() {
const emailRef = useRef();
const [sending, setSending] = useState(false);
return (<section class="h-h-5/6">
<div class="p-6 pt-10 h-5/6 container">
  <div class="flex justify-center items-center flex-wrap h-full text-slate-800">

    <div class="animate__animated animate__backInUp md:w-8/12 lg:w-5/12 lg:ml-20 bg-white p-8 shadow-xl border-2 rounded-xl">
        <div class="mb-6">
          <input
            name="email"
            ref={emailRef}
            type="email"
            class="w-full rounded-md border-2 border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-slate-800 focus:shadow-md"
            placeholder="Email address"
          />
        </div>
        <button
          onClick={async() => {setSending(true);
           await signIn("email", {email: emailRef.current.value, callbackUrl: "/"})
            setSending(false);
        }}
          class={`inline-block px-7 py-3 disabled:bg-gray-400 bg-slate-800 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-slate-700 hover:shadow-lg focus:bg-slate-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-slate-700 active:shadow-lg transition duration-150 ease-in-out w-full`}
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
          disabled={sending}
        >
          {sending ? "Authenticating..." : "Sign In"}
        </button>
        <div
          class="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
        >
          <p class="text-center font-semibold mx-4 mb-0">OR</p>
        </div>

        <button
          onClick={() => signIn("github", {redirect: true, callbackUrl: "/"})}
          class="bg-black px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3"
          href="#!"
          role="button"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
        >
          <svg class="w-3.5 h-3.5 mr-2 fill-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>Connect with GitHub
        </button>
        <button
        onClick={() => signIn("discord", {callbackUrl: "/"})}
          class="bg-[#7289da] px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center"
          href="#!"
          role="button"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
        >
          <svg class="w-3.5 h-3.5 mr-2 fill-white"  width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M19.54 0c1.356 0 2.46 1.104 2.46 2.472v21.528l-2.58-2.28-1.452-1.344-1.536-1.428.636 2.22h-13.608c-1.356 0-2.46-1.104-2.46-2.472v-16.224c0-1.368 1.104-2.472 2.46-2.472h16.08zm-4.632 15.672c2.652-.084 3.672-1.824 3.672-1.824 0-3.864-1.728-6.996-1.728-6.996-1.728-1.296-3.372-1.26-3.372-1.26l-.168.192c2.04.624 2.988 1.524 2.988 1.524-1.248-.684-2.472-1.02-3.612-1.152-.864-.096-1.692-.072-2.424.024l-.204.024c-.42.036-1.44.192-2.724.756-.444.204-.708.348-.708.348s.996-.948 3.156-1.572l-.12-.144s-1.644-.036-3.372 1.26c0 0-1.728 3.132-1.728 6.996 0 0 1.008 1.74 3.66 1.824 0 0 .444-.54.804-.996-1.524-.456-2.1-1.416-2.1-1.416l.336.204.048.036.047.027.014.006.047.027c.3.168.6.3.876.408.492.192 1.08.384 1.764.516.9.168 1.956.228 3.108.012.564-.096 1.14-.264 1.74-.516.42-.156.888-.384 1.38-.708 0 0-.6.984-2.172 1.428.36.456.792.972.792.972zm-5.58-5.604c-.684 0-1.224.6-1.224 1.332 0 .732.552 1.332 1.224 1.332.684 0 1.224-.6 1.224-1.332.012-.732-.54-1.332-1.224-1.332zm4.38 0c-.684 0-1.224.6-1.224 1.332 0 .732.552 1.332 1.224 1.332.684 0 1.224-.6 1.224-1.332 0-.732-.54-1.332-1.224-1.332z"/></svg>Connect with Discord
        </button>
    </div>
  </div>
</div>
</section>)

}