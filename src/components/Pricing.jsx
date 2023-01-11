import {useSession} from "next-auth/react";

const Pricing = (props) => {
    const {data: session, status} = useSession();
    const paymentInfo = props.paymentInfo;
    return (<section class="bg-white pb-4 pt-2" id="pricing">
    <div class="px-4 mx-auto max-w-screen-xl lg:py-4 lg:px-6">
        <div class="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
            <h2 class="mb-2 text-4xl tracking-tight font-bold text-gray-900">Premium Pricing</h2>
            <p class="font-normal text-gray-500 sm:text-xl">Get more storage and features at prices that seem too good to be true.</p>
        </div>
        <div class="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
            <div class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border-gray-100 shadow border-2">
                <h3 class="mb-4 text-2xl font-semibold">Basic</h3>
                <p class="font-normal text-gray-500 sm:text-lg">For individuals and regular use cases without dedicated support</p>
                <div class="flex justify-center items-baseline my-4">
                    <span class="mr-2 text-5xl font-bold">FREE</span>
                    <span class="text-gray-500 ">forever</span>
                </div>
                
                <ul role="list" class="mb-8 space-y-4 text-left">
                    <li class="flex items-center space-x-2">
                       
                        •
                        <span class="pl-2">AES-256 Encryption</span>
                    </li>
                    <li class="flex items-center space-x-2">
                       
                        •
                        <span class="pl-2">Unmetered Bandwidth</span>
                    </li>
                    <li class="flex items-center space-x-2">
                       
                        •
                        <span class="pl-2">Storage: <span class="font-semibold">10 GB</span></span>
                    </li>
                    <li class="flex items-center space-x-2">
                       
                        •
                        <span class="pl-2">Technical assistance: <span class="font-semibold">NO</span></span>
                    </li>
                    <li class="flex items-center space-x-2">
                       
                        •
                        <span class="pl-2">API Access: <span class="font-semibold">NO</span></span>
                    </li>
                </ul>
                <a class={`w-full bg-gray-200 text-slate-500 border font-bold uppercase px-8 py-3 rounded outline-none mr-1 mb-1 `}>{ (status === "authenticated" && session.user.premium) ? "YOU'VE UPGRADED" : "CURRENT PLAN"}</a>
            </div>
            <div class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border-2 border-gray-100 shadow ">
                <form action={process.env.NEXT_PUBLIC_PAYU_CHECKOUT_ENDPOINT} method='POST'>
                <input type="hidden" name="key" value={paymentInfo?.key} />
                <input type="hidden" name="txnid" value={paymentInfo?.txnId} />
                <input type="hidden" name="productinfo" value={paymentInfo?.productinfo} />
                <input type="hidden" name="amount" value={paymentInfo?.amount} />
                <input type="hidden" name="email" value={paymentInfo?.email} />
                <input type="hidden" name="firstname" value={paymentInfo?.fname} />
                <input type="hidden" name="surl" value={paymentInfo?.surl} />
                <input type="hidden" name="furl" value={paymentInfo?.furl} />
                <input type="hidden" name="hash" value={paymentInfo?.hash} />
                <h3 class="mb-4 text-2xl font-semibold">Premium</h3>
                <p class="font-normal text-gray-500 sm:text-lg">For teams, executives and professionals with dedicated support</p>
                <div class="flex justify-center items-baseline my-4">
                    <span class="mr-2 text-5xl font-bold">₹99</span>
                    <span class="text-gray-500">/month</span>
                </div>
                
                <ul role="list" class="mb-8 space-y-4 text-left">
                    <li class="flex items-center space-x-2">
                        •
                        <span class="pl-2">AES-256 Encryption & GZIP Compression</span>
                    </li>
                    <li class="flex items-center space-x-2">
                       
                        •
                        <span class="pl-2">Unmetered Bandwidth</span>
                    </li>
                    <li class="flex items-center space-x-2">
                       
                        •
                        <span class="pl-2">Storage: <span class="font-semibold">100 GB</span></span>
                    </li>
                    <li class="flex items-center space-x-2">
                       
                        •
                        <span class="pl-2">Technical assistance: <span class="font-semibold">YES</span></span>
                    </li>
                    <li class="flex items-center space-x-2">
                       
                        •
                        <span class="pl-2">API Access: <span class="font-semibold">NO</span></span>
                    </li>
                </ul>
                {status == "authenticated" && <button disabled={!!session.user.premium} className={!!session.user.premium ? `w-full bg-gray-200 text-slate-500 border font-bold uppercase px-8 py-3 rounded outline-none mr-1 mb-1 `: "w-full text-slate-500 border border-slate-500 hover:bg-slate-800 hover:text-white active:bg-slate-600 font-bold uppercase px-8 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"} type="submit">{ (!!session.user.premium) ? "PREMIUM ACTIVE" : "UPGRADE ➡"}</button>}
                </form>
                {status == "unauthenticated" && <a href="/api/auth/signin"><button className="w-full text-slate-500 border border-slate-500 hover:bg-slate-800 hover:text-white active:bg-slate-600 font-bold uppercase px-8 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">UPGRADE &#8594;</button></a>}
                </div>
            <div class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border-2 border-gray-100 shadow">
                <h3 class="mb-4 text-2xl font-semibold">Enterprise</h3>
                <p class="font-normal text-gray-500 sm:text-lg">For companies and enterprises looking for a storage solution at scale</p>
                <div class="flex justify-center items-baseline my-4">
                    <span class="mr-2 text-5xl font-bold">Custom</span>
                </div>
                
                <ul role="list" class="mb-8 space-y-4 text-left">
                    <li class="flex items-center space-x-2">
                       
                        •
                        <span class="pl-2">AES-256 Encryption & GZIP Compression</span>
                    </li>
                    <li class="flex items-center space-x-2">
                       
                        •
                        <span class="pl-2">Unmetered Bandwidth</span>
                    </li>
                    <li class="flex items-center space-x-2">
                       
                        •
                        <span class="pl-2">Storage: <span class="font-semibold">Upto 10 TB</span></span>
                    </li>
                    <li class="flex items-center space-x-2">
                       
                        •
                        <span class="pl-2">Technical assistance: <span class="font-semibold">YES</span></span>
                    </li>
                    <li class="flex items-center space-x-2">
                       
                        •
                        <span class="pl-2">API Access: <span class="font-semibold">YES</span></span>
                    </li>
                </ul>
                <a href="mailto:anushshetty90@gmail.com" class="w-full text-slate-500 border border-slate-500 hover:bg-slate-800 hover:text-white active:bg-slate-600 font-bold uppercase px-8 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">Contact Us &#8599;</a>
            </div>
        </div>
    </div>
  </section>)}

export default Pricing;
