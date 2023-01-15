import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const UpdateProfile = () => {
const router = useRouter();
const { data: session ,status } = useSession({
        required: true,
        onUnauthenticated() {
          router.push("signin");
        }
      });

const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target.elements;
    const numberConsent = form.numberconsent.value;
    let name = form.fName.value + " " + form.lName.value;
    let number = form.number.value.replace(/\D/gi, '').trim();
    let avatar = form.avatar.value || session?.user?.image;
    name = name.trim().length ? name : session?.user?.name;
    if(parseInt(numberConsent)){
        number = (number || session?.user?.phone) || "";
    }
    else number = "";
    const response = await fetch("/api/updateprofile?name=" + name + "&number=" + number + "&id=" + session?.user?.id + "&avatar=" + avatar);
    if(response.status === 200){
        alert("Profile Updated Successfully")
    }
    else  {
        alert("Something Went Wrong");
    }
  const event = new Event("visibilitychange");
  document.dispatchEvent(event);
}
return(<>
    <div class="flex items-center justify-center p-12">
    <div class="animate__animated animate__backInUp mx-auto w-full max-w-[550px] bg-white shadow-xl border-2 rounded-xl">
      <div class="mx-auto w-full max-w-[550px]">
        <form class="p-8" onSubmit={handleSubmit}>
          <div class="-mx-3 flex flex-wrap">
            <div class="w-full px-3 sm:w-1/2">
              <div class="mb-5">
                <label
                  htmlFor="fName"
                  class="mb-3 block text-base font-medium text-[#07074D]"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="fName"
                  id="fName"
                  placeholder={session?.user?.name.split(" ")[0]}
                  class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 font-medium text-[#6B7280] outline-none focus:border-slate-800 focus:shadow-md"
                />
              </div>
            </div>
            <div class="w-full px-3 sm:w-1/2">
              <div class="mb-5">
                <label
                  htmlFor="lName"
                  class="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="lName"
                  id="lName"
                  class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-black font-medium outline-none focus:border-slate-800 focus:shadow-md"
                  placeholder={session?.user?.name.split(" ")[1]}
                />
              </div>
            </div>
          </div>
          <div class="mb-5">
            <label
              htmlFor="guest"
              class="mb-3 block text-base font-medium text-[#07074D]"
            >
              Email
            </label>
            <input
              type="text"
              name="email"
              id="guest"
              placeholder={session?.user?.email}
              value={session?.user?.email}
              min="0"
              class="cursor-not-allowed w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none"
              readOnly
              
            />
          </div>

          <div class="mb-5">
            <label
              htmlFor="avatar"
              class="mb-3 block text-base font-medium text-[#07074D]"
            >
              Custom Avatar
            </label>
            <input
              type="text"
              name="avatar"
              id="avatar"
              placeholder={session?.user?.image}
              min="0"
              class="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none"
            />
          </div>
    
          <div class="-mx-3 flex flex-wrap">
            <div class="w-full px-3 sm:w-1/2">
              <div class="mb-5">
                <label
                  htmlFor="number"
                  class="mb-3 block text-base font-medium text-[#07074D]"
                >
                  WhatsApp Number
                </label>
                <input
                  type="text"
                  name="number"
                  id="number"
                  placeholder={session?.user.phone ? "+" + session?.user.phone : "+XXXXXXXXXXXX"}
                  class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 font-medium text-[#6B7280] outline-none focus:border-slate-800 focus:shadow-md"
                  pattern="^\+(?:[0-9] ?){6,14}[0-9]$"
                />
              </div>
            </div>
          </div>
    
          <div class="mb-5">
            <label class="mb-3 block text-base font-medium text-[#07074D]">
              Receive transactional messages on WhatsApp?
            </label>
            <div class="flex items-center space-x-6">
              <div class="flex items-center">
                <input
                  type="radio"
                  name="numberconsent"
                  id="radioButton1"
                  class="h-5 w-5"
                  value="1"
                  defaultChecked={!!session?.user?.phone}
                />
                <label
                  htmlFor="radioButton1"
                  class="pl-3 text-base font-medium text-[#07074D]"
                >
                  Yes
                </label>
              </div>
              <div class="flex items-center">
                <input
                  type="radio"
                  name="numberconsent"
                  id="radioButton2"
                  class="h-5 w-5"
                  value="0"
                  defaultChecked={!session?.user?.phone}
                />
                <label
                  htmlFor="radioButton2"
                  class="pl-3 text-base font-medium text-[#07074D]"
                >
                  No
                </label>
              </div>
            </div>
          </div>
    
          <div class="w-full items-center">
            <button
                type="submit"
              class="hover:shadow-form rounded-md bg-slate-800 py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
              Update
            </button>
          </div>
        </form>
      </div>
      </div>
    </div>
</>)
};

export default UpdateProfile;

